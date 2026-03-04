import {MYANMAR_LANGUAGE} from 'src/assets/constants';
import {useColors, useFonts} from '@hooks';
import {getLanguage} from '@utils';
import React, {useMemo} from 'react';
import {
  ColorValue,
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';
import {FontPalettes} from 'src/common/fonts';

export interface TextProps extends RNTextProps {
  fontStyle?: keyof FontPalettes | string;
  textColor?: string | ColorValue;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text: React.FC<TextProps> = ({
  fontStyle = 'FW400_14',
  textColor,
  textAlign,
  style,
  children,
  ...rest
}) => {
  const {en, mm} = useFonts();
  const styleProps = StyleSheet.flatten(style);
  const currentLanguage = getLanguage();
  const colors = useColors();

  const getFontStyle = useMemo(() => {
    const langFont: any = currentLanguage === MYANMAR_LANGUAGE ? mm : en;
    return langFont[fontStyle] || langFont['FW400_14'];
  }, [fontStyle, currentLanguage]);

  const styleView = useMemo(() => {
    return [
      styleProps,
      {
        ...getFontStyle,
        color: textColor || colors.color212325,
        textAlign: textAlign || styleProps?.textAlign,
      },
    ];
  }, [getFontStyle, styleProps, textColor, textAlign]);

  return (
    <RNText style={styleView} {...rest}>
      {children}
    </RNText>
  );
};
