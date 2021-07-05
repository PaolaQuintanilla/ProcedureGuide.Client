import React, { useState,useEffect} from 'react';
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AxiosFactory from '../api/AxiosFactory';
import Paperworks from '../screens/Paperworks';
import InfoPaperwork from '../screens/InfoPaperwork';
// drawer
import CustomDrawerContent from "./Menu";
// header for screens
import Header from '../components/Header';
import nowTheme from "../constants/Theme";
import Direction from '../screens/Direction';
import Reception from '../screens/Reception';
import TodoList from '../screens/TodoList';

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function PaperworksStack(props) {
  return (
    <Stack.Navigator initialRouteName={props.route.name} mode="card" headerMode="screen">
      <Stack.Screen
        name={props.route.name}
        component={Paperworks}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              title={props.route.name}
              navigation={props.navigation}
              scene={scene}
            />
          ),
          backgroundColor: '#FFFFFF'
        }}
        initialParams={{ itemId: props.route.params?.id }}
      />
      <Stack.Screen
        name="InfoPaperwork"
        component={InfoPaperwork}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Requisitos"
              back
              black
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="TodoList"
        component={TodoList}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Lista de Requisitos"
              back
              black
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Direccion"
        component={Direction}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              black
              transparent
              title="Direccion"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ReceptionsStack(props) {
  return (
    <Stack.Navigator initialRouteName={props.route.name} mode="card" headerMode="screen">
      <Stack.Screen
        name="Oficinas y Ventanillas"
        component={Reception}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Oficina y Ventanilla"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppStack() {

  const [sectores, setSectores] = useState([]);
  async function load() {
    const data = await AxiosFactory('paperwork/GetFaculties').get()
    setSectores(data.data)
  }

  useEffect(() => { 
    load();
  }, [])

  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Paperworks" component={PaperworksStack} options={{title: "folder"}}/>
      {sectores?.map((sector, i) => {
        return(
          <Drawer.Screen key={i} name={sector.name} component={PaperworksStack} initialParams={{id: sector.id}}/>
        )
      })}
      <Drawer.Screen name="Oficinas y Ventanillas" component={ReceptionsStack} />
    </Drawer.Navigator>
  );
}
