import {
  AppSelectField,
  AppTextFiled,
  Button,
  CustomBottomModal,
  CustomModal,
  Stack,
  Text,
} from '@components';
import {
  DISCOUNT_TYPE,
  DISCOUNT_TYPE_ARRAY,
  EMIT_TAGS,
  SPACING,
} from '@constants';
import {useColors} from '@hooks';
import ImagesAsset from '@images';
import {SCREENS, navigate} from '@navigations';
import {
  getCaculatedTotalAmount,
  getPickedProducts,
  getTotalAmountInfo,
  updateProductItem,
  updateTotalAmount,
  getCaculatedTotalAmountDue,
  attemptCheckout,
  clearPickedProduct,
  getCurrentOrderNumber,
  setCurrentOrderNumber,
} from '@slices';
import {IconSvg} from '@svgs';
import {
  discountTypeToNumber,
  eventBus,
  getItemTotalPrice,
  getShopId,
} from '@utils';
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';

type CashierProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<any>(null);

export const CashierProvider: FC<CashierProviderProps> = props => {
  const {children} = props;
  const [currentItem, setCurrentItem] = useState<any>({});
  const [discountMessage, setDiscountMessage] = useState('');
  const [dueAmountInfo, setDueAmountInfo] = useState<any>({
    paymentType: null,
    value: null,
    invoiceId: null,
  });
  const pickedProducts = getPickedProducts();
  const totalAmountInfo = getTotalAmountInfo();
  const discountModalRef: any = useRef();
  const payWithModalRef: any = useRef();
  const amountDueModalRef: any = useRef();
  const amountDueReceiptModalRef: any = useRef();
  const colors = useColors();
  const dispatch = useDispatch();
  const shopId = getShopId();
  const orderNumber = getCurrentOrderNumber();

  let isDiscountModalForTotal = useRef(false);

  const {
    handleSubmit: discountHandleSubmit,
    control: discountControl,
    formState: {errors: discountErrors},
    reset,
  } = useForm({
    defaultValues: {
      discountAmount: '',
      discountType: 0,
    },
  });

  const {
    handleSubmit: amountDueHandleSubmit,
    control: amountDueControl,
    setError: amountDueSetError,
    reset: amountDueReset,
    formState: {errors: amountDueErrors},
  } = useForm({
    defaultValues: {
      amountDue: '',
    },
  });

  // update total Amount
  useEffect(() => {
    const caculatedTotalAmount = getCaculatedTotalAmount(pickedProducts);
    const temp_totalAmount = {...totalAmountInfo, amount: caculatedTotalAmount};
    dispatch(updateTotalAmount(temp_totalAmount));
  }, [pickedProducts]);

  //Discount Modal
  const showDiscountModal = (currentItem?: any) => {
    const discountType = currentItem?.discount_type;
    if (discountType) {
      reset({
        discountType: discountType,
      });
    }
    discountModalRef?.current?.open();
    currentItem && setCurrentItem(currentItem);
  };

  const onDiscountSubmit = (data: any) => {
    let amount = data.discountAmount;
    let type = data.discountType;

    if (isDiscountModalForTotal.current) {
      if (amount !== '0' && type === DISCOUNT_TYPE.KYAT) {
        setDiscountMessage(`${amount} MMK Discount Added`);
      }

      if (amount !== '0' && type === DISCOUNT_TYPE.PERCENT) {
        setDiscountMessage(`${amount}% Discount Added`);
      }

      if (amount === '0') {
        amount = null;
        type = null;
        setDiscountMessage('');
      }

      dispatch(
        updateTotalAmount({
          ...totalAmountInfo,
          discount_amount: amount,
          discount_type: type,
        }),
      );
    } else {
      if (
        amount === '0' &&
        (type === DISCOUNT_TYPE.PERCENT || type === DISCOUNT_TYPE.KYAT)
      ) {
        amount = null;
        type = null;
      }

      if (
        currentItem &&
        currentItem.hasOwnProperty('discount_amount') &&
        currentItem.hasOwnProperty('discount_type')
      ) {
        dispatch(
          updateProductItem({
            ...currentItem,
            discount_amount: amount,
            discount_type: type,
          }),
        );
      }
    }

    discountModalRef?.current?.close();
    isDiscountModalForTotal.current = false;
  };

  const onCheckout = () => {
    payWithModalRef?.current?.open();
  };

  const onAmountDue = (paymentType: number) => {
    setDueAmountInfo({
      ...dueAmountInfo,
      paymentType,
    });
    payWithModalRef?.current?.close();
    amountDueModalRef?.current?.open();
  };

  const onAmountDueSubmit = ({amountDue}: any) => {
    const finalTotalAmount = getCaculatedTotalAmountDue(totalAmountInfo);
    const amountDueValue = parseInt(amountDue);

    if (finalTotalAmount > amountDueValue) {
      return amountDueSetError('amountDue', {
        message: 'Amount is Invalid',
      });
    }
    const invoiceDiscountType = totalAmountInfo?.discount_type;
    const invoiceDiscountAmount = totalAmountInfo?.discount_amount || 0;
    const value = finalTotalAmount - amountDueValue;
    const paymentType = dueAmountInfo.paymentType;
    const products = pickedProducts.map(
      ({
        id,
        addedQty,
        buying_price,
        selling_price,
        discount_amount,
        discount_type,
      }): any => ({
        product_id: id,
        quantity: addedQty,
        buying_price: parseInt(buying_price),
        selling_price: parseInt(selling_price),
        discount_amount: parseInt(discount_amount) || 0,
        discount_type: discountTypeToNumber(discount_type),
        total: getItemTotalPrice({
          pricePerUnit: parseInt(selling_price),
          qty: addedQty,
          discountAmount: parseInt(discount_amount) || 0,
          discountType: discountTypeToNumber(discount_type),
        }),
      }),
    );

    const body = {
      ...(orderNumber ? {order_no: orderNumber} : {}),
      total_price: finalTotalAmount,
      products: JSON.stringify(products),
      payment_type: paymentType,
      shop_id: shopId,
      invoice_discount_amount: parseInt(invoiceDiscountAmount),
      invoice_discount_type: discountTypeToNumber(invoiceDiscountType),
    };

    dispatch(
      attemptCheckout({
        body: body,
        onSuccess: (respond: any) => {
          amountDueModalRef?.current?.close();
          amountDueReceiptModalRef?.current?.open();
          setDueAmountInfo({
            value: value,
            invoiceId: respond,
          });
          dispatch(
            updateTotalAmount({
              amount: '',
              discount_amount: null,
              discount_type: null,
            }),
          );
          dispatch(clearPickedProduct());
          dispatch(setCurrentOrderNumber(null));
          setDiscountMessage('');
          amountDueReset();
        },
      }),
    );
  };

  return (
    <ThemeContext.Provider
      value={{showDiscountModal, onCheckout, totalAmountInfo}}>
      {/* Discount Modal */}
      <CustomModal ref={discountModalRef}>
        <View style={{paddingVertical: SPACING['LARGE']}}>
          <Text
            fontStyle="FW600_16"
            textAlign="center"
            style={{marginBottom: 30}}>
            Add Discount
          </Text>
          {/* Form */}
          <Stack justify="space-between">
            <View style={{width: '48%'}}>
              <AppTextFiled
                name="discountAmount"
                type="number"
                require
                error={Boolean(discountErrors.discountAmount)}
                control={discountControl}
              />
            </View>
            <View style={{width: '48%'}}>
              <AppSelectField
                name="discountType"
                data={DISCOUNT_TYPE_ARRAY}
                control={discountControl}
              />
            </View>
          </Stack>
          <Stack justify="center" style={{marginTop: 30}}>
            <Button
              title={'Add'}
              style={{minWidth: 150}}
              colorScheme="green"
              onPress={discountHandleSubmit(onDiscountSubmit)}
            />
          </Stack>
          {/* Form */}
        </View>
      </CustomModal>

      {/* Pay With Modal */}
      <CustomBottomModal ref={payWithModalRef}>
        <View style={{marginBottom: 30}}>
          <Text fontStyle="FW600_16" textAlign="center">
            Pay With
          </Text>
        </View>
        <Stack columnSpace={10}>
          <TouchableOpacity
            onPress={() => onAmountDue(1)}
            style={[styles.card, {borderColor: colors.colorD9D9D9}]}>
            <SvgXml xml={IconSvg.cash} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onAmountDue(2)}
            style={[styles.card, {borderColor: colors.colorD9D9D9}]}>
            <SvgXml xml={IconSvg.kpay} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onAmountDue(3)}
            style={[styles.card, {borderColor: colors.colorD9D9D9}]}>
            <Image
              source={ImagesAsset.ayapay}
              style={{width: '100%', height: 38}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </Stack>
      </CustomBottomModal>

      {/* Amount Due */}
      <CustomBottomModal ref={amountDueModalRef}>
        <View style={{marginBottom: 10, flexDirection: 'column', rowGap: 20}}>
          <Text fontStyle="FW600_14" textAlign="center">
            Amount Due
          </Text>
          <View>
            <Text
              fontStyle="FW800_20"
              textAlign="center"
              textColor={colors.primary}>
              {getCaculatedTotalAmountDue(totalAmountInfo)}
            </Text>
            {discountMessage && (
              <Text
                fontStyle="FW400_10"
                textColor={colors.colorA3A3A3}
                textAlign="center">
                {discountMessage}
              </Text>
            )}
          </View>
          <Text fontStyle="FW600_14" textAlign="center">
            Amount Paid
          </Text>
        </View>
        <AppTextFiled
          name="amountDue"
          control={amountDueControl}
          require
          error={amountDueErrors?.amountDue?.message}
          inputStyle={{textAlign: 'center'}}
        />
        <Stack columnSpace={10} style={{marginTop: 30, marginBottom: 10}}>
          <View style={{flex: 1}}>
            <Button
              title="Ok"
              colorScheme="green"
              onPress={amountDueHandleSubmit(onAmountDueSubmit)}
              fullwidth
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              title="Cancel"
              colorScheme="primary"
              fullwidth
              onPress={() => {
                amountDueModalRef?.current?.close();
                isDiscountModalForTotal.current = false;
              }}
            />
          </View>
        </Stack>
        <Button
          title="Add Discount"
          onPress={() => {
            showDiscountModal();
            isDiscountModalForTotal.current = true;
          }}
          fullwidth
          colorScheme="blue"
        />
      </CustomBottomModal>

      <CustomBottomModal ref={amountDueReceiptModalRef}>
        <View style={{marginBottom: 10, flexDirection: 'column', rowGap: 20}}>
          <Text fontStyle="FW600_14" textAlign="center">
            Amount Due
          </Text>
        </View>
        <View>
          <Text fontStyle="FW400_12" textAlign="center">
            Charge
          </Text>
          <Text
            fontStyle="FW400_12"
            textAlign="center"
            style={{paddingVertical: 15}}>
            {dueAmountInfo?.value} Ks
          </Text>
        </View>
        <Button
          title="Receipt"
          onPress={() => {
            navigate(SCREENS.RECEIPT.name, {
              invoiceId: dueAmountInfo?.invoiceId,
            });
            eventBus.emit(EMIT_TAGS.SUSPEND);
            amountDueReceiptModalRef?.current?.close();
          }}
          fullwidth
          colorScheme="green"
          style={{marginBottom: 10}}
        />
        <Button
          title="No Receipt"
          onPress={() => {
            Alert.alert('Are you sure ?', '', [
              {
                text: 'Confirm',
                onPress: () => {
                  navigate(SCREENS.RECEIPT.name, {
                    invoiceId: dueAmountInfo?.invoiceId,
                    type: 'no-receipt',
                  });
                  eventBus.emit(EMIT_TAGS.SUSPEND);
                  amountDueReceiptModalRef?.current?.close();
                },
              },
              {
                text: 'Close',
                style: 'cancel',
              },
            ]);
          }}
          fullwidth
          colorScheme="primary"
        />
      </CustomBottomModal>

      {children}
    </ThemeContext.Provider>
  );
};

export const useCashier = (): any => {
  return useContext(ThemeContext);
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    flex: 1,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
});
