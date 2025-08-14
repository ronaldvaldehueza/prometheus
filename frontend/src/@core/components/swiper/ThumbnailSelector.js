// ** React
import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

// ** Third Party
import { Swiper, SwiperSlide } from 'swiper/react'
import 
    SwiperCore, 
    {
      Navigation,
      Pagination
    } from 'swiper'

// ** Styles
import 'swiper/swiper-bundle.css'


// ** Init Swiper Functions
SwiperCore.use([Navigation, Pagination])
// Orig: SwiperCore.use([FreeMode, Navigation, Grid, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const ThumbnailSelector = ({ slides, generateSlideContent, afterSlideClick, selectedSlide, setSelectedSlide }) => {
    const swiperRef = useRef(null)
    const dispatch = useDispatch()

    const handleSlideClick = (index) => {
        const swiper = swiperRef.current
        if (swiper) {
            swiper.slideTo(index)
            setSelectedSlide(index + 1)
            dispatch(afterSlideClick(index + 1))
        }
    }

    return (
        <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className='swiper-centered-slides swiper-container minimalist p-1'
            initialSlide={0}
            slidesPerView='auto'
            spaceBetween={10}
            centeredSlides={true}
            navigation={true}
            slideToClickedSlide={true}
            pagination={{ clickable: true }}
        >
            {Array.isArray(slides) && slides && 
            slides.map((slideNumber, index) => (
                <SwiperSlide
                    key={slideNumber}
                    onClick={() => handleSlideClick(index)}
                    className={`swiper-shadow ${selectedSlide === slideNumber ? 'selected-slide' : ''}`}
                >
                    {generateSlideContent(slideNumber)}
                </SwiperSlide>
            ))}
        </Swiper>
        )
}

export default ThumbnailSelector
