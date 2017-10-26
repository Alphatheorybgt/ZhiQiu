import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Icon, Row, Col, Menu, Select,Table,Button,Input,Dropdown,Popconfirm,Checkbox,Tabs,Progress,Popover,Tooltip,Breadcrumb} from 'antd';
import NetUtil from '../utils/NetUtil';
import Styles from '../styles/TestResult.css';
import Tex from './renderer.js';
import *as action from '../actions/';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Zq_Header from '../containers/ZQ_Header';

const { Header, Footer, Sider, Content } = Layout;

var urlip = 'http://39.108.85.119:3000/klmanager/';

const TabPane = Tabs.TabPane;

class ExerciseDetail extends React.Component{
	constructor(props) {
		super(props);
		this.state={ test_data : [] };
	}
	componentDidMount(){
		var data = []; 
        var url = urlip+'getTestDetail';
        NetUtil.get(url, {test_id : this.props.testid}, (results) => {
            data = results;
            this.setState({test_data : data});
        })
	}
	render(){
		const {test_data} = this.state;
		console.log("test_data:"+ JSON.stringify(test_data));
		const isdeliverd = this.props;
		var tests = [];
		if(isdeliverd){
			for(var j = 0; j < test_data.length; j++) {
	        	tests.push(
	        		<div key={j}>
	        			<OneExerciseView exercise={test_data[j]} />
	        		</div>
	        	);
	    	}
		}else{
			for(var j = 0; j < test_data.length; j++) {
	        	tests.push(
	        		<div key={j}>
	        			<OneExercise exercise={test_data[j]} />
	        		</div>
	        	);
	    	}
		}
    	return(
    		<div>
			    {tests}
		  	</div>
    	);
	}
}

class OneExerciseView extends React.Component {
	constructor(props) {
		super(props);
		this.state={};
	}
	render(){
		if(this.props.exercise){
			const {title ,type, answer, breakdown,title_img_url,correct_rate,kp_rate,stu_false} = this.props.exercise;
			console.log(JSON.stringify(this.props.exercise));
			var steps = [];
			for(var j = 0; j < breakdown.length; j++) {
				console.log('breakdown[j].content:'+breakdown[j].content);
            	steps.push(
            		<div key={j} className="step_frame">
            			<Row type="flex" justify="start">
	    					<Col span={1}>
	    						<p>{(j+1).toString()}.</p>
							</Col>
							<Col span={23}>
								<Tex content={breakdown[j].content}/>
	            				<div><a>{breakdown[j].kpname}</a></div>
							</Col>
						</Row>
            		</div>
            	);
        	}
        	var choice = eval(answer);

			var answerDom = [];
        	switch(type){
        		case 0:  
        			answerDom = (  //填空题答案
						<div className="step_answer">
							<p className="step_index">答案：&nbsp;</p>
							{choice.map((item, i) => {
		        				return(
		            				<div>
										<Tex className="step_content" content={item.value} />
		            				</div>
		            			);
							})}
						</div>
        			);
        			break;
        		case 1:
        			answerDom = (  //选择题选项和答案
						choice.map((item, i) => {
	        				return(
	            				<Row className="row_answer" type="flex" justify="start" align="middle">
	            					<Col span={1}>
										<p><Checkbox checked={item.correct} disabled ></Checkbox></p>
									</Col>
	            					<Col span={18}>
										<Tex content={item.value} />
									</Col>
	            				</Row>
	            			);
						})
        			);
        			break;
        		case 2:
					answerDom = (  //选择题 图片选项和答案
						choice.map((item, i) => {
	        				return(
	            				<Row className="row_answer" type="flex" justify="start" align="middle">
	            					<Col span={1}>
										<p><Checkbox checked={item.correct} disabled ></Checkbox></p>
									</Col>
	            					<Col span={18}>
										<div style={{width:130,height:60}}>
											<img className="answer_img" src={item.url}/>
										</div>
									</Col>
	            				</Row>
	            			);
						})
					);
					break;
        	}

			var kprateDom = (
				kp_rate.map((item, i) => {
					return(
						<div key={i}>
						    <Row type="flex" justify="start">
		    					<Col span={1}>
		    						<p>{(i+1).toString()}.</p>
								</Col>
								<Col span={12}>
									<Progress 
									    percent={item.rate} 
									    format={(percent) => `${percent}%`} 
								    />
								</Col>
		    				</Row>
						</div>
        			);
				})
			);

			var false_content = (
				stu_false.map((item,i) => {
					return(
						<p>{item.student_name}</p>
					);
				})
			);
			var stufalseDom = (
				stu_false.length > 0 ? 
				<Popover placement="rightTop" content={false_content} trigger="click">
			      <Progress type="circle" percent={correct_rate} format={(percent) => `${percent}%`}  width={85} />
			    </Popover>
				:
				<Progress type="circle" percent={correct_rate} format={(percent) => `${percent}%`}  width={85} />
			);
        	return(
				<div className="exercise_frame">
					<div className="exercise_body_frame">
						<Tex content={title} />
						{
							title_img_url? 
							<div style={{width:680,height:60}}>
								<img className="answer_img" src={title_img_url}/>
							</div> 
							:
							null
						}
						{answerDom}
					</div>
					<div className="kp_step">
						<p className="step_annouce">步骤：</p>
						<div>
							{steps}
						</div>
					</div>
					<div className="pro_result">
						<div className="result_cir">
							{stufalseDom}
						</div>
						<Tooltip placement="topLeft" title="知识点完成率" arrowPointAtCenter>
							<div className="result_progress">
								{kprateDom}
							</div>
						</Tooltip>
					</div>
				</div>
			);
		}
	}
}

class OneExercise extends React.Component {
	constructor(props) {
		super(props);
		this.state={expand:false,display:'none'};
	}
	handleShow(){
		this.setState({expand:!this.state.expand});
		if(this.state.display === 'none'){
			this.setState({display:'block'});
		}
		else{
			this.setState({display:'none'});
		}
	}
	render(){
		const {expand,display} = this.state;
		if(this.props.exercise){
			const {title ,type, answer, breakdown,title_img_url} = this.props.exercise;
			const isinbasket = this.props.isinbasket;
			var steps = [];
			for(var j = 0; j < breakdown.length; j++) {
            	steps.push(
            	<div key={j} className="step_frame">
            		<Row type="flex" justify="start">
    					<Col span={1}>
    						<p>{(j+1).toString()}.</p>
						</Col>
						<Col span={23}>
							<Tex content={breakdown[j].content}/>
            				<div><a>{breakdown[j].kpname}</a></div>
						</Col>
					</Row>
            	</div>
            	);
        	}
        	var choice = eval(answer);

			var answerDom = [];
        	switch(type){
        		case 0:  
        			answerDom = (  //填空题答案
						<div className="step_answer">
							<p className="step_index">答案：&nbsp;</p>
							{choice.map((item, i) => {
		        				return(
		            				<div>
										<Tex className="step_content" content={item.value} />
		            				</div>
		            			);
							})}
						</div>
        			);
        			break;
        		case 1:
        			answerDom = (  //选择题选项和答案
						choice.map((item, i) => {
	        				return(
	            				<Row className="row_answer" type="flex" justify="start" align="middle">
	            					<Col span={1}>
										<p><Checkbox checked={expand? item.correct:0} disabled ></Checkbox></p>
									</Col>
	            					<Col span={18}>
										<Tex content={item.value} />
									</Col>
	            				</Row>
	            			);
						})
        			);
        			break;
        		case 2:
					answerDom = (  //选择题 图片选项和答案
						choice.map((item, i) => {
	        				return(
	            				<Row className="row_answer" type="flex" justify="start" align="middle">
	            					<Col span={1}>
										<p><Checkbox checked={expand? item.correct:0} disabled ></Checkbox></p>
									</Col>
	            					<Col span={18}>
										<div style={{width:130,height:60}}>
											<img className="answer_img" src={item.url}/>
										</div>
									</Col>
	            				</Row>
	            			);
						})
					);
					break;
        	}

        	return(
				<div className="exercise_frame">
					<div className="exercise_body_frame">
						<Tex content={title} />
						{
							title_img_url? 
							<div style={{width:680,height:60}}>
								<img className="answer_img" src={title_img_url}/>
							</div> 
							:
							null
						}
						{answerDom}
					</div>
					<div style={{display}} className="kp_step">
						<p className="step_annouce">步骤：</p>
						<div>
							{steps}
						</div>
					</div>
					<div className="button_frame">
						<Button onClick={()=>this.handleShow()}>{!expand? "解题详情" : "收起详情"}</Button>
					</div>
				</div>
			);
		}
	}
}

class KpResult extends React.Component {
	constructor(props) {
		super(props);
		this.state={kp_data : []};
        this.columns = [{
            title: '学生',
            dataIndex: 'student_name',
            width: '30%',
        }, {
            title: '正确率',
            dataIndex: 'stu_rate',
            width: '30%',
            render: (text, record, index) => {
              return(
	          	  <div>
					  <p>{text}%</p>
				  </div>
              );
            },
        },{
            title: '错误次数',
            dataIndex: 'stu_count',
            width: '40%',
        }];
		 
    }
    componentDidMount(){
    	var data = []; 
        var url = urlip+'getTestKpResult';
        NetUtil.get(url, {test_id : this.props.testid}, (results) => {
            this.setState({kp_data : results});
        })
    }
    render(){
    	const {kp_data} = this.state;
    	var progressDom = (
			kp_data.map((item, i) => {
				var content = [];
				var data = [];
		    	data = item.stu_mistake;
		    	content.push(
	    			<div>
					    < Table columns = {this.columns} dataSource = {data} bordered size='small' /> 
					</div>
	    		)
				return(
    				<Row className="kp_progress" key={item.kpid} type="flex" justify="space-around" align="middle">
    					<Col span={4}>
    						<span>{item.kpname}</span>
						</Col>
						<Col span={14}>
							<Popover placement="right" content={item.kp_correct_rate==100? null : content} trigger="hover">
	    						<Progress 
	    							percent={item.kp_correct_rate} 
	    							format={(percent) => `${percent}%`}  
	    						/>
    						</Popover>
						</Col>
						<Col span={2}>
    						<span className="row_kp_count">{item.kp_count}/</span>
    						<span className="row_kp_count">{item.kp_count_all}</span>
						</Col>
    				</Row>
    			);
			})
		)
    	return(
    		<div>
			    {progressDom}
		  	</div>
    	);
    }
}

class StudentRes extends React.Component {
	constructor(props) {
        super(props);
        this.state={filterDropdownVisible: false, test_res:{}, searchText: '', filtered: false};
    }

	componentDidMount(){
		var data = []; 
        var url = urlip+'getTestResult';
        NetUtil.get(url, {test_id : this.props.testid}, (results) => {
        	console.log('test_res:'+JSON.stringify(results));
            this.setState({test_res:results});
        }) 
	}

    onInputChange(e){
    	this.setState({ searchText: e.target.value });
  	}

    onSearch(){
	    const { searchText } = this.state;
	    const reg = new RegExp(searchText, 'gi');
	    this.setState({
	      filterDropdownVisible: false,
	      filtered: !!searchText,
	      test_data: test_data.map((record) => {
	        const match = record.studentname.match(reg);
	        if (!match) {
	          return null;
	        }
	        return {
	          ...record,
	          studentname: (
	            <span>
	              {record.studentname.split(reg).map((text, i) => (
	                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
	              ))}
	            </span>
	          ),
	        };
	      }).filter(record => !!record),
	    });
	}

	render(){
		this.columns = [{
            title: '学生姓名',
            dataIndex: 'studentname',
            width: '20%',
            key:'student_id',
            filterDropdown: (
		        <div className="custom-filter-dropdown">
			          <Input
			            ref={ele => this.searchInput = ele}
			            placeholder="输入学生姓名"
			            value={this.state.searchText}
			            onChange={(e)=>this.onInputChange(e)}
			            onPressEnter={()=>this.onSearch()}
			          />
		          <Button type="primary" onClick={()=>this.onSearch()}>查找</Button>
		        </div>
	      	),
	      	filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
	      	filterDropdownVisible: this.state.filterDropdownVisible,
	      	onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }, () => this.searchInput.focus()),
	    }, {
            title: '完成情况',
            dataIndex: 'completion',
            width: '15%',
            key:'completion',
            render: (text, record) => {
              return(
                <span >
                  <font color={record.completion? "#00a854" : "red"}>{record.completion? "已完成" : "未完成"}</font>
                </span>
              );
            },
            filters: [{
	        	text: '已完成',
	       	 	value: '已完成',
	      	}, {
		        text: '未完成',
		        value: '未完成',
	      	}],
            onFilter: (value, record) => record.completion.indexOf(value) === 0,
        }, {
            title: '正确率(%)',
            dataIndex: 'score',
            width: '15%',
            key:'score',
            sorter: (a, b) => a.score - b.score,
        }, {
            title: '完成时间',
            dataIndex: 'end_time',
            width: '15%',
            key:'end_time',
            sorter: (a, b) => a.end_time - b.end_time,
        },{
            title: '作业耗时(分钟)',
            dataIndex: 'time_consuming',
            width: '15%',
            key:'time_consuming',
            sorter: (a, b) => a.time_consuming - b.time_consuming,
        },];
		const {test_res} = this.state;
		return(
			<div>
				<div className="row_rate">
					<Row type="flex" justify="center" align="middle">
						<Col span={5}>
							<Progress 
								type="circle"
								width={80}
							    percent={test_res.completion_per} 
							    format={(percent) => `${percent}%`} 
						    />
						</Col>
						<Col span={5}>
							<Progress 
								type="circle"
								width={80}
							    percent={test_res.correct_rate} 
							    format={(percent) => `${percent}%`} 
						    />
						</Col>
						<Col span={5}>
							<p className="row_rate_time">{test_res.timeconsuming_per}</p>
						</Col>
					</Row>
					<Row type="flex" justify="center" align="middle">
						<Col span={5}><p className="row_rate_p">作业提交率</p></Col>
						<Col span={5}><p className="row_rate_p">平均正确率</p></Col>
						<Col span={5}><p className="row_rate_p">平均耗时（分钟）</p></Col>
					</Row>
				</div>
				<div>
					<Table columns={this.columns} dataSource={test_res.test_data} />
				</div>
			</div>
		);
	}
}

class TestResult extends React.Component {
	constructor(props){
		super(props);
		this.state = { activeKey : '1'};
	}
	
	onTabChange(key){
		this.setState({activeKey : key});
	}
	
	render(){
		const {activeKey} = this.state;
		const testid = this.props.params.id;
		console.log("testid:"+testid);
		console.log("this.props.location.state:"+JSON.stringify(this.props.location.state));
		const isdeliverd = this.props.location.state.teststate;//判断这个test是否已派发给学生
		const testname = this.props.location.state.testname;

    	var tabDom = (
			isdeliverd ?
			<Tabs onChange={(key)=>this.onTabChange(key)} activeKey={activeKey}>
	    		<TabPane tab="测试结果" key="1"><StudentRes testid={testid}/></TabPane>
			    <TabPane tab="知识点" key="2">
			    	<div>
			    		<h2 className="tab2_title">知识点正确率</h2>
			    		<KpResult testid={testid}/>
			    	</div>	
			    </TabPane>
			    <TabPane tab="试题详情" key="3"><ExerciseDetail isdeliverd={isdeliverd} testid={testid}/></TabPane>
		    </Tabs>
		    :
		    <Tabs onChange={(key)=>this.onTabChange(key)} activeKey={activeKey}>
			 	<TabPane tab="试题详情" key="1"><ExerciseDetail isdeliverd={isdeliverd} testid={testid}/></TabPane>
		    </Tabs>
    	)
		return(
			<Layout className="layout">
			    <Header style={{background: '#fff',height:'80px'}}>
			      <Zq_Header/>
			    </Header>
			    <Content style={{ padding: '0 120px' }}>
			      <Breadcrumb style={{ margin: '12px 0' }} separator=">">
			        <Breadcrumb.Item><Link to="/AuthJWT/t_center/testcenter">测试中心</Link></Breadcrumb.Item>
			        <Breadcrumb.Item>{testname}</Breadcrumb.Item>
			      </Breadcrumb>
			      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
			      	{tabDom}
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
  return {
  }
}, action)(TestResult);


