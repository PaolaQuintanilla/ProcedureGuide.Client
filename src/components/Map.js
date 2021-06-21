import React, { useRef, useCallback } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

function Map({ position, positionEnd, markers }){
  return (
    <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        showsUserLocation
        initialRegion={{
            latitude: position.latitude,//Y
            longitude: position.longitude,//X
            latitudeDelta: 0.0073,
            longitudeDelta: 0.0064
        }}
      minZoomLevel={9}
    >
      {markers.map((marker, index) => (
        <MapView.Marker
          key={`map-item-${index}`}
          coordinate={{
            latitude: marker?.latitude,
            longitude: marker?.longitude,
          }}
          title={marker?.message}
          description={marker?.description}
        />
      ))}
      <MapView.Marker
        coordinate={
          {
            latitude: positionEnd?.xCoordinate,
            longitude: positionEnd?.yCoordinate,
          }
        }
        title={positionEnd?.message}
      />
    </MapView>
  );
}

export default Map;