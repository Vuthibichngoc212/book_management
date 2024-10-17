import { Footer, Header } from '@/components/layout';
import Banner from '../components/Banner/Banner';
import PopularBooks from '../components/PopularBooks/PopularBooks';
import ReadingJourney from '../components/ReadingJourney/ReadingJourney';
import FeedbackSection from '../components/Feedback/FeedbackSection';
import CategoryList from '../components/Category/CategoryList';

const HomePage = () => {
	return (
		<>
			<Header />
			<Banner />
			<CategoryList />
			<PopularBooks />
			<ReadingJourney />
			<FeedbackSection />
			<Footer />
		</>
	);
};

export default HomePage;
