import HomeHero from "../components/HomeHero";
import HomeProfile from "../components/HomeProfile";
import HomeProjects from "../components/HomeProjects";
import HomeAbout from "../components/HomeAbout";
import SendMessage from "../components/SendMessage";

const Home = () => (
  <>
    <HomeHero />
    <HomeProfile />
    <HomeProjects />
    <HomeAbout />
    <SendMessage sectionNumber="04" />
  </>
);

export default Home;
