import {
  AppSelectField,
  AppTextFiled,
  Button,
  CategoryItem,
  CustomBottomModal,
  Stack,
  Text,
} from '@components';
import {SPACING} from '@constants';
import {useColors} from '@hooks';
import {SCREENS, navigate} from '@navigations';
import {IconSvg} from '@svgs';
import {isUndefined} from '@utils';
import {useEffect, useRef, useState} from 'react';
import {Controller} from 'react-hook-form';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {SvgXml} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ImageFluid} from 'src/components/ImageFluid';
import {useTranslation} from 'react-i18next';


export const ProductNameInput = ({errors, ...props}: any) => {
  const {t} = useTranslation();
  return (
    <View style={{width: '100%'}}>
      <Text fontStyle="FW400_12" style={{paddingBottom: 6}}>
        {t('name')}*
      </Text>
      <AppTextFiled
        name="name"
        {...props}
        requireMessage="Product Name is required"
        error={errors?.name?.message}
        require
      />
    </View>
  );
};

export const SkuInput = ({errors, ...props}: any) => {
  const {t} = useTranslation();
  return (
    <View style={{width: '100%'}}>
      <Text fontStyle="FW400_12" style={{paddingBottom: 6}}>
        {t('sku')}
      </Text>
      <AppTextFiled
        name="sku"
        requireMessage="Sku is required"
        error={errors?.sku?.message}
        require
        {...props}
      />
    </View>
  );
};

export const QtyInput = ({control, errors}: any) => {
  const {t} = useTranslation();
  return (
    <View style={{width: '100%'}}>
      <Text fontStyle="FW400_12" style={{paddingBottom: 6}}>
        {t('qty')}
      </Text>
      <AppTextFiled
        type="number"
        name="qty"
        control={control}
        require
        error={errors?.qty?.message}
        requireMessage="Qty is required"
      />
    </View>
  );
};

export const CategorySelect = ({control, data, errors}: any) => {
  const {t} = useTranslation();
  return (
    <View style={{width: '100%'}}>
      <Text fontStyle="FW400_12" style={{paddingBottom: 6}}>
        {t('category')}
      </Text>
      <AppSelectField
        data={data}
        name="subcategoryId"
        control={control}
        require
        requireMessage="Sub Category is required"
        error={errors?.subcategoryId?.message}
      />
    </View>
  );
};

export const BuyingPrice = ({control, errors}: any) => {
  const {t} = useTranslation();
  return (
    <View style={{width: '100%'}}>
      <Text fontStyle="FW400_12" style={{paddingBottom: 6}}>
        {t('buying_price')}
      </Text>
      <AppTextFiled
        name="buyingPrice"
        control={control}
        type="number"
        require
        requireMessage="Buying price is required."
        error={errors?.buyingPrice?.message}
      />
    </View>
  );
};

export const SellingPrice = ({control, errors}: any) => {
  const {t} = useTranslation();
  return (
    <View style={{width: '100%'}}>
      <Text fontStyle="FW400_12" style={{paddingBottom: 6}}>
        {t('selling_price')}
      </Text>
      <AppTextFiled
        name="sellingPrice"
        control={control}
        type="number"
        require
        requireMessage="Selling price is required."
        error={errors?.sellingPrice?.message}
      />
    </View>
  );
};

export const BarcodeNonBarcode = ({control, setValue, errors, watch}: any) => {
  let timeoutId: any;
  const colors = useColors();
  const barcodeType = Number(watch('barcodeType'));
  const [isScanBarCode, setIsScanBarCode] = useState(Boolean(barcodeType));
  const {t} = useTranslation();

  useEffect(() => {
    setValue('barcodeType', isScanBarCode ? 1 : 0);
    return clearTimeout(timeoutId);
  }, [isScanBarCode]);

  useEffect(() => {
    setIsScanBarCode(Boolean(barcodeType));
  }, [barcodeType]);

  const onQrDone = (code: any) => {
    setValue('barcode', code);
  };

  return (
    <>
      <Stack columnSpace={10}>
        <TouchableOpacity
          onPress={() => {
            setIsScanBarCode(true);
            timeoutId = setTimeout(
              () =>
                navigate(SCREENS.SCAN_BARCODE.name, {
                  callback: onQrDone,
                }),
              300,
            );
          }}
          style={{
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            gap: 6,
            borderWidth: 1,
            borderColor: isScanBarCode
              ? colors.colorBCB8B8
              : colors.colorD9D9D9,
            flex: 1,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text textColor={isScanBarCode ? colors.black : colors.color8C8C8C}>
            {t('scan_barcode')}
          </Text>
          <SvgXml
            xml={IconSvg.qr(
              String(isScanBarCode ? colors.black : colors.color8C8C8C),
            )}
            width={10}
            height={10}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsScanBarCode(false);
            // onChange(false);
          }}
          style={{
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: isScanBarCode
              ? colors.colorD9D9D9
              : colors.colorBCB8B8,
            flex: 1,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text textColor={!isScanBarCode ? colors.black : colors.color8C8C8C}>
            {t('non_barcode')}
          </Text>
        </TouchableOpacity>
      </Stack>
      <View style={{width: '100%'}}>
        <Text fontStyle="FW400_12" style={{paddingBottom: 6}}>
          {t('barcode')}
        </Text>

        <AppTextFiled
          name="barcode"
          control={control}
          isDisabled={!isScanBarCode}
          requireMessage="Barcode is required"
          error={errors?.barcode?.message}
          inputStyle={{
            backgroundColor: isScanBarCode ? colors.white : colors.disable,
          }}
        />
      </View>
    </>
  );
};

export const NotifyStockInput = ({control, watch, setValue}: any) => {
  const minimumQtyType = Number(watch('minimumQtyType'));
  const [isChecked, setIsChecked] = useState(false);
  const colors = useColors();
  const {t} = useTranslation();

  useEffect(() => {
    setValue('minimumQtyType', isChecked ? 1 : 0);
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(Boolean(minimumQtyType));
  }, [minimumQtyType]);

  return (
    <View style={{width: '100%'}}>
      <Stack
        items="center"
        columnSpace={10}
        style={{marginBottom: 15, position: 'relative'}}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 2,
          }}
          onPress={() => setIsChecked(!isChecked)}></TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 22,
            height: 22,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.borderColor,
            borderRadius: 4,
          }}>
          {isChecked && (
            <Ionicons name="checkmark" size={20} color={colors.borderColor} />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <Text fontStyle="FW400_12">{t('low_stock_notify')}</Text>
        </TouchableOpacity>
      </Stack>
      {isChecked && (
        <>
          <Text fontStyle="FW400_12" style={{paddingBottom: 6}}>
            {t('minimum_qty')}
          </Text>
          <AppTextFiled type="number" control={control} name="minimumQty" />
        </>
      )}
    </View>
  );
};

export const CategoryNameInput = ({label, control, errors}: any) => {
  return (
    <View style={{width: '100%'}}>
      <Text fontStyle="FW400_12" style={{paddingBottom: 6}}>
        {label}
      </Text>
      <AppTextFiled
        name="categoryName"
        control={control}
        require
        error={errors?.categoryName?.message}
      />
    </View>
  );
};

export const ChooseCategoryIcon = ({
  control,
  setValue,
  data,
  errors,
  watch,
  label,
  iconOnly = false,
  selectedItemLayout,
}: any) => {
  const chooseCategoryModalRef: any = useRef();
  const windowHeight = Dimensions.get('window').height;
  const watchingValue = watch('categoryIcon');
  const [selectedItem, setSelectedItem]: any = useState();
  const {t} = useTranslation();

  const onChoose = (item: any) => {
    setSelectedItem(item);
    console.log('onChoose', item);
    setValue('categoryIcon', JSON.stringify(item));
    chooseCategoryModalRef?.current?.close();
  };

  useEffect(() => {
    if (isUndefined(watchingValue) || !watchingValue) {
      setSelectedItem(null);
    }
  }, [watchingValue]);

  console.log('my data here', data);

  return (
    <>
      <View style={{width: '100%'}}>
        <Text fontStyle="FW400_12" style={{paddingBottom: 6}}>
          {label}
        </Text>
        <Button
          title={t('choose')}
          colorScheme="colorA3A3A3"
          onPress={() => chooseCategoryModalRef?.current?.open()}
        />

        <View style={{marginTop: 20}}>
          {selectedItem && selectedItemLayout(selectedItem)}
        </View>

        <AppTextFiled
          name="categoryIcon"
          control={control}
          inputContainerStyle={{display: 'none'}}
          require
          error={errors?.categoryIcon?.message}
        />
      </View>

      <CustomBottomModal ref={chooseCategoryModalRef} noPadding>
        <View
          style={{
            maxHeight: windowHeight - 100,
            paddingHorizontal: SPACING['STANDARD'],
          }}>
          <View style={{marginBottom: 20, paddingTop: SPACING['STANDARD']}}>
            <Text fontStyle="FW600_16" textAlign="left">
              {t('choose_category_icon')}
            </Text>
          </View>

          <ScrollView>
            {/* <View
              style={{
                columnGap: 11,
                rowGap: 12,
                flexWrap: 'wrap',
                flexDirection: 'row',
                paddingBottom: SPACING['STANDARD'],
              }}></View> */}

            {iconOnly ? (
              <View
                style={{
                  gap: 12,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  paddingBottom: SPACING['STANDARD'],
                  justifyContent: 'space-between',
                }}>
                {data?.map((item: any, key: number) => {
                  return (
                    <TouchableOpacity
                      onPress={() => onChoose(item)}
                      key={`category_image_${key}`}
                      style={{
                        backgroundColor: `${item.background_color}`,
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        borderRadius: 7,
                        flexDirection: 'column',
                        width: '22%',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                        }}>
                        <ImageFluid
                          src={`${Config.DOMAIN}/${item.category_image}`}
                          width={30}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              <View
                style={{
                  columnGap: 11,
                  rowGap: 12,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  paddingBottom: SPACING['STANDARD'],
                }}>
                {data?.map((item: any) => {
                  return (
                    <CategoryItem
                      key={`${item?.cat_name}_${item?.id}`}
                      goTo={() => onChoose(item)}
                      style={{width: '31%'}}
                      bgColor={item?.cat_bg_color}
                      title={item?.cat_name}
                      icon={item?.cat_img}
                    />
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      </CustomBottomModal>
    </>
  );
};

export const CustomRadioButton = ({name, control, options, watch}: any) => {
  const colors = useColors();
  const currentValue = Number(watch(name));
  const [selectedOption, setSelectedOption] = useState(currentValue);

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    setSelectedOption(currentValue);
  }, [currentValue]);

  return (
    <View style={{flexWrap: 'wrap', flexDirection: 'row', columnGap: 15}}>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange}}) => (
          <>
            {options.map(({name, value}: any, index: number) => (
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
                key={index}
                onPress={() => {
                  onChange(value);
                  handleOptionSelect(value);
                }}>
                <View
                  style={[
                    styles.radioButton,
                    {
                      borderColor:
                        selectedOption === value
                          ? colors.primary
                          : colors.colorA7A7A7,
                    },
                  ]}></View>
                <Text>{name}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    borderWidth: 4,
    backgroundColor: '#fff',
    borderRadius: 14,
    width: 15,
    height: 15,
  },
  radioText: {
    color: '#333',
  },
});
