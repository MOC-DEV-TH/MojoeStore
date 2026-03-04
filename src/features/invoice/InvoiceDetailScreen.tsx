import {BaseView, Stack, Text} from '@components';
import {SPACING} from '@constants';
import {useColors, useFetch, useFonts} from '@hooks';
import {Text as RNText, ScrollView, View} from 'react-native';
import {InvoiceTable} from './components';
import {endpoints} from '@services';
import {useEffect} from 'react';
import {formatDate, formatDate2} from '@utils';

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

  return (
    <BaseView noPadding>
      <Stack style={{padding: SPACING['STANDARD']}} justify="space-between">
        <RNText style={{...fonts.en.FW600_12, color: colors.black}}>
          {isLoading ? 'loading...' : invoiceData.invoice_no}
        </RNText>
        <RNText style={{...fonts.en.FW600_12, color: colors.black}}>
          {isLoading
            ? 'loading...'
            : formatDate2(invoiceData?.order?.created_at || '')}
        </RNText>
      </Stack>

      <ScrollView>
        {invoiceData?.order?.order_items?.map(item => (
          <InvoiceTable item={item} />
        ))}
      </ScrollView>

      <View style={{backgroundColor: colors.white, elevation: 2}}>
        <Stack
          style={{
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: colors.borderColor,
            borderBottomColor: colors.borderColor,
          }}>
          <View
            style={{
              padding: SPACING['STANDARD'],
              backgroundColor: colors.colorD6D6D6,
              width: '50%',
            }}>
            <RNText
              style={{
                ...fonts.en.FW700_12,
                color: colors.black,
              }}>
              Discount
            </RNText>
          </View>
          <View
            style={{
              padding: SPACING['STANDARD'],
              width: '50%',
            }}>
            <RNText
              style={{
                ...fonts.en.FW700_12,
                color: colors.orange,
              }}>
              {isLoading ? 'loading...' : invoiceData.discount_amount || 0}
            </RNText>
          </View>
        </Stack>

        <Stack>
          <View
            style={{
              padding: SPACING['STANDARD'],
              backgroundColor: colors.blue,
              width: '50%',
            }}>
            <RNText
              style={{
                ...fonts.en.FW700_12,
                color: colors.white,
              }}>
              Total
            </RNText>
          </View>
          <View
            style={{
              padding: SPACING['STANDARD'],
              width: '50%',
            }}>
            <RNText
              style={{
                ...fonts.en.FW700_12,
                color: colors.orange,
              }}>
              {isLoading ? 'loading...' : invoiceData.total_price}
            </RNText>
          </View>
        </Stack>
      </View>
    </BaseView>
  );
};
