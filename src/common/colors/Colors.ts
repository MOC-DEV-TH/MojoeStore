import {ColorValue} from 'react-native';

export interface ColorType {
  primary: ColorValue;
  primaryGradient: [ColorValue, ColorValue];
  blue: ColorValue;
  deepBlue: ColorValue;
  green: ColorValue;
  orange: ColorValue;
  grey: ColorValue;
  error: ColorValue;
  black: ColorValue;
  white: ColorValue;
  muted: ColorValue;
  disable: ColorValue;
  borderColor: ColorValue;
  colorD9D9D9: ColorValue;
  colorF1F1F1: ColorValue;
  colorA7A7A7: ColorValue;
  colorD6D6D6: ColorValue;
  colorBCB8B8: ColorValue;
  color717171: ColorValue;
  color212325: ColorValue;
  colorF6F6F6: ColorValue;
  colorF2F2F2: ColorValue;
  colorA3A3A3: ColorValue;
  color8C8C8C: ColorValue;
}

type ColorPalettes = {
  light: ColorType;
};

const Colors: ColorPalettes = {
  light: {
    primary: '#FF0800',
    primaryGradient: ['#FF0800', '#9C0638'],
    blue: '#0E82ED',
    deepBlue: '#0C099A',
    green: '#44BC49',
    orange: '#FA6D1D',
    grey: '#8A90A4',
    error: '#f44336',
    black: '#000000',
    white: '#ffffff',
    muted: '#858585',
    disable: '#dfe1e2',
    borderColor: '#BCB8B8',
    colorD9D9D9: '#D9D9D9',
    colorF1F1F1: '#F1F1F1',
    colorA7A7A7: '#A7A7A7',
    colorD6D6D6: '#D6D6D6',
    colorBCB8B8: '#BCB8B8',
    color717171: '#717171',
    color212325: '#212325',
    colorF6F6F6: '#F6F6F6',
    colorF2F2F2: '#F2F2F2',
    colorA3A3A3: '#A3A3A3',
    color8C8C8C: '#8C8C8C',
  },
};

export {Colors};
