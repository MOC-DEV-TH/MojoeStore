import {View} from 'react-native';
import {LANGUAGES_ARRAY, LANGUAGES_OBJECT} from 'src/assets/constants';
import {changeLanguage, getLanguage} from '@utils';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import {
  AppSelectField,
  AppTextFiled,
  BaseView,
  Button,
  LanguageSwitcher,
  Stack,
} from '@components';
import {ImageFluid} from 'src/components/ImageFluid';
import ImagesAsset from '@images';
import {LoginVM} from './LoginVM';
import {SvgXml} from 'react-native-svg';
import {IconSvg} from '@svgs';

export const LoginScreen = () => {
  const LoginViewModel = LoginVM();
  const currentLanguage = getLanguage();
  const {t} = useTranslation();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      shopcode: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('onSubmit Data', data);
    LoginViewModel.login(data?.email, data?.password);
  };

  return (
    <BaseView flex={1} justifyContent="space-between">
      <View style={{flex: 1, justifyContent: 'center', marginBottom: '-20%'}}>
        <Stack justify="center" wrap>
          <SvgXml xml={IconSvg.logo} />
          <View style={{width: '80%', marginTop: 45}}>
            {/* Form */}
            <View style={{marginBottom: 20}}>
              <LanguageSwitcher />
            </View>
            <View style={{marginBottom: 20}}>
              <AppTextFiled
                name="email"
                type="email"
                require
                control={control}
                error={errors?.email?.message}
                placeholder={t('email')}
              />
            </View>
            <View style={{marginBottom: 20}}>
              <AppTextFiled
                name="password"
                type="password"
                require
                control={control}
                requireMessage="Please enter your password"
                error={errors?.password?.message}
                placeholder={t('password')}
              />
            </View>
            <Button
              size="lg"
              colorScheme="primaryGradient"
              title={t('signin')}
              fullwidth
              onPress={handleSubmit(onSubmit)}
            />
            {/* Form */}
          </View>
        </Stack>
      </View>
      <Stack justify="center">
        <ImageFluid
          style={{zIndex: -1}}
          src={ImagesAsset.grocery}
          width={260}
          intWidth={297}
          intHeight={279}
          isLocalSource
        />
      </Stack>
    </BaseView>
  );
};
