import {BaseView, Text} from '@components';
import {EMIT_TAGS, SPACING} from '@constants';
import {useColors, useFetch} from '@hooks';
import {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {InventoryProductItem} from './components';
import {hideInventorySearchBox} from '@slices';
import {useDispatch} from 'react-redux';
import {SCREENS, navigate} from '@navigations';
import {endpoints} from '@services';
import {eventBus} from '@utils';

export const InventoryProductScreen = ({route}: any) => {
  const {title, id} = route.params;
  const colors = useColors();
  const dispatch = useDispatch();
  const {data, fetch} = useFetch({
    url: endpoints.common.getProductByCategory(id),
    params: {type: 'inventory'},
  });

  useEffect(() => {
    fetch();
    eventBus.on(EMIT_TAGS.PRODUCT, () => fetch());
    return () => {
      eventBus.off(EMIT_TAGS.PRODUCT, () => fetch());
      dispatch(hideInventorySearchBox());
    };
  }, []);

  return (
    <BaseView>
      {/* <InventorySearchBox onSearch={handleOnSearch} /> */}
      <View style={{paddingHorizontal: SPACING['STANDARD'], marginBottom: 10}}>
        <Text textColor={colors.primary}>{title}</Text>
      </View>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: '#EAEAEA'}}></View>
        )}
        renderItem={({item, index}) => (
          <View style={{padding: SPACING['STANDARD']}}>
            <InventoryProductItem
              data={item}
              onEdit={() => navigate(SCREENS.EDIT_PRODUCT.name, {data: item})}
            />
          </View>
        )}
      />
    </BaseView>
  );
};
