import React, { Component } from 'react'
import { Menu, Icon, Button } from 'antd';
import router from 'umi/router';
import { connect } from 'dva'
const { SubMenu } = Menu;

class MenuLeft extends Component {


    state = {
        collapsed: false,
      };
    
    

    tap=(url:any)=>{
      router.push('/goodsManger')
    }
    componentDidMount(){
      const _this = this as any
      _this.props.dispatch({
        type:"menuModel/getMenuItems"
      })
    }
    

    render() {
      const _this = (this as any)
      let menus = _this.props.menu
      console.log(_this.props.menu)
        return (
            <div>
              
                  <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    
                  >
                    {
                menus.map((item:any,index:any)=>
                     <SubMenu
                      key={item.id}
                      title={
                        <span>
                          <Icon type={item.parent.compIcon} />
                          <span>{item.parent.compName}</span>
                        </span>
                      }
                      
                    >
                      {
                        item.child.map((itm:any,ind:any)=>
                        
                      <Menu.Item key={itm.id}>{itm.compName}</Menu.Item>
                       
                        )
                      }
                    </SubMenu>
                   )
                  }  
                </Menu>
               
          
            </div>
        )
    }
}

const mapStateToProps=(state:any)=> {
  // 这个state是所有model层的state，这里只用到其中一个，所以state.testPage把命名空间为testPage这个model层的state数据取出来
  // es6语法解构赋值

  const { menu } = state.menuModel;
  // 这里return出去的数据，会变成此组件的props，在组件可以通过props.num取到。props变化了，会重新触发render方法，界面也就更新了。
  return {
    menu,

    // num:num, //同上，es6语法，key/value相同名时可以简写。
  };
}


export default connect(mapStateToProps)(MenuLeft);
