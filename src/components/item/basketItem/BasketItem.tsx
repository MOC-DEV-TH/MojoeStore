import {Stack, Text} from '@components';
import {DISCOUNT_TYPE_ARRAY, EMIT_TAGS} from '@constants';
import {useColors} from '@hooks';
import {SCREENS, navigate} from '@navigations';
import {addProducts, deleteSuspend, setCurrentOrderNumber} from '@slices';
import {IconSvg} from '@svgs';
import {eventBus} from '@utils';
import {TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';

export const BasketItem = ({data}: any) => {
  const colors = useColors();
  const orderItems = data.order_items || [];
  const orderNumber = data.order_no;
  const dispatch = useDispatch();

  return (
    <Stack justify="space-between" items="center">
      <View>
        <Text style={{paddingBottom: 10}}>{orderNumber}</Text>
        {orderItems.map((item: any) => (
          <Text
            fontStyle="FW400_10"
            textColor={colors.muted}
            style={{marginBottom: 4}}>
            {item.qty} items
          </Text>
        ))}
        <Text fontStyle="FW400_10" textColor={colors.muted}>
          {data?.time}
        </Text>
      </View>
      <Stack items="center" columnSpace={20}>
        <TouchableOpacity
          onPress={() => {
            const selected = orderItems.map(
              ({product, qty, discount_amount, discount_type}: any) => ({
                addedQty: qty,
                discount_amount: discount_amount || null,
                discount_type:
                  DISCOUNT_TYPE_ARRAY[discount_type]?.value || null,
                ...product,
              }),
            );
            dispatch(addProducts(selected));
            dispatch(setCurrentOrderNumber(orderNumber));
            navigate(SCREENS.CASHIER.name, {order_no: orderNumber});
          }}>
          <SvgXml xml={IconSvg.edit} width={15} height={15} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            dispatch(
              deleteSuspend({
                id: data?.id,
                onSuccess: () => {
                  eventBus.emit(EMIT_TAGS.SUSPEND);
                },
              }),
            )
          }>
          <SvgXml xml={IconSvg.delete} width={15} height={15} />
        </TouchableOpacity>
      </Stack>
    </Stack>
  );
};
