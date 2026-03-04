import {Button, CashierBaseView, CheckoutItem, Text} from '@components';
import {DISCOUNT_TYPE, DISCOUNT_TYPE_ARRAY, SPACING} from '@constants';
import {useColors, useFonts} from '@hooks';
import {goBack} from '@navigations';
import {useCashier} from '@providers';
import {
  addProducts,
  clearPickedProduct,
  getPickedProducts,
  setCurrentOrderNumber,
} from '@slices';
import {useEffect} from 'react';
import {View, Text as RNText} from 'react-native';
import {useDispatch} from 'react-redux';
export const CashierScreen = () => {
  const dispatch = useDispatch();
  const colors = useColors();
  const fonts = useFonts();
  const pickedProducts = getPickedProducts();
  const isAbleToCheckout = pickedProducts?.length > 0;
  const {onCheckout, totalAmountInfo} = useCashier();

  useEffect(() => {
    return () => {
      dispatch(clearPickedProduct());
      dispatch(setCurrentOrderNumber(null));
    };
  }, []);

  return (
    <CashierBaseView>
      {pickedProducts?.map((item: any) => (
        <CheckoutItem
          data={item}
          allData={pickedProducts}
          key={`${item.id}-${item.name}`}
        />
      ))}
      <View
        style={{
          backgroundColor: colors.colorF1F1F1,
          padding: SPACING['STANDARD'],
          marginBottom: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 4,
          gap: 10,
        }}>
        <Text fontStyle="FW400_10" textColor={colors.muted} textAlign="center">
          Total Amount
        </Text>
        <RNText
          style={{
            ...fonts.en.FW700_18,
            color: colors.primary,
            textAlign: 'center',
          }}>
          {totalAmountInfo?.amount}
        </RNText>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            title="Check Out"
            colorScheme="green"
            onPress={onCheckout}
            disabled={!isAbleToCheckout}
          />
        </View>
      </View>
    </CashierBaseView>
  );
};
