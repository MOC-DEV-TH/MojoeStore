import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS, navigate} from '@navigations';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LanguageSwitcher, Stack as Row, Text} from '@components';
import {useColors, useFonts} from '@hooks';
import {IconSvg} from '@svgs';
import {SvgXml} from 'react-native-svg';
import {getUserInfo, toggleInventorySearchBox} from '@slices';
import {RootState} from '@redux';
import {isOwner} from '@utils';

const Stack = createNativeStackNavigator();

export function DashboardStack() {
  const colors = useColors();
  const fonts = useFonts();

  const DashboardLeftHeader = () => {
    const userInfo = getUserInfo();
    return (
      <View>
        <RNText style={{...fonts.en.FW600_12, color: colors.black}}>
          Welcome,
        </RNText>
        <RNText
          style={{
            ...fonts.en.FW600_14,
            color: colors.black,
          }}
          numberOfLines={1}>
          {userInfo?.name}
        </RNText>
      </View>
    );
  };

  const DashboardRightHeader = () => {
    const notiCount = useSelector(
      (store: RootState) => store.common.notiUnreadCount,
    );

    return (
      <Row items="center">
        <View style={{maxWidth: 45, marginRight: 10}}>
          <LanguageSwitcher noBorder={true} />
        </View>
        <TouchableOpacity
          style={{marginRight: 18}}
          onPress={() => navigate(SCREENS.NOTIFICATION.name)}>
          {notiCount ? (
            <View style={[styles.badgeIcon, {backgroundColor: colors.primary}]}>
              <RNText style={{...fonts.en.FW400_8, color: '#ffffff'}}>
                {notiCount}
              </RNText>
            </View>
          ) : null}
          <SvgXml xml={IconSvg.notification} width={23} height={23} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate(SCREENS.ACCOUNT.name)}>
          <SvgXml xml={IconSvg.user} width={23} height={23} />
        </TouchableOpacity>
      </Row>
    );
  };

  return (
    <Stack.Navigator initialRouteName={SCREENS.DASHBOARD.name}>
      <Stack.Screen
        name={SCREENS.DASHBOARD.name}
        component={SCREENS.DASHBOARD.component}
        options={{
          headerShown: true,
          headerTitle: () => '',
          headerLeft: () => <DashboardLeftHeader />,
          headerRight: () => <DashboardRightHeader />,
        }}
      />
      <Stack.Screen
        name={SCREENS.NOTIFICATION.name}
        component={SCREENS.NOTIFICATION.component}
      />
      <Stack.Screen
        name={SCREENS.INVOICE.name}
        component={SCREENS.INVOICE.component}
      />
      <Stack.Screen
        name={SCREENS.REPORT.name}
        component={SCREENS.REPORT.component}
      />
    </Stack.Navigator>
  );
}

export function InventoryStack() {
  const dispatch = useDispatch();
  const isOwnerRole = isOwner();

  const InventoryRightHeader = () => {
    return (
      <Row items="center" columnSpace={15}>
        <TouchableOpacity onPress={() => dispatch(toggleInventorySearchBox())}>
          <SvgXml xml={IconSvg.search} width={23} height={23} />
        </TouchableOpacity>
        {isOwnerRole && (
          <TouchableOpacity
            onPress={() => navigate(SCREENS.INVENTORY_ADD_NEW.name)}>
            <SvgXml xml={IconSvg.addCircle} width={23} height={23} />
          </TouchableOpacity>
        )}
      </Row>
    );
  };

  return (
    <Stack.Navigator initialRouteName={SCREENS.INVENTORY.name}>
      <Stack.Screen
        name={SCREENS.INVENTORY.name}
        component={SCREENS.INVENTORY.component}
        options={{
          headerShown: true,
          headerTitle: () => '',
          headerLeft: () => <Text fontStyle="FW600_20">Inventroy</Text>,
          headerRight: () => <InventoryRightHeader />,
        }}
      />
      <Stack.Screen
        name={SCREENS.INVENTORY_SUB_CATEGORY.name}
        component={SCREENS.INVENTORY_SUB_CATEGORY.component}
        options={{
          headerShown: true,
          headerTitle: () => '',
          headerLeft: () => <Text fontStyle="FW600_20">Inventroy</Text>,
          headerRight: () => <InventoryRightHeader />,
        }}
      />
      <Stack.Screen
        name={SCREENS.INVENTORY_PRODUCT.name}
        component={SCREENS.INVENTORY_PRODUCT.component}
        options={{
          headerShown: true,
          headerTitle: () => '',
          headerLeft: () => <Text fontStyle="FW600_20">Inventroy</Text>,
          headerRight: () => <InventoryRightHeader />,
        }}
      />
      <Stack.Screen
        name={SCREENS.INVENTORY_ADD_NEW.name}
        component={SCREENS.INVENTORY_ADD_NEW.component}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => '',
          headerLeft: () => <Text fontStyle="FW600_20">Add New</Text>,
        }}
      />
      <Stack.Screen
        name={SCREENS.EDIT_PRODUCT.name}
        component={SCREENS.EDIT_PRODUCT.component}
        options={{
          headerShown: true,
          headerTitle: () => '',
          headerLeft: () => <Text fontStyle="FW600_20">Edit Product</Text>,
        }}
      />
    </Stack.Navigator>
  );
}

export function BasketStack() {
  return (
    <Stack.Navigator initialRouteName={SCREENS.INVENTORY.name}>
      <Stack.Screen
        name={SCREENS.BASKET.name}
        component={SCREENS.BASKET.component}
        options={{
          headerShown: true,
          headerTitle: () => '',
          headerLeft: () => <Text fontStyle="FW600_20">Basket</Text>,
        }}
      />
    </Stack.Navigator>
  );
}

export const styles = StyleSheet.create({
  badgeIcon: {
    position: 'absolute',
    right: -5,
    top: 0,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
});
