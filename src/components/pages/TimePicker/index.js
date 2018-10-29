import React, { Component } from 'react';
import { Tabs } from 'antd';
import MultiTimePicker from '@/public/TimePicker';

const Fragment = React.Fragment;
class index extends Component {
    select = data => {
        console.log(data);
    }
    render() {
        return (
            <Fragment>
                <span>Base On Ant-Design</span>
                <Tabs>
                    <Tabs.TabPane tab="MultiTimePicker" key="1">
                        <MultiTimePicker 
                            valid={true}
                            callback={this.select}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </Fragment>
        );
    }
}

export default index;
