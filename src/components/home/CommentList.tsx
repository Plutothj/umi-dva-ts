import React from 'react';
import {Input,Button} from 'antd';

const {TextArea} = Input;

export default class extends React.Component{
    render(){
        return(
            <div>
                {(this as any).props.data.map((value:any) => (
                    <div  key={value} >{value}</div>
                ))}
            </div>
        )
    }
}