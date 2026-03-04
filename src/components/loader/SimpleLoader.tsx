import {ActivityIndicator, View} from 'react-native';

export const SimpleLoader = () => (
  <View style={{paddingVertical: 40, width: '100%'}}>
    <ActivityIndicator />
  </View>
);
