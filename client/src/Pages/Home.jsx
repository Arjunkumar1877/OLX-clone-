
import Banner from '../Components/Banner/Banner';
import Footer from '../Components/Footer/Footer';
import Posts from '../Components/Posts/Posts';

function Home() {

  return (
    <div className="homeParentDiv">
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
 
