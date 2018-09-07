import React, { Component } from 'react';
import './index.less';

const Fragment = React.Fragment;
class Home extends Component {
    componentDidMount () {
        
    }
    
    render () {
        return (
            <Fragment>
                <div className="home-container">
                    <div className="title">React-Stacks</div>
                    <div className="list-wrap">
                        <ul>
                            <li>Swiper 轮播图</li>
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Home
