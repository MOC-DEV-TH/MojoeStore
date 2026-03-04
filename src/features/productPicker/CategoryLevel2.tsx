import {CategoryItem, SimpleLoader} from '@components';
import {SearchBaseView} from './components';
import {EMIT_TAGS, SPACING} from '@constants';
import {SCREENS, navigate} from '@navigations';
import {useCategorySearch} from '@hooks';
import {endpoints} from '@services';
import {useEffect} from 'react';
import {eventBus} from '@utils';
import {useIsFocused} from '@react-navigation/native';

export const CategoryLevel2 = ({route}: any) => {
  const {title, id} = route.params;
  const isFocused = useIsFocused();
  const {data, onSearch, isLoading, fetch} = useCategorySearch({
    url: endpoints.common.getSubCategoryByCategory(id),
    onSearchKey: 'sub_cat_name',
  });

  useEffect(() => {
    eventBus.on(EMIT_TAGS.CATEGORY, fetch);
    return () => {
      eventBus.off(EMIT_TAGS.CATEGORY, fetch);
    };
  }, [isFocused]);

  return (
    <SearchBaseView
      title={title}
      onSearch={onSearch}
      style={{
        columnGap: 11,
        rowGap: 12,
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: SPACING['STANDARD'],
        paddingTop: SPACING['STANDARD'],
      }}>
      {isLoading ? (
        <SimpleLoader />
      ) : (
        data.map((item: any) => {
          return (
            <CategoryItem
              key={`${item?.id}${item?.sub_cat_name}`}
              goTo={() =>
                navigate(SCREENS.PRODUCT_PICKER.name, {
                  title: item?.sub_cat_name,
                  id: item?.id,
                })
              }
              style={{width: '31%'}}
              title={item?.sub_cat_name}
            />
          );
        })
      )}
    </SearchBaseView>
  );
};
