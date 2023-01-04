import GoogleMapReact from "google-map-react";
import Link from "next/link";
import classes from "./map.module.css";

const Map = ({ lat, lng, prefecture, address1, address2 }) => {
  const defaultLatLng = {
    lat: 35.65869380417121,
    lng: 139.74541144047168,
  };

  const position = {
    lat: lat,
    lng: lng,
  };

  const handleApiLoaded = ({ map, maps }) => {
    new maps.Marker({
      map,
      position: position || defaultLatLng,
    });
  };

  return (
    <div className={classes.map}>
      <div className={classes.map_size}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
          defaultCenter={position || defaultLatLng}
          defaultZoom={16}
          onGoogleApiLoaded={handleApiLoaded}
        />
      </div>
      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${
          prefecture + address1 + address2
        }`}
      >
        <a target="_blank" rel="noopener noreferrer">
          google mapでみる
        </a>
      </Link>
    </div>
  );
};

export default Map;
