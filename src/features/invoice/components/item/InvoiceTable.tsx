import {BaseView, Stack} from '@components';
import {SPACING} from '@constants';
import {useColors, useFonts} from '@hooks';
import {Text as RNText, View} from 'react-native';

export const InvoiceTable = ({item}: any) => {
  const fonts = useFonts();
  const colors = useColors();
  const {product, total_price, qty} = item;

  return (
    <View>
      <View
        style={{
          backgroundColor: colors.colorD6D6D6,
          padding: SPACING['STANDARD'],
        }}>
        <RNText style={{color: colors.black, ...fonts.en.FW700_12}}>
          {product?.name}
        </RNText>
      </View>

      <Stack
        style={{
          backgroundColor: colors.colorF2F2F2,
          borderBottomWidth: 1,
          borderBlockColor: colors.borderColor,
        }}>
        <View
          style={{
            padding: SPACING['STANDARD'],
            borderRightWidth: 1,
            borderColor: colors.borderColor,
            width: '45%',
          }}>
          <RNText
            style={{
              ...fonts.en.FW700_12,
              color: colors.orange,
            }}>
            SKU
          </RNText>
        </View>
        <View
          style={{
            padding: SPACING['STANDARD'],
            borderRightWidth: 1,
            borderColor: colors.borderColor,
            width: '20%',
          }}>
          <RNText
            style={{
              ...fonts.en.FW700_12,
              color: colors.orange,
            }}>
            Qty
          </RNText>
        </View>
        <View
          style={{
            padding: SPACING['STANDARD'],
            width: '35%',
          }}>
          <RNText
            style={{
              ...fonts.en.FW700_12,
              color: colors.orange,
            }}>
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
            padding: SPACING['STANDARD'],
            borderRightWidth: 1,
            borderColor: colors.borderColor,
            width: '45%',
          }}>
          <RNText
            style={{
              ...fonts.en.FW700_12,
            }}>
            {product?.sku}
          </RNText>
        </View>
        <View
          style={{
            padding: SPACING['STANDARD'],
            borderRightWidth: 1,
            borderColor: colors.borderColor,
            width: '20%',
          }}>
          <RNText
            style={{
              ...fonts.en.FW700_12,
            }}>
            {qty}
          </RNText>
        </View>
        <View
          style={{
            padding: SPACING['STANDARD'],
            width: '35%',
          }}>
          <RNText
            style={{
              ...fonts.en.FW700_12,
            }}>
            {total_price}
          </RNText>
        </View>
      </Stack>
    </View>
  );
};
