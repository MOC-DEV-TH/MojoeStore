import React from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useColors} from '@hooks';

const FallbackUI = (props: any) => {
  const colors = useColors();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Opp!</Text>
        <Text style={styles.subtitle}>There's an error</Text>
        <View style={{marginTop: 15}}>
          <Text>
            Sorry for the inconvenience. We will repair it as soon as possible.
          </Text>
          <Text style={styles.error}>
            {props?.error?.toString() || 'Something was wrong'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.primary}]}
          onPress={() => props?.actionBtn()}>
          <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: '400',
    paddingBottom: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: '800',
    color: '#000',
  },
  error: {
    paddingVertical: 16,
  },
  button: {
    borderRadius: 50,
    padding: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default FallbackUI;
