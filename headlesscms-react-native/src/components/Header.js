import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {theme, deviceWidth} from '../utils/constants';

const styles = StyleSheet.create({
  title: {fontSize: 20, fontWeight: '700', color: theme.background},
  subtitle: {fontSize: 16, fontWeight: '500', color: theme.background},
  header: {
    height: 60,
    width: deviceWidth,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.primary,
  },
  button: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'absolute',
    zIndex: 1
  },
  alignCenter: {
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

function Header({title, subtitle, canGoBack}) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {canGoBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}>
          <Image
            style={styles.icon}
            source={require('../assets/chevron_left.png')}
          />
        </TouchableOpacity>
      )}
      <View style={styles.alignCenter}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}

export default Header;
