import {LANGUAGES_ARRAY, LANGUAGES_OBJECT, SPACING} from '@constants';
import {Text} from 'react-native';
import {AppSelectField} from '../form';
import {changeLanguage, defaultValueByIndex, getLanguage} from '@utils';
import {useForm} from 'react-hook-form';
import {useColors, useFonts} from '@hooks';
import {FontPalettes} from 'src/common/fonts';

export const LanguageSwitcher = (props: {
  noBorder?: boolean;
  fontStyle?: keyof FontPalettes;
}) => {
  const currentLanguage = getLanguage();

  const fonts = useFonts();
  const colors = useColors();
  const {control} = useForm();
  const {noBorder, fontStyle} = props;
  const langFontStyle = fontStyle
    ? {...fonts.en[fontStyle]}
    : {...fonts.en.FW400_14};

  console.log('currentLanguage', currentLanguage);

  return (
    <AppSelectField
      name="language"
      defaultValue={currentLanguage}
      data={LANGUAGES_ARRAY}
      control={control}
      noBorder={noBorder}
      onSelectedCallback={item => changeLanguage(item.value)}
      customButtonTextRender={(selectedItem, index) => (
        <Text style={{...langFontStyle, color: colors.black}}>
          {selectedItem?.name}
        </Text>
      )}
    />
  );
};
