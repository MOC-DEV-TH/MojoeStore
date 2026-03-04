import {BaseView, StandardPadding} from '@components';
import {useColors, useFonts} from '@hooks';
import {SCREENS, navigate} from '@navigations';
import {attemptLogout} from '@slices';
import {IconSvg} from '@svgs';
import {StyleSheet, TouchableOpacity, View, Text as RNText} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

export const AccountScreen = () => {
  const colors = useColors();
  const fonts = useFonts();
  const dispatch = useDispatch();

  return (
    <BaseView backgroundColor={'#f1f3f4'}>
      <StandardPadding>
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.PROFILE.name)}
            style={{
              borderBottomColor: colors.color212325,
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
            }}>
            <SvgXml xml={IconSvg.user} width={10} />
            <RNText style={{...fonts.en.FW600_14, flex: 1}}>Profile</RNText>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => dispatch(attemptLogout())}
            style={{
              borderBottomColor: colors.color212325,
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
            }}>
            <SvgXml xml={IconSvg.lock} />
            <RNText style={{...fonts.en.FW600_14, flex: 1}}>Logout</RNText>
          </TouchableOpacity>
        </View>
      </StandardPadding>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#ffffff',
    marginTop: 15,
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
