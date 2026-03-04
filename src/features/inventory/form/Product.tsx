import {BaseView, Button, Stack} from '@components';
import {EMIT_TAGS, PRODUCT_CATEGORIES, SPACING} from '@constants';
import {useCategorySearch, useColors, useFonts} from '@hooks';
import {useForm} from 'react-hook-form';
import {Alert, ScrollView, View} from 'react-native';
import {
  BarcodeNonBarcode,
  BuyingPrice,
  CategorySelect,
  CustomRadioButton,
  NotifyStockInput,
  ProductNameInput,
  QtyInput,
  SellingPrice,
  SkuInput,
} from './Inputs';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {createProduct, showMessageErrorRoot, updateProduct} from '@slices';
import {camelToSnakeCase, convertSelectOptions, eventBus} from '@utils';
import {endpoints} from '@services';

export const Product = ({fillData}: any) => {
  const colors = useColors();
  const dispatch = useDispatch();
  const bottomTabHeight = useBottomTabBarHeight();
  const {data, isLoading} = useCategorySearch({
    url: endpoints.common.getSubCategory,
  });

  const {
    control,
    formState: {errors},
    watch,
    setValue,
    reset,
    handleSubmit,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: '',
      barcodeType: 1,
      barcode: '',
      sku: '',
      qty: '',
      subcategoryId: '',
      buyingPrice: '',
      sellingPrice: '',
      minimumQtyType: 0,
      minimumQty: '',
      curiency: 'ks',
      unit: 'unit',
      isActive: 1,
    },
  });

  const onAdd = ({
    id,
    name,
    barcode,
    barcodeType,
    qty,
    subcategoryId,
    buyingPrice,
    sellingPrice,
    minimumQtyType,
    minimumQty,
    ...rest
  }: any) => {
    if (barcodeType && barcode == '') {
      return dispatch(showMessageErrorRoot({message: 'Barcode is Required'}));
    }

    if (minimumQtyType && minimumQty == '') {
      return dispatch(showMessageErrorRoot({message: 'Qty is Required'}));
    }
    const other = camelToSnakeCase(rest);
    const barcode_type = parseInt(barcodeType);
    const minimum_qty_type = parseInt(minimumQtyType);
    const minimum_qty = minimum_qty_type ? parseInt(minimumQty) : '';

    const data = {
      product_name: name,
      barcode_type: parseInt(barcodeType),
      barcode: barcode_type ? barcode : '',
      qty: parseInt(qty),
      subcategory_id: subcategoryId,
      buying_price: parseInt(buyingPrice),
      selling_price: parseInt(sellingPrice),
      minimum_qty_type,
      minimum_qty,
      ...other,
    };

    fillData
      ? dispatch(
          updateProduct({
            id: id,
            params: data,
            onSuccess: () => {
              eventBus.emit(EMIT_TAGS.PRODUCT);
            },
          }),
        )
      : dispatch(
          createProduct({
            body: data,
            onSuccess: () => {
              eventBus.emit(EMIT_TAGS.PRODUCT);
              reset();
            },
          }),
        );
  };

  useEffect(() => {
    console.log('data ==>', data);
  }, [data]);

  useEffect(() => {
    console.log('fillData');
    fillData && reset(fillData);
  }, [fillData]);

  return (
    <ScrollView
      style={{
        paddingHorizontal: SPACING['STANDARD'],
        paddingTop: SPACING['STANDARD'],
        paddingVertical: SPACING['STANDARD'],
        backgroundColor: colors.white,
        flex: 1,
      }}>
      <Stack
        direction="column"
        rowSpace={15}
        style={{paddingBottom: bottomTabHeight}}>
        <ProductNameInput control={control} errors={errors} />
        <BarcodeNonBarcode
          control={control}
          setValue={setValue}
          errors={errors}
          clearErrors={clearErrors}
          watch={watch}
        />
        <SkuInput control={control} errors={errors} />
        <QtyInput control={control} errors={errors} />

        <CategorySelect
          control={control}
          data={convertSelectOptions(data, 'sub_cat_name', 'id')}
          errors={errors}
        />
        <BuyingPrice control={control} errors={errors} />
        <SellingPrice control={control} errors={errors} />

        <CustomRadioButton
          options={[
            {name: 'Active', value: 1},
            {name: 'Inactive', value: 0},
          ]}
          watch={watch}
          name={'isActive'}
          control={control}
        />

        <NotifyStockInput
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />
        <Stack justify="center" style={{width: '100%', marginTop: 10}}>
          <Button
            onPress={() => handleSubmit(onAdd)()}
            colorScheme="green"
            title={fillData ? 'Done' : 'Add'}
            style={{minWidth: 150}}
          />
        </Stack>
      </Stack>
    </ScrollView>
  );
};
