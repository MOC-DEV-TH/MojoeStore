import {BaseView, Button, Stack, StandardPadding, Text} from '@components';
import {MONTH} from '@constants';
import {useColors, useFetch} from '@hooks';
import {SCREENS, goBack, navigate} from '@navigations';
import {endpoints} from '@services';
import {useEffect} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
export const ReceiptScreen = ({route}: any) => {
  const {invoiceId, type} = route.params;
  const colors = useColors();
  const {data, fetch, isLoading}: any = useFetch({
    url: endpoints.invoice.getInvoiceDetail(invoiceId),
  });

  useEffect(() => {
    fetch();
  }, []);

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day}/${MONTH[monthIndex]}/${year}`;
  }

  //   if (isLoading) return <ActivityIndicator />;

  return (
    <BaseView>
      <StandardPadding>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Stack justify="space-between">
              <View>
                <Text>#{data?.invoice_no}</Text>
              </View>
              <View>
                <Text>{data?.created_at && formatDate(data.created_at)}</Text>
              </View>
            </Stack>

            <View style={{paddingVertical: 20, gap: 10}}>
              {data?.order?.order_items?.map((item: any) => (
                <>
                  <Stack justify="space-between" items="center">
                    <View>
                      <Text>{item?.product?.name}</Text>
                      <Text>
                        {item?.qty} X {item?.product?.selling_price}
                      </Text>
                      {item.discount_type !== null && (
                        <Text>
                          Discount {item.discount_amount} (
                          {item.discount_type == 0 ? 'MMK' : '%'})
                        </Text>
                      )}
                    </View>
                    <View>
                      <Text>{item?.total_price}</Text>
                    </View>
                  </Stack>
                </>
              ))}
            </View>

            <View style={{gap: 5}}>
              <Stack justify="space-between" items="center">
                <View>
                  <Text>Discount</Text>
                </View>
                <View>
                  <Text>
                    {data?.discount_amount || '-'}{' '}
                    {data.discount_type !== null &&
                      (data.discount_type == 0 ? 'MMK' : '%')}
                  </Text>
                </View>
              </Stack>
              <Stack justify="space-between" items="center">
                <View>
                  <Text>Total</Text>
                </View>
                <View>
                  <Text>
                    {data?.total_price} {data?.currency}
                  </Text>
                </View>
              </Stack>
              <Stack justify="space-between" items="center">
                <View>
                  <Text>Payment Type</Text>
                </View>
                <View>
                  <Text>{data?.payment_type}</Text>
                </View>
              </Stack>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 30,
                columnGap: 10,
              }}>
              {type === 'no-receipt' ? (
                <>
                  <Button
                    onPress={() => navigate(SCREENS.DASHBOARD.name)}
                    colorScheme="blue"
                    title="Home"
                  />
                  <Button
                    onPress={() => goBack()}
                    colorScheme="green"
                    title="Cashier"
                  />
                </>
              ) : (
                <Button
                  style={{borderWidth: 1, borderColor: colors.primary}}
                  textColor={String(colors.primary)}
                  colorScheme="white"
                  title="Print"
                  onPress={() => Alert.alert('Coming Soon')}
                />
              )}
            </View>
          </>
        )}
      </StandardPadding>
    </BaseView>
  );
};
