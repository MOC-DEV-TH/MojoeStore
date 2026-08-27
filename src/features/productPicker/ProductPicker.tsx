import {ProductItem} from '@components';
import {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SPACING} from '@constants';
import {getPickedProducts} from '@slices';
import {useInfinite} from '@hooks';
import {endpoints} from '@services';

import {SearchBaseView} from './components';
import { SCREENS } from '@navigations';
import {useTranslation} from 'react-i18next';


export const ProductPicker = ({route}: any) => {
  const navigation = useNavigation<any>();

  const {title, id} = route.params;

  const pickedProducts = getPickedProducts();

  const pickedCount = pickedProducts?.length ?? 0;

  const {t} = useTranslation();

  let timeout: any = null;

  const {
    data,
    isLoading,
    fetchData,
    fetchNextPage,
    onRefresh,
    isRefreshing,
  } = useInfinite({
    classify: 'data',
    url: endpoints.common.getProductByCategory(id),
    param: {
      type: 'order',
    },
    pageStart: 1,
    pageSize: 10,
    hideDefaultLoading: true,
    canLoadMore: (response: any) =>
      response?.current_page < response?.total_pages,
  });

  useEffect(() => {
    fetchData({}, true);
  }, []);

  const onSearch = (keyword: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fetchData(
        {
          search: keyword,
        },
        true,
      );
    }, 500);
  };

  const onBackToCashier = () => {
    navigation.navigate(SCREENS.CASHIER.name);
  };

  return (
    <SearchBaseView
      title={title}
      onSearch={onSearch}>
      <View style={styles.container}>
        {/* Loading */}
        {isLoading && (
          <View style={styles.loadingWrapper}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#FFFFFF" />
            </View>
          </View>
        )}

        {/* Product List */}
        <FlatList
          data={data}
          style={styles.list}
          keyExtractor={({id}) => `${id}-product-picker`}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
          contentContainerStyle={[
            styles.listContent,
            pickedCount > 0 && styles.listContentWithButton,
          ]}
          ItemSeparatorComponent={() => (
            <View
              style={{
                paddingHorizontal: SPACING['STANDARD'],
              }}>
              <View style={styles.separator} />
            </View>
          )}
          renderItem={({item}) => (
            <View
              style={{
                padding: SPACING['STANDARD'],
              }}>
              <ProductItem
                data={item}
                allData={pickedProducts}
              />
            </View>
          )}
        />

        {/* Show only when at least one product is selected */}
        {pickedCount > 0 && (
          <View style={styles.bottomContainer}>
            <Pressable
              style={({pressed}) => [
                styles.cashierButton,
                pressed && styles.cashierButtonPressed,
              ]}
              onPress={onBackToCashier}>
              <Text style={styles.cashierButtonText}>
                {t('backToCashier')}
              </Text>

              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>
                  {pickedCount}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </SearchBaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingBottom: 20,
  },

  // Extra bottom space so products are not covered by button
  listContentWithButton: {
    paddingBottom: 100,
  },

  separator: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },

  loadingWrapper: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  loadingContainer: {
    margin: 20,
    width: 45,
    height: 45,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    paddingHorizontal: SPACING['STANDARD'],
    paddingTop: 12,
    paddingBottom: 16,

    backgroundColor: '#FFFFFF',

    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 8,
  },

  cashierButton: {
    width: '100%',
    height: 52,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#111827',
    borderRadius: 12,
  },

  cashierButtonPressed: {
    opacity: 0.85,
  },

  cashierButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  countBadge: {
    marginLeft: 10,

    minWidth: 24,
    height: 24,

    paddingHorizontal: 7,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },

  countBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
});