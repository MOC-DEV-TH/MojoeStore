import {StyleProp, View, ViewStyle} from 'react-native';
import {FC} from 'react';

export interface StackProps {
  direction?: 'row' | 'column' | 'column-reverse' | 'row-reverse';
  items?: 'center' | 'flex-start' | 'flex-end';
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  rowSpace?: number;
  columnSpace?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  wrap?: boolean;
}

export const Stack: FC<StackProps> = props => {
  const {
    direction,
    children,
    rowSpace,
    columnSpace,
    items,
    justify,
    style,
    wrap,
  } = props;

  return (
    <View
      style={[
        style,
        {
          flexDirection: direction,
          rowGap: rowSpace,
          columnGap: columnSpace,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          alignItems: items,
          justifyContent: justify,
        },
      ]}>
      {children}
    </View>
  );
};

Stack.defaultProps = {
  direction: 'row',
  rowSpace: 0,
  columnSpace: 0,
  items: 'flex-start',
  justify: 'flex-start',
  wrap: false,
};
