import Image from "next/image";
import { useRef, useState, useContext, useEffect, ChangeEvent, FormEvent, useReducer, ReactElement, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMapLoadScript } from "../hooks/useLoadScript";
import NotificationContext from "@/store/notification-context";
import { postImage } from "../../pages/api/upload";
import classes from "./new-spot.module.css";
import { PartialRequired, Spot as RawSpot} from '@/types';

type Spot = Omit<RawSpot, 'created_at' | 'updated_at'>;
// user_id って必須？
type PostSpot = PartialRequired<Spot, 'name' | 'type' | 'address' | 'lat' | 'lng' | 'user_id'>;
type SpotInput = Partial<PostSpot>;

type Location = {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

type useLocationArgs = {
  value: SpotInput;
}

const useLocation = ({ value }: useLocationArgs) => {
  const { name, address, lat, lng } = value;
  const hasLocationValue = !!name && !!address && !!lat && !!lng;

  const location: Location | null = hasLocationValue ? {
    name,
    address,
    lat,
    lng,
  } : null;

  return useState<Location | null>(location);
}

type LocationInputProps = {
  location: Location | null;
  onChange: (location: Location | null) => void;
  children?: ReactNode;
}

function LocationInput({ 
  location,
  onChange,
  children,
}: LocationInputProps): ReactElement {
  const defaultGeocode = { lat: 35.7022589, lng: 139.7744733 };
  const addressInputRef = useRef(null);
  const [isInvalidAddress, setIsInvalidAddress] = useState(false);
  const { loading, error } = useGoogleMapLoadScript();

  useEffect(() => {
    if (!addressInputRef.current) return;

    const options = {
      componentRestrictions: { country: "jp" },
      fields: ["address_components", "geometry", "icon", "name", 'formatted_address'],
      types: ["establishment"],
    };

    const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, options);

    autocomplete.addListener('place_changed', () => {
      // 選択された場所の情報を取得
      const place = autocomplete.getPlace();
      if (!place.name || !addressInputRef.current) return setIsInvalidAddress(true);

      const inputtedAddress = addressInputRef.current as any;

      const inputPlace = {
        name: place.name,
        address: inputtedAddress.value.slice(3),
      }

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: place.name }, (results, status) => {
        if (status !== "OK" || !results) return setIsInvalidAddress(true);
        setIsInvalidAddress(false);

        // 取得した情報から緯度経度を取得
        const { lat, lng } = results[0].geometry.location;
        onChange({
          ...inputPlace,
          lat: lat(),
          lng: lng(),
        });
      });
    });

    // イベントリスナーのクリーンアップ
    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [addressInputRef, onChange, setIsInvalidAddress]);

  const containerStyle = {
    width: "auto",
    height: "300px",
  };

  return (
    <>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="name">スポット名検索*</label>
          <input
            type="text"
            id="name"
            ref={addressInputRef}
            placeholder="東京タワー"
          />
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="name">スポット名 ※検索すると自動入力</label>
          <input
            type="text"
            id="name"
            value={location?.name ?? ""}
            onChange={(e) => {
              if (!location) return;
              onChange({ ...location, name: e.target.value })
            }}
            disabled={!location}
            placeholder="※検索すると自動入力されます"
          />
        </div>
      </div>
      {children}
      {isInvalidAddress && (
        <p className={classes.error}>※ 正しい住所を入力してください。</p>
      )}
      {loading && <p>マップを読み込み中...</p>}
      {error && <p>マップを読み込みに失敗ました。</p>}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ 
          lat: location?.lat ?? defaultGeocode.lat,
          lng: location?.lng ?? defaultGeocode.lng
        }}
        zoom={15}
      >
        <Marker position={{ lat: location?.lat ?? defaultGeocode.lat, lng: location?.lng ?? defaultGeocode.lng }} />
      </GoogleMap>
    </>
  )
}

const NewSpot = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [inputValue, updateInputValue] = useReducer(
    (state: SpotInput, newState: SpotInput) => ({ ...state, ...newState }),
    {}
  );
  const [location, setLocation] = useLocation({ value: inputValue });

  const notificationCtx = useContext(NotificationContext);
  const { data: session } = useSession();
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const displayImageUrl = image ? URL.createObjectURL(image) : null;

  const previewImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const enteredImage = event.target.files[0];
    setImage(enteredImage);
  };

  const sendSpotHandler = async (event: FormEvent<HTMLFormElement>) => {
    let userId;
    event.preventDefault();
    setIsInvalid(false);

    if (session) {
      // FIXME: session の型上 any にしているが、正直不明
      const sessionUser = session.user as any;
      userId = sessionUser?.id ?? '';
    }

    notificationCtx.showNotification({
      title: "投稿中...",
      message: "投稿中です。",
      status: "pending",
    });

    const imageUrl = await postImage(image);

    const postSpot = {
      ...inputValue,
      ...location,
      image: imageUrl,
      user_id: userId,
    }

    const valid = (value: SpotInput): value is PostSpot => {
      const { name, type, address, lat, lng, user_id } = value;
      return !!name && !!type && !!address && !!lat && !!lng && !!user_id;
    }

    if (!valid(postSpot)) return setIsInvalid(true);

    await fetch("/api/spots", {
      method: "POST",
      body: JSON.stringify(postSpot),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }

        const data = await response.json();
        throw new Error(data.message || "もう一度投稿を確認してください!");
      })
      .then(() => {
        notificationCtx.showNotification({
          title: "投稿完了!",
          message: "新たに投稿していただきありがとうございます！",
          status: "success",
        });
        router.push("/spots");
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "投稿に失敗しました!",
          message: error.message || "もう一度投稿を確認してください!",
          status: "error",
        });
      });
  };

  return (
    <form className={classes.form} onSubmit={sendSpotHandler}>

      <LocationInput
        location={location}
        onChange={setLocation}
      >
      {displayImageUrl && (
        <Image
          src={displayImageUrl}
          alt="プレビュー画像"
          width={250}
          height={160}
        />
      )}
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="image">スポット画像</label>
          <input type="file" id="image" onChange={previewImageHandler} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="type">スポットタイプ*</label>
        <input
          type="text"
          id="type"
          value={inputValue.type ?? ''}
          onChange={(e) => updateInputValue({ type: e.target.value })}
          placeholder="観光, カフェ, ライディング"
        />
      </div>
      </LocationInput>
      <div className={classes.control}>
        <label htmlFor="hp">HP</label>
        <input type="url" id="hp" value={inputValue.hp_url ?? ''} onChange={(e) => updateInputValue({ hp_url: e.target.value })} />
      </div>
      <div className={classes.control}>
        <label htmlFor="open_time">営業時間</label>
        <textarea
          id="open_time"
          rows={5}
          value={inputValue.open_time ?? ''}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="off_day">定休日</label>
        <input type="text" id="off_day" value={inputValue.off_day ?? ''} onChange={(e) => updateInputValue({ off_day: e.target.value })} />
      </div>
      <div className={classes.checkbox}>
        <label htmlFor="parking">駐車場あり</label>
        <input
          type="checkbox"
          id="parking"
          checked={inputValue.parking ?? false}
          onChange={(e) => updateInputValue({ parking: e.target.checked })}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="description">補足説明</label>
        <textarea
          id="description"
          rows={5}
          value={inputValue.description ?? ''}
          onChange={(e) => updateInputValue({ description: e.target.value })}
        />
      </div>
      {isInvalid && (
        <p className={classes.error}>※ 正しい情報を入力してください。</p>
      )}
      <button>スポットを保存</button>
    </form>
  );
};

export default NewSpot;
