import {Link} from "react-router-dom"

import styles from './HomeNavigator.module.css';
import homeIcon from '../../Assets/homeIcon.svg';

const HomeNavigator = () => {
    return (
        <div className={styles.homeNavigator}>
            <Link to="/"><img src={homeIcon} alt="homeIcon" /></Link>
        </div>
    )
}

export default HomeNavigator;