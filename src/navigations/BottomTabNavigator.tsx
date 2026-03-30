import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColors, useFonts} from '@hooks';
import {SvgXml} from 'react-native-svg';
import {IconSvg} from '@svgs';
import {BasketStack, DashboardStack, InventoryStack} from './Stacks';
import {StyleSheet, Text, View} from 'react-native';
import {getPickedProducts, getTotalSuspendCount} from '@slices';
import {useTranslation} from 'react-i18next';


const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const colors = useColors();
  const {t} = useTranslation();
  

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: String(colors.primary),
        tabBarShowLabel: true,
      }}>
      <Tab.Screen
        name={'DashboardTab'}
        component={DashboardStack}
        options={{
          headerShown: false,
          tabBarLabel: t('dashboard'),
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <SvgXml xml={IconSvg.activeDashboard} color={'#fff'} />
            ) : (
              <SvgXml xml={IconSvg.dashboard} color={'#fff'} />
            ),
        }}
      />
      <Tab.Screen
        name={'InventoryTab'}
        component={InventoryStack}
        options={{
          headerShown: false,
          tabBarLabel: t('inventory'),
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <SvgXml xml={IconSvg.activeBoxes} color={'#fff'} />
            ) : (
              <SvgXml xml={IconSvg.boxes} color={'#fff'} />
            ),
        }}
      />
      <Tab.Screen
        name={'BasketTab'}
        component={BasketStack}
        options={{
          headerShown: false,
          tabBarLabel: t('basket'),
          tabBarIcon: ({focused, color}) => {
            const fonts = useFonts();
            const totalBasket = getTotalSuspendCount();
            const basketIcon = focused ? IconSvg.activeBasket : IconSvg.basket;
            return (
              <View style={{position: 'relative'}}>
                {totalBasket && (
                  <View
                    style={[
                      styles.badgeIcon,
                      {backgroundColor: colors.primary},
                    ]}>
                    <Text style={{...fonts.en.FW400_8, color: '#ffffff'}}>
                      {totalBasket}
                    </Text>
                  </View>
                )}
                <SvgXml xml={basketIcon} color={'#fff'} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

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
