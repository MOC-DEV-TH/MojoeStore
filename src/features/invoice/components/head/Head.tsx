import {Stack} from '@components';
import {SPACING} from '@constants';
import {useColors, useFonts} from '@hooks';
import {Text, TouchableOpacity, View} from 'react-native';
import {FilterBar} from '../filterbar';

export const Head = ({onFilter, date}: any) => {
  const fonts = useFonts();
  const colors = useColors();

  return (
    <>
      <FilterBar date={date} onFilter={onFilter} />
      <View
        style={{
          paddingVertical: SPACING['STANDARD'],
          backgroundColor: colors.orange,
          marginBottom: 20,
        }}>
        <Stack>
          <View style={{width: '33%'}}>
            <Text
              style={{
                ...fonts.en.FW400_12,
                color: colors.white,
                textAlign: 'center',
                paddingHorizontal: '5%',
              }}>
              Invoice No.
            </Text>
          </View>
          <View style={{width: '33%'}}>
            <Text
              style={{
                ...fonts.en.FW400_12,
                color: colors.white,
                textAlign: 'center',
                paddingHorizontal: '5%',
              }}>
              Date
            </Text>
          </View>
          <View style={{width: '33%'}}>
            <Text
              style={{
                ...fonts.en.FW400_12,
                color: colors.white,
                textAlign: 'center',
                paddingHorizontal: '5%',
              }}>
              Total (Ks)
            </Text>
          </View>
        </Stack>
      </View>
    </>
  );
};
