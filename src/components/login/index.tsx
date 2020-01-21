import { Form, Icon, Input, Button, Checkbox,Row, Col } from 'antd';
import ReactDOM from 'react-dom';
import React from 'react';
import { connect } from 'dva';
import * as service from '../../services/login/webapi';

class NormalLoginForm extends React.Component {
 
  
  handleSubmit = (e:any )=> {
    e.preventDefault();
    const _this = this as any
    _this.props.form.validateFields((err:object, values:object) => {
      if (!err) {
        (this as any).props.dispatch({
          type: "login/submit",// 这里就会触发models层里面effects中fetchNum方法（也可以直接触发reducer中方法，看具体情况） ,test就是models里的命名空间名字
          payload: values,
        })
      }
    });
  };

  render() {
    const _this = this as any
    const { getFieldDecorator } = _this.props.form;
    return (
      <div>
        <Row>
      <Col span={6} offset={9}>
      <Form onSubmit={this.handleSubmit} className="login-form" style={{width:'400px'}}>
                <Form.Item>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Username"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'300px',marginLeft:'50px'}}>
                    login
                  </Button>
                  
                </Form.Item>
        </Form>
      </Col>
    </Row>
        
      </div>
      
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


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


export default connect(mapStateToProps)(WrappedNormalLoginForm);