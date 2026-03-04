import {Image, StyleProp, ImageStyle} from 'react-native';
import {FC} from 'react';

interface ImageFluidProps {
  src: any;
  width?: any;
  intWidth?: number;
  intHeight?: number;
  resizeMode?: any;
  rounded?: number;
  isLocalSource?: boolean;
  style?: StyleProp<ImageStyle>;
}

export const ImageFluid: FC<ImageFluidProps> = props => {
  const {
    src,
    width,
    intWidth,
    intHeight,
    resizeMode,
    rounded,
    isLocalSource,
    style,
  } = props;

  return (
    <Image
      source={isLocalSource ? src : {uri: src}}
      resizeMode={resizeMode || 'contain'}
      style={[
        style,
        {
          width: width || '100%',
          height: undefined,
          aspectRatio: (intWidth || 200) / (intHeight || 200),
          borderRadius: rounded || 0,
        },
      ]}
    />
  );
};

ImageFluid.defaultProps = {
  isLocalSource: false,
};
