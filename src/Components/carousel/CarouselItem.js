import styles from './CarouselItem.module.css';

const CarouselItem = ({item}) => {

  return (
    <div className={styles.carouselItem}>
        <img src={item.image} alt="" />

        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <a href={item.url}>Read More on {item.source.name}</a>
        </div>
    </div>
  )
}

export default CarouselItem;