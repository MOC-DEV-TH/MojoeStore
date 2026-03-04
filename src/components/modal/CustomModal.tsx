import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useColors} from '@hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {isUndefined} from '@utils';

export const CustomModal = forwardRef((props: any, ref: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const customModalRef = useRef(null);
  const colors = useColors();
  const {children, onClose} = props;

  const open = () => {
    setModalVisible(true);
  };

  const close = () => {
    setModalVisible(false);
    onClose && onClose();
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
        close,
      };
    },
    [],
  );

  return (
    <Modal
      ref={customModalRef}
      isVisible={modalVisible}
      hideModalContentWhileAnimating
      useNativeDriver>
      <View
        style={{backgroundColor: colors.white, padding: 20, borderRadius: 7}}>
        <View>
          <TouchableOpacity
            onPress={close}
            style={{position: 'absolute', right: 0, top: 0}}>
            <Ionicons
              name="close-circle"
              size={25}
              color={colors.colorA7A7A7}
            />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  viewContainer: {
    borderRadius: 12,
    padding: 12,
  },
  buttonView: {
    flexDirection: 'row',
    marginTop: 20,
    columnGap: 10,
  },
});
