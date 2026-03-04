import {CategoryItem, ProductItem, StandardPadding} from '@components';
import {useEffect, useState} from 'react';
import {SearchBaseView} from './components';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {SPACING} from '@constants';
import {getPickedProducts} from '@slices';
import {CommonVM} from '../common';
import {useInfinite} from '@hooks';
import {endpoints} from '@services';

export const ProductPicker = ({route}: any) => {
  const {title, id} = route.params;
  const pickedProducts = getPickedProducts();
  let timeout: any = null;

  const {data, isLoading, fetchData, fetchNextPage, onRefresh, isRefreshing} =
    useInfinite({
      classify: 'data',
      url: endpoints.common.getProductByCategory(id),
      param: {type: 'order'},
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
    // Set new timeout
    timeout = setTimeout(() => {
      fetchData({search: keyword}, true);
    }, 500);
  };

  return (
    <SearchBaseView title={title} onSearch={onSearch}>
      {isLoading && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            zIndex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={[styles.loadingContainer]}>
            <ActivityIndicator color={'#fff'} />
          </View>
        </View>
      )}
      <FlatList
        data={data}
        keyExtractor={({id}) => `${id}-product-picker`}
        refreshing={isRefreshing}
        onRefresh={() => {
          onRefresh();
        }}
        onEndReached={() => {
          fetchNextPage();
        }}
        ItemSeparatorComponent={() => (
          <View style={{paddingHorizontal: SPACING['STANDARD']}}>
            <View style={{height: 1, backgroundColor: '#EAEAEA'}}></View>
          </View>
        )}
        renderItem={({item, index}) => (
          <View style={{padding: SPACING['STANDARD']}}>
            <ProductItem data={item} allData={pickedProducts} />
          </View>
        )}
      />
    </SearchBaseView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    margin: 20,
    width: 45,
    height: 45,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
