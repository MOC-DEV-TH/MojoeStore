import {BaseView} from '@components';
import {MONTH, SPACING} from '@constants';
import {ActivityIndicator, FlatList} from 'react-native';
import {Head, InvoiceItem} from './components';
import {useInfinite} from '@hooks';
import {endpoints} from '@services';
import {useEffect} from 'react';

export const InvoiceScreen = () => {
  const {data, response, fetchData, fetchNextPage, onRefresh, isRefreshing} =
    useInfinite({
      classify: 'data',
      url: endpoints.invoice.getInvoiceList,
      pageStart: 1,
      pageSize: 10,
      canLoadMore: (response: any) =>
        response?.current_page < response?.total_pages,
    });

  const date = response?.date;
  const selectedMonth = (date?.month && MONTH[Number(date.month) - 1]) || '';
  const selectedYear = date?.year || '';

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BaseView noPadding>
      <FlatList
        ListHeaderComponent={
          <Head
            date={`${selectedMonth} ${selectedYear}`}
            onFilter={fetchData}
          />
        }
        data={data}
        contentContainerStyle={{paddingBottom: SPACING['STANDARD']}}
        nestedScrollEnabled={true}
        renderItem={({item, index}) => <InvoiceItem data={item} />}
        refreshing={isRefreshing}
        onRefresh={() => {
          onRefresh();
        }}
        keyExtractor={item => `${item.invoice_no}-${item.id}`}
        onEndReachedThreshold={0}
        onEndReached={() => {
          fetchNextPage();
        }}
      />
    </BaseView>
  );
};
 