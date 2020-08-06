import React from 'react';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import AnnouncementScreen from '../screens/Announcement';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
      }}
      options={{
        transitionSpec: {
          open: TransitionSpecs.FadeInFromBottomAndroidSpec,
          close: TransitionSpecs.FadeOutToBottomAndroidSpec,
        },
      }}
      headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Announcement" component={AnnouncementScreen} />
    </Stack.Navigator>
  );
}

export default MainStack;
