import {AppTextFiled, BaseView, StandardPadding, Text} from '@components';
import {useColors} from '@hooks';
import {goBack} from '@navigations';
import {ReactNode, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ISearchBaseViewProps {
  children: ReactNode;
  title: string;
  onSearch: any;
  style?: StyleProp<ViewStyle>;
}

export const SearchBaseView = (props: ISearchBaseViewProps) => {
  const insets = useSafeAreaInsets();
  const {children, title, onSearch, style} = props;
  const colors = useColors();

  const {
    handleSubmit,
    control,
    watch,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    onSearch(watch('search'));
  }, [watch('search')]);

  return (
    <BaseView>
      <View style={{paddingTop: insets.top}}>
        <StandardPadding>
          <View style={{position: 'relative'}}>
            <Text
              fontStyle="FW600_16"
              textAlign="center"
              style={{marginBottom: 15}}>
              {title}
            </Text>
            <TouchableOpacity
              onPress={() => goBack()}
              style={{position: 'absolute', right: 0, top: 0}}>
              <Ionicons
                name="close-circle"
                color={colors.colorA7A7A7}
                size={19}
              />
            </TouchableOpacity>
          </View>
          <AppTextFiled
            name="search"
            type="search"
            require
            control={control}
            inputHeight={42}
            rightIcon={
              <Ionicons
                name="search-outline"
                size={23}
                color={colors.colorA7A7A7}
              />
            }
          />
        </StandardPadding>
      </View>
      <ScrollView>
        <View style={[style, {flex: 1}]}>{children}</View>
      </ScrollView>
    </BaseView>
  );
};
