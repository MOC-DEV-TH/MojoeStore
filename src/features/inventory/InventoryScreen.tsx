import {BaseView, CategoryItem, SimpleLoader, Stack, Text} from '@components';
import {EMIT_TAGS, SPACING} from '@constants';
import {useCategorySearch, useColors, useFonts} from '@hooks';
import {useEffect} from 'react';
import {StyleSheet, Text as RNText, View, ScrollView} from 'react-native';
import {InventorySearchBox} from './components';
import {hideInventorySearchBox, isSearchBoxShow} from '@slices';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SCREENS, navigate} from '@navigations';
import {endpoints} from '@services';
import {eventBus} from '@utils';

export const InventoryScreen = () => {
  const isFocused = useIsFocused();
  const colors = useColors();
  const fonts = useFonts();
  const dispatch = useDispatch();
  const isSearchShow = isSearchBoxShow();
  const {data, respond, onSearch, isLoading, fetch} = useCategorySearch({
    url: endpoints.common.getParentCategory,
    onSearchKey: 'cat_name',
  });

  useEffect(() => {
    !isFocused && dispatch(hideInventorySearchBox());
    eventBus.on(EMIT_TAGS.CATEGORY, fetch);
    return () => {
      eventBus.off(EMIT_TAGS.CATEGORY, fetch);
    };
  }, [isFocused]);

  return (
    <BaseView>
      {isSearchShow && <InventorySearchBox onSearch={onSearch} />}

      <Stack columnSpace={15} style={{paddingHorizontal: SPACING['STANDARD']}}>
        <View style={[styles.amountBox, {borderColor: colors.orange}]}>
          <Text fontStyle="FW400_14" textColor={colors.orange}>
            Total Categories
          </Text>
          <RNText
            style={{
              ...fonts.en.FW600_32,
              color: colors.orange,
              paddingTop: 6,
            }}>
            {respond?.totalCategories}
          </RNText>
        </View>
        <View style={[styles.amountBox, {borderColor: colors.deepBlue}]}>
          <Text fontStyle="FW400_14" textColor={colors.deepBlue}>
            Stock in Hand
          </Text>
          <RNText
            style={{
              ...fonts.en.FW600_32,
              color: colors.deepBlue,
              paddingTop: 6,
            }}>
            {respond?.stockInHand}
          </RNText>
        </View>
      </Stack>
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
                    navigate(SCREENS.INVENTORY_SUB_CATEGORY.name, {
                      title: item?.cat_name,
                      id: item?.id,
                    })
                  }
                  style={{width: '48%'}}
                  bgColor={item?.cat_bg_color}
                  title={item?.cat_name}
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
    padding: SPACING['STANDARD'],
    flex: 1,
  },
});
