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

export const CustomBottomModal = forwardRef((props: any, ref: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const customBottomModalRef = useRef(null);
  const colors = useColors();
  const {children, onClose, noPadding} = props;

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
      ref={customBottomModalRef}
      testID={'modal'}
      isVisible={modalVisible}
      onSwipeComplete={close}
      swipeDirection={['down']}
      style={styles.view}>
      <View
        style={{
          backgroundColor: colors.white,
          paddingVertical: noPadding ? 0 : 40,
          paddingHorizontal: noPadding ? 0 : 20,
          borderRadius: 7,
        }}>
        <View>
          <TouchableOpacity
            onPress={close}
            style={{
              position: 'absolute',
              right: noPadding ? 20 : 0,
              top: noPadding ? 15 : 0,
              zIndex: 9,
            }}>
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
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
