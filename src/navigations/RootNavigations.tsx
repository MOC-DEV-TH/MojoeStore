import {NavigationContainer} from '@react-navigation/native';
import {BottomTabNavigator, SCREENS, navigationRef} from '@navigations';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@redux';
import {LoadingModal, MessageModal, Text} from '@components';
import {useEffect, useMemo, useState} from 'react';
import {
  attemptLogin,
  hideLoadingRoot,
  loadLogin,
  showLoadingRoot,
} from '@slices';
import {isUndefined, useAuthInfo} from '@utils';
import {ROLES} from '@constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';

export const RootNavigation = () => {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();
  const {token, role} = useAuthInfo();
  const [isChecking, setIsChecking] = useState(true);
  const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn);
  const isLoading = useSelector((store: RootState) => store.loading.isLoading);
  const isShowMessage = useSelector(
    (store: RootState) => store.message.isShowMessage,
  );

  useEffect(() => {
    if (!isUndefined(token) && !isUndefined(role) && ROLES.includes(role)) {
      console.log('load login');
      dispatch(loadLogin({role: role}));
    }
    setIsChecking(false);
  }, [token]);

  const showRootLoadingModal = useMemo(() => {
    return <LoadingModal />;
  }, [isLoading]);

  const showRootMessageModal = useMemo(() => {
    return <MessageModal />;
  }, [isShowMessage]);

  if (isChecking) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Group>
              <Stack.Screen
                name={'BottomTab'}
                component={BottomTabNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={SCREENS.CATEGORY_LEVEL1.name}
                component={SCREENS.CATEGORY_LEVEL1.component}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={SCREENS.CATEGORY_LEVEL2.name}
                component={SCREENS.CATEGORY_LEVEL2.component}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={SCREENS.PRODUCT_PICKER.name}
                component={SCREENS.PRODUCT_PICKER.component}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={SCREENS.SCAN_BARCODE.name}
                component={SCREENS.SCAN_BARCODE.component}
              />
              <Stack.Screen
                name={SCREENS.INVOICE_DETAIL.name}
                component={SCREENS.INVOICE_DETAIL.component}
                options={{
                  headerTitle: 'Invoices',
                }}
              />
              <Stack.Screen
                name={SCREENS.RECEIPT.name}
                component={SCREENS.RECEIPT.component}
                options={{
                  headerTitle: 'Receipt',
                }}
              />
              <Stack.Screen
                name={SCREENS.ACCOUNT.name}
                component={SCREENS.ACCOUNT.component}
                options={{
                  headerTitle: 'Account',
                }}
              />
              <Stack.Screen
                name={SCREENS.PROFILE.name}
                component={SCREENS.PROFILE.component}
                options={{
                  headerTitle: 'Profile',
                }}
              />
              <Stack.Screen
                name={SCREENS.CASHIER.name}
                component={SCREENS.CASHIER.component}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen
                name={SCREENS.LOGIN.name}
                component={SCREENS.LOGIN.component}
                options={{headerShown: false}}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {showRootLoadingModal}
      {showRootMessageModal}
    </>
  );
};
