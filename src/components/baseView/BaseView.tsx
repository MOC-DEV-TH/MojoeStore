import {SPACING} from '@constants';
import {ReactNode, useMemo} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

type BaseViewProps = {
  children: ReactNode;
  keyboardAvoid?: boolean;
  flex?: number;
  row?: boolean;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  overflow?: 'visible' | 'hidden' | 'scroll';
  backgroundColor?: string;
  noPadding?: boolean;
};

export const BaseView = (props: BaseViewProps) => {
  const {
    children,
    keyboardAvoid,
    flex,
    overflow,
    backgroundColor,
    row,
    alignItems,
    justifyContent,
    noPadding = false,
  } = props;
  const getStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return [
      {
        flex: flex || 1,
        flexDirection: row ? 'row' : 'column',
        alignItems,
        justifyContent,
        overflow,
        backgroundColor,
        paddingTop: noPadding ? 0 : SPACING['STANDARD'],
      },
    ];
  }, [flex, justifyContent, overflow, backgroundColor, noPadding]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={'rgba(0,0,0,0)'}
      />
      <View style={getStyle}>{children}</View>
    </>
  );
};

BaseView.defaultProps = {
  keyboardAvoid: false,
  backgroundColor: '#fff',
};
