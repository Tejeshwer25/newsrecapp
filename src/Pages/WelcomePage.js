import Navbar from "../Components/navbar/Navbar";
import MyCarousel from '../Components/carousel/Carousel';
import Heading from "../Components/heading/Heading";

const WelcomePage = () => {
  return (
    <div>
      <Navbar />

      <div>
        <MyCarousel />

        <div style={{width: "95%", margin: "auto"}}>
          <Heading heading="Latest News" />
        </div>
      </div>
    </div>
  )
}

export default WelcomePage