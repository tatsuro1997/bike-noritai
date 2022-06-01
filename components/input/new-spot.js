import { useRef, useState, useContext } from "react";
import NotificationContext from "../../store/notification-context";

import classes from "./new-spot.module.css";

function NewSpot() {
  const [isInvalid, setIsInvalid] = useState(false);
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

  function sendSpotHandler(event) {
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

    notificationCtx.showNotification({
      title: "投稿中...",
      message: "投稿中です。",
      status: "pending",
    });

    fetch("/api/spots", {
      method: "POST",
      body: JSON.stringify({
        name: enteredName,
        type: enteredType,
        prefecture: enteredPrefecture,
        address1: enteredAddress1,
        address2: enteredAddress2,
        hp_url: enteredHp,
        open_time: enteredOpenTime,
        off_day: enteredOffDay,
        parking: enteredParking,
        description: enteredDescription,
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
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "投稿に失敗しました!",
          message: error.message || "もう一度投稿を確認してください!",
          status: "error",
        });
      });
  }

  return (
    <form className={classes.form} onSubmit={sendSpotHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="name">スポット名</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="type">スポットタイプ</label>
        <input type="text" id="type" ref={typeInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="prefecture">都道府県</label>
        <input type="text" id="prefecture" ref={prefectureInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="address1">住所1</label>
        <input type="text" id="address1" ref={address1InputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="address2">住所2</label>
        <input type="text" id="address2" ref={address2InputRef} />
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
      {isInvalid && <p>正しい情報を入力してください。</p>}
      <button>Submit</button>
    </form>
  );
}

export default NewSpot;
