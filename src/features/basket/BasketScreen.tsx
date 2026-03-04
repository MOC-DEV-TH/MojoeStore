import {BaseView, BasketItem} from '@components';
import {EMIT_TAGS, SPACING} from '@constants';
import {useCategorySearch, useFetch} from '@hooks';
import {SCREENS, navigate} from '@navigations';
import {useIsFocused} from '@react-navigation/native';
import {endpoints} from '@services';
import {updateTotalSuspendCount} from '@slices';
import {eventBus} from '@utils';
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useDispatch} from 'react-redux';

export const BasketScreen = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {data, fetch, isLoading}: any = useFetch({
    url: endpoints.common.suspendList,
    onSuccess: (data: any) => {
      dispatch(updateTotalSuspendCount(data?.length || null));
    },
  });

  useEffect(() => {
    eventBus.on(EMIT_TAGS.SUSPEND, fetch);
    return () => {
      eventBus.off(EMIT_TAGS.SUSPEND, fetch);
    };
  }, [isFocused]);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <BaseView noPadding>
      {isLoading ? (
        <View style={{padding: SPACING['STANDARD']}}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={({name}) => name}
          ItemSeparatorComponent={() => (
            <View style={{paddingHorizontal: SPACING['STANDARD']}}>
              <View style={{height: 1, backgroundColor: '#EAEAEA'}}></View>
            </View>
          )}
          renderItem={({item, index}) => (
            <View style={{padding: SPACING['STANDARD']}}>
              <BasketItem data={item} />
            </View>
          )}
        />
      )}
    </BaseView>
  );
};
