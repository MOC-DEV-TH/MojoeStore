import {SPACING} from '@constants';
import {useMemo} from 'react';
import {Controller} from 'react-hook-form';
import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import {Text} from '@components';
import {useColors} from '@hooks';

type AppTextFiledProps = {
  name: string;
  control: any;
  placeholder?: string;
  label?: string;
  error?: any;
  type?: string;
  customRules?: any;
  require?: boolean;
  requireMessage?: string;
  inputHeight?: number;
  rightIcon?: any;
  isDisabled?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<any>;
};

export const AppTextFiled = (props: AppTextFiledProps) => {
  const colors = useColors();
  const {
    name,
    type,
    control,
    placeholder,
    label,
    error,
    customRules = {},
    require = false,
    requireMessage,
    inputHeight,
    rightIcon,
    isDisabled = false,
    inputContainerStyle,
    inputStyle,
  } = props;

  const validateAppTextRules = useMemo(() => {
    const requireRule = (message?: string) => {
      return {
        required: {
          value: require,
          message: message || 'Field is require',
        },
      };
    };

    const emailRule = {
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Email is not invaid format',
      },
      ...requireRule(requireMessage || 'Please enter your email'),
    };

    // const numberRule = {
    //   pattern: {
    //     value: /^(0|[1-9][0-9]*)$ /,
    //     message: 'Must be number',
    //   },
    //   ...requireRule(requireMessage),
    // };

    switch (type) {
      case 'email':
        return {...emailRule};
      default:
        if (require) {
          return {...requireRule(requireMessage), ...customRules};
        } else {
          return {...customRules};
        }
    }
  }, [require, type, requireMessage, customRules]);

  return (
    <>
      {label && <Text>{label}</Text>}
      <Controller
        control={control}
        name={name}
        rules={validateAppTextRules}
        render={({field: {onChange, value, ...field}}) => {
          return (
            <View
              style={[
                inputContainerStyle,
                {
                  borderWidth: 1,
                  borderColor: error ? colors.error : colors.colorBCB8B8,
                  borderRadius: 9,
                  overflow: 'hidden',
                },
              ]}>
              <TextInput
                editable={!isDisabled}
                keyboardType={type === 'number' ? 'number-pad' : 'default'}
                style={[
                  inputStyle,
                  {
                    height: inputHeight || 40,
                    paddingLeft: SPACING['STANDARD'],
                    paddingRight: rightIcon
                      ? SPACING['STANDARD'] + 30
                      : SPACING['STANDARD'],
                  },
                ]}
                secureTextEntry={type === 'password'}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder={placeholder}
                {...field}
              />
              {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </View>
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

const styles = StyleSheet.create({
  rightIcon: {
    position: 'absolute',
    right: SPACING['STANDARD'],
    top: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
  },
});
