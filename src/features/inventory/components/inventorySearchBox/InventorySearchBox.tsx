import {AppTextFiled, Text} from '@components';
import {hideInventorySearchBox, isSearchBoxShow} from '@slices';
import {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {BackHandler, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {SPACING} from '@constants';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

export const InventorySearchBox = ({onSearch}: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const isSearchShow = isSearchBoxShow();
  const {watch, control} = useForm({
    defaultValues: {
      search: '',
    },
  });

  const onClose = () => {
    dispatch(hideInventorySearchBox());
  };

  useEffect(() => {
    onSearch(watch('search'));
  }, [watch('search')]);

  if (!isSearchShow) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onClose}
      style={styles.container}>
      <View style={styles.modal}>
        <Text style={{paddingBottom: 10}}>{t('search')}</Text>
        <AppTextFiled name="search" control={control} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    flex: 1,
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    padding: SPACING['STANDARD'],
    elevation: 5,
  },
});
