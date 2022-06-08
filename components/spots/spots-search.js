import { useRouter } from "next/router";
import { useRef } from "react";

import Button from "../ui/button";

import classes from "./spots-search.module.css";

function SpotsSearch(props) {
  const keywordInputRef = useRef();
  const router = useRouter();

  function submitHandler(event) {
    event.preventDefault();

    const searchKeyword = keywordInputRef.current.value;

    let fullPath;

    if (searchKeyword) {
      fullPath = `/spots/search/${searchKeyword}`;
    } else {
      fullPath = "/spots";
    }

    router.push(fullPath);
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
