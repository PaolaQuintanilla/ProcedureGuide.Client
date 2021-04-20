import React, { useState, useEffect } from "react";
import { Block, Text } from "galio-framework";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from "expo-location";
import Map from "../components/Map";

export default function direccion() {
    const [location, setLocation] = useState(null);
    const [position, setPosition] = useState(null);
    const [markers, setMarkers] = useState([]);

    // let coordinates = []
    const getGeolocation = async () => {
        // await navigator.geolocation.getCurrentPosition(
        //     position => {
        //         let location = JSON.stringify(location)
        //         console.log(position, "Position")
        //         setLocation({ location });
        //     }
        // )
        const { coords } = await Location.getCurrentPositionAsync({});
        // console.log(coords, "coords")
        setMarkers([
            {
              latitude: coords.latitude,
              longitude: coords.longitude,
              message: "You are here",
              description: "You should not be here",
            },
          ]);
        
        setPosition(coords)
    }
    useEffect(() => {
        getGeolocation();
    }, [])

    const coordinates = [
            {
                // latitude: coords.latitude,
                // longitude: coords.longitude
                latitude: -17.466806,
                longitude: -66.171924
            },
            {
                latitude: -17.419523180619915,
                longitude: -66.13560526815614
            }
        ]
    const origin = { latitude: -17.466806, longitude: -66.171924 };
    const destination = { latitude: -17.419523180619915, longitude: -66.13560526815614 };
    const GOOGLE_MAPS_APIKEY = '…';

    return (
        // <MapView
        //     style={{ flex: 1 }}
        //     provider={PROVIDER_GOOGLE}
        //     showsUserLocation
        //     initialRegion={{
        //         // latitude: position.latitude,//37.78825,
        //         latitude: -17.466806,
        //         // longitude: position.longitude,//-122.4324,
        //         longitude: -66.171924,
        //         latitudeDelta: 0.0922,
        //         longitudeDelta: 0.0421
        //     }}>
        //     {
        //         coordinates.map( (coordinate, index) => {
        //             return (
        //                 <Marker key={index} coordinate={coordinate}/>
        //             )
        //         } )
        //     }
        //     <Marker
        //         coordinate={
        //         {
        //             latitude: -17.419523180619915,
        //             longitude: -66.13560526815614,
        //             }
        //         }
                
        //     />
        //     {/* <MapViewDirections
        //         origin={origin}
        //         destination={destination}
        //         apikey={GOOGLE_MAPS_APIKEY}
        //     /> */}
        // </MapView >
        <View style={styles.container}>
            {(position && (
                <View style={styles.mapsView}>
                    <Map position={position} markers={markers} />
                </View>
            )) || (
                    <View>
                        <Text>GPS unavailable</Text>
                    </View>
                )}
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    mapsView: {
      width: "100%",
      height: "100%",
    },
  });