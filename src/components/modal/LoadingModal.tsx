import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootState} from '@redux';
import {useSelector} from 'react-redux';

export const LoadingModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    if (isLoading) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [isLoading]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size={'small'} color={'red'} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0008',
  },
  modalView: {
    margin: 20,
    width: 45,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
