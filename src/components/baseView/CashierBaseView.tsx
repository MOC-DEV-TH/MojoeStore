import {BaseView, Button, Stack, StandardPadding} from '@components';
import {DISCOUNT_TYPE_KYAT, DISCOUNT_TYPE_PERCENT, EMIT_TAGS} from '@constants';
import {SCREENS, navigate} from '@navigations';
import {useCashier} from '@providers';
import {
  attemptSuspend,
  clearPickedProduct,
  getPickedProducts,
  getTotalSuspendCount,
  setCurrentOrderNumber,
  updateTotalSuspendCount,
} from '@slices';
import {IconSvg} from '@svgs';
import {discountTypeToNumber, eventBus, getShopId} from '@utils';
import {useEffect} from 'react';
import {Linking, ScrollView, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useCameraPermission} from 'react-native-vision-camera';
import {useDispatch} from 'react-redux';

export const CashierBaseView = (props: any) => {
  const {children} = props;
  const dispatch = useDispatch();
  const {hasPermission, requestPermission} = useCameraPermission();
  const {totalAmountInfo} = useCashier();
  const pickedProducts = getPickedProducts();
  const shopId = getShopId();
  const totalSuspend = getTotalSuspendCount() || 0;

  const launchBarcodeScanner = () => {
    if (hasPermission) {
      navigate(SCREENS.SCAN_BARCODE.name);
      return;
    }
    Linking.openSettings();
  };

  useEffect(() => {
    !hasPermission && requestPermission();
  }, [hasPermission]);

  const onSuspend = () => {
    if (!pickedProducts.length) return;
    const products = pickedProducts.map(
      ({
        id,
        addedQty,
        buying_price,
        selling_price,
        discount_amount,
        discount_type,
      }) => {
        return {
          product_id: id,
          quantity: addedQty,
          buying_price: parseInt(buying_price),
          selling_price: parseInt(selling_price),
          discount_amount:
            discount_amount !== null ? parseInt(discount_amount) : null,
          discount_type: discountTypeToNumber(discount_type),
        };
      },
    );

    const payload = {
      total_price: totalAmountInfo.amount,
      products: JSON.stringify(products),
      shop_id: shopId,
    };

    dispatch(
      attemptSuspend({
        body: payload,
        onSuccess: () => {
          dispatch(clearPickedProduct());
          dispatch(setCurrentOrderNumber(null));
          dispatch(updateTotalSuspendCount(totalSuspend));
          eventBus.emit(EMIT_TAGS.SUSPEND);
        },
      }),
    );
  };

  return (
    <BaseView>
      <StandardPadding>
        <Button
          title="Scan Barcode"
          colorScheme="blue"
          size="xl"
          gap={10}
          style={{marginBottom: 10}}
          leftIcon={<SvgXml xml={IconSvg.qr()} />}
          fullwidth
          onPress={launchBarcodeScanner}
        />
        <Stack columnSpace={10} style={{marginBottom: 10}}>
          <Button
            title="Non Barcode Item"
            colorScheme="orange"
            onPress={() => navigate(SCREENS.CATEGORY_LEVEL1.name)}
            style={{flex: 1}}
            leftIcon={<SvgXml xml={IconSvg.add} />}
          />
          <Button
            title="Suspend"
            style={{flex: 1}}
            leftIcon={<SvgXml xml={IconSvg.suspend} />}
            onPress={onSuspend}
          />
        </Stack>
      </StandardPadding>
      <View style={{flex: 1}}>
        <ScrollView>{children}</ScrollView>
      </View>
    </BaseView>
  );
};
