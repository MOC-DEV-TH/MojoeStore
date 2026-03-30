import {Button, CategoryItem, Stack} from '@components';
import {useColors} from '@hooks';
import {View} from 'react-native';
import {CategoryNameInput, ChooseCategoryIcon} from './Inputs';
import {useForm} from 'react-hook-form';
import {EMIT_TAGS, SPACING} from '@constants';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {createSubCategory, getParentCategoryData} from '@slices';
import {useDispatch} from 'react-redux';
import {eventBus} from '@utils';
import {useTranslation} from 'react-i18next';


export const SubCategory = () => {
  const {t} = useTranslation();
  const colors = useColors();
  const dispatch = useDispatch();
  const bottomTabHeight = useBottomTabBarHeight();
  const categoryData = getParentCategoryData();
  const {
    control,
    formState: {errors},
    watch,
    setValue,
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      categoryName: '',
    },
  });

  const onAdd = (data: any) => {
    const {categoryIcon, categoryName} = data;
    const {id} = JSON.parse(categoryIcon);
    const body = {
      sub_category_name: categoryName,
      category_id: id,
    };

    dispatch(
      createSubCategory({
        body: body,
        onSuccess: () => {
          reset();
          eventBus.emit(EMIT_TAGS.CATEGORY);
        },
      }),
    );
  };

  return (
    <View
      style={{
        paddingTop: SPACING['STANDARD'],
        paddingHorizontal: SPACING['STANDARD'],
        paddingBottom: bottomTabHeight,
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Stack direction="column" rowSpace={15}>
        <CategoryNameInput
          label={t('sub_category_name')}
          control={control}
          errors={errors}
        />
        <ChooseCategoryIcon
          label={t('choose_parent_category')}
          control={control}
          setValue={setValue}
          data={categoryData}
          errors={errors}
          watch={watch}
          selectedItemLayout={data => (
            <CategoryItem
              key={`${data?.cat_name}_${data?.id}`}
              style={{width: '31%'}}
              bgColor={data?.cat_bg_color}
              title={data?.cat_name}
              icon={data?.cat_img}
            />
          )}
        />
      </Stack>
      <Stack justify="center" style={{width: '100%', marginTop: 10}}>
        <Button
          colorScheme="green"
          title={t('add')}
          style={{minWidth: 150}}
          onPress={() => handleSubmit(onAdd)()}
        />
      </Stack>
    </View>
  );
};
