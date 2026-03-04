import {Alert, View} from 'react-native';
import {Button, Stack, Text} from '@components';
import {useColors} from '@hooks';
import {addProductItem, showMessageErrorRoot} from '@slices';
import {useDispatch} from 'react-redux';
import {useState} from 'react';

export const ProductItem = ({data, allData}: any) => {
  const colors = useColors();
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();

  const addItem = () => {
    try {
      if (data?.qty === 0) {
        dispatch(
          showMessageErrorRoot({
            title: data?.name,
            message: 'Sorry, this item is out of inventroy',
          }),
        );
        return;
      }

      const currentItem = allData.find((item: any) => item.id === data.id);
      if (currentItem?.addedQty && currentItem?.addedQty === currentItem?.qty) {
        dispatch(
          showMessageErrorRoot({
            title: data?.name,
            message: 'Quantity has reached its limit',
          }),
        );
        return;
      }

      dispatch(addProductItem({...data, addedQty: 1}));
      currentItem?.addedQty ? setQty(currentItem.addedQty + 1) : setQty(1);
    } catch (error) {
      setQty(0);
      dispatch(
        showMessageErrorRoot({
          message:
            "System has problem. We can't add for now. please report to admin",
        }),
      );
    }
  };

  return (
    <Stack items="center" justify="space-between">
      <View style={{flex: 1}}>
        <Text>{data?.name}</Text>
        <Text fontStyle="FW400_12" textColor={colors.muted}>
          {data?.qty} {data?.unit}
        </Text>
        <Text fontStyle="FW400_12" textColor={colors.muted}>
          {data?.selling_price} {data?.curiency} / {data?.unit}
        </Text>
      </View>
      <Stack items="center" columnSpace={6}>
        <Text fontStyle="FW400_12" textColor={colors.primary}>
          {qty > 0 && `${qty} items added`}{' '}
        </Text>
        <Button
          title="Add Item"
          size="sm"
          colorScheme="green"
          onPress={addItem}
        />
      </Stack>
    </Stack>
  );
};
