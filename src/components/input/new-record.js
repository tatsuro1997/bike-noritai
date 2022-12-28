import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState, useContext } from "react";
import { useSession } from "next-auth/react";
import NotificationContext from "../../store/notification-context";
import classes from "./new-record.module.css";

const NewRecord = ({ spotId }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const dateInputRef = useRef();
  const weatherInputRef = useRef();
  const temperatureInputRef = useRef();
  const runningTimeInputRef = useRef();
  const distanceInputRef = useRef();
  const descriptionInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  const { data: session } = useSession();
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [imageName, setImageName] = useState(null);
  let userId;

  if (!session) {
    router.replace("/auth");
  }

  if (session) {
    userId = session.user.id;
  }

  const previewImageHandler = (event) => {
    const enteredImage = event.target.files[0];

    setImage(enteredImage);
    setCreateObjectURL(URL.createObjectURL(enteredImage));
    setImageName(event.target.files[0].name);
  }

  const uploadToPublicFolder = async() => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });
  };

  const sendSpotHandler = async(event) => {
    event.preventDefault();
    const enteredDate = dateInputRef.current.value;
    const enteredWeather = weatherInputRef.current.value;
    const enteredTemperature = temperatureInputRef.current.value;
    const enteredRunningTime = runningTimeInputRef.current.value;
    const enteredDistance = distanceInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    if (
      !enteredDate ||
      !enteredWeather ||
      !enteredTemperature ||
      enteredTemperature.trim() === "" ||
      !enteredRunningTime ||
      enteredRunningTime.trim() === "" ||
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

    await fetch("/api/records/" + spotId, {
      method: "POST",
      body: JSON.stringify({
        date: enteredDate,
        weather: enteredWeather,
        temperature: enteredTemperature,
        running_time: enteredRunningTime,
        distance: enteredDistance,
        description: enteredDescription,
        image: imageName,
        uid: userId,
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
        router.replace(`/users/${session.user.id}`)
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
      <div className={classes.title}>
        <label>ツーリング記録</label>
      </div>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="date">訪問日</label>
          <input
            className={classes.date}
            type="date"
            id="date"
            ref={dateInputRef}
          />
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
          <label htmlFor="running_time">走行時間</label>
          <input
            type="number"
            id="running_time"
            ref={runningTimeInputRef}
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
        <label>スポットを選択</label>
      </div>
      <button>記録する</button>
    </form>
  );
}

export default NewRecord;
