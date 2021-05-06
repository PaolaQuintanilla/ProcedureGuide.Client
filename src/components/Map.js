import React, { useRef, useCallback } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";

function Map({ position, positionEnd, markers }) {
  return (
    <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        showsUserLocation
        initialRegion={{
            latitude: position.latitude,//Y
            longitude: position.longitude,//X
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
            latitude: positionEnd?.yCoordinate,
            longitude: positionEnd?.xCoordinate,
          }
        }
        title={"Ventanilla Destino"}
        // description={marker.description}
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