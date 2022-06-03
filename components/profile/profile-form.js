import { useRef } from "react";

import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const experienceRef = useRef();
  const urlRef = useRef();
  const areaRef = useRef();
  const prefectureRef = useRef();
  const bikeNameRef = useRef();

  function submitHanlder(event) {
    event.preventDefault();

    const enteredExperience = experienceRef.current.value;
    const enteredUrl = urlRef.current.value;
    const enteredArea = areaRef.current.value;
    const enteredPrefecture = prefectureRef.current.value;
    const enteredBikeName = bikeNameRef.current.value;

    props.onUpdateProfile({
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
        <label htmlFor="new-experience">バイク歴</label>
        <input type="number" id="experience" ref={experienceRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="url">リンク</label>
        <input type="url" id="url" ref={urlRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="area">主な活動エリア</label>
        <input type="area" id="area" ref={areaRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="prefecture">都道府県</label>
        <input type="text" id="prefecture" ref={prefectureRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="bike_type">バイクタイプ</label>
        <input type="text" id="bike_type" ref={bikeNameRef} />
      </div>
      <div className={classes.action}>
        <button>プロフィールを更新</button>
      </div>
    </form>
  );
}

export default ProfileForm;
