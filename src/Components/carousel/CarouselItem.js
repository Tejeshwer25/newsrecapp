import styles from './CarouselItem.module.css';

const CarouselItem = ({img, text}) => {
  return (
    <div className={styles.carouselItem}>
        <img src={img} alt="" />

        <p>{text}</p>
    </div>
  )
}

export default CarouselItem;