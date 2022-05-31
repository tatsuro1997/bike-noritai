import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ArrowRightIcon from "../icons/arrow-right-icon";
import Button from "../ui/button";

import classes from "./user-item.module.css";

function UserItem(props) {
  const { email, id } = props;

  const exploreLink = `/users/${id}`;

  return (
    <li className={classes.item}>
      {/* <Image src={"/" + image} alt={title} width={250} height={160} /> */}
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>名前</h2>
        </div>
        <div className={classes.address}>
          <FontAwesomeIcon icon={faEnvelope} />
          <p>{email}</p>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>詳細</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default UserItem;
