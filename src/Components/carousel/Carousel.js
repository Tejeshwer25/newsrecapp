import styles from './Carousel.module.css';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import CarouselItem from './CarouselItem';

const MyCarousel = () => {
    
  return (
    <div className={styles.carousel}>
        <Carousel showArrows={true} infiniteLoop={true}>
            <CarouselItem img="https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg" text="Image1"/>

            <CarouselItem img="https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg" text="Image2"/>
        </Carousel>
    </div>
  )
}

export default MyCarousel;