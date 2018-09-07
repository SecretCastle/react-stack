import React, { Component } from 'react';
import classNames from 'classnames';

class Swiper extends Component {
    constructor() {
        super();
        this.state = {
            dotArr: []
        }
        this.domRef = React.createRef();
        this.mainDomRef = React.createRef();
        this.arrowBtnRefLeft = React.createRef();
        this.arrowBtnRefRight = React.createRef();
        this.dottedRef = React.createRef();
    }
    componentDidMount() {
        this.dom = this.domRef.current;
        this.mainDom = this.mainDomRef.current;
        this.arrowBtnLeft = this.arrowBtnRefLeft.current;
        this.arrowBtnRight = this.arrowBtnRefRight.current;
        this.dottedDom = this.dottedRef.current;
        this.init();
    }
    init() {
        this.domLen = this.dom.children.length;
        this.domWidth = this.dom.clientWidth;
        this.isAnimate = false;
        this.currentIndex = this.props.defaultIndex;
        const first = this.dom.children[0].cloneNode(true);
        const last = this.dom.children[this.domLen - 1].cloneNode(true);
        this.dom.insertBefore(last, this.dom.children[0]);
        this.dom.appendChild(first);
        this.dom.style.transform = `translate3d(-${this.domWidth * this.currentIndex}px, 0, 0)`;
        this.timer = 300;
        this.interval = 10;
        this.timeoutTimer = null;
        this.animateTimer = null;
        if (this.props.autoplay) {
            this.play();
        }
        this.bindMouseEvnet();
        if (this.props.showBottomDotted) {
            this.initDot();
        }
    }
    play() {
        this.timeoutTimer = setTimeout(() => {
            if (this.props.foward) {
                this.next();
            } else {
                this.prev();
            }
            this.play();
        }, this.props.delay);
    }
    next = () => {
        if (this.isAnimate) {
            return;
        }
        if (this.currentIndex === this.domLen) {
            this.currentIndex = 1;
        } else {
            this.currentIndex++;
        }
        this.setDot();
        if (!this.isAnimate) {
            this.animate(-this.domWidth);
        }
    }
    prev = () => {
        if (this.isAnimate) {
            return;
        }
        if (this.currentIndex === 1) {
            this.currentIndex = this.domLen
        } else {
            this.currentIndex--;
        }
        this.setDot();
        if (!this.isAnimate) {
            this.animate(this.domWidth);
        }
    }
    animate(offset) {
        if (offset === 0) {
            return;
        }
        this.isAnimate = true;
        const speed = offset / (this.timer / this.interval);
        const left = this.getLeft(this.dom) + offset;
        this.animateTimer = window.requestAnimationFrame(() => {
            this.animateScrollFunc(speed, left);
        });
    }
    animateScrollFunc(speed, left) {
        if ((speed > 0 && this.getLeft(this.dom) < left) || (speed < 0 && this.getLeft(this.dom) > left)) {
            this.setLeft(this.dom, speed);
            setTimeout(() => {
                this.animateTimer = window.requestAnimationFrame(() => {
                    this.animateScrollFunc(speed, left);
                })
            }, this.interval);
        } else {
            window.cancelAnimationFrame(this.animateTimer);
            this.resetScrollFunc(left);
            this.isAnimate = false;
        }
    }
    resetScrollFunc(left) {
        this.dom.style.transform = `translate3d(${left}px, 0, 0)`;
        if (left > -this.domWidth) {
            this.resetTransform(-(this.domWidth * this.domLen));
        }
        if (left < -(this.domWidth * this.domLen)) {
            this.resetTransform(-this.domWidth);
        }
    }
    resetTransform(offset) {
        this.dom.style.transform = `translated3d(${offset}px, 0, 0)`;
        this.dom.style["-webkit-transform"] = `translate3d(${offset}px, 0, 0)`;
        this.dom.style["-ms-transform"] = `translate3d(${offset}px, 0, 0)`;
    }
    getLeft(target) {
        let x =
            target.style.transform ||
            target.style["-webkit-trasnform-"] ||
            target.style["-ms-trasnform"];
        x = x.substring(12);
        x = x.match(/(\S*)px/)[1];
        return Number(x);
    }
    setLeft(target, speed) {
        target.style.transform = `translate3d(${this.getLeft(this.dom) + speed}px, 0, 0)`;
        target.style["-webkit-transform"] = `translate3d(${this.getLeft(this.dom) + speed}px, 0, 0)`;
        target.style["-ms-transform"] = `translate3d(${this.getLeft(this.dom) + speed}px, 0, 0)`;
    }
    bindMouseEvnet() {
        this.mainDom.addEventListener('mouseenter', () => {
            if (this.props.showArrowButton) {
                this.arrowBtnLeft.classList.add('show');
                this.arrowBtnRight.classList.add('show');
            }
            clearTimeout(this.timeoutTimer);
        }, false);
        this.mainDom.addEventListener('mouseleave', () => {
            if (this.props.showArrowButton) {
                this.arrowBtnLeft.classList.remove('show');
                this.arrowBtnRight.classList.remove('show');
            }
            if (this.props.autoplay) {
                this.play();
            }
        }, false);
    }
    initDot() {
        const domArr = [];
        for(let index = 0; index < this.domLen; index++) {
            domArr.push(
                <div className={
                    classNames(
                        'iner', 
                        {on: Number(this.currentIndex) === (index + 1)}
                    )} 
                    key={index}
                    onClick={() => this.bindDot(index)}
                ></div>
            )
        }
        this.setState({
            dotArr: domArr
        });
    }
    setDot() {
        const dotChild = Array.from(this.dottedDom.children);
        for(let index = 0; index < dotChild.length; index++) {
            if (this.currentIndex === index + 1) {
                dotChild[index].classList.add('on');
            } else {
                dotChild[index].classList.remove('on');
            }
        }
    }
    bindDot(index) {
        this.currentIndex = index + 1;
        this.setDot();
        this.resetTransform(-this.domWidth * this.currentIndex);
    }
    render () {
        return (
            <div className="swiper-container" ref={this.mainDomRef}>
                <div className="swiper-wrap" ref={this.domRef}>
                    {this.props.children}
                </div>
                {
                   this.props.showBottomDotted ?
                        <div className="dot-wrap" ref={this.dottedRef}>
                            {this.state.dotArr}
                        </div>
                    : null
                }
                <div className="arrowBtn left" ref={this.arrowBtnRefLeft} onClick={this.prev}><div className="inAr"></div></div>
                <div className="arrowBtn right" ref={this.arrowBtnRefRight} onClick={this.next}><div className="inAr"></div></div>
            </div>
        )
    }
}

Swiper.defaultProps = {
    autoplay: false,
    showArrowButton: false,
    showBottomDotted: false,
    defaultIndex: 1,
    delay: 4000,
    foward: true
}

export default Swiper
