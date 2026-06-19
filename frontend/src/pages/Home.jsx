import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollections";
import BestSeller from "../components/BestSeller";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
    </div>
  );
};

export default Home;