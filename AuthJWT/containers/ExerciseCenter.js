import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Icon, Row, Col, Menu, Select,Modal,Button,Badge,Dropdown,Popconfirm,Checkbox} from 'antd';
import NetUtil from '../utils/NetUtil';
import Styles from '../styles/KpExerciseView.css';
import Tex from './renderer.js';
import {Link} from 'react-router';
import {connect} from 'react-redux';


const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const Option = Select.Option;

var urlip = 'http://127.0.0.1/klmanager/';

export class ExerciseCenter extends React.Component {
	constructor(props) {
		super(props);
		this.state={current:''};
	}

	componentDidMount(){
      this.loadBookMenu();
    }

	loadBookMenu(){

		const {current} = this.state;
      	var url = "/klmanager/getTestTable";
     	 //this.setState({isLoading: true});
      	this.props.fetchPosts(url, {teacher_id});
      	
		var urlMenu = urlip+'getBookChapter';
          NetUtil.get(urlMenu, {course_id:1}, (results) => {
                  this.state.menu = results;
                  console.log('menu:'+JSON.stringify(results));
                  var menuHtml = results.map(function(bookmenu,index,input) {
                      var chaEl = [];
                      var chmenu = bookmenu.chapters;
                      for(var j = 0; j < chmenu.length; j++) {
                            chaEl.push(<Menu.Item key= {chmenu[j].chapterid}>{chmenu[j].chaptername}</Menu.Item>);
                      }
                      return(
                            <SubMenu key={bookmenu.bookid} title={<span><Icon type="mail" /><span>{bookmenu.bookname}</span></span>}>
                                {chaEl}
                            </SubMenu>
                      )
                  })
                  this.setState({menuHtml});                
        });
	}

	handleClick(e){
		const {current} = this.state;
      	var url = "/klmanager/getTestTable";
     	 //this.setState({isLoading: true});
      	this.props.fetchPosts(url, {teacher_id});


		const {kps} = this.state;
        this.setState({ current: e.key },()=>{
            var data = [];
            var url = urlip+'getChapterKp';
            NetUtil.get(url, {chapter_id : this.state.current}, (results) => {
                data = results;
                for (var i = 0; i < data.length; i++) {
                    kps.push(
		        		<Option key={data[i].kpid} value={data[i].kpid.toString()}>{data[i].kpname}</Option>
		            );
                }
                this.setState({ kps }); 
            })                         
        });
	}

	render(){
		return(
			<Layout>
			    <Header className="header">
			      <div className="logo" />
			      <Menu
			        theme="dark"
			        mode="horizontal"
			        defaultSelectedKeys={['2']}
			        style={{ lineHeight: '64px' }}
			      >
			        <Menu.Item key="1">nav 1</Menu.Item>
			        <Menu.Item key="2">nav 2</Menu.Item>
			        <Menu.Item key="3">nav 3</Menu.Item>
			      </Menu>
			    </Header>
			    <Content style={{ padding: '24px 120px' }}>
			      <Layout style={{ padding: '24px 0', background: '#fff'}}>
			        <Sider width={300} style={{ background: '#fff' }}>
			            <Menu onClick = { (e) => this.handleClick(e) } style = {{ width: 300 } }
                            defaultSelectedKeys = {[this.state.current]}
                            defaultOpenKeys = {['4'] } 
                        	mode = "inline" 
                        >
                            {this.state.menuHtml}
                        </Menu >
			        </Sider>
			        <Content style={{ padding: '0 24px', minHeight: 280 }}>
			          {this.props.children}
			        </Content>
			      </Layout>
			    </Content>
			    <Footer style={{ textAlign: 'center' }}>
			      ExerciseView ©2017 Created by Bourne
			    </Footer>
			</Layout>
		);
	}
}

export default connect()(ExerciseCenter);

