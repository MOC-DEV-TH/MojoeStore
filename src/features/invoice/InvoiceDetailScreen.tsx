import {BaseView, Stack} from '@components';
import {SPACING} from '@constants';
import {useColors, useFetch, useFonts} from '@hooks';
import {Text as RNText, ScrollView, View} from 'react-native';
import {InvoiceTable} from './components';
import {endpoints} from '@services';
import {useEffect} from 'react';
import {formatDate2} from '@utils';

export const InvoiceDetailScreen = ({route}: any) => {
  const fonts = useFonts();
  const colors = useColors();
  const {invoiceId} = route.params;

  const {
    data: invoiceData,
    fetch: fetchInvoice,
    isLoading,
  } = useFetch({
    url: endpoints.invoice.getInvoiceDetail(invoiceId),
  });

  useEffect(() => {
    fetchInvoice();
  }, []);

  const orderItems = invoiceData?.order?.order_items ?? [];

  const subtotal = orderItems.reduce((sum: number, item: any) => {
    const qty = Number(item?.qty ?? 0);
    const price = Number(item?.selling_price ?? item?.product?.selling_price ?? 0);
    return sum + qty * price;
  }, 0);

  const getItemDiscountValue = (item: any) => {
    const qty = Number(item?.qty ?? 0);
    const price = Number(item?.selling_price ?? item?.product?.selling_price ?? 0);
    const discount = Number(item?.discount_amount ?? 0);
    const type = item?.discount_type;

    if (!discount) return 0;

    if (Number(type) === 1) {
      return (qty * price * discount) / 100;
    }

    return qty * discount;
  };

  const hasItemDiscount = orderItems.some((item: any) => getItemDiscountValue(item) > 0);

  const invoiceDiscountAmount = Number(invoiceData?.discount_amount ?? 0);
  const invoiceDiscountType = invoiceData?.discount_type;

  const footerDiscount =
    !hasItemDiscount && invoiceDiscountAmount > 0
      ? Number(invoiceDiscountType) === 1
        ? (subtotal * invoiceDiscountAmount) / 100
        : invoiceDiscountAmount
      : 0;

  return (
    <BaseView noPadding>
      <Stack style={{padding: SPACING.STANDARD}} justify="space-between">
        <RNText style={{...fonts.en.FW600_12, color: colors.black}}>
          {isLoading ? 'loading...' : invoiceData?.invoice_no}
        </RNText>

        <RNText style={{...fonts.en.FW600_12, color: colors.black}}>
          {isLoading
            ? 'loading...'
            : formatDate2(invoiceData?.order?.created_at || '')}
        </RNText>
      </Stack>

      <ScrollView>
        {orderItems.map((item: any, index: number) => (
  <InvoiceTable
    key={item?.id ?? index}
    item={item}
    showDiscountColumn={hasItemDiscount}
  />
))}
      </ScrollView>

      <View style={{backgroundColor: colors.white, elevation: 2}}>
  {!hasItemDiscount && footerDiscount > 0 && (
    <Stack
      style={{
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderTopColor: colors.borderColor,
        borderBottomColor: colors.borderColor,
      }}>
      <View
        style={{
          padding: SPACING.STANDARD,
          backgroundColor: colors.colorD6D6D6,
          width: '50%',
        }}>
        <RNText style={{...fonts.en.FW700_12, color: colors.black}}>
          Discount
        </RNText>
      </View>

      <View
        style={{
          padding: SPACING.STANDARD,
          width: '50%',
        }}>
        <RNText style={{...fonts.en.FW700_12, color: colors.orange}}>
          {isLoading ? 'loading...' : footerDiscount.toFixed(2)}
        </RNText>
      </View>
    </Stack>
  )}

  <Stack
    style={{
      borderTopWidth: 1,
      borderTopColor: colors.borderColor,
    }}>
    <View
      style={{
        padding: SPACING.STANDARD,
        backgroundColor: colors.blue,
        width: '50%',
      }}>
      <RNText style={{...fonts.en.FW700_12, color: colors.white}}>
        Total
      </RNText>
    </View>

    <View
      style={{
        padding: SPACING.STANDARD,
        width: '50%',
      }}>
      <RNText style={{...fonts.en.FW700_12, color: colors.orange}}>
        {isLoading ? 'loading...' : invoiceData?.total_price}
      </RNText>
    </View>
  </Stack>
</View>
    </BaseView>
  );
};