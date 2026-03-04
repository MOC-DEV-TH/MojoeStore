import {Button, Stack} from '@components';
import {useColors} from '@hooks';
import {View} from 'react-native';
import {CategoryNameInput, ChooseCategoryIcon} from './Inputs';
import {useForm} from 'react-hook-form';
import {EMIT_TAGS, SPACING} from '@constants';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {createCategory, getParentCategoryIconData} from '@slices';
import {useDispatch, useSelector} from 'react-redux';
import {eventBus} from '@utils';
import {ImageFluid} from 'src/components/ImageFluid';
import Config from 'react-native-config';
import {RootState} from '@redux';

export const Category = () => {
  const colors = useColors();
  const dispatch = useDispatch();
  const bottomTabHeight = useBottomTabBarHeight();
  const parentCategoryIconData = getParentCategoryIconData();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  // const shopId = getShopId();
  const {
    control,
    formState: {errors},
    watch,
    reset,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      categoryName: '',
    },
  });

  const onAdd = (data: any) => {
    const {categoryIcon, categoryName} = data;
    const {category_image, background_color} = JSON.parse(categoryIcon);
    const body = {
      category_name: categoryName,
      category_image: category_image,
      background_color: background_color,
      shop_id: userInfo?.data?.shop_id,
    };
    dispatch(
      createCategory({
        body: body,
        onSuccess: () => {
          reset();
          eventBus.emit(EMIT_TAGS.CATEGORY, 'Updated in Category');
        },
      }),
    );
  };

  console.log('getParentCategoryIconData', getParentCategoryIconData);

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
          label={'Category Name'}
          control={control}
          errors={errors}
        />
        <ChooseCategoryIcon
          label={'Choose Category Icon'}
          control={control}
          setValue={setValue}
          data={parentCategoryIconData}
          errors={errors}
          watch={watch}
          iconOnly
          selectedItemLayout={(data: any) => (
            <View
              style={{
                width: 70,
                height: 70,
                // borderWidth: 1,
                borderColor: '#ddd',
                padding: 15,
                borderRadius: 10,
                backgroundColor: data.background_color,
              }}>
              <ImageFluid src={`${Config.DOMAIN}/${data.category_image}`} />
            </View>
          )}
        />
      </Stack>
      <Stack justify="center" style={{width: '100%', marginTop: 10}}>
        <Button
          colorScheme="green"
          title="Add"
          style={{minWidth: 150}}
          onPress={() => handleSubmit(onAdd)()}
        />
      </Stack>
    </View>
  );
};
