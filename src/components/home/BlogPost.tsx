import React from 'react';
import {Input,Button} from 'antd';

const {TextArea} = Input;

export default class extends React.Component<any,any>{


    tap(){
        console.log('aa')
    }
    render(){
        return(
            <div>
                <TextArea value={this.props.data}/>
                <Button type="primary" onClick={this.tap}>Primary</Button>
            </div>
        )
    }
}