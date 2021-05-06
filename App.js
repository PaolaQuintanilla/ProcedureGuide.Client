import React from 'react';
import { useFonts } from 'expo-font';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import Screens from './src/navigation/Screens';
import nowTheme from './src/constants/Theme';


export default function App() {
  let [isLoad] = useFonts({
    'montserrat-regular': require('./src/assets/font/Montserrat-Regular.ttf'),
    'montserrat-bold': require('./src/assets/font/Montserrat-Bold.ttf')
  })

  if (!isLoad) {
    return <AppLoading />
  } else {
    return (
      <NavigationContainer>
        <GalioProvider theme={nowTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    );
  }
}
