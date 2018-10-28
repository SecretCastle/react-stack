import React, { Component } from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from '@/components/pages/Home';
import ReactLoadable from 'react-loadable';

const SwiperDemo = ReactLoadable({
    loader: () => import('@/components/pages/Swiper'),
    loading: () => (<div>Loading...</div>)
});

const TimePicker  = ReactLoadable({
    loader: () => import('@/components/pages/TimePicker'),
    loading: () => (<div>Loading...</div>)
})

const Fragment = React.Fragment;

class App extends Component {
    render () {       
        return (
            <Router>
                <div className="main-wrap">
                    <ul className="nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/swiper">swiper-demo</Link></li>
                        <li><Link to="/timepicker">TimePicker</Link></li>
                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/swiper" component={SwiperDemo} />
                    <Route path="/timepicker" component={TimePicker}/>
                </div>
            </Router>
        )
    }
}

export default App;
