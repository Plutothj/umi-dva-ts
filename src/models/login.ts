import { message,notification,Icon  } from 'antd';
import * as service from '../services/login/webapi';
import { routerRedux } from 'dva/router'
import { BrowserRouter, Route } from 'react-router-dom';

export default {
    namespace:'login',
    state:{
        app_key:'1631131B254DE57F3F60F4C307DF8D2D',
        userinfo:{},
        id:"3333333333"
    },
    // reducers是更新state的唯一地方，处理同步操作，把新的state retrun出去，用到state数据的界面就会更新，官方推荐处理逻辑都放在effects中
    reducers: {
    // 方法接收2个参数，第一个是旧的state，第二个是action,没有可以不写或写_
    // addNum(state:any, _:any) {
    //   let num2 = state.num;// 这个state是形参的state，即是旧数据的state
    //   num2 += 1;
    //   // 先把旧的state解构出来，然后把num2的值赋值给num,这个num会替换掉它前面解构出来的num,从而更新了旧state里的num,从而得到新的state
    //   // 即 {num:3,shoppingStore:"",num:4}=> 变为 {num:4, shoppingStore:""}
    //   return { ...state, num: num2 };
    // },
    // showShopping(state:any, { shoppingStore }:any) { // 接收action,并解构出来
    //   return { ...state, shoppingStore };
    // },
    save(state:any,{payload:{ info } }:any){

        return { ...state, info }
    }
    
  },
  // effects处理异步的，用于与后台交互获取数据，推荐数据逻辑处理也应该在此处理，处理完再给reducer
  effects: {
    // 方法接收2个参数，第一个是传过来的action(没有可以写 _ )，第二个基本是用其中call, put, select这3个参数(所有的去官网看)，此处接收参数时，顺便都解构出来。你也可以不解构^-^
    // call: 用来与后台交互
    // put:用来触发reducers中的方法，与dispacth功能一样
    // select:用来选择models层所有model里state的数据
    // * yield是es6的Generator函数
    // *shoppingWZ({ who }:any, { call, put, select }:any) {
    //   //   const num = yield select((state) => state.testPage.num) //取命名空间为testPage的model的state里的num
    //   //   const resp = yield call(service.shoppingWZ,{name:who,age:33});//后面obj是传给后台的参数，没有可以不写
    //   const resp = yield call(service.UploadData); // 请求后台，获取返回的数据
    //   const shoppingStore = who + resp.data.join(',');
    //   yield put({
    //     type: 'showShopping', // 这里触发本model的方法，可以不跟命名空间。这里触发说明reducers中的showShopping方法
    //     shoppingStore, // shoppingStore:shoppingStore ,es6简写，把数据传给type指定的方法
    //   });
    //   message.success('查询成功！');
    // },
    *submit({payload}:any,{call,put}:any){
        
        // const response = yield call(service.Login,{"userName":"13703431593","password":"111111"})
        console.log(payload)
        // yield put(routerRedux.push({
        //     pathname: '/',
            
        // })) 
        const response = yield service.Login(payload)
        .then(res=>{
            return res;
        })
        console.log(response)
        if (response.code == 200) {
               const info = response.context

               localStorage.setItem('userinfo',JSON.stringify(info))
               localStorage.setItem("token", info.token)
               notification.open({
                message: `登录成功`,
                description: `欢迎${info.userName}!`,
                
              });
            yield put(routerRedux.push({
                pathname: '/',
                
            })) 
        }
        
    }
  },
  // 订阅监听，可以监听进入页面，键盘输入，等等，常用作进入某页面发个请求获取数据，展示出来
  subscriptions: {
    // setup({
    //   dispatch, history, query, store,
    // }) {
    //   return history.listen(({ pathname, search }) => {
    //     if (pathname === '/testPage') {
    //       // 监听进入testPage页时，做些操作
    //       // dispatch({ type: "shoppingWZ" })
    //     }
    //   });
    // },
  },
}