import {FontVariant} from 'react-native';

export const STANDARD_FONT_SIZE = 16;

export type FontsType = {
  fontFamily: string;
  fontSize?: number;
};

export interface FontPalettes {
  FW800_20: FontsType;
  FW700_18: FontsType;
  FW700_16: FontsType;
  FW700_12: FontsType;
  FW600_32: FontsType;
  FW600_20: FontsType;
  FW600_16: FontsType;
  FW600_14: FontsType;
  FW600_12: FontsType;
  FW400_16: FontsType;
  FW400_24: FontsType;
  FW400_14: FontsType;
  FW400_12: FontsType;
  FW400_10: FontsType;
  FW400_8: FontsType;
}

interface FontsProps {
  en: FontPalettes;
  mm: FontPalettes;
}

const ENFonts: FontPalettes = {
  FW800_20: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 20,
  },
  FW700_18: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
  },
  FW700_16: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  FW700_12: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
  FW600_32: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 32,
  },
  FW600_20: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
  },
  FW600_14: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  FW600_16: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  FW600_12: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
  FW400_24: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 24,
  },
  FW400_16: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
  },
  FW400_14: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
  },
  FW400_12: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
  FW400_10: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
  },
  FW400_8: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 8,
  },
};

export const MMFonts: FontPalettes = {
  FW800_20: {
    fontFamily: 'Pyidaungsu-Bold',
    fontSize: 20,
  },
  FW700_18: {
    fontFamily: 'Pyidaungsu-Bold',
    fontSize: 18,
  },
  FW700_16: {
    fontFamily: 'Pyidaungsu-Bold',
    fontSize: 16,
  },
  FW700_12: {
    fontFamily: 'Pyidaungsu-Bold',
    fontSize: 12,
  },
  FW600_32: {
    fontFamily: 'Pyidaungsu-Bold',
    fontSize: 32,
  },
  FW600_20: {
    fontFamily: 'Pyidaungsu-Bold',
    fontSize: 20,
  },
  FW600_14: {
    fontFamily: 'Pyidaungsu-Bold',
    fontSize: 14,
  },
  FW600_16: {
    fontFamily: 'Pyidaungsu-Bold',
    fontSize: 16,
  },
  FW600_12: {
    fontFamily: 'Pyidaungsu-Bold',
    fontSize: 12,
  },
  FW400_24: {
    fontFamily: 'Pyidaungsu-Regular',
    fontSize: 24,
  },
  FW400_16: {
    fontFamily: 'Pyidaungsu-Regular',
    fontSize: 16,
  },
  FW400_14: {
    fontFamily: 'Pyidaungsu-Regular',
    fontSize: 14,
  },
  FW400_12: {
    fontFamily: 'Pyidaungsu-Regular',
    fontSize: 12,
  },
  FW400_10: {
    fontFamily: 'Pyidaungsu-Regular',
    fontSize: 10,
  },
  FW400_8: {
    fontFamily: 'Pyidaungsu-Regular',
    fontSize: 8,
  },
};

export const Fonts: FontsProps = {en: {...ENFonts}, mm: {...MMFonts}};
