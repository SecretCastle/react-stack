import React, { Component } from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from '@/components/pages/Home';
import ReactLoadable from 'react-loadable';

const SwiperDemo = ReactLoadable({
    loader: () => import('@/components/pages/Swiper'),
    loading: () => (<div>Loading...</div>)
});

const Fragment = React.Fragment;

class App extends Component {    
    render () {
        return (
            <Router>
                <div className="main-wrap">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/swiper">swiper-demo</Link></li>
                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/swiper" component={SwiperDemo} />
                </div>
            </Router>
        )
    }
}

export default App;
