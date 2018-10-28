import React, { Component } from 'react';
import { TimePicker, Button, Icon } from 'antd';
import './index.less';

class MultiTimePicker extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }
    confirm = () => {
        this.setState({
            open: false
        });
    }
    openChange() {
        console.log(this.state.open);
        this.setState({
            open: true
        });
    }
    render() {
        return (
            <div className="multi-time-picker flex-box">
                <TimePicker
                    open={this.state.open}
                    format="HH:mm:ss"
                    style={{ width: '165px' }}
                    onOpenChange={() => this.openChange()}
                    addon={() => (
                        <span style={{ height: '24px', display: 'block' }}></span>
                    )}
                />
                <span style={{ lineHeight: '32px' }}>~</span>
                <TimePicker 
                    open={this.state.open}
                    format="HH:mm:ss"
                    style={{ width: '165px' }}
                    onOpenChange={() => this.openChange()}
                    addon={() => (
                        <div style={{ textAlign: 'right' }}>
                            <Button onClick={this.confirm} size="small">确定</Button>
                        </div>
                    )}
                />
            </div>
        );
    }
}

export default MultiTimePicker;
