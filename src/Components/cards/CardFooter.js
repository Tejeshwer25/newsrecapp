import styles from "./Cards.module.css";

import filledLikeIcon from "../../Assets/likeFilledIcon.svg";
import likeIcon from "../../Assets/likeIcon.svg";
import copyIcon from "../../Assets/copyIcon.svg";

const CardFooter = () => {
  return (
    <div className={styles.cardFooter}>
      <div>
        <img src={likeIcon} alt="Like" title="Like news" />
      </div>

      <div>
        <img src={copyIcon} alt="Copy" title="Copy news link" />
      </div>
    </div>
  );
};

export default CardFooter;
