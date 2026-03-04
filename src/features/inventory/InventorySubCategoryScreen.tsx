import {BaseView, CategoryItem, SimpleLoader, Text} from '@components';
import {EMIT_TAGS, SPACING} from '@constants';
import {useCategorySearch} from '@hooks';
import {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {InventorySearchBox} from './components';
import {hideInventorySearchBox, isSearchBoxShow} from '@slices';
import {useDispatch} from 'react-redux';
import {SCREENS, navigate} from '@navigations';
import {endpoints} from '@services';
import {eventBus} from '@utils';

export const InventorySubCategoryScreen = ({route}: any) => {
  const {title, id} = route.params;
  const dispatch = useDispatch();
  const isSearchShow = isSearchBoxShow();
  const {data, onSearch, isLoading, fetch} = useCategorySearch({
    url: endpoints.common.getSubCategoryByCategory(id),
    onSearchKey: 'sub_cat_name',
  });

  useEffect(() => {
    eventBus.on(EMIT_TAGS.CATEGORY, fetch);
    return () => {
      eventBus.off(EMIT_TAGS.CATEGORY, fetch);
      dispatch(hideInventorySearchBox());
    };
  }, []);

  return (
    <BaseView>
      {isSearchShow && <InventorySearchBox onSearch={onSearch} />}
      <View
        style={{
          paddingHorizontal: SPACING['STANDARD'],
          marginBottom: SPACING['SMALL'],
        }}>
        <Text fontStyle="FW600_16">{title}</Text>
      </View>
      <ScrollView>
        {isLoading ? (
          <SimpleLoader />
        ) : (
          <View style={styles.categoryContainer}>
            {data.map((item: any) => {
              console.log('item?.id', item?.id);
              return (
                <CategoryItem
                  key={`${item?.id}${item?.cat_name}`}
                  goTo={() =>
                    navigate(SCREENS.INVENTORY_PRODUCT.name, {
                      title: item?.sub_cat_name,
                      id: item?.id,
                    })
                  }
                  style={{width: '48%'}}
                  title={item?.sub_cat_name}
                  icon={item?.cat_img}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  amountBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  categoryContainer: {
    columnGap: 11,
    rowGap: 12,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: SPACING['STANDARD'],
    paddingBottom: SPACING['STANDARD'],
    flex: 1,
  },
});
