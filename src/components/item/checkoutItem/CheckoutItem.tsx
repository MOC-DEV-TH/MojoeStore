import {Alert, TouchableOpacity, View} from 'react-native';
import {Button, Stack, Text} from '@components';
import {useColors} from '@hooks';
import {SPACING} from '@constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  removeProductItem,
  showMessageErrorRoot,
  updateProductItem,
} from '@slices';
import {useDispatch} from 'react-redux';
import {useCashier} from '@providers';
import {SvgXml} from 'react-native-svg';
import {IconSvg} from '@svgs';
import {formatPrice, getItemTotalPrice} from '@utils';

export const QuantityBtn = (props: {onChange: any; qty: number}) => {
  const {onChange, qty} = props;
  const colors = useColors();

  return (
    <View
      style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
      <Stack items="center" columnSpace={10}>
        <TouchableOpacity
          onPress={() => {
            const temp_qty = qty + 1;
            onChange(temp_qty);
          }}
          style={{
            width: 17,
            height: 17,
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.colorD9D9D9,
          }}>
          <Ionicons name="add-outline" />
        </TouchableOpacity>
        <Text>{qty}</Text>
        <TouchableOpacity
          onPress={() => {
            if (qty === 1) return;
            const temp_qty = qty - 1;
            onChange(temp_qty);
          }}
          style={{
            width: 17,
            height: 17,
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.colorD9D9D9,
          }}>
          <Ionicons name="remove-outline" />
        </TouchableOpacity>
      </Stack>
    </View>
  );
};

export const CheckoutItem = (props: any) => {
  const dispatch = useDispatch();
  const colors = useColors();
  const {showDiscountModal} = useCashier();
  const {data, allData} = props;

  const updateItemQty = ({productId, qty}: {productId: any; qty: number}) => {
    try {
      const foundIndex = allData.findIndex(
        (item: any) => item.id === productId,
      );
      const item = {...allData[foundIndex]};
      item.addedQty = qty;
      dispatch(updateProductItem(item));
    } catch (error) {
      dispatch(
        showMessageErrorRoot({
          message: 'Update Item not found',
        }),
      );
    }
  };

  const remove = () => {
    dispatch(removeProductItem(data?.id));
  };

  return (
    <View
      style={{
        backgroundColor: colors.colorF1F1F1,
        padding: SPACING['STANDARD'],
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          marginBottom: 5,
        }}>
        <TouchableOpacity onPress={remove}>
          <Ionicons name="close-circle" size={25} color={colors.colorA7A7A7} />
        </TouchableOpacity>
      </View>

      <Stack justify="space-between" items="center" style={{paddingBottom: 15}}>
        <Text>{data?.name}</Text>
        <Text fontStyle="FW700_12">
          {formatPrice({
            pricePerUnit: data?.selling_price,
            qty: data?.addedQty,
            discountAmount: data?.discount_amount,
            discountType: data?.discount_type,
          })}
        </Text>
      </Stack>
      <Stack justify="space-between" items="center">
        <Text fontStyle="FW400_12" textColor={colors.color212325}>
          {formatPrice({
            pricePerUnit: data?.selling_price,
            qty: 1,
            discountAmount: data?.discount_amount,
            discountType: data?.discount_type,
            isPerUnitDisplay: true,
          })}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              marginRight: 20,
              backgroundColor: colors.primary,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 4,
            }}
            onPress={() => showDiscountModal(data)}>
            <SvgXml xml={IconSvg.percentage} />
          </TouchableOpacity>
          <QuantityBtn
            qty={data?.addedQty}
            onChange={(changedQty: number) => {
              console.log('changedQty', changedQty);
              updateItemQty({productId: data?.id, qty: changedQty});
            }}
          />
        </View>
      </Stack>
    </View>
  );
};
