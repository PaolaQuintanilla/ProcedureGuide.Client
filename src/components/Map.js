import React, { useRef, useCallback } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";

function Map({ position, markers }) {

  return (
    <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        showsUserLocation
        initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            longitudeDelta: 0.0922,
            latitudeDelta: 0.0421,
        }}
      minZoomLevel={9}
    >
      {markers.map((marker, index) => (
        <MapView.Marker
          key={`map-item-${index}`}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.message}
          description={marker.description}
        />
      ))}
      <MapView.Marker
        coordinate={
           {
            latitude: -17.419523180619915,
            longitude: -66.13560526815614,
            }
        }
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapView: {
    width: "100%",
    height: "100%",
  },
});

export default Map;