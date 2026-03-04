import {Stack} from '@components';
import {SPACING} from '@constants';
import {useColors, useFonts} from '@hooks';
import {SCREENS, navigate} from '@navigations';
import {formatDate} from '@utils';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const InvoiceItem = ({data}: {data: any}) => {
  const colors = useColors();
  const fonts = useFonts();
  return (
    <View style={[styles.item, {backgroundColor: colors.colorF2F2F2}]}>
      <Stack>
        <View style={{width: '33%'}}>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.INVOICE_DETAIL.name, {invoiceId: data?.id})}>
            <Text
              style={{
                ...fonts.en.FW400_12,
                textAlign: 'center',
                paddingHorizontal: '5%',
                textDecorationLine: 'underline',
                color: colors.blue,
              }}>
              {data?.invoice_no}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '33%'}}>
          <Text
            style={{
              ...fonts.en.FW400_12,
              textAlign: 'center',
              paddingHorizontal: '5%',
              color: colors.black,
            }}>
            {data?.created_at && formatDate(new Date(data.created_at))}
          </Text>
        </View>
        <View style={{width: '33%'}}>
          <Text
            style={{
              ...fonts.en.FW400_12,
              textAlign: 'center',
              paddingHorizontal: '5%',
              color: colors.black,
            }}>
            {data?.total_price}
          </Text>
        </View>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 7,
    paddingVertical: SPACING['STANDARD'],
    marginBottom: SPACING['SMALL'],
  },
});
