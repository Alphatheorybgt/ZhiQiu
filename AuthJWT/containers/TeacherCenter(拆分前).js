import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Avatar} from 'antd';
import { Layout, Icon,Table, Menu, Select, Button,Breadcrumb, Popconfirm ,Checkbox,Dropdown} from 'antd';
import NetUtil from '../components/utils/NetUtil';
import Styles from '../styles/testCenter.css';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const Option = Select.Option;

class TeacherCenter extends React.Component{
    
    componentDidMount () {
        // this.fetchData();
        console.log("statusText:"+this.props.statusText);
        console.log("userName:"+this.props.userName);
    }

    // fetchData () {
    //     let token = this.props.authData.token;
    //     this.props.actions.fetchProtectedData(token);
    // }
    handleMenuClick(e){
      if(e.key == 2){
        this.props.actions.logoutAndRedirect();
      }else{

      }
    }


    render(){
      const usr = this.props.userName;
      // const {dispatch} = this.props;
      const menu = (
        <Menu onClick={(e)=>this.handleMenuClick(e)}>
          <Menu.Item key="1">个人中心</Menu.Item>
          <Menu.Item key="2">退出</Menu.Item>
        </Menu>
      );

      return(
        <div>
          <Layout>
              <Header style={{background: '#fff',height:'80px'}}>
                <div style={{ margin: '0 70px' }}>
                  <Row type="flex" align="bottom" justify="space-between">
                    <Col span={4}>
                      <a href="/">
                        <img src="../img/知秋.png" width="80" height="80" alt="logo"/>
                      </a>
                    </Col>
                    <Col span={3}>
                      <div style={{ margin: '20px 0',float:'right'}}>
                        <Dropdown overlay={menu}>
                          <Button>
                            {usr} <Icon type="down" />
                          </Button>
                        </Dropdown>
                      </div>
                    </Col>
                  </Row>
                </div>  
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
                      <Menu.Item key="sub2"><span><Link to="/t_center/stu_manager"><Icon type="team" />学生管理</Link></span>
                      </Menu.Item>
                      <Menu.Item key="sub3"><span><Link to="/t_center/testcenter"><Icon type="solution" />测试中心</Link></span>
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
