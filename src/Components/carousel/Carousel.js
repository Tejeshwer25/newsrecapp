import styles from './Carousel.module.css';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import CarouselItem from './CarouselItem';

const MyCarousel = ({slideData}) => {
    
  return (
    <div className={styles.carousel}>
        <Carousel showArrows={true} infiniteLoop={true}>
          {slideData.map((item, index) => <CarouselItem key={index} item={item} />)}
        </Carousel>
    </div>
  )
}

export default MyCarousel;