'use strict'

/**
 * @author SecretCastle
 * @email henrychen9314@gmail.com
 * @create date 2018-09-11 04:48:03
 * @modify date 2018-09-11 04:48:03
 * @desc CountDown插件
 * 
 * | 参数说明 | 默认值 | 说明 |
 * | ---- | ---- | ---- |
 * | startTime | `new Date().getTime()` | 当前初始化时间, 默认当前时间 |
 * | endTime | `` | 结束时间，默认为当前时间后10分钟 | 
 * | exportFormat | `hh:mm` | 默认 "hh:mm", 可选: "mm:ss", "hh:mm" |
 * | dom | not allow null | 绑定的dom |
 * | timeout | function | 倒计时结束回调函数 |
*/

const utils = {
    nowTime: Date.now(),
    fullTime(timestamp) {
        return new Date(timestamp);
    }
}

class CountDown {
    constructor(options) {
        this.timer = null;
        this.adjustTimer = null;
        this.initOptions(options);
        this.init();
    }
    initOptions(options) {
        if (this.checkOptions(options)) {
            this.options = {
                dom: options.dom,
                startTime: options.startTime,
                endTime: options.endTime,
                precision: 's',
                exportFormat: options && options.exportFormat ? options.exportFormat : 'hh:mm',
                timeout: options && options.timeout ? options.timeout : null
            }
        }
    }
    checkOptions(options) {
        if (options && !options.dom) {
            throw new Error('parameters "dom" not allow empty')
        }
        if (options && !options.startTime) {
            throw new Error('parameters "startTime" not allow empty')
        }
        if (options && !options.endTime) {
            throw new Error('parameters "endTime" not allow empty')
        }
        return true;
    }
    init() {
        this.initDom();
        if (this.compareTime()) {
            let time = this.caculateTime();
            this.cache(time);
            // TODO: 10s对焦一次
            this.adjustTimer = setInterval(() => {
                clearInterval(this.timer);
                time = this.caculateTime();
                this.cache(time);
            }, 10000);
        }
    }
    initDom() {
        this.dom = document.getElementById(this.options.dom);
    }
    adjustPercision() {
        const precision = this.options.precision;
        switch(precision) {
            case 's':
                return {
                    delay: 1000,
                    type: 0
                }
            case 'm':
                return {
                    delay: 60 * 1000,
                    type: 1
                }
            case 'h':
                return {
                    delay: 60 * 60 * 1000,
                    type: 2
                }
            default:
                return {
                    delay: 1000,
                    type: 0
                }
        }
    }
    compareTime() {
        const startTime = this.options.startTime;
        const endTime = this.options.endTime;
        const nowTime = new Date().getTime();
        const diff = endTime - nowTime;
        if (nowTime < startTime) {
            throw new Error('StartTime Must smaller than NowTime');
        }
        if (diff < 0) {
            // 如果已结束，则直接执行回调函数
            this.options.timeout()
        }
        return true;
    }
    caculateTime() {
        const value = this.options.endTime - Date.now();
        const value_h = value % (24 * 3600 * 1000);
        const value_m = value_h % (3600 * 1000);
        const value_s = value_m % (60 * 1000);
        let day = Math.floor(value / (24 * 3600 * 1000));
        let hour = Math.floor(value_h / (3600 * 1000));
        let min = Math.floor(value_m / (60 * 1000));
        let second = Math.floor(value_s / 1000);
        return {
            day,
            hour,
            min,
            second
        }
    }
    // TODO: 这里缓存机制
    cache(timeObject) {
        let day = timeObject.day,
            hour = timeObject.hour,
            min = timeObject.min,
            second = timeObject.second;
        const adjustPercision = this.adjustPercision();
        // init render dom
        this.dom.innerHTML = this.adjustExportFormat({ hour, min, second })
        this.timer = setInterval(() => {
            second -= 1;
            if (second === 0) {
                if (min > 0) {
                    min -= 1;
                    second = 59;
                } else {
                    min = 0;
                    second = 0;
                    if (hour  > 0) {
                        hour -= 1;
                        min = 59;
                        second = 59;
                    } else {
                        hour = 0;
                        min = 0; 
                        second = 0;
                    }
                }
            }
            // render dom
            this.dom.innerHTML = this.adjustExportFormat({ hour, min, second });
            if (day === 0 && hour === 0 && min === 0 && second === 0) {
                clearInterval(this.adjustTimer);
                clearInterval(this.timer);
                this.options.timeout();
            }
        }, adjustPercision.delay);
    }
    adjustExportFormat(timeObj) {
        if (this.options.exportFormat === 'hh:mm') {
            return `${timeObj.hour < 10 ? '0' + timeObj.hour : timeObj.hour}:${timeObj.min < 10 ? '0' + timeObj.min : timeObj.min}`;
        } else if (this.options.exportFormat === 'mm:ss') {
            return `${timeObj.min < 10 ? '0' + timeObj.min : timeObj.min}:${timeObj.second < 10 ? '0' + timeObj.second : timeObj.second}`;
        } else {
            // default export
            return `${timeObj.hour < 10 ? '0' + timeObj.hour : timeObj.hour}:${timeObj.min < 10 ? '0' + timeObj.min : timeObj.min}:${timeObj.second < 10 ? '0' + timeObj.second : timeObj.second}`;
        }
    }
}


export default CountDown;
module.export = CountDown;
