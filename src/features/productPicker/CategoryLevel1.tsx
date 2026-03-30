import {CategoryItem, SimpleLoader} from '@components';
import {SearchBaseView} from './components';
import {EMIT_TAGS, SPACING} from '@constants';
import {SCREENS, navigate} from '@navigations';
import {useCategorySearch} from '@hooks';
import {endpoints} from '@services';
import {useIsFocused} from '@react-navigation/native';
import {eventBus} from '@utils';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

export const CategoryLevel1 = () => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const {data, onSearch, isLoading, fetch} = useCategorySearch({
    url: endpoints.common.getParentCategory,
    onSearchKey: 'cat_name',
  });

  useEffect(() => {
    eventBus.on(EMIT_TAGS.CATEGORY, fetch);
    return () => {
      eventBus.off(EMIT_TAGS.CATEGORY, fetch);
    };
  }, [isFocused]);

  return (
    <SearchBaseView
      title={t('non_barcode_item')}
      onSearch={onSearch}
      style={{
        columnGap: 11,
        rowGap: 12,
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: SPACING['STANDARD'],
        paddingTop: SPACING['STANDARD'],
        paddingBottom: 10,
      }}>
      {isLoading ? (
        <SimpleLoader />
      ) : (
        data.map((item: any) => {
          return (
            <CategoryItem
              key={`${item?.id}${item?.cat_name}`}
              goTo={() =>
                navigate(SCREENS.CATEGORY_LEVEL2.name, {
                  title: item?.cat_name,
                  id: item?.id,
                })
              }
              style={{width: '31%'}}
              bgColor={item?.cat_bg_color}
              icon={item?.cat_img}
              title={item?.cat_name}
            />
          );
        })
      )}
    </SearchBaseView>
  );
};
