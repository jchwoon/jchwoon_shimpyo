import styled from 'styled-components';
import React, { useEffect } from 'react';

const REACT_APP_MAP_API_KEY = "f6529a2e6cc9efdf495926fa540e1080"

interface LocationMapProps {
  latitude: number;
  longitude: number;
}

interface sizeProps {
  width: number;
  height: number;
}

export default function LocationMap({ latitude, longitude, width, height }: LocationMapProps & sizeProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${REACT_APP_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return <MapContainer id="map" width={width} height={height}></MapContainer>;
}

const MapContainer = styled.div<sizeProps>`
  ${({ width, height }) => `width: ${width}%; height: ${height}px`}
`;
