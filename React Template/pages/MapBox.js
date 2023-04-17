import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { nanoid } from 'nanoid';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWxtZWRkZWJ5YXNzbWluIiwiYSI6ImNsZnBoOWpsMjAweGgzdmwwZXFxc3R4anMifQ.AHBgMj0tbhmwzf9-zzXgYA';

function Map() { 
  const [location, setLocation] = useState('');
  const [mapId, setMapId] = useState(null);

  useEffect(() => {
    if (!mapId) {
      setMapId(nanoid());
    } else {
      const map = new mapboxgl.Map({
        container: mapId,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-77.050, 38.889],
        zoom: 9,
      });

      

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Enter Location',
        countries: 'tn',
        // limit:3
      });

      map.addControl(geocoder);

      geocoder.on('result', (e) => {
        setLocation(e.result.place_name);
        console.log(e.result.place_name);
      });

    //   map.addControl(new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //       enableHighAccuracy: true
    //     },
    //     trackUserLocation: true,
    //     showUserLocation: true
    //   }));

      return () => map.remove();
    }
  }, [mapId]);

  return (
    <>
      <div>{location}</div>
      <div id={mapId} className="map"></div>
    </>
  );
}

export default function MapBox() {
  return (
    <div>
      <Map />
      {/* <style jsx global>{`
        .mapboxgl-ctrl-geocoder {
          width: 100%;
          max-width: 600px;
        }
        .map {
          height: 500px;
        }
      `}</style> */}
    </div>
  );
}
