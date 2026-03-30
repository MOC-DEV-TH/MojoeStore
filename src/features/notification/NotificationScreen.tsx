import {BaseView, StandardPadding} from '@components';
import {FlatList, Text, View} from 'react-native';
import {dataNotification} from './FakeData';
import {NotificationItem} from './components';
import {SPACING} from '@constants';
import {endpoints} from '@services';
import {useInfinite} from '@hooks';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';


export const NotificationsScreen = () => {
  const {t} = useTranslation();
  const {data, response, fetchData, fetchNextPage, onRefresh, isRefreshing} =
    useInfinite({
      classify: 'data',
      url: endpoints.common.notificationList,
      pageStart: 1,
      pageSize: 10,
      canLoadMore: (response: any) =>
        response?.current_page < response?.total_pages,
    });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BaseView noPadding>
      <FlatList
        style={{flex: 1}}
        data={data}
        contentContainerStyle={{paddingVertical: SPACING['STANDARD']}}
        nestedScrollEnabled={true}
        renderItem={({item, index}) => (
          <StandardPadding>
            <NotificationItem data={item} />
          </StandardPadding>
        )}
      />
    </BaseView>
  );
};
