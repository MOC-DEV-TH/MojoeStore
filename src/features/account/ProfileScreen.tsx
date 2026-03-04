import {
  AppSelectField,
  AppTextFiled,
  BaseView,
  Button,
  StandardPadding,
  Text,
} from '@components';
import {SPACING} from '@constants';
import {useColors, useFonts} from '@hooks';
import {getProfile, getUserInfo, updateProfile} from '@slices';
import {IconSvg} from '@svgs';
import {useForm} from 'react-hook-form';
import {StyleSheet, View, Text as RNText} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';

export const ProfileScreen = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const dispatch = useDispatch();
  const fonts = useFonts();
  const colors = useColors();
  const userInfo: any = getUserInfo() || {};

  const onSubmit = ({name, email}: any) => {
    dispatch(
      updateProfile({
        body: {
          ...(name ? {name} : {name: userInfo.name || ''}),
          ...(email ? {email} : {email: userInfo.email || ''}),
          shop_id: userInfo?.shop_id,
        },
        onSuccess: () => {
          reset();
          dispatch(getProfile());
        },
      }),
    );
  };

  return (
    <BaseView noPadding>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: SPACING['STANDARD'],
          paddingVertical: 30,
          borderBottomWidth: 1,
          borderColor: colors.colorF1F1F1,
        }}>
        <SvgXml
          xml={IconSvg.userCircle}
          width={100}
          style={{marginBottom: 15}}
        />
        <RNText style={{...fonts.en.FW600_14, color: colors.black}}>
          {userInfo.name}
        </RNText>
        <RNText style={{...fonts.en.FW400_10}}>{userInfo.email}</RNText>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            padding: SPACING['LARGE'],
          }}>
          <View style={{width: '100%', marginBottom: 20}}>
            <Text fontStyle="FW400_12" style={{paddingBottom: 6}}>
              Name
            </Text>
            <AppTextFiled
              name="name"
              control={control}
              error={errors?.name?.message}
              placeholder={userInfo.name}
            />
          </View>
          <View style={{width: '100%'}}>
            <Text fontStyle="FW400_12" style={{paddingBottom: 6}}>
              Email
            </Text>
            <AppTextFiled
              name="email"
              type="email"
              control={control}
              error={errors?.email?.message}
              placeholder={userInfo.email}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 100,
            }}>
            <Button
              title="Save"
              colorScheme="green"
              style={{minWidth: 150}}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
    </BaseView>
  );
};
