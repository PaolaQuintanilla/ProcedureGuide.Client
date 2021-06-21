import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Image } from "react-native";
import { Block, theme } from "galio-framework";
import Images from "../constants/Images";
import DrawerItem from "../components/DrawerItem";
import Icon from "../components/Icon";
import AxiosFactory from "../api/AxiosFactory";

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const [screen, setScreen] = useState([]);

  async function load() {
    const { data } = await AxiosFactory('paperwork/GetFaculties').get();
    setScreen(data)
  }

  useEffect(() => {
    load();
  }, [])

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Umss} />
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
                title={item.name}
                key={index}
                navigation={navigation}
                focused={state.index === index + 1 ? true : false}
              />
            );
          })}
          <DrawerItem
            title="Oficinas y Ventanillas"
            key={screen.length}
            navigation={navigation}
            focused={state.index === screen.length + 1 ? true : false}
          />
          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
            <Block
              style={{ borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10 }}
            />
          </Block>
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
    height: 50,
    width: 37
  }
});

export default CustomDrawerContent;
