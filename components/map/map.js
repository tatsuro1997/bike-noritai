import GoogleMapReact from "google-map-react";
import Link from "next/link";

export default function Map() {
  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  const handleApiLoaded = ({ map, maps }) => {
    new maps.Marker({
      map,
      position: defaultLatLng,
    });
  };

  return (
    <>
      <div style={{ height: "300px", width: "300px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
          defaultCenter={defaultLatLng}
          defaultZoom={16}
          onGoogleApiLoaded={handleApiLoaded}
        />
      </div>
      <Link href={`https://www.google.com/maps/search/?api=1&query=秋葉原駅`}>
        <a target="_blank" rel="noopener noreferrer">
          google mapでみる
        </a>
      </Link>
    </>
  );
}
