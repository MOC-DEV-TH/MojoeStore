import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {navigate} from '@navigations';
import {RootState} from '@redux';
import {Alert, StyleSheet, View} from 'react-native';
import {attemptLogout, hideMessageRoot} from '@slices';
import {useColors} from '@hooks';
import {Button, Text} from '@components';
import {SvgXml} from 'react-native-svg';
import {IconSvg} from '@svgs';

export const MessageModal = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    type,
    isShowMessage,
    title,
    message,
    btnLeftText,
    btnRightText,
    leftActionType,
    rightActionType,
    leftAction,
    rightAction,
  } = useSelector((state: RootState) => state.message);
  const dispatch = useDispatch();
  const colors = useColors();
  const isSuccess = type === 'success';
  const isError = type === 'error';
  const bodyMessage =
    typeof message === 'string' ? message : JSON.stringify(message);
  const is401 = bodyMessage == '401';

  useEffect(() => {
    if (isShowMessage) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [isShowMessage]);

  const close = () => {
    if (is401) return;
    dispatch(hideMessageRoot());
  };

  const pressLeft = (leftActionType: any, leftAction: any) => {
    switch (leftActionType) {
      case 'dispatch':
        dispatch(leftAction);
        break;
      case 'navigate':
        navigate(leftAction);
        break;
      case 'customFunc':
        close();
        leftAction();
        break;
      default:
        close();
        break;
    }
  };

  const pressRight = (rightActionType: any, rightAction: any) => {
    switch (rightActionType) {
      case 'dispatch':
        dispatch(rightAction);
        break;
      case 'navigate':
        navigate(rightAction);
        break;
      default:
        close();
        break;
    }
  };

  return (
    <Modal
      isVisible={modalVisible}
      hideModalContentWhileAnimating
      useNativeDriver
      onBackdropPress={close}
      onBackButtonPress={close}>
      <View
        style={[styles.viewContainer, {backgroundColor: colors.colorF1F1F1}]}>
        {isSuccess && <SvgXml xml={IconSvg.success} />}

        {isError && <SvgXml xml={IconSvg.error} />}

        <View style={{alignItems: 'center'}}>
          <Text
            fontStyle="FW600_16"
            textColor={String(colors.black)}
            style={{marginVertical: 10}}>
            {title}
          </Text>
          <Text style={{textAlign: 'center'}}>
            {is401
              ? 'ဝင်ရောက်မှုသက်တမ်းကုန်ဆုံးသွားပါပြီ။ ပြန်လည် လော့ခ်အင် ဝင် ရောက် ပေးပါ။'
              : bodyMessage}
          </Text>
        </View>

        <View style={styles.buttonView}>
          {is401 ? (
            <Button
              style={{flex: 1}}
              colorScheme={'error'}
              onPress={() => {
                dispatch(attemptLogout());
                dispatch(hideMessageRoot());
              }}
              title={'OK'}
            />
          ) : (
            <>
              {btnLeftText && (
                <Button
                  style={{flex: 1}}
                  colorScheme={isSuccess ? 'green' : 'error'}
                  onPress={() => pressLeft(leftActionType, leftAction)}
                  title={btnLeftText}
                />
              )}
              {btnRightText && (
                <Button
                  onPress={() => pressRight(rightActionType, rightAction)}
                  title={btnRightText}
                />
              )}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    borderRadius: 12,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    marginTop: 20,
    columnGap: 10,
  },
});
