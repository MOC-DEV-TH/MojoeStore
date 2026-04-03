import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  View,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  BLEPrinter,
  NetPrinter,
} from 'react-native-thermal-receipt-printer-image-qr';
import {useTranslation} from 'react-i18next';
import {getUserInfo, toggleInventorySearchBox} from '@slices';



import {
  BaseView,
  Button,
  Stack,
  StandardPadding,
  Text,
} from '@components';
import {MONTH} from '@constants';
import {useColors, useFetch} from '@hooks';
import {SCREENS, goBack, navigate} from '@navigations';
import {endpoints} from '@services';

export const ReceiptScreen = ({route}: any) => {
  const {invoiceId, type, paidAmount,changeAmount} = route.params;
  const colors = useColors();
  const {t} = useTranslation();
  const userInfo = getUserInfo();

  const {data, fetch, isLoading}: any = useFetch({
    url: endpoints.invoice.getInvoiceDetail(invoiceId),
  });

  useEffect(() => {
    fetch();
  }, []);

  function formatDate(dateString: any) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day}/${MONTH[monthIndex]}/${year}`;
  }

  function formatTime(dateString: any) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  const formatMoney = (value: any) => {
    if (value == null || value === '') return '0';
    return Number(value).toLocaleString();
  };

  const items = data?.order?.order_items ?? [];

  const subtotalAmount = () => {
  return items.reduce((sum: number, item: any) => {
    const qty = Number(item?.qty ?? 0);
    const price = Number(item?.selling_price ?? 0);
    return sum + qty * price;
  }, 0);
};

const totalAmount = () => {
  return Number(data?.total_price ?? 0);
};

const totalDiscountAmount = () => {
  return subtotalAmount() - totalAmount();
};

  const getDiscountText = () => {
  const discount = totalDiscountAmount();

  if (discount <= 0) return '-';

  return `${formatMoney(discount)} Ks`;
};

  const padRight = (text: string, length: number) => {
    const value = String(text ?? '');
    if (value.length >= length) return value.slice(0, length);
    return value + ' '.repeat(length - value.length);
  };

  const padLeft = (text: string, length: number) => {
    const value = String(text ?? '');
    if (value.length >= length) return value.slice(0, length);
    return ' '.repeat(length - value.length) + value;
  };

  const row4Col = (
    c1: string,
    c2: string,
    c3: string,
    c4: string,
    widths = [14, 5, 6, 7],
  ) => {
    return (
      padRight(c1, widths[0]) +
      padLeft(c2, widths[1]) +
      padLeft(c3, widths[2]) +
      padLeft(c4, widths[3])
    );
  };

  const twoCol = (left: string, right: string, width = 32) => {
    const rightText = String(right ?? '');
    const leftWidth = Math.max(0, width - rightText.length);
    return `${padRight(left, leftWidth)}${rightText}`;
  };

  const line = '-'.repeat(32);

  const buildReceiptText = () => {
    let text = '';

    text += '[C]<b>MOJOE STORE</b>\n';
    text += '[C]--------------------------------\n';
    text += twoCol(`Invoice: #${data?.invoice_no ?? '-'}`, formatDate(data?.created_at)) + '\n';
    text += twoCol('Payment: ' + (data?.payment_type ?? '-'), formatTime(data?.created_at)) + '\n';
    text += twoCol('Account Name: ', (userInfo as any)?.name)  + '\n';
    text += `${line}\n`;
    text += row4Col('Item', 'qty', 'price', 'amount') + '\n';
    text += `${line}\n`;

    items.forEach((item: any) => {
      const productName = item?.product?.name ?? '-';
      const qty = String(item?.qty ?? 0);
      const price = formatMoney(item?.product?.selling_price ?? 0);
      const total = formatMoney(item?.total_price ?? 0);

      text += `${productName}\n`;
      text += row4Col('', qty, price, total) + '\n';

      if (
        item?.discount_type !== null &&
        item?.discount_type !== undefined &&
        Number(item?.discount_amount ?? 0) > 0
      ) {
        text += `-${formatMoney(item?.discount_amount ?? 0)} ${
          item?.discount_type == 0 ? 'Ks' : '%'
        } discount\n`;
      }

      text += '\n';
    });

    text += `${line}\n`;
    text += twoCol('Subtotal', `${formatMoney(subtotalAmount())} Ks`) + '\n';
    text += twoCol(
      'Discount',
      Number(data?.discount_amount ?? 0) > 0 ? `-${getDiscountText()}` : '-',
    ) + '\n';
    text += '[C]================================\n';
    text += twoCol('TOTAL', `${formatMoney(data?.total_price ?? 0)} Ks`) + '\n';
    text += '[C]================================\n';
    text += twoCol('Payment Type', `${data?.payment_type ?? '-'}`) + '\n';
    text += twoCol('Paid Amount: ', paidAmount ) + '\n';
    text += twoCol('Change Amount: ', changeAmount ) + '\n';
    text += `${line}\n`;
    text += '[C]Thank you\n';
    text += '\n\n\n';

    return text;
  };

  const requestBluetoothPermissions = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      if (Platform.Version >= 31) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

        return (
          result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      }

      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN,
      ]);

      return (
        result[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result[PermissionsAndroid.PERMISSIONS.BLUETOOTH] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (error) {
      console.log('Bluetooth permission error =>', error);
      return false;
    }
  };

  const handleBluetoothPrint = async () => {
    try {
      if (!data) {
        Alert.alert('Error', 'Receipt data not found.');
        return;
      }

      const granted = await requestBluetoothPermissions();

      if (!granted) {
        Alert.alert('Permission Required', 'Bluetooth permission is required.');
        return;
      }

      await BLEPrinter.init();

      const printers = await BLEPrinter.getDeviceList();
      console.log('Printers => ', printers);

      if (!printers || printers.length === 0) {
        Alert.alert('Printer Not Found', 'No Bluetooth devices found.');
        return;
      }

      const printer = printers.find((item: any) => {
        const name = (item?.device_name || '').toLowerCase();
        return (
          name.includes('printer') ||
          name.includes('pos') ||
          name.includes('xp-') ||
          name.includes('58') ||
          name.includes('80') ||
          name.includes('rpp') ||
          name.includes('mtp')
        );
      });

      if (!printer) {
        Alert.alert(
          'Printer Not Found',
          'Bluetooth printer not found. Current found devices are not printers.',
        );
        return;
      }

      const macAddress =
        printer?.inner_mac_address;

      if (!macAddress) {
        Alert.alert('Printer Error', 'Printer address not found.');
        return;
      }

      await BLEPrinter.connectPrinter(macAddress);
      await BLEPrinter.printBill(buildReceiptText());

      Alert.alert('Success', 'Receipt printed successfully.');
    } catch (error: any) {
      console.log('Bluetooth print error => ', error);

      let message = 'Unable to print receipt.';
      if (typeof error === 'string') {
        message = error;
      } else if (error?.message) {
        message = error.message;
      } else {
        try {
          message = JSON.stringify(error);
        } catch {}
      }

      Alert.alert('Print Error', message);
    }
  };

  const handlePrint = async () => {
    await handleBluetoothPrint();
  };

  return (
    <BaseView>
      <StandardPadding>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.card}>
                {/* <View style={styles.logoWrap}>
                  <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View> */}

                <Text style={styles.storeTitle}>MOJOE STORE</Text>

                <View style={styles.divider} />

                <Stack justify="space-between">
                  <Text style={styles.metaText}>
                    Invoice: #{data?.invoice_no ?? '-'}
                  </Text>
                  <Text style={styles.metaText}>
                    {formatDate(data?.created_at)}
                  </Text>
                </Stack>

                <Stack justify="space-between" style={{marginTop: 6}}>
                  <Text style={styles.metaText}>
                    Payment: {data?.payment_type ?? '-'}
                  </Text>
                  <Text style={styles.metaText}>
                    {formatTime(data?.created_at)}
                  </Text>
                </Stack>

                <Stack justify="space-between" style={{marginTop: 6}}>
                  <Text style={styles.metaText}>
                    Account Name: 
                  </Text>
                  <Text style={styles.metaText}>
                    {(userInfo as any)?.name}
                  </Text>
                </Stack>

                

                <View style={[styles.dashedDivider, {marginTop: 12}]} />

                <View style={styles.tableHeader}>
                  <Text style={[styles.headCell, {flex: 2.2}]}>Item</Text>
                  <Text style={[styles.headCell, {flex: 0.8, textAlign: 'center'}]}>
                    qty
                  </Text>
                  <Text style={[styles.headCell, {flex: 1, textAlign: 'right'}]}>
                    price
                  </Text>
                  <Text style={[styles.headCell, {flex: 1.2, textAlign: 'right'}]}>
                    amount
                  </Text>
                </View>

                <View style={styles.dashedDivider} />

                <View style={{gap: 10}}>
                  {items.map((item: any, index: number) => (
                    <View key={index} style={styles.itemRow}>
                      <View style={{flex: 2.2}}>
                        <Text style={styles.itemName}>
                          {item?.product?.name ?? '-'}
                        </Text>
                        {item?.discount_type !== null &&
                          item?.discount_type !== undefined &&
                          Number(item?.discount_amount ?? 0) > 0 && (
                            <Text style={styles.discountText}>
                              -{formatMoney(item?.discount_amount ?? 0)}{' '}
                              {item?.discount_type == 0 ? 'Ks' : '%'} discount
                            </Text>
                          )}
                      </View>

                      <Text style={[styles.itemValue, {flex: 0.8, textAlign: 'center'}]}>
                        {item?.qty ?? 0}
                      </Text>

                      <Text style={[styles.itemValue, {flex: 1, textAlign: 'right'}]}>
                        {formatMoney(item?.product?.selling_price ?? 0)}
                      </Text>

                      <Text style={[styles.itemValue, {flex: 1.2, textAlign: 'right'}]}>
                        {formatMoney(item?.total_price ?? 0)}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={[styles.dashedDivider, {marginTop: 14}]} />

                <Stack justify="space-between" style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>
                    {formatMoney(subtotalAmount())} Ks
                  </Text>
                </Stack>

                <Stack justify="space-between" style={styles.summaryRow}>
  <Text style={styles.summaryLabel}>Discount</Text>
  <Text style={[styles.summaryValue, {color: '#d57a1f'}]}>
    {totalDiscountAmount() > 0 ? `-${getDiscountText()}` : '-'}
  </Text>
</Stack>
                <View style={styles.boldDivider} />

                <Stack justify="space-between" style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>
                    {formatMoney(data?.total_price ?? 0)} Ks
                  </Text>
                </Stack>

                <View style={styles.boldDivider} />

                <Stack justify="space-between" style={{marginTop: 12}}>
                  <Text style={styles.summaryLabel}>Payment Type</Text>
                  <Text style={styles.summaryValue}>
                    {data?.payment_type ?? '-'}
                  </Text>
                </Stack>
                <Stack justify="space-between" style={{marginTop: 6}}>
                  <Text style={styles.metaText}>
                    Paid Amount: 
                  </Text>
                  <Text style={styles.metaText}>
                    {paidAmount}
                  </Text>
                </Stack>


                <Stack justify="space-between" style={{marginTop: 6}}>
                  <Text style={styles.metaText}>
                    Change Amount: 
                  </Text>
                  <Text style={styles.metaText}>
                    {changeAmount}
                  </Text>
                </Stack>


                <View style={[styles.dashedDivider, {marginTop: 14}]} />

                <Text style={styles.footerText}>ကျေးဇူးတင်ပါတယ် 🙏</Text>
                
              </View>
            </ScrollView>

            <View style={styles.buttonWrap}>
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
                  title={t('print')}
                  //onPress={handlePrint}
                />
              )}
            </View>
          </>
        )}
      </StandardPadding>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    marginBottom: 20,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 6,
  },
  logo: {
    width: 100,
    height: 59,
  },
  storeTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#222',
    marginBottom: 12,
  },
  dashedDivider: {
    borderTopWidth: 1,
    borderTopColor: '#999',
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  boldDivider: {
    borderTopWidth: 1.5,
    borderTopColor: '#222',
    marginVertical: 10,
  },
  metaText: {
    fontSize: 13,
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headCell: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
  },
  discountText: {
    marginTop: 4,
    fontSize: 12,
    color: '#d57a1f',
  },
  itemValue: {
    fontSize: 14,
    color: '#222',
  },
  summaryRow: {
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#333',
  },
  summaryValue: {
    fontSize: 14,
    color: '#222',
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
    color: '#222',
  },
  footerSubText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    columnGap: 10,
  },
});