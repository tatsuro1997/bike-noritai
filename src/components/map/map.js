import { GoogleMap, Marker } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import Link from "next/link";
import classes from "./map.module.css";

const Map = ({ lat, lng, address }) => {
  const center = { lat: lat, lng: lng };
  const { loading, error } = useLoadScript;
  const containerStyle = {
    width: "auto",
    height: "180px",
  };

  return (
    <div className={classes.map}>
      <div className={classes.map_size}>
        {loading && <p>マップを読み込み中...</p>}
        {error && <p>マップを読み込みに失敗ました。</p>}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
      <Link href={`https://www.google.com/maps/search/?api=1&query=${address}`}>
        <a target="_blank" rel="noopener noreferrer">
          google mapでみる
        </a>
      </Link>
    </div>
  );
};

export default Map;
