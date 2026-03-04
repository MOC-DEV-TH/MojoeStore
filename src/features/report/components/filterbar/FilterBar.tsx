import {IconSvg} from '@svgs';
import {SvgXml} from 'react-native-svg';
import {
  AppSelectField,
  AppTextFiled,
  Button,
  CustomModal,
  Stack,
  Text,
} from '@components';
import {PAYMENT_SELECT, SPACING} from '@constants';
import {useColors, useFonts} from '@hooks';
import {
  TouchableOpacity,
  View,
  Text as RNText,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const FilterBar = ({onFilter}: any) => {
  const days =
    Array.from({length: 31}, (_, index) => ({
      name: index + 1,
      value: index + 1,
    })) ?? [];

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const fonts = useFonts();
  const colors = useColors();
  const modalRef: any = useRef(null);
  const {t} = useTranslation();
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm();

  const activeDatePickerType = useRef('');

  const showDatePicker = (type: string) => {
    console.log('showDatePicker', type);
    activeDatePickerType.current = type;
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    console.log('hide');
    setDatePickerVisibility(false);
  };

  const onConfirm = (dateString: any) => {
    const date = new Date(dateString);
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date
      .getFullYear()
      .toString()}`;

    if (activeDatePickerType.current === 'start' && date) {
      setValue('start', formattedDate);
    }

    if (activeDatePickerType.current === 'end' && date) {
      setValue('end', formattedDate);
    }

    hideDatePicker();
  };

  const changeDateFormat = (date: any) => {
    var parts = date.split('/');
    var year = parts[2];
    var month = ('0' + parts[0]).slice(-2);
    var day = ('0' + parts[1]).slice(-2);
    return year + '-' + month + '-' + day;
  };

  const onPressFilter = ({payment, start, end}: any) => {
    const paymentMethod = payment || null;
    const startDate = changeDateFormat(start) || null;
    const endDate = changeDateFormat(end) || null;
    onFilter({paymentMethod, startDate, endDate}, true);
    modalRef?.current?.close();
  };

  return (
    <>
      <View style={{padding: SPACING['STANDARD']}}>
        <Stack justify="space-between">
          <RNText style={{...fonts.en.FW400_16, color: colors.blue}}>
            All
          </RNText>
          <TouchableOpacity onPress={() => modalRef?.current?.open()}>
            <SvgXml xml={IconSvg.filter} />
          </TouchableOpacity>
        </Stack>
      </View>
      <CustomModal ref={modalRef}>
        <View style={{paddingVertical: SPACING['LARGE']}}>
          <Text
            fontStyle="FW600_16"
            textAlign="center"
            style={{marginBottom: 30}}>
            {t('filter_by')}
          </Text>
          {/* Form */}
          <Stack justify="space-between" wrap>
            <View style={{width: '100%', marginBottom: 20}}>
              <AppSelectField
                name="payment"
                defaultValue={0}
                data={PAYMENT_SELECT}
                control={control}
              />
            </View>
            <View style={{width: '48%'}}>
              <View style={{marginBottom: 10}}>
                <Text>Start Date</Text>
              </View>
              <View style={{position: 'relative'}}>
                <Pressable
                  onPress={() => showDatePicker('start')}
                  style={[StyleSheet.absoluteFill, {zIndex: 1}]}
                />
                <AppTextFiled
                  name="start"
                  control={control}
                  placeholder="mm/dd/yy"
                />
              </View>
            </View>
            <View style={{width: '48%'}}>
              <View style={{marginBottom: 10}}>
                <Text>End Date</Text>
              </View>
              <View style={{position: 'relative'}}>
                <Pressable
                  onPress={() => showDatePicker('end')}
                  style={[StyleSheet.absoluteFill, {zIndex: 1}]}
                />
                <AppTextFiled
                  name="end"
                  control={control}
                  placeholder="mm/dd/yy"
                />
              </View>
            </View>
          </Stack>
          <Stack justify="center" style={{marginTop: 30}}>
            <Button
              title={t('filter')}
              style={{minWidth: 150}}
              colorScheme="green"
              onPress={handleSubmit(onPressFilter)}
            />
          </Stack>
          {/* Form */}
        </View>
      </CustomModal>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={onConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};
