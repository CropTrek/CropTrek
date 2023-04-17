import Map from "./MapBox";

export default function Home() {
    return (
      <div>
        <Map />
        <style jsx global>{`
          .mapboxgl-ctrl-geocoder {
            width: 100%;
            max-width: 600px;
          }
          #map {
            height: 500px;
          }
        `}</style>
      </div>
    );
  }