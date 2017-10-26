import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Icon,Spin,Table, Menu, Select, Button,Breadcrumb, Popconfirm ,Checkbox,TreeSelect,Modal} from 'antd';
import NetUtil from './utils/NetUtil';
import Styles from './testCenter.css';
import *as action from '../actions/';
import {connect} from 'react-redux';
import {Link} from 'react-router';

const { SubMenu } = Menu;
const Option = Select.Option;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

var urlip = 'http://39.108.85.119:3000/klmanager/';

var treeData = [{
  label: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    label: 'Child Node1',
    value: '0-0-0',
    key: '0-0-0',
  }],
}, {
  label: 'Node2',
  value: '0-1',
  key: '0-1',
  children: [{
    label: 'Child Node3',
    value: '0-1-0',
    key: '0-1-0',
  }, {
    label: 'Child Node4',
    value: '0-1-1',
    key: '0-1-1',
  }, {
    label: 'Child Node5',
    value: '0-1-2',
    key: '0-1-2',
  }],
}];

class TestCenter extends React.Component{
    constructor(props) {
        super(props);
        this.state={visible:false,teacher_id : 1,tree_value:[],treeData:[]};
        this.columns = [{
            title: '测试名称',
            dataIndex: 'testname',
            width: '30%',
            render: (text, record,index) => {
              let urlstr = "/AuthJWT/testresult/"+record.key;
              return(
                <span>
                  <Link to={{pathname:urlstr,state:{teststate:record.teststate,testname:record.testname}}} >{text}</Link>
                </span>
              );
            },
        }, {
            title: '状态',
            dataIndex: 'teststate',
            width: '20%',
            render: (text, record) => {
              return(
                <span >
                  <font color={record.teststate? "00a854" : "red"}>{record.teststate? "已发布" : "未发布"}</font>
                </span>
              );
            },
        }, {
            title: '测试时间',
            dataIndex: 'time',
            width: '25%',
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record,index) => {
              return(
                <span>
                  {
                    !record.teststate?
                    <a onClick={()=>this.onTest(record.key,index)}>发布</a>
                    :
                    <a className="a_action">发布</a>
                  }
                  <span className="ant-divider" />
                  < Popconfirm title = "确定删除?" onConfirm = {() => this.onDelete(record.key,index)} >
                      < a href = "#" > 删除 < /a> 
                  </Popconfirm >
                  <span className="ant-divider" />
                  <a onClick={()=>this.onCopy(index)}>复制</a>
                </span>
              );
            },
        }];
    }

    componentDidMount(){
      this.loadTestTable();
    }

    loadTestTable(){
      const {teacher_id} = this.state;
      var url = "/klmanager/getTestTable";
      //this.setState({isLoading: true});
      console.log(this.props.fetchPosts);
      this.props.fetchPosts(url, {teacher_id});
    }
    
    onTest(testid,index){
      const {treeData,tree_value} = this.state; 
      this.setState({visible : true, currentid:testid,currentindex:index},()=>{
            var data = []; 
            var url = urlip+'getStudentGroup';
            NetUtil.get(url, {teacher_id : 1}, (results) => {
                data = results;
                console.log("treeData:"+JSON.stringify(data));
                this.setState({ treeData : data}); 
            })                         
      });
    }
    
    onCopy(index){
      // const {data} = this.state;

    }

    onChange(value,label,extra){
      console.log(extra);
      console.log("value,label:"+value+" "+label);
      this.setState({ tree_value : value , extra : extra});
    }

    onDelete(testid,index){
      var url = "/klmanager/deleteOneTest";
      this.props.delOneTest(url,testid,index);
    }

    handleOk(){
      const {extra,currentid,currentindex} =this.state;
      var url = "/klmanager/distributeTest";
      var keys = [];
      for(var j = 0;j<extra.allCheckedNodes.length;j++){
          if(extra.allCheckedNodes[j].children != null){
              for(var i=0;i<extra.allCheckedNodes[j].children.length;i++){
                  keys.push(extra.allCheckedNodes[j].children[i].node.key);
              }
          }else{
              keys.push(extra.allCheckedNodes[j].node.key);
          }
      }
      this.props.distributeTest(url,keys,currentid,currentindex);
      this.setState({
          visible: false,
      });
    }

    handleCancel(){
      this.setState({
        visible: false,
      });
    }

    // handleAddTest(){
    // }

    render(){
      const {visible,treeData,tree_value} = this.state;
      const {tests,isFetching} = this.props;
      // console.log('tests:'+ JSON.stringify(tests));

      const tProps = {
        treeData : treeData,
        value: tree_value,
        onChange: (value,label,extra)=>this.onChange(value,label,extra),
        multiple: true,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        searchPlaceholder: '请选择发布班组',
        style: {
          width: 300,
        },
      };
      return(
        <div>
            <Spin spinning={isFetching} />
            <Button className="add_btn" type="primary"><Link to="/AuthJWT/exerview"><Icon type="plus" />添加测试</Link></Button>
            <Modal title="试题分发" visible={visible} width={500} style={{height:400}} onOk={()=>this.handleOk()} onCancel={()=>this.handleCancel()} okText="确定">
                <TreeSelect {...tProps}/>
            </Modal>
            < Table columns = { this.columns } dataSource = { tests }/> 
         </div>   
      );
    }
}

export default connect(state => {
  console.log(state);
  return {
    tests: state.fetchData.test_data, 
    isFetching: state.fetchData.isFetching, 
    teacher_id:state.auth.userid,
  }
}, action)(TestCenter);