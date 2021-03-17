import React from 'react';
import { Image } from 'react-native';
// import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';

import Screens from './src/navigation/Screens';
import Images from './src/constants/Images';
import nowTheme from './src/constants/Theme';
import articles from './src/constants/articles';

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground
];
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import MyDrawer from './src/navigation/index'

// export default function App() {
//   return(
//     <MyDrawer></MyDrawer>
//   )
// }

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };

  // async componentDidMount() {
  //   Font.loadAsync({
  //     'montserrat-regular': require('./src/assets/font/Montserrat-Regular.ttf'),
  //     'montserrat-bold': require('./src/assets/font/Montserrat-Bold.ttf')
  //   });

  //   this.setState({ fontLoaded: true });
  // }

  render() {
    // if (!this.state.isLoadingComplete) {
    //   return (
    //     <AppLoading
    //       startAsync={this._loadResourcesAsync}
    //       onError={this._handleLoadingError}
    //       onFinish={this._handleFinishLoading}
    //     />
    //   );
    // } else {
      return (
        <NavigationContainer>
          <GalioProvider theme={nowTheme}>
            <Block flex>
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      );
    // }
  }

  // _loadResourcesAsync = async () => {
  //   await Font.loadAsync({
  //     'montserrat-regular': require('./src/assets/font/Montserrat-Regular.ttf'),
  //     'montserrat-bold': require('./src/assets/font/Montserrat-Bold.ttf')
  //   });

  //   this.setState({ fontLoaded: true });
  //   return Promise.all([...cacheImages(assetImages)]);
  // };

  // _handleLoadingError = error => {
  //   // In this case, you might want to report the error to your error
  //   // reporting service, for example Sentry
  //   console.warn(error);
  // };

  // _handleFinishLoading = () => {
  //   if (this.state.fontLoaded) {
  //     this.setState({ isLoadingComplete: true });
  //   }
  // };
}
