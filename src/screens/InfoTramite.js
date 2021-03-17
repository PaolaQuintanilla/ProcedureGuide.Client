import React from 'react';
import { Block } from 'galio-framework';
// import { List } from 'react-native-paper';
import { StyleSheet, ScrollView, Text, View } from 'react-native';



function InfoTramite ({route}) {
    const {tramite} = route.params;

    return (
        <Block style={styles.container}>
          <View style={styles.list}></View>
          <Block middle row style={{ marginTop: 150, marginBottom: 30}}>
            <Text
              color="white"
              size={16}
              style={{ fontFamily: 'montserrat-regular' }}
            >
              Coded by
            </Text>
            <Text>
              Hello
            </Text >


            {/* <Image
              source={Images.CreativeTimLogo}
              style={{
                height: 29,
                width: 129,
                marginLeft: theme.SIZES.BASE
              }}
            /> */}
          </Block>
        </Block>
    )    
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    justifyContent:'flex-start',
    alignItems: 'center',
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  list: {
    width: 100,
    height: 100,
    backgroundColor: "red"
  },
  title: { 
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default InfoTramite;