import React from 'react';
import styles from './index.css';
import { Layout } from 'antd';
import  MenuLeft  from "../components/menu-left";
import Head from "../components/header/index"
const { Header, Footer, Sider, Content } = Layout;

const BasicLayout: React.FC = props => {

  
  const prop = props as any
  if (prop.location.pathname === '/login') {
    return <Layout>
        <Header className={styles.user}></Header>
        <Content style={{background:'white'}}>{props.children}</Content>
        
        </Layout>
  }
  return (
    
      
      
      <Layout className={styles.main}>
      <Sider className={styles.Menuleft}> <MenuLeft/> </Sider>
      <Layout>
        <Header><Head/></Header>
        <Content className={styles.Content}>{props.children}</Content>
       
      </Layout>
    </Layout>
    
  );
};

export default BasicLayout;
