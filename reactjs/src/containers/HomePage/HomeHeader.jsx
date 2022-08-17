import React from 'react';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg';
import { FormattedMessage } from 'react-intl';
import Slider from './Section/Slider';

import imageSlide from '../../assets/120331-co-xuong-khop.jpg';
import imageSlide1 from '../../assets/114348-bv-viet-duc.jpg';

import { languages } from '../../utils/constant';

import { changeLanguageApp } from '../../store/actions/appActions';

import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';


const HomeHeader = () => {

	const dispatch = useDispatch()

	const changeLanguage = (language) => {
		dispatch(changeLanguageApp(language))
	}

	// const language = useSelector(state => state.app.language)


	return (
		<>
			<nav className="header">
				<div className="container">
					<div className="header-wrapper">
						<a href="/home" className="logo">
							<img src={logo} className="logo-image" alt='img'/>
						</a>
						<ul className="menu">
							<li className="menu-item">
								<a href="/home" className="menu-link"><FormattedMessage id="homeheader.speciality" /></a>
							</li>
							<li className="menu-item">
								<a href="/home" className="menu-link">Cơ sở y tế</a>
							</li>
							<li className="menu-item">
								<a href="/home" className="menu-link">Bác sĩ</a>
							</li>
							<li className="menu-item">
								<a href="/home" className="menu-link">Gói khám</a>
							</li>

						</ul>
						<div className="header-right">
							<div className="help">
								<i className='fas fa-question-circle'></i>
								<a href="#!">Hỗ trợ</a>
							</div>
							<div className='language-toggle'>
								<button className='px-2 language-toggle-vn' onClick={() => changeLanguage(languages.VI)}>VN</button>
								<button className='px-2' onClick={() => changeLanguage(languages.EN)}>EN</button>
							</div>
						</div>
					</div>
				</div>

			</nav>
			<section className="slider-thumb">
				<div className='slider-thumb-top'>
					<h1 className='slider-thumb-title'>Nền tảng y tế <br /><b>Chăm sóc sức khỏe toàn diện</b></h1>
					<div class="slider-thumb-search">
						<i class="fa-solid fa-magnifying-glass"></i>
						<input className="slider-thumb-input" type="search" placeholder="Tìm gói khám" />
					</div>
				</div>
				<div className='slider-thumb-bottom'>
					<ul className='slider-thumb-bottom-list'>
						<li>
							<a href="/home" className='slider-thumb-bottom-title'>Khám chuyên khoa</a>
						</li>
						<li>
							<a href="/home" className='slider-thumb-bottom-title'>Khám từ xa</a>
						</li>
						<li>
							<a href="/home" className='slider-thumb-bottom-title'>Khám tổng quát</a>
						</li>
						<li>
							<a href="/home" className='slider-thumb-bottom-title'>Xét nghiệm y học</a>
						</li>
					</ul>
				</div>
			</section>

			<Slider title="Chuyên khoa phổ biến" imageSlide={imageSlide} />
			{/* <Slider title="Cơ sở y tế nổi bật" imageSlide={imageSlide1} /> */}
		</>

	)
}

export default HomeHeader