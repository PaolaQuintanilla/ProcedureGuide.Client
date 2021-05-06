import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

function HomeScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:20}}>Home Screen</Text>
      <TouchableOpacity
        style={{marginTop:20, width:200, height:50, backgroundColor:'ff5204', padding:10, alignItems:"center", borderRadius:5}}
        onPress={() => props.navigation.openDrawer()}
      >
          <Text>Ir a Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

function PerfilScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize:20}}>Home Screen</Text>
      </View>
    );
  }

const Drawer = createDrawerNavigator();

function Navigation() {
  return (
    <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Perfil" component={PerfilScreen} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;