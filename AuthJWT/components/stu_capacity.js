import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import createG2 from 'g2-react';
import { Stat } from 'g2';
import { Layout, Icon, Row, Col, Menu, Select,Table,Button,Input,Dropdown,Popconfirm,Checkbox,Tabs,Progress,Popover,Tooltip,Breadcrumb} from 'antd';
import NetUtil from './utils/NetUtil';
import Styles from '../styles/stu_capacity.css';
import *as action from '../actions/';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Zq_Header from '../containers/ZQ_Header';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

var urlip = 'http://39.108.85.119:3000/klmanager/';

const TabPane = Tabs.TabPane;

var capatity = [{
	  key: '1',
	  exercount: 560,
	  rate: 89.4,
	  ladderscore: 1800,
	}, {
	  key: '2',
	  exercount: 20,
	  rate: 88,
	  ladderscore: 1780,
	}, {
	  key: '3',
	  exercount: 50,
	  rate: 91,
	  ladderscore: 1884,
	}, 
];

var ladder = [{procount:10,score:1600},{procount:11,score:1605},{procount:12,score:1608}
			 ,{procount:13,score:1615},{procount:14,score:1611},{procount:15,score:1609}];

var bestkp = [{
	  key: '1',
	  kpname: '知识点1',
	  score: 1800,
	}, {
	  key: '2',
	  kpname: '知识点2',
	  score: 1700,
	}, {
	  key: '3',
	  kpname: '知识点3',
	  score: 1600,
	}, {
	  key: '4',
	  kpname: '知识点4',
	  score: 1500,
	}, {
	  key: '5',
	  kpname: '知识点5',
	  score: 1300,
	}, 
];
var worstkp = [{
	  key: '1',
	  kpname: '知识点1',
	  score: 800,
	}, {
	  key: '2',
	  kpname: '知识点2',
	  score: 1000,
	}, {
	  key: '3',
	  kpname: '知识点3',
	  score: 1100,
	}, {
	  key: '4',
	  kpname: '知识点4',
	  score: 1200,
	}, {
	  key: '5',
	  kpname: '知识点5',
	  score: 1250,
	}, 
];

class OverallAbility extends React.Component{
	constructor(props) {
		super(props);
		this.state={ capatity : capatity, ladder : ladder, activeKey : '1'};
	}
	componentDidMount(){
        var url1 = urlip+'getStuAbility';
        var url2 = urlip+'getStuLadder';
        NetUtil.get(url1, {student_id:this.props.student_id}, (results) => {
        		  console.log('results:'+JSON.stringify(results));
	              // this.state.capatity = results;
	              this.setState({capatity : results});                   
        }); 
        NetUtil.get(url2, {student_id:this.props.student_id}, (results) => {
	              console.log('results:'+JSON.stringify(results));
	              // this.state.ladder = results;
	              this.setState({ladder : results});                   
        }); 
    }
	onTabChange(key){
		this.setState({activeKey : key});
	}
	render(){
		const {capatity,ladder,activeKey} = this.state;
		// console.log('this.state.ladder:'+JSON.stringify(ladder));
		if(capatity){
	    	return(
	    	  <div>
	    	  	<div className="tab_content">
	    	  		<p className="p_tab_content">综合概况</p>
			        <Tabs size='small' tabPosition='left' onChange={(key)=>this.onTabChange(key)} activeKey={activeKey}>
			          <TabPane tab="全部" key="1">
				        <Row type="flex" justify="start">
							<Col span={5}><p className="p_header">练题数</p></Col>
							<Col span={5}><p className="p_header">正确率</p></Col>
							<Col span={5}><p className="p_header">天梯分</p></Col>
						</Row>
			          	<Row align="middle" type="flex" justify="start" className="row_content">
							<Col span={5}><p className="p_content">{capatity[0].exercount}</p></Col>
							<Col span={5}><div className="p_content"><Progress type="circle" percent={capatity[0].rate} width={60} format={(percent) => `${percent}%`}/></div></Col>
							<Col span={5}><p className="p_content">{capatity[0].ladderscore}</p></Col>
						</Row>
			          </TabPane>
			          <TabPane tab="近20题" key="2">
			          	<Row type="flex" justify="start">
							<Col span={5}><p className="p_header">练题数</p></Col>
							<Col span={5}><p className="p_header">正确率</p></Col>
							<Col span={5}><p className="p_header">天梯分变化</p></Col>
						</Row>
			          	<Row align="middle" type="flex" justify="start" className="row_content">
							<Col span={5}><p className="p_content">{capatity[1].exercount}</p></Col>
							<Col span={5}><div className="p_content"><Progress type="circle" percent={capatity[1].rate} width={60} format={(percent) => `${percent}%`}/></div></Col>
							<Col span={5}><p className="p_content">{capatity[1].ladderscore>0? "+"+capatity[1].ladderscore : "-"+Math.abs(capatity[1].ladderscore)}</p></Col>
						</Row>
			          </TabPane>
			          <TabPane tab="近50题" key="3">
			          	<Row type="flex" justify="start">
							<Col span={5}><p className="p_header">练题数</p></Col>
							<Col span={5}><p className="p_header">正确率</p></Col>
							<Col span={5}><p className="p_header">天梯分变化</p></Col>
						</Row>
			          	<Row align="middle" type="flex" justify="start" className="row_content">
							<Col span={5}><p className="p_content">{capatity[2].exercount}</p></Col>
							<Col span={5}><div className="p_content"><Progress type="circle" percent={capatity[2].rate} width={60} format={(percent) => `${percent}%`}/></div></Col>
							<Col span={5}><p className="p_content">{capatity[2].ladderscore>0? "+"+capatity[2].ladderscore : "-"+Math.abs(capatity[2].ladderscore)}</p></Col>
						</Row>
			          </TabPane>
			        </Tabs>
		        </div>
		        <div className="d_ladder">
		        	<p className="p_ladder_title">天梯积分</p>
		        	<LadderScore ladder={ladder}/>
		        </div>
		        <div className="d_kp">
		        	<p className="p_d_kp">常练知识点</p>
		        	<ComUsedKp student_id={this.props.student_id}/>
		        </div>
		      </div>
	    	);
    	}
	}
}

const Line = createG2((chart) => {
  	var defs = {
	  procount: {
	    type: 'linear',
	    alias:'练习题数',
	    nice : false,
	  },
	  score: {
	    type: 'linear',
	    alias:'天梯分数',
	    tickCount : 6,
	  },
	};

	// console.log(chart);
    chart.source(chart._attrs.data,defs);
    chart.line().position('procount*score').size(2);
    chart.render();
});

class LadderScore extends React.Component {
	constructor(props) {
		super(props);
		this.state={
		    data: this.props.ladder,
		    width: 520,
		    height: 250,
		    plotCfg: {
		      margin: [10, 50, 50, 85],
		    },
		};
    }
    componentWillReceiveProps(nextProps){
    	if(nextProps.ladder !== this.state.data){
    		this.setState({data : nextProps.ladder});
    	}
    }
    render(){
    	return (
	      <div>
	        <Line
	          data={this.state.data}
	          width={this.state.width}
	          height={this.state.height}
	          plotCfg={this.state.plotCfg}
	        />
	      </div>
	    );
    }
}

class RecentKp extends React.Component {
	constructor(props) {
		super(props);
		this.state={recent_data : []};
    }
    componentDidMount(){
    	var url = urlip+'getStuRecentKp';
        NetUtil.get(url, {student_id:this.props.student_id}, (results) => {
        		  console.log('results:'+JSON.stringify(results));
	              this.setState({recent_data : results});                   
        }); 
    }
    render(){
    	const {recent_data} = this.state;
    	var recentDom = [];
		for(var j=0;j<recent_data.length;j++){
			recentDom.push(
				<div key={j}>
					<Row type="flex" justify="start">
						<Col span={9}><p>{recent_data[j].kpname}</p></Col>
						<Col span={10}>
							<Progress 
    							percent={(recent_data[j].kp_rating/2000)*100} 
    							format={() => ''}
	    				    />
	    				</Col>
	    				<Col span={2}><p>{recent_data[j].kp_rating+'分'}</p></Col>
					</Row>
				</div>
			);
		}
    	return(
    		<div>
	    		<div className="d_ladder">
	    			<p className="p_d_kp">最近练习的知识点</p>
	    			<div className="kp_dom">{recentDom}</div>
	    		</div>
    		</div>
    	);
    }
}

class ComUsedKp extends React.Component {
	constructor(props) {
		super(props);
		this.state={used_data : [], bigcount:1};
		this.columns = [{
            title: '知识点',
            dataIndex: 'kpname',
            width: '40%',
        }, {
            title: '练习次数',
            dataIndex: 'usedcount',
            width: '30%',
            render: (text, record, index) => {
              return(
				<div>
					<p>{text}</p>
					<Progress 
						strokeWidth={5}
						percent={(text/this.state.bigcount)*100} 
						format={() => ''}
	    			/>
				</div>
              );
            },
        }, {
            title: '正确率',
            dataIndex: 'rate',
            width: '30%',
            render: (text, record, index) => {
              return(
				<div>
					<p>{text}%</p>
					<Progress 
						strokeWidth={5}
						percent={text} 
						format={() => ''}
	    			/>
				</div>
              );
            },
        }];
    }
    componentDidMount(){
    	var url = urlip+'getStuComUsedKp';
        NetUtil.get(url, {student_id:this.props.student_id}, (results) => {
        		  console.log('results:'+JSON.stringify(results));
	              // this.state.capatity = results;
	              this.setState({used_data : results , bigcount : results[0].usedcount});                   
        }); 
    }
    render(){
    	const {used_data} = this.state;
    	
    	return(
    		<div>
    			<Table
    			  className="usedkp_table"
			      columns={this.columns}
			      dataSource={used_data}
			    />
    		</div>
    	);
    }
}

class KpAbility extends React.Component {
	constructor(props) {
		super(props);
		this.state={current:'163840',kp_data:[]};
		this.columns = [{
            title: '知识点名称',
            dataIndex: 'kpname',
            width: '60%',
        }, {
            title: '能力分值',
            dataIndex: 'kp_rating',
            width: '20%',
        }, {
            title: '最近更新时间',
            dataIndex: 'update_time',
            width: '20%',
            render: (text, record, index) => {
              return(
              	text ?
              	(
              	  <div>
					  <p>{text.split('T')[0]}</p>
				  </div>
              	) : ''
              );
            },
        }];
	}

	componentDidMount(){
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
		const {kp_data} = this.state;
        this.setState({ current: e.key },()=>{
            var url = urlip+'getKpWithScore';
            NetUtil.get(url, {chapter_id : this.state.current,student_id:this.props.student_id}, (results) => {
            	console.log('time:'+JSON.stringify(results));
                this.setState({ kp_data : results}); 
            })                         
        });
	}

	render(){
		const {kp_data} = this.state;
		return(
			<Layout style={{ padding: '24px 0', background: '#fff'}}>
		        <Sider width={200} style={{ background: '#fff' }}>
		            <Menu onClick = { (e) => this.handleClick(e) } style = {{ width: 200 } }
                        defaultSelectedKeys = {[this.state.current]}
                        defaultOpenKeys = {['1'] } 
                    	mode = "inline" 
                    >
                        {this.state.menuHtml}
                    </Menu >
		        </Sider>
		        <Content style={{ padding: '0 24px', minHeight: 280 }}>
		           < Table columns = { this.columns } dataSource = { kp_data }/> 
		        </Content>
	        </Layout>
		);
	}
}

class StuCapacity extends React.Component {
	constructor(props){
		super(props);
		this.state = { activeKey : '1',
			username:this.props.location.state.student_name, //学生名字
			groupname:this.props.location.state.groupname,//学生所在班级
			student_id : this.props.params.id,
		};
	}

	onTabChange(key){
		this.setState({activeKey : key});
	}

	render(){
		const {activeKey,username,groupname,student_id} =this.state;
		return(
			<Layout className="layout">
			    <Header style={{background: '#fff',height:'80px'}}>
					<Zq_Header/>
			    </Header>
			    <Content style={{ padding: '0 250px' }}>
			      <Breadcrumb style={{ margin: '12px 0' }} separator=">">
			        <Breadcrumb.Item><Link to="/AuthJWT/t_center/stu_manager">{groupname}</Link></Breadcrumb.Item>
			        <Breadcrumb.Item>{username}</Breadcrumb.Item>
			      </Breadcrumb>
			      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
					<Tabs onChange={(key)=>this.onTabChange(key)} activeKey={activeKey}>
					    <TabPane tab="综合能力" key="1"><OverallAbility student_id={student_id}/></TabPane>
					    <TabPane tab="近期表现" key="2"><RecentKp student_id={student_id}/></TabPane>
					    <TabPane tab="知识点能力" key="3"><KpAbility student_id={student_id}/></TabPane>
				    </Tabs>
			      </div>
			    </Content>
			    <Footer style={{ textAlign: 'center' }}>
			      Ant Design ©2017 Created by Bourne
			    </Footer>
			 </Layout>
		);
	}
}

export default connect(state => {
  console.log(state);
  return {

  }
}, action)(StuCapacity);



