import {BaseView} from '@components';
import {useColors, useFonts} from '@hooks';
import {IconSvg} from '@svgs';
import {Text} from 'react-native';
import {SvgXml} from 'react-native-svg';

export const ComingSoonScreen = () => {
  const fonts = useFonts();
  const colors = useColors();
  return (
    <BaseView alignItems="center" justifyContent="center">
      <SvgXml
        xml={IconSvg.comingSoon(String(colors.grey))}
        width={100}
        height={100}
      />
    </BaseView>
  );
};
