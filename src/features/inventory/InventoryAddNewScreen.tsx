import {BaseView} from '@components';
import {useColors, useFonts} from '@hooks';
import {Category, Product, SubCategory} from './form';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useEffect} from 'react';
import {CommonVM} from '../common';

export const InventoryAddNewScreen = () => {
  const commonViewModel = CommonVM();
  const colors = useColors();
  const fonts = useFonts();
  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    commonViewModel.fetchParentCategory();
    commonViewModel.fetchParentCategoryIcon();
  }, []);

  return (
    <BaseView noPadding>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: String(colors.primary),
          tabBarIndicatorStyle: {backgroundColor: colors.primary},
          tabBarInactiveTintColor: String(colors.black),
          tabBarScrollEnabled: true,
          tabBarLabelStyle: {...fonts.en.FW400_14, textTransform: 'none'},
          tabBarItemStyle: {width: 'auto'},
        }}>
        <Tab.Screen name={'New Product'} component={Product} />
        <Tab.Screen name={'New Category'} component={Category} />
        <Tab.Screen name={'New Sub Category'} component={SubCategory} />
      </Tab.Navigator>
    </BaseView>
  );
};
