import React, { Component } from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from '@/components/pages/Home';
import ReactLoadable from 'react-loadable';
import CountDown from '@/assets/js/plugins/CountDown';

const SwiperDemo = ReactLoadable({
    loader: () => import('@/components/pages/Swiper'),
    loading: () => (<div>Loading...</div>)
});

const Fragment = React.Fragment;

class App extends Component {
    componentDidMount () {
        const cd = new CountDown({
            dom: 'count-down',
            startTime: 1536740419000,
            endTime: 1536765480000,
            exportFormat: 'hh:mm:ss',
            timeout: () => {
                console.log('success');
            }
        });
    }
    
    render () {
       
        return (
            <Router>
                <div className="main-wrap">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/swiper">swiper-demo</Link></li>
                    </ul>
                    <div id="count-down"></div>
                    <Route exact path="/" component={Home} />
                    <Route path="/swiper" component={SwiperDemo} />
                </div>
            </Router>
        )
    }
}

export default App;
