import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import DrawerItem from "../components/DrawerItem";
import Icon from "../components/Icon";
import axios from 'axios';

import nowTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
})  {
  const [screen, setScreen] = useState([]);
  // let screens = [];
  async function load() {
    const {data} = await axios.get('http://192.168.0.141:5000/tramite/GetSectorUniversitarios')
    setScreen(data)
    // .then((response)=>{
    //   console.log(response.data, "res")
    //   setScreen(response.data)
    //   // screens = response.data;
    // })
    // .catch((error) => {
    //   console.log(error)
    // })

  }

  useEffect(() => { 
    load();
  }, [])

  

  // axios.get('http://192.168.0.141:5000/tramite/GetSectorUniversitarios')
  // .then((response)=>{
  //   console.log(response.data, "res")
  //   setScreen(response.data)
  //   screens = response.data;
  // })
  // .catch((error) => {
  //   console.log(error)
  // })

  // const insets = useSafeArea();
  console.log(screen, "sd")
  // const screens = [
  //   "Tramites",
  //   "Components",
  //   "Articles",
  //   "Profile",
  //   "Account",
  // ];
  return (
    <Block
      style={styles.container} 
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon
            name="align-left-22x"
            family="NowExtra"
            size={15}
            color={"white"}
          />
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screen.map((item, index) => {
            return (
              <DrawerItem
                title={item.nombre}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
          <Block
            style={{ borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10}}
          />
          <Text
            color={nowTheme.COLORS.WHITE}
            style={{ marginTop: 30, marginLeft: 20, marginBottom: 10, fontFamily: 'montserrat-regular', fontWeight: '300', fontSize: 12}}
          >
            DOCUMENTATION
          </Text>
        </Block>
        <DrawerItem title="GETTING STARTED" navigation={navigation}/>
        <DrawerItem title="LOGOUT" navigation={navigation}/>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center"
  },
  headerIcon: {
    marginTop: -20
  },
  logo: {
    height: 40,
    width: 37
  }
});

export default CustomDrawerContent;
