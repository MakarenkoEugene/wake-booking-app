import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

const API_KEY = 'AIzaSyC0RadiVxco1sKS_mVE2T-EFnF4tW6WH1k';
export const StaticGMap = ({ zoom = 10, height = 300, width = 500, location }) => {
  if (!location) return null;
  const { lat, lng } = location;

  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap&markers=color:0x15BE8F%7C%7C${lat},${lng}&key=${API_KEY}`;
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export const GMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(({ onChange, value, defaultZoom }) => (
  <GoogleMap
    defaultZoom={defaultZoom || 6}
    onClick={({ latLng: { lat, lng } }) => onChange && onChange({ lat: lat(), lng: lng() })}
    defaultCenter={value}
  >
    <Marker position={value} />
  </GoogleMap>
));
