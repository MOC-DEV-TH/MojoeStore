import {Stack} from '@components';
import {SPACING} from '@constants';
import {useColors, useFonts} from '@hooks';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const ReportItem = ({data}: {data: any}) => {
  const colors = useColors();
  const fonts = useFonts();
  return (
    <View style={[styles.item, {backgroundColor: colors.colorF2F2F2}]}>
      <Stack justify="space-between">
        <View style={{flex: 1}}>
          <Text
            style={{
              textAlign: 'left',
              ...fonts.en.FW400_12,
            }}>
            {data?.total_price}
          </Text>
        </View>
        <View style={{minWidth: 80}}>
          <Text
            style={{
              ...fonts.en.FW400_12,
              color: colors.black,
            }}>
            {data?.payment_type}
          </Text>
        </View>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 7,
    padding: 20,
    paddingHorizontal: SPACING['STANDARD'],
    marginBottom: SPACING['SMALL'],
  },
});
