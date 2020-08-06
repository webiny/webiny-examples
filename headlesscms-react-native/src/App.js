import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import client from './graphql/client';
import {theme} from './utils/constants';
import MainStack from './navigation/index';
import {ApolloProvider} from '@apollo/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 0, backgroundColor: theme.primary}} />
        <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
          <StatusBar barStyle="light-content" backgroundColor={theme.primary} />
          <MainStack />
        </SafeAreaView>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
