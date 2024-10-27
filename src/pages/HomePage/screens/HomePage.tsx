import { Footer, Header } from '@/components/layout';
import Banner from '../components/Banner/Banner';
import PopularBooks from '../components/PopularBooks/PopularBooks';
// import ReadingJourney from '../components/ReadingJourney/ReadingJourney';
import CategoryList from '../components/Category/CategoryList';
import TopBook from '../components/TopBook/TopBook';

const HomePage = () => {
	return (
		<>
			<Header />
			<Banner />
			<CategoryList />
			<TopBook />
			<PopularBooks />
			{/* <ReadingJourney /> */}
			<Footer />
		</>
	);
};

export default HomePage;
