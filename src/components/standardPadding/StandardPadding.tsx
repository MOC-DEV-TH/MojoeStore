import {SPACING} from '@constants';
import {View} from 'react-native';

export const StandardPadding = (props: any) => {
  const {children, direction} = props;

  let padded;

  switch (direction) {
    case 'v':
      padded = (
        <View style={{paddingVertical: SPACING['STANDARD']}}>{children}</View>
      );
      break;
    case 'h':
      padded = (
        <View style={{paddingHorizontal: SPACING['STANDARD']}}>{children}</View>
      );
      break;
    case 't':
      padded = (
        <View style={{paddingTop: SPACING['STANDARD']}}>{children}</View>
      );
      break;
    case 'b':
      padded = (
        <View style={{paddingBottom: SPACING['STANDARD']}}>{children}</View>
      );
      break;
    default:
      padded = (
        <View style={{paddingHorizontal: SPACING['STANDARD']}}>{children}</View>
      );
      break;
  }

  return padded;
};

StandardPadding.defaultProps = {
  direction: 'h',
};
