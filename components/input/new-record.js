import Image from "next/image";
import { useRef, useState, useContext } from "react";

import NotificationContext from "../../store/notification-context";

import classes from "./new-record.module.css";

function NewRecord() {
  const [isInvalid, setIsInvalid] = useState(false);
  const dateInputRef = useRef();
  const weatherInputRef = useRef();
  const temperatureInputRef = useRef();
  const spendTimeInputRef = useRef();
  const distanceInputRef = useRef();
  const descriptionInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [imageName, setImageName] = useState(null);

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

    const enteredDate = dateInputRef.current.value;
    const enteredWeather = weatherInputRef.current.value;
    const enteredTemperature = temperatureInputRef.current.value;
    const enteredSpendTime = spendTime.current.value;
    const enteredDistance = distance.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    if (
      !enteredDate ||
      !enteredWeather ||
      !enteredTemperature ||
      enteredTemperature.trim() === "" ||
      !enteredSpendTime ||
      enteredSpendTime.trim() === "" ||
      !enteredDistance ||
      enteredDistance.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    notificationCtx.showNotification({
      title: "投稿中...",
      message: "投稿中です。",
      status: "pending",
    });

    await fetch("/api/records", {
      method: "POST",
      body: JSON.stringify({
        date: enteredDate,
        weather: enteredWeather,
        temperature: enteredTemperature,
        spend_time: enteredSpendTime,
        distance: enteredDistance,
        description: enteredDescription,
        image: imageName,
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
          throw new Error(data.message || "もう一度記録を確認してください!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "記録完了!",
          message: "新たに記録していただきありがとうございます！",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "記録に失敗しました!",
          message: error.message || "もう一度記録を確認してください!",
          status: "error",
        });
      });

    uploadToPublicFolder();
  }

  return (
    <form className={classes.form} onSubmit={sendSpotHandler}>
      <div>
        <label>スポット名</label>
      </div>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="date">訪問日</label>
          <input className={classes.date} type="date" id="date" ref={dateInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="weather">天気</label>
          <select id="weather" ref={weatherInputRef}>
            <option value="晴れ">晴れ</option>
            <option value="曇り">曇り</option>
            <option value="雨">雨</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="temperature">気温</label>
          <input
            type="number"
            id="temperature"
            ref={temperatureInputRef}
            placeholder="度"
          />
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="spend_time">滞在時間</label>
          <input
            type="number"
            id="spend_time"
            ref={spendTimeInputRef}
            placeholder="時間"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="distance">走行距離</label>
          <input
            type="number"
            id="distance"
            ref={distanceInputRef}
            placeholder="km"
          />
        </div>
      </div>
      <div className={classes.control}>
        <textarea
          id="description"
          rows="5"
          ref={descriptionInputRef}
          placeholder="スポットの感想やそこまでの道のりを記録してみよう。"
        ></textarea>
      </div>
      {isInvalid && (
        <p className={classes.error}>※ 正しい情報を入力してください。</p>
      )}
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
          <label htmlFor="image">画像を選択</label>
          <input type="file" id="image" onChange={previewImageHandler} />
        </div>
      </div>
      <div>
        <label>スポット追加</label>
      </div>
      <button>記録する</button>
    </form>
  );
}

export default NewRecord;
