import styles from "./Cards.module.css";

import noImage from "../../Assets/imageNotAvailable.png";
import CardFooter from "./CardFooter";

const Cards = ({ data }) => {
  const user = sessionStorage.getItem("email");

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          <img src={data.image ? data.image : noImage} alt="" />
        </a>
      </div>

      <div className={styles.cardBody}>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>

      {user ? <CardFooter /> : <></>}
    </div>
  );
};

export default Cards;
