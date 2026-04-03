import {SPACING} from '@constants';
import {useColors, useFonts} from '@hooks';
import {Text as RNText, View} from 'react-native';
import {Stack} from '@components';

export const InvoiceTable = ({item, showDiscountColumn = false}: any) => {
  const fonts = useFonts();
  const colors = useColors();

  const {product, total_price, qty, discount_amount, discount_type} = item;

  const hasDiscount = Number(discount_amount ?? 0) > 0;

  const getDiscountText = () => {
    const amount = Number(discount_amount ?? 0);

    if (!amount) return '';

    if (Number(discount_type) === 1) {
      return `${amount}%`;
    }

    return `${amount}`;
  };

  const skuWidth = showDiscountColumn ? '35%' : '45%';
  const qtyWidth = '15%';
  const discountWidth = '25%';
  const priceWidth = showDiscountColumn ? '30%' : '40%';

  return (
    <View>
      <View
        style={{
          backgroundColor: colors.colorD6D6D6,
          padding: SPACING.STANDARD,
        }}>
        <RNText style={{color: colors.black, ...fonts.en.FW700_12}}>
          {product?.name}
        </RNText>
      </View>

      <Stack
        style={{
          backgroundColor: colors.colorF2F2F2,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderColor,
        }}>
        <View
          style={{
            padding: SPACING.STANDARD,
            borderRightWidth: 1,
            borderColor: colors.borderColor,
            width: skuWidth,
          }}>
          <RNText style={{...fonts.en.FW700_12, color: colors.orange}}>
            SKU
          </RNText>
        </View>

        <View
          style={{
            padding: SPACING.STANDARD,
            borderRightWidth: 1,
            borderColor: colors.borderColor,
            width: qtyWidth,
          }}>
          <RNText style={{...fonts.en.FW700_12, color: colors.orange}}>
            Qty
          </RNText>
        </View>

        {showDiscountColumn && (
          <View
            style={{
              padding: SPACING.STANDARD,
              borderRightWidth: 1,
              borderColor: colors.borderColor,
              width: discountWidth,
            }}>
            <RNText style={{...fonts.en.FW700_12, color: colors.orange}}>
              Discount
            </RNText>
          </View>
        )}

        <View
          style={{
            padding: SPACING.STANDARD,
            width: priceWidth,
          }}>
          <RNText style={{...fonts.en.FW700_12, color: colors.orange}}>
            Price (Ks)
          </RNText>
        </View>
      </Stack>

      <Stack
        style={{
          backgroundColor: colors.white,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderColor,
        }}>
        <View
          style={{
            padding: SPACING.STANDARD,
            borderRightWidth: 1,
            borderColor: colors.borderColor,
            width: skuWidth,
          }}>
          <RNText style={{...fonts.en.FW700_12}}>
            {product?.sku}
          </RNText>
        </View>

        <View
          style={{
            padding: SPACING.STANDARD,
            borderRightWidth: 1,
            borderColor: colors.borderColor,
            width: qtyWidth,
          }}>
          <RNText style={{...fonts.en.FW700_12}}>{qty}</RNText>
        </View>

        {showDiscountColumn && (
          <View
            style={{
              padding: SPACING.STANDARD,
              borderRightWidth: 1,
              borderColor: colors.borderColor,
              width: discountWidth,
            }}>
            <RNText style={{...fonts.en.FW700_12, color: colors.orange}}>
              {hasDiscount ? getDiscountText() : ''}
            </RNText>
          </View>
        )}

        <View
          style={{
            padding: SPACING.STANDARD,
            width: priceWidth,
          }}>
          <RNText style={{...fonts.en.FW700_12}}>{total_price}</RNText>
        </View>
      </Stack>
    </View>
  );
};