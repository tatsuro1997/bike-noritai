import { useRef } from "react";
import classes from "./profile-form.module.css";

const ProfileForm = ({ user, onUpdateProfile }) => {
  const { name, experience, url, area, prefecture, bike_name } = user;
  const nameRef = useRef();
  const experienceRef = useRef();
  const urlRef = useRef();
  const areaRef = useRef();
  const prefectureRef = useRef();
  const bikeNameRef = useRef();

  const submitHanlder = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredExperience = experienceRef.current.value;
    const enteredUrl = urlRef.current.value;
    const enteredArea = areaRef.current.value;
    const enteredPrefecture = prefectureRef.current.value;
    const enteredBikeName = bikeNameRef.current.value;

    onUpdateProfile({
      name: enteredName,
      experience: enteredExperience,
      url: enteredUrl,
      area: enteredArea,
      prefecture: enteredPrefecture,
      bike_name: enteredBikeName,
    });
  }

  return (
    <form className={classes.form} onSubmit={submitHanlder}>
      <div className={classes.control}>
        <label htmlFor="name">名前</label>
        <input type="text" id="name" ref={nameRef} defaultValue={name} />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-experience">バイク歴</label>
        <input
          type="number"
          id="experience"
          ref={experienceRef}
          defaultValue={experience}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="url">リンク</label>
        <input type="url" id="url" ref={urlRef} defaultValue={url} />
      </div>
      <div className={classes.control}>
        <label htmlFor="area">主な活動エリア</label>
        <input type="area" id="area" ref={areaRef} defaultValue={area} />
      </div>
      <div className={classes.control}>
        <label htmlFor="prefecture">都道府県</label>
        <input
          type="text"
          id="prefecture"
          ref={prefectureRef}
          defaultValue={prefecture}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="bike_name">バイク名</label>
        <input
          type="text"
          id="bike_name"
          ref={bikeNameRef}
          defaultValue={bike_name}
        />
      </div>
      <div className={classes.action}>
        <button>プロフィールを更新</button>
      </div>
    </form>
  );
};

export default ProfileForm;
