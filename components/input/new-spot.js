import Image from "next/image";
import GoogleMapReact from "google-map-react";
import { useRef, useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import NotificationContext from "../../store/notification-context";

import classes from "./new-spot.module.css";

function NewSpot() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const nameInputRef = useRef();
  const typeInputRef = useRef();
  const prefectureInputRef = useRef();
  const address1InputRef = useRef();
  const address2InputRef = useRef();
  const hpInputRef = useRef();
  const openTimeInputRef = useRef();
  const offDayInputRef = useRef();
  const parkingInputRef = useRef();
  const descriptionInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  const { data: session } = useSession();
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [imageName, setImageName] = useState(null);

  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [marker, setMarker] = useState(null);

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  function handleApiLoaded(obj) {
    setMap(obj.map);
    setMaps(obj.maps);
    setGeocoder(new obj.maps.Geocoder());
  }

  function previewImageHandler(event) {
    const enteredImage = event.target.files[0];

    setImage(enteredImage);
    setCreateObjectURL(URL.createObjectURL(enteredImage));
    setImageName(event.target.files[0].name);
  }

  const uploadToPublicFolder = async () => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });
  };

  async function sendSpotHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredType = typeInputRef.current.value;
    const enteredPrefecture = prefectureInputRef.current.value;
    const enteredAddress1 = address1InputRef.current.value;
    const enteredAddress2 = address2InputRef.current.value;
    const enteredHp = hpInputRef.current.value;
    const enteredOpenTime = openTimeInputRef.current.value;
    const enteredOffDay = offDayInputRef.current.value;
    const enteredParking = parkingInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    if (
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredType ||
      enteredType.trim() === "" ||
      !enteredPrefecture ||
      enteredPrefecture.trim() === "" ||
      !enteredAddress1 ||
      enteredAddress1.trim() === "" ||
      !enteredAddress2 ||
      enteredAddress2.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    const address = enteredPrefecture + enteredAddress1 + enteredAddress2;

    if (address) {
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
            setLat(results[0].geometry.location.lat());
            setLng(results[0].geometry.location.lng());
            console.log(results[0].geometry.location.lat());
            console.log(results[0].geometry.location.lng());
          }
        }
      );
    }

    let userId;

    if (session) {
      userId = session.user.id;
    }

    notificationCtx.showNotification({
      title: "投稿中...",
      message: "投稿中です。",
      status: "pending",
    });

    await fetch("/api/spots", {
      method: "POST",
      body: JSON.stringify({
        name: enteredName,
        image: imageName,
        type: enteredType,
        prefecture: enteredPrefecture,
        address1: enteredAddress1,
        address2: enteredAddress2,
        hp_url: enteredHp,
        open_time: enteredOpenTime,
        off_day: enteredOffDay,
        parking: enteredParking,
        description: enteredDescription,
        lat: lat,
        lng: lng,
        userId: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "もう一度投稿を確認してください!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "投稿完了!",
          message: "新たに投稿していただきありがとうございます！",
          status: "success",
        });
        router.push("/spots")
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "投稿に失敗しました!",
          message: error.message || "もう一度投稿を確認してください!",
          status: "error",
        });
      });

    uploadToPublicFolder();
  }

  return (
    <form className={classes.form} onSubmit={sendSpotHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="name">スポット名*</label>
          <input
            type="text"
            id="name"
            ref={nameInputRef}
            placeholder="東京タワー"
          />
        </div>
      </div>
      {createObjectURL && (
        <Image
          src={createObjectURL}
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
          ref={typeInputRef}
          placeholder="観光, カフェ, ライディング"
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="prefecture">都道府県*</label>
        <input
          type="text"
          id="prefecture"
          ref={prefectureInputRef}
          placeholder="東京都"
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="address1">住所1*</label>
        <input
          type="text"
          id="address1"
          ref={address1InputRef}
          placeholder="港区"
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="address2">住所2*</label>
        <input
          type="text"
          id="address2"
          ref={address2InputRef}
          placeholder="芝公園４丁目２−８"
        />
      </div>
      <div style={{ height: "300px", width: "300px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
          defaultCenter={defaultLatLng}
          defaultZoom={16}
          onGoogleApiLoaded={handleApiLoaded}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="hp">HP</label>
        <input type="url" id="hp" ref={hpInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="open_time">営業時間</label>
        <textarea id="open_time" rows="5" ref={openTimeInputRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="off_day">定休日</label>
        <input type="text" id="off_day" ref={offDayInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="parking">駐車場情報</label>
        <input type="text" id="parking" ref={parkingInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="description">補足説明</label>
        <textarea
          id="description"
          rows="5"
          ref={descriptionInputRef}
        ></textarea>
      </div>
      {isInvalid && (
        <p className={classes.error}>※ 正しい情報を入力してください。</p>
      )}
      <button>スポットを保存</button>
    </form>
  );
}

export default NewSpot;
