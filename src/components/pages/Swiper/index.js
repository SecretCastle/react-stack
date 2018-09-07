import React, { Component } from 'react';
import Swiper from '@/public/Swiper';
import SwiperItem from '@/public/Swiper/SwiperItem';
import './index.less';

const styles = {
    bg1: {
        backgroundColor: '#e9e9ad',
        height: '100%',
        color: '#fff'
    },
    bg2: {
        backgroundColor: '#151342',
        height: '100%',
        color: '#fff'
    },
    bg3: {
        backgroundColor: '#d64040',
        height: '100%',
        color: '#fff'
    }
}

class SwiperDemo extends Component {
    render () {
        return (
            <div className="swiper-demo">
                <Swiper
                    autoplay="true"
                    showArrowButton="true"
                    showBottomDotted="true"
                    defaultIndex="2"
                >
                    <SwiperItem><div style={styles.bg1}>Hello World</div></SwiperItem>
                    <SwiperItem><div style={styles.bg2}>Hello World</div></SwiperItem>
                    <SwiperItem><div style={styles.bg3}>Hello World</div></SwiperItem>
                </Swiper>
            </div>   
        )
    }
}

export default SwiperDemo;
