import {IconSvg} from '@svgs';
import {SvgXml} from 'react-native-svg';
import {AppSelectField, Button, CustomModal, Stack, Text} from '@components';
import {SPACING} from '@constants';
import {useColors, useFonts} from '@hooks';
import {TouchableOpacity, View, Text as RNText} from 'react-native';
import {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';

export const FilterBar = ({onFilter, date}: any) => {
  const fonts = useFonts();
  const colors = useColors();
  const {t} = useTranslation();
  const modalRef: any = useRef(null);

  const today = new Date();
  const currentYear = today.getFullYear();
  const startYear = 2020;

  const days = Array.from({length: 31}, (_, index) => index + 1);
  const months = Array.from({length: 12}, (_, index) => index + 1);
  const years = Array.from(
    {length: currentYear - startYear + 1},
    (_, index) => startYear + index,
  );

  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
    },
  });

  const onSubmit = ({day, month, year}: any) => {
    let params;
    if (day === 'Day' && month === 'Month' && year === 'Year') {
      params = {};
    } else {
      params = {
        day: day == 'Day' ? today.getDay() : day,
        month: month == 'Month' ? today.getMonth() + 1 : month,
        year: year === 'Year' ? currentYear : year,
      };
    }
    onFilter(params, true);
    modalRef?.current?.close();
  };

  return (
    <>
      <View style={{padding: SPACING['STANDARD']}}>
        <Stack justify="space-between">
          <RNText style={{...fonts.en.FW400_16, color: colors.blue}}>
            {date}
          </RNText>
          <TouchableOpacity onPress={() => modalRef?.current?.open()}>
            <SvgXml xml={IconSvg.filter} />
          </TouchableOpacity>
        </Stack>
      </View>
      <CustomModal ref={modalRef} onClose={reset}>
        <View style={{paddingVertical: SPACING['LARGE']}}>
          <Text
            fontStyle="FW600_16"
            textAlign="center"
            style={{marginBottom: 30}}>
            {t('filter_by')}
          </Text>
          {/* Form */}
          <Stack justify="space-between">
            <View style={{width: '32%'}}>
              <AppSelectField
                name="day"
                data={['Day', ...days].map(value => ({name: value, value}))}
                control={control}
              />
            </View>
            <View style={{width: '32%'}}>
              <AppSelectField
                name="month"
                data={['Month', ...months].map(value => ({name: value, value}))}
                control={control}
              />
            </View>
            <View style={{width: '32%'}}>
              <AppSelectField
                name="year"
                data={['Year', ...years].map(value => ({name: value, value}))}
                control={control}
              />
            </View>
          </Stack>
          <Stack justify="center" style={{marginTop: 30}}>
            <Button
              title={t('filter')}
              style={{minWidth: 150}}
              colorScheme="green"
              onPress={handleSubmit(onSubmit)}
            />
          </Stack>
          {/* Form */}
        </View>
      </CustomModal>
    </>
  );
};
