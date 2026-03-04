import {Stack} from '@components';
import {SPACING} from '@constants';
import {useColors, useFonts} from '@hooks';
import {StyleSheet, Text, View} from 'react-native';

export const NotificationItem = ({data}: {data: any}) => {
  const colors = useColors();
  const fonts = useFonts();

  return (
    <View style={[styles.item, {backgroundColor: colors.colorF6F6F6}]}>
      <Stack
        items="center"
        justify="space-between"
        style={{marginBottom: SPACING['SMALL']}}>
        <Text
          style={{
            ...fonts.en.FW600_14,
            color: String(colors.error),
          }}>
          {data.data?.name}
        </Text>
        {/* <TouchableOpacity
          style={{
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="close" color={colors.black} size={15} />
        </TouchableOpacity> */}
      </Stack>
      <Text style={{...fonts.en.FW400_12, color: colors.black}}>
        Item {data.data?.availabe_qty}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 7,
    padding: 23,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: SPACING['SMALL'],
  },
});
