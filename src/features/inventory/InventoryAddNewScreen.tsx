import {BaseView} from '@components';
import {useColors, useFonts} from '@hooks';
import {Category, Product, SubCategory} from './form';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useEffect} from 'react';
import {CommonVM} from '../common';
import {useTranslation} from 'react-i18next';


export const InventoryAddNewScreen = () => {
  const {t} = useTranslation();
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
        <Tab.Screen name={t('new_product')} component={Product} />
        <Tab.Screen name={t('new_category')} component={Category} />
        <Tab.Screen name={t('new_sub_category')} component={SubCategory} />
      </Tab.Navigator>
    </BaseView>
  );
};
