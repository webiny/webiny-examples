import React from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '../utils/constants';

import Header from '../components/Header';
import Announcement from '../components/Announcement';

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  selectedCount: {
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 24,
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {fontSize: 20, color: theme.background},
  clearInput: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  clearIcon: {height: 24, width: 24},
  listContainer: {flex: 1},
  container: {flex: 1, padding: 24, paddingBottom: 0},
  memberInputContainer: {marginTop: 24},
});

function CreateAnnouncement({route, navigation}) {
  return (
    <View style={styles.mainContainer}>
      <Header title={route.name} canGoBack={true} />
      <View style={styles.container}>
        <Announcement channelId={route.params.channelId} />
      </View>
    </View>
  );
}

export default CreateAnnouncement;
