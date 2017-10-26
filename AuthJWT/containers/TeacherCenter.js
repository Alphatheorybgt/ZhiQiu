import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'antd';
import { Layout, Icon, Menu, Button ,Checkbox} from 'antd';
import NetUtil from '../components/utils/NetUtil';
import Styles from '../styles/testCenter.css';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import Zq_Header from './ZQ_Header';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

class TeacherCenter extends React.Component{
    
    componentDidMount () {
        // this.fetchData();
        console.log("statusText:"+this.props.statusText);
        console.log("userName:"+this.props.userName);
    }

    render(){
      return(
        <div>
            <Layout>
                <Header style={{background: '#fff',height:'80px'}}>
                  <Zq_Header/>  
                </Header>
                <Content style={{ padding: '0 120px' }}>
                  <div style={{ margin: '22px 0' }}></div>
                  <Layout style={{ padding: '24px 0', background: '#fff'}}>
                    <Sider width={200} style={{ background: '#fff' }}>
                      <Menu
                        mode="inline"
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                      >
                        <Menu.Item key="sub1"><span><Icon type="bell" />动态</span></Menu.Item>
                        <Menu.Item key="sub2"><span><Link to="/AuthJWT/t_center/stu_manager"><Icon type="team" />学生管理</Link></span>
                        </Menu.Item>
                        <Menu.Item key="sub3"><span><Link to="/AuthJWT/t_center/testcenter"><Icon type="solution" />测试中心</Link></span>
                        </Menu.Item>
                        <SubMenu key="sub4" title={<span><Icon type="tag-o" />我的收藏</span>}>
                          <Menu.Item key="6">option9</Menu.Item>
                          <Menu.Item key="7">option10</Menu.Item>
                        </SubMenu>
                      </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 350 }}>
                      {this.props.children}
                    </Content>
                  </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  Ant Design ©2017 Created by Bourne
                </Footer>
            </Layout>
        </div> 
      );
    }
}

const mapStateToProps = (state) => ({
    statusText: state.auth.statusText,
    userName: state.auth.userName
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCenter);
