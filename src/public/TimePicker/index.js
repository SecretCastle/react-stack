import React, { Component } from 'react';
import { TimePicker, Button, Icon, Modal} from 'antd';
import './index.less';

class MultiTimePicker extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            btnDisable: false,
            startTime: {
                moment: null,
                value: null
            },
            endTime: {
                moment: null,
                value: null
            },
            modal: {
                startError: null,
                endError: null
            }
        }
    }
    confirm = () => {
        const { callback } = this.props;
        if (this.state.startTime.moment === null || this.state.endTime.moment === null) {
            Modal.info({
                title: '请选择开始或结束时间',
                okText: '确定'
            });
            return;
        } else {
            this.setState({
                open: false
            });
            callback({
                startTime: this.state.startTime, 
                endTime: this.state.endTime
            });
        }
        
    }
    openChange = () => {
        this.setState({
            open: true
        });
    }
    onChange(moment, type) {
        const { valid } = this.props;
        console.log(type);
        if (valid) {
            if (type === '1') {
                this.setState({
                    startTime: {
                        moment: moment,
                        value: moment.format('HH:mm:ss')
                    }
                });
                if (this.state.endTime.moment !== null) {
                    const endTimeMoment = this.state.endTime.moment;
                    if (moment.isAfter(endTimeMoment)) {
                        if (this.state.modal.startError) {
                            this.state.modal.startError.destroy();
                        }
                        const startError = Modal.error({
                            title: '开始时间不能小于结束时间',
                            okText: '确定'
                        });
                        this.setState({
                            btnDisable: true,
                            modal: {
                                startError
                            }
                        });
                    } else {
                        this.setState({
                            btnDisable: false
                        })
                    }
                }
            } else {
                this.setState({
                    endTime: {
                        moment: moment,
                        value: moment.format('HH:mm:ss')
                    }
                });
                if (this.state.startTime.moment !== null) {
                    const startMoment = this.state.startTime.moment;
                    if (moment.isBefore(startMoment)) {
                        if (this.state.modal.endError) {
                            this.state.modal.endError.destroy();
                        }
                        const endError = Modal.error({
                            title: '结束时间不能大于开始时间',
                            okText: '确定'
                        });
                        this.setState({
                            btnDisable: true,
                            modal: {
                                endError
                            }
                        })
                    } else {
                        this.setState({
                            btnDisable: false
                        })
                    }
                }
            }
        } else {
            if (type === '1') {
                this.setState({
                    startTime: {
                        moment: moment,
                        value: moment.format('HH:mm:ss')
                    }
                })
            } else {
                this.setState({
                    endTime: {
                        moment: moment,
                        value: moment.format('HH:mm:ss')
                    }
                })
            }
        }
    }
    render() {
        return (
            <div className="multi-time-picker flex-box">
                <TimePicker
                    open={this.state.open}
                    format="HH:mm:ss"
                    style={{ width: '165px' }}
                    onOpenChange={this.openChange}
                    onChange={(moment) => this.onChange(moment, '1')}
                    placeholder="开始时间"
                    addon={() => (
                        <span style={{ height: '24px', display: 'block' }}></span>
                    )}
                />
                <span style={{ lineHeight: '32px' }}>~</span>
                <TimePicker 
                    open={this.state.open}
                    format="HH:mm:ss"
                    style={{ width: '165px' }}
                    onChange={(moment) => this.onChange(moment, '2')}
                    onOpenChange={this.openChange}
                    placeholder="结束时间"
                    addon={() => (
                        <div style={{ textAlign: 'right' }}>
                            <Button disabled={this.state.btnDisable} onClick={this.confirm} size="small">确定</Button>
                        </div>
                    )}
                />
            </div>
        );
    }
}

export default MultiTimePicker;
