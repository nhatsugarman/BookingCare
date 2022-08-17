import React, { useState } from "react";
import './Slider.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Navigation,
    Pagination,
    Autoplay,
    Virtual
} from "swiper/core";
import "swiper/swiper-bundle.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions';
import { languages } from "../../../utils/constant";

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

export default function Slider(props) {
    const [arrDoctor, setArrDoctor] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.fetchTopDoctor())
    }, []);

    const topDoctorRedux = useSelector(state => state.admin.topDoctors)
    const language = useSelector(state => state.app.language)

    useEffect(() => {
        setArrDoctor(topDoctorRedux)
    }, [topDoctorRedux]);


    return (
        <div className="hero-slider">
            <div className="container">

                <h1 className="hero-slider-title">{props.title}</h1>

                <Swiper
                    id="swiper"
                    virtual
                    slidesPerView={4}
                    spaceBetween={8}
                    navigation
                >
                    {arrDoctor &&
                        arrDoctor.length > 0 &&
                        arrDoctor.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                console.log(imageBase64)
                            }
                            let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                            let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                            return (
                                // <div
                                //     className="img-customize"
                                //     key={index}
                                //     onClick={() => this.handleViewDetailDoctor(item)}
                                // >
                                //     <div
                                //         className="img-bg doctor"
                                //         style={{ backgroundImage: `url(${imageBase64})` }}
                                //     ></div>
                                //     <div className="img-text">
                                //         {language === LANGUAGES.VI ? nameVi : nameEn}
                                //     </div>
                                //     <div className="img-text2">Bác sĩ chuyên khoa</div>
                                // </div>
                                <SwiperSlide>
                                    <div className="hero-slider-image">
                                        <img src={imageBase64} alt="IMG" />
                                        <h4>{language === languages.VI ? nameVi : nameEn}</h4>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </div>
    );
}