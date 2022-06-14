import { useState } from "react";
import GoogleMapReact from "google-map-react";

export default function MapSearch() {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [address, setAddress] = useState(null);
  const [marker, setMarker] = useState(null);

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  const handleApiLoaded = (obj) => {
    setMap(obj.map);
    setMaps(obj.maps);
    setGeocoder(new obj.maps.Geocoder());
  };

  const search = () => {
    geocoder.geocode(
      {
        address,
      },
      (results, status) => {
        if (status === maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          if (marker) {
            marker.setMap(null);
          }
          setMarker(
            new maps.Marker({
              map,
              position: results[0].geometry.location,
            })
          );
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng());
        }
      }
    );
  };

  return (
    <>
      <div>
        <input type="text" onChange={(e) => setAddress(e.target.value)} />
        <button type="button" onClick={search}>
          Search
        </button>
      </div>
      <div style={{ height: "300px", width: "300px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
          defaultCenter={defaultLatLng}
          defaultZoom={16}
          onGoogleApiLoaded={handleApiLoaded}
        />
      </div>
    </>
  );
}
