import {BaseView} from '@components';
import {Text, View} from 'react-native';
import {Product} from './form';
import {toCamelCase} from '@utils';

export const EditProductScreen = ({route}: any) => {
  const {data} = route.params;
  const {
    deleted_at,
    created_at,
    updated_at,
    shop_id,
    has_barcode,
    has_minimum_qty,
    ...rest
  } = data;

  return (
    <BaseView noPadding>
      <Product
        fillData={toCamelCase({
          barcodeType: has_barcode,
          minimumQtyType: has_minimum_qty,
          ...rest,
        })}
      />
    </BaseView>
  );
};
