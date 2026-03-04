import {isUndefined} from '@utils';
import {Controller} from 'react-hook-form';
import {View, Text as RNText} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Text} from '@components';
import {SPACING} from '@constants';
import {useColors, useFonts} from '@hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SelectOption {
  name: string;
  value: string;
}

interface AppSelectFieldProps {
  name: string;
  control: any;
  data: SelectOption[] | any;
  defaultValue?: number | string;
  defaultText?: string;
  noBorder?: boolean;
  require?: boolean;
  requireMessage?: string;
  error?: any;
  onSelectedCallback?: (item: any) => void;
  customButtonTextRender?: (selectedItem: any, index: any) => any;
}

export const AppSelectField = (props: AppSelectFieldProps) => {
  const {
    name,
    data,
    control,
    defaultValue,
    defaultText,
    noBorder,
    require,
    requireMessage,
    onSelectedCallback,
    customButtonTextRender,
    error,
  } = props;
  const colors = useColors();
  const fonts = useFonts();

  if (isUndefined(data?.[0]?.name) && isUndefined(data?.[0]?.value)) {
    return (
      <View>
        <Text>Select box can't show due to "invalid data type"</Text>
      </View>
    );
  }

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: require ? requireMessage || 'Field is required' : false,
        }}
        render={({field: {onChange, value, ...field}}) => {
          const selectedValueIndex = data.findIndex(
            (item: any) => String(item.value) == String(value),
          );

          const selectedDefaultValueIndex = data.findIndex(
            (item: any) => String(item.value) == String(defaultValue),
          );

          return (
            <SelectDropdown
              data={data}
              onSelect={(selectedItem, index) => {
                onSelectedCallback && onSelectedCallback(selectedItem);
                onChange(selectedItem.value);
              }}
              defaultValueByIndex={
                selectedValueIndex !== -1
                  ? selectedValueIndex
                  : selectedDefaultValueIndex
              }
              buttonStyle={{
                borderRadius: 9,
                paddingHorizontal: noBorder ? 0 : SPACING['STANDARD'],
                height: 40,
                backgroundColor: 'transparent',
                borderWidth: noBorder ? 0 : 1,
                borderColor: error ? colors.error : colors.colorBCB8B8,
                width: '100%',
              }}
              dropdownStyle={{
                minWidth: 100,
                borderRadius: 9,
              }}
              rowStyle={{
                paddingHorizontal: SPACING['STANDARD'],
                borderBottomWidth: 0,
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem?.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return customButtonTextRender ? (
                  customButtonTextRender(selectedItem, index)
                ) : (
                  <RNText style={{...fonts.en.FW400_14, color: colors.black}}>
                    {selectedItem?.name || defaultText || 'Select'}
                  </RNText>
                );
              }}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <RNText style={{...fonts.en.FW400_14, color: colors.black}}>
                    {item.name}
                  </RNText>
                );
              }}
              renderDropdownIcon={() => {
                return <Ionicons name="chevron-down" />;
              }}
            />
          );
        }}
      />
      {error && (
        <View style={{marginTop: 5}}>
          <Text fontStyle="FW700_12" textColor={String(colors.error)}>
            {error}
          </Text>
        </View>
      )}
    </>
  );
};
