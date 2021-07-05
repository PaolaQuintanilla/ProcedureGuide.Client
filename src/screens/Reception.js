import React, { useState, useEffect } from "react";
import AxiosFactory from '../api/AxiosFactory';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import Map from "../components/Map";

function Receptions() {
    const [position, setPosition] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [coordinate, setCoordinate] = useState([]);
    async function load() {
        const { data } = await AxiosFactory('paperwork/GetPaperworkReceptions').get();
        createMarkers(data)
    }

    function createMarkers(list) {
        let positionEnd = list.pop()
        let coordinate = {
            yCoordinate: positionEnd.coordinate.xCoordinate,
            xCoordinate: positionEnd.coordinate.yCoordinate,
            message: positionEnd.name
        }

        setCoordinate(coordinate)
        setPosition({latitude: positionEnd.coordinate.yCoordinate, longitude: positionEnd.coordinate.xCoordinate})
        var result =list.map( m => {
            return {
                latitude: m.coordinate.yCoordinate,
                longitude: m.coordinate.xCoordinate,
                message: m.name
            }
        })
        setMarkers(result);
    }

    useEffect(() => {
        load();
    }, [])

    return (
        <View style={styles.container}>
            {(position && (
                <View style={styles.mapsView}>
                    <Map position={position} positionEnd={coordinate} markers={markers} />
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

export default Receptions;