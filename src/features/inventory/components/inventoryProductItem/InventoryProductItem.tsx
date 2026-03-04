import {Stack, Text} from '@components';
import {useColors, useFonts} from '@hooks';
import {IconSvg} from '@svgs';
import {isOwner} from '@utils';
import {TouchableOpacity, View, Text as RNText} from 'react-native';
import {SvgXml} from 'react-native-svg';

export const InventoryProductItem = ({data, onEdit}: any) => {
  const colors = useColors();
  const fonts = useFonts();
  const isQtyLessThanLimit = data?.qty < data?.minimum_qty;
  const isActive = data?.is_active;
  const isOwnerRole = isOwner();

  return (
    <Stack justify="space-between" items="center">
      <View>
        <Text style={{paddingBottom: 10}}>{data?.name}</Text>
        <Text
          fontStyle="FW400_10"
          textColor={colors.muted}
          style={{marginBottom: 4}}>
          {data?.qty} {data?.unit}
        </Text>
        <Text fontStyle="FW400_10" textColor={colors.muted}>
          {data?.selling_price} {data?.curiency} / {data?.unit}
        </Text>
      </View>
      <Stack items="center" columnSpace={20}>
        {isQtyLessThanLimit && <SvgXml xml={IconSvg.alert} />}
        <TouchableOpacity
          style={{
            backgroundColor: isActive ? '#19875440' : '#dc354540',
            paddingVertical: 3,
            paddingHorizontal: 10,
            borderRadius: 6,
          }}>
          <RNText
            style={{
              color: isActive ? '#198754' : '#dc3545',
              ...fonts.en.FW400_12,
            }}>
            {isActive ? 'Active' : 'Inactive'}
          </RNText>
        </TouchableOpacity>
        {isOwnerRole && (
          <TouchableOpacity onPress={onEdit}>
            <SvgXml xml={IconSvg.edit} width={15} height={15} />
          </TouchableOpacity>
        )}
      </Stack>
    </Stack>
  );
};
