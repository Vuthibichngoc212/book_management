import { Swiper, SwiperSlide } from 'swiper/react';

import bannerImg from '@/assets/image/banner-img.webp';
import banner2Img from '@/assets/image/baner2-img.webp';
import banner3Img from '@/assets/image/banner3-img.webp';
import banner4Img from '@/assets/image/banner4-img.webp';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import '@/pages/HomePage/components/Banner/styles.css';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Banner = () => {
	return (
		<div className="banner">
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				loop={true}
				navigation
				pagination={{ clickable: true }}
				modules={[Pagination, Navigation, Autoplay]}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
			>
				<SwiperSlide>
					<img src={bannerImg} alt="Banner 1" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={banner2Img} alt="Banner 2" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={banner3Img} alt="Banner 3" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={banner4Img} alt="Banner 3" />
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Banner;
