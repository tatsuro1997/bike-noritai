import { useRef } from "react";

import Button from "../ui/button";

import classes from "./spots-search.module.css";

function SpotsSearch(props) {
  const keywordInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const selectedKeyword = keywordInputRef.current.value;

    props.onSearch(selectedKeyword);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <input
            id="keyword"
            ref={keywordInputRef}
            placeholder="スポット名・キーワード"
          />
        </div>
        <Button>検索</Button>
      </div>
    </form>
  );
}

export default SpotsSearch;
