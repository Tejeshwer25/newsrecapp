import styles from './WelcomePage.module.css';

import Navbar from "../Components/navbar/Navbar";
import MyCarousel from '../Components/carousel/Carousel';
import Heading from "../Components/heading/Heading";
import Cards from "../Components/cards/Cards";
import Banner from "../Components/banner/Banner";

const WelcomePage = ({data}) => {

  const slideData = data ? [data[0], data[1], data[2], data[3]] : [];
  const cardData = data ? [data[4], data[5], data[6], data[7], data[8], data[9]]: [];

  return (
    <div>
      <Navbar />

      <div>
        <MyCarousel slideData={slideData}/>

        <div style={{width: "95%", margin: "auto"}}>
          <Heading heading="Latest News" />

          <div className={styles.newsCards}>
            {cardData.map((item, index) => <Cards data={item} key={index}/>)}
          </div>
        </div>

        <div style={{marginTop: '2rem'}}>
          <Banner />
        </div>
      </div>
    </div>
  )
}

export default WelcomePage