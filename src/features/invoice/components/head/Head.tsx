import {Stack} from '@components';
import {SPACING} from '@constants';
import {useColors, useFonts} from '@hooks';
import {Text, TouchableOpacity, View} from 'react-native';
import {FilterBar} from '../filterbar';
import {useTranslation} from 'react-i18next';


export const Head = ({onFilter, date}: any) => {
  const fonts = useFonts();
  const colors = useColors();
  const {t} = useTranslation();

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
              {t('invoice_no')}
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
              {t('date')}
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
              {t('total_ks')}
            </Text>
          </View>
        </Stack>
      </View>
    </>
  );
};
