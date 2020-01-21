import React, { Component } from 'react'
import { Upload, message, Button, Icon,Table, Divider, Tag,Modal,Input  } from 'antd';
import { connect } from 'dva';
import LoginForm from '../../components/login/index'                      
import styles from './index.css'
// import * as service from '../../services/login/webapi'

class Login extends Component<{},any> {

    
    componentWillMount(){
        // console.log(this.props)
    }


    render(){
        const {app_key}:any = this.props
        
        console.log(app_key)
       return(
        <LoginForm/>
       )
    }
}


const mapStateToProps=(state:any)=> {
    // 这个state是所有model层的state，这里只用到其中一个，所以state.testPage把命名空间为testPage这个model层的state数据取出来
    // es6语法解构赋值

    const { app_key } = state.login;
    // 这里return出去的数据，会变成此组件的props，在组件可以通过props.num取到。props变化了，会重新触发render方法，界面也就更新了。
    return {
        app_key,

      // num:num, //同上，es6语法，key/value相同名时可以简写。
    };
}


export default connect(mapStateToProps)(Login);


