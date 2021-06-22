import React, { useState, useEffect } from "react";
import { Text } from "galio-framework";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import Map from "../components/Map";

export default function direccion(props) {
    const [position, setPosition] = useState(null);
    const [markers, setMarkers] = useState([]);
    const getGeolocation = async () => {
        const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
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

    return (
        <View style={styles.container}>
            {(position && (
                <View style={styles.mapsView}>
                    <Map position={position} positionEnd={props.coordinates} markers={markers} />
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    mapsView: {
        width: "100%",
        height: "100%",
    },
});