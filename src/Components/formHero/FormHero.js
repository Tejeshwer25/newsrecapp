import styles from "./FormHero.module.css";
import heroImage from '../../Assets/a.png';

const FormHero = () => {
    return (
        <div className={styles.formHero}>
            <img src={heroImage} alt="Hero" />
        </div>
    )
}

export default FormHero