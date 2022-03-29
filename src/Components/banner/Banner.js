import {Link} from "react-router-dom";
import styles from './Banner.module.css';

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <h3 className={styles.bannerHeading}>Want to explore more based on your favourite topics?</h3>
      <p className={styles.bannerDescription}>
        We render trending news based on the topics you bookmark. Get rid of
        news you have no interest in. What are you waiting for?
      </p>

      <Link to="/register"><button className={styles.bannerButton}>Register Now</button></Link>
    </div>
  );
};

export default Banner;
