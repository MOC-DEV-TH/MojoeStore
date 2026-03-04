import {useColors, useFonts} from '@hooks';
import {ColorValue, Text, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {ImageFluid} from 'src/components/ImageFluid';

interface CategoryItemProps {
  bgColor: ColorValue;
  icon?: string;
  title: string;
  style: any;
  goTo?: any;
}

export const CategoryItem = (props: CategoryItemProps) => {
  const {bgColor, icon, title, style, goTo} = props;
  const fonts = useFonts();
  const colors = useColors();

  return (
    <TouchableOpacity
      onPress={goTo}
      style={[
        style,
        {
          backgroundColor: bgColor,
          paddingHorizontal: 10,
          paddingVertical: 20,
          borderRadius: 7,
          flexDirection: 'column',
          gap: 10,
        },
      ]}>
      {icon && (
        <View
          style={{
            alignItems: 'center',
          }}>
          <ImageFluid src={`${Config.DOMAIN}/${icon}`} width={30} />
        </View>
      )}

      <View>
        <Text
          style={{
            ...fonts.en.FW400_10,
            color: colors.color212325,
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

CategoryItem.defaultProps = {
  bgColor: '#d9c8f2',
  title: 'Sample',
};
