import styles from './Heading.module.css';

const Heading = ({heading}) => {
  return (
    <div className={styles.headingContainer}>
        <h3>{heading}</h3>
    </div>
  )
}

export default Heading;