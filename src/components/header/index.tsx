import React, { Component } from 'react'
import { Menu, Icon, Button ,Avatar, Dropdown,} from 'antd';
import router from 'umi/router';
import { connect } from 'dva'
const { SubMenu } = Menu;

class Header extends Component {


    state = {
        collapsed: false,
      };
    
    

    tap=()=>{
        router.push('/login')
        localStorage.removeItem('token')
        localStorage.removeItem('userinfo')
    }
    componentDidMount(){
      const _this = this as any
      _this.props.dispatch({
        type:"headerModel/getinfo"
      })
    }
    

    render() {
      const _this = (this as any)
      let userinfo = _this.props.userinfo
      const menu = (
        <Menu>
          <Menu.Item onClick={this.tap}>
           
              退出
            
          </Menu.Item>
        </Menu>
      );
      console.log(_this.props.userinfo)
        return (
            <div>
              
              <Avatar src="http://img0.imgtn.bdimg.com/it/u=807400438,1244204492&fm=11&gp=0.jpg" />
              <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#" style={{color:'#fff'}}>
                    {userinfo.userName} <Icon type="down" />
                    </a>
             </Dropdown>,
            
            </div>
        )
    }
}

const mapStateToProps=(state:any)=> {
  // 这个state是所有model层的state，这里只用到其中一个，所以state.testPage把命名空间为testPage这个model层的state数据取出来
  // es6语法解构赋值

  const { userinfo } = state.headerModel;
  // 这里return出去的数据，会变成此组件的props，在组件可以通过props.num取到。props变化了，会重新触发render方法，界面也就更新了。
  return {
    userinfo,

    // num:num, //同上，es6语法，key/value相同名时可以简写。
  };
}


export default connect(mapStateToProps)(Header);
