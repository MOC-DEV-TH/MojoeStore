import {useTheme} from '@providers';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {ColorType} from 'src/common/colors';
import {Text} from '@components';
import {SPACING} from '@constants';
import LinearGradient from 'react-native-linear-gradient';

export interface ButtonProps {
  title: string;
  leftIcon?: any;
  colorScheme?: keyof ColorType;
  textColor?: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  fullwidth?: boolean;
  onPress?: any;
  style?: StyleProp<ViewStyle>;
  gap?: number;
  borderRadius?: number;
  paddingHorizontal?: number;
  disabled?: boolean;
}

export interface sizeVariantMapProps {
  sm: {
    font: 'FW400_12';
    height: number;
  };
  md: {
    font: 'FW400_14';
    height: number;
  };
  lg: {
    font: 'FW600_20';
    height: number;
  };
  xl: {
    font: 'FW600_20';
    height: number;
  };
}

export const Button = (props: ButtonProps) => {
  const {colors, fonts} = useTheme();
  const {
    title,
    leftIcon,
    colorScheme,
    textColor,
    size,
    fullwidth,
    onPress,
    style,
    gap,
    borderRadius,
    paddingHorizontal,
    disabled = false,
  } = props;
  const colorSchemeVal: any = colorScheme
    ? colors[colorScheme]
    : colors['primary'];

  const sizeVariantMap = {
    sm: {
      font: 'FW400_12',
      px: paddingHorizontal || SPACING['SMALL'],
      height: 30,
    },
    md: {
      font: 'FW400_14',
      px: paddingHorizontal || SPACING['STANDARD'],
      height: 43,
    },
    lg: {
      font: 'FW400_14',
      px: paddingHorizontal || SPACING['LARGE'],
      height: 47,
    },
    xl: {
      font: 'FW400_14',
      px: paddingHorizontal || SPACING['LARGE'],
      height: 60,
    },
  };

  const {height, font, px} = sizeVariantMap[size];

  return colorSchemeVal?.length == 2 ? (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <LinearGradient
        colors={[colorSchemeVal[0], colorSchemeVal[1]]}
        style={[
          style,
          !fullwidth && styles.alignSelf,
          {
            backgroundColor: colorSchemeVal,
            width: fullwidth ? '100%' : 'auto',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: gap,
            borderRadius: borderRadius || 7,
            minHeight: height,
            paddingHorizontal: px,
          },
        ]}>
        {leftIcon}
        <Text textColor={textColor} fontStyle={font}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        style,
        !fullwidth && styles.alignSelf,
        {
          backgroundColor: colorSchemeVal,
          width: fullwidth ? '100%' : 'auto',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: gap,
          borderRadius: borderRadius || 7,
          minHeight: height,
          paddingHorizontal: px,
        },
      ]}>
      {leftIcon}
      <Text textColor={textColor} fontStyle={font}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  mode: 'dark',
  size: 'md',
  variant: 'solid',
  textColor: '#fff',
  gap: 5,
};

const styles = StyleSheet.create({
  alignSelf: {
    alignSelf: 'flex-start',
  },
});
