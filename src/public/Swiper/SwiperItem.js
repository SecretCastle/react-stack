import React, { Component } from 'react';
import './index.less';

class SwiperItem extends Component {
    render () {
        return (
            <div className="swiper-item">
                {this.props.children}
            </div>
        )
    }
}

export default SwiperItem;
