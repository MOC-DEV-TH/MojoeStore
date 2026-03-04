import {BaseView, Button, Stack, Text} from '@components';
import {isUndefined} from '@utils';
import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {ImageFluid} from 'src/components/ImageFluid';
import {productData} from '../productPicker/FakeData';
import {goBack} from '@navigations';
import {useDispatch} from 'react-redux';
import {addProductItem, getBarcodeProduct} from '@slices';

export const ScanBarcode = ({route}: any) => {
  const dispatch = useDispatch();
  const {callback} = route.params;
  const device: any = useCameraDevice('back');
  const [codeInfo, setCodeInfo] = useState<any>({
    code: '',
    img: '',
    times: 0,
  });
  const {t} = useTranslation();
  let isFound: any = useRef(null);
  const camera = useRef<Camera>(null);
  const hasReachLimitTimes = codeInfo.times > 4;

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async codes => {
      if (isFound.current) {
        if (hasReachLimitTimes) return;
      }

      const value = codes[0].value;
      if (!isUndefined(value)) {
        isFound.current = true;
        const photo = hasReachLimitTimes
          ? await camera.current?.takePhoto()
          : {path: ''};
        setCodeInfo((prev: any) => ({
          code: value,
          img: photo?.path,
          times: prev.times + 1,
        }));
        console.log(`Scanned ${value} codes!`);
        console.log(`photo`, photo?.path);
      }
    },
  });

  const onDone = (code: any) => {
    dispatch(
      getBarcodeProduct({
        body: {barcode: code},
        onSuccess: (productItem: any) => {
          console.log('onSuccess productItem', productItem);
          dispatch(addProductItem({...productItem, addedQty: 1}));
          goBack();
        },
      }),
    );
  };

  return device === null ? (
    <View>
      <Text>No Device Found</Text>
    </View>
  ) : (
    <BaseView>
      <Stack items="center" direction="column">
        <View
          style={{
            marginTop: 20,
            width: 250,
            height: 250,
            borderRadius: 30,
            overflow: 'hidden',
          }}>
          {codeInfo.img && hasReachLimitTimes ? (
            <ImageFluid
              src={`file://${codeInfo.img}`}
              style={StyleSheet.absoluteFill}
              resizeMode={'cover'}
            />
          ) : (
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={!hasReachLimitTimes}
              codeScanner={codeScanner}
              photo={true}
            />
          )}
        </View>
        <View style={{marginVertical: 30}}>
          <Text fontStyle="FW400_24">{t('scanner')}</Text>
        </View>
        {codeInfo.code && hasReachLimitTimes && (
          <View>
            <Button
              title={t('done')}
              colorScheme="green"
              style={{minWidth: 150}}
              onPress={() => {
                if (callback) {
                  callback(codeInfo.code);
                  goBack();
                  return;
                }
                onDone(codeInfo.code);
              }}
            />
          </View>
        )}
      </Stack>
    </BaseView>
  );
};
