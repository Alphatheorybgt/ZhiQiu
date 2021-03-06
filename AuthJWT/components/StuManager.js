import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Icon,Table, Menu, Select, Button,Breadcrumb, Popconfirm ,Row, Col,Checkbox,Collapse,Input,Modal,Form} from 'antd';
import NetUtil from './utils/NetUtil';
import Styles from '../styles/stu_manager.css';
import *as action from '../actions/';
import {connect} from 'react-redux';
import {Link} from 'react-router';
const { SubMenu } = Menu;
const Panel = Collapse.Panel;
const FormItem = Form.Item;

var urlip = 'http://39.108.85.119:3000/klmanager/';

var data_init = [{
  key: '1',
  student_id: '001',
  student_name: '小明',
  stu_phone: '13802882111',
}, {
  key: '2',
  student_id: '002',
  student_name: '奇哥',
  stu_phone: '13802882112',
}, {
  key: '3',
  student_id: '003',
  student_name: '张三',
  stu_phone: '13802882114',
}]; 

// const customPanelStyle = {
//       background: '#f7f7f7',
//       borderRadius: 4,
//       marginBottom: 24,
//       border: 0,
//     };
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const StuInfoForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
          <Modal
            visible={visible}
            title="输入新成员信息"
            okText="确定"
            onCancel={onCancel}
            onOk={onCreate}
            width={400}
          >
            <Form>
              <FormItem {...formItemLayout} label="学生姓名">
                {getFieldDecorator('stuname', {
                  rules: [{ required: true, message: '请输入学生姓名!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="学号">
                {getFieldDecorator('stuid', {
                  rules: [{ required: true, message: '请输入学生学号!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="手机号">
                {getFieldDecorator('phonenum', {
                  rules: [{ required: true, message: '请输入联系方式!' }],
                })(
                  <Input />
                )}
              </FormItem>
            </Form>
        </Modal>
    );
  }
);

class StuTable extends React.Component {
  constructor(props) {
    super(props);
      this.columns = [{
            title: '学生姓名',
            dataIndex: 'student_name',
            width: '30%',
            render: (text, record,index) => {
              let urlstr = "/AuthJWT/stu_capacity/"+record.student_id;
              return(
                <span>
                  <Link to={
                    {pathname:urlstr,state:{student_name:record.student_name,groupname:this.props.groupname}}
                  }>
                    {text}
                  </Link>
                </span>
              );
            },
        }, {
            title: '学号',
            dataIndex: 'student_id',
            width: '30%',
        }, {
            title: '手机号',
            dataIndex: 'phone_num',
            width: '30%',
        },{
            title: '操作',
            dataIndex: 'operation',
            width: '10%',
            render: (text, record, index) => {
              return (
                this.props.studata.length > 1 ?
                (
                  <Popconfirm title="确认删除?" onConfirm={() => this.deleteOneStu(record.student_id,index)}>
                    <a href="#">删除</a>
                  </Popconfirm>
                ) : null
              );
            },
        }];
    }
    
    deleteOneStu(stuid,index){ //删除一个学生信息
      this.props.onDelOneStu(stuid,index);
    }

    render(){
      return(
        < Table columns = { this.columns }  size="middle" dataSource = { this.props.studata }/>
      );
    }
}


class StuManager extends React.Component{
    constructor(props) {
        super(props);
        this.state={data: data_init,visible:false,gName:null,form_visible:false};
    }

    componentDidMount(){
      this.loadClassGroup();
    }

    loadClassGroup(){
      this.props.fetchClassGroup({userName:this.props.userName});
    }

    handleData(key){
      this.setState({activeGroupId:key});
      this.props.fetchGroupData({stu_group_id:key}); //根据班级id获取该班级下的学生信息
    }

    addGroup(){
      this.setState({visible: true});
    }

    onDelGroup(stu_group_id){
      this.props.delOneGroup(stu_group_id);
    }

    handleAddOneStu(){
      this.setState({form_visible: true});
    }

    onDeleteOne(stuid,index){ //删除一个学生信息
      this.props.delOneStu(stuid,index);
    }
    
    handleCancel(){
      this.setState({visible: false});
    }

    handleOk(){
      const {gName} =this.state;
      this.props.addNewGroup(this.props.teacher_id,gName);
      this.setState({visible: false});
    }

    onFormCancel(){
      this.setState({form_visible: false});
    }

    onFormCreate(){
      const {activeGroupId} = this.state;
      const form = this.form;

      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ form_visible: false });
        
        this.props.addOneStu(values,activeGroupId);
      }); 
    }

    onChangeGroupName(e){
      this.setState({ gName: e.target.value });
    }
    
    saveFormRef(form){
      this.form = form;
    }

    render(){
      const {groups,isFetching,stus} = this.props;
      const {visible,form_visible} = this.state;

      if(groups){
        console.log(JSON.stringify(groups));
        var groupDom=groups.map((item,i)=>{
          return(
            <Panel header={<span>{item.group_name}</span>} key={item.stu_group_id}>
              <div>
                <div>
                  <StuInfoForm
                    ref={(form)=>this.saveFormRef(form)}
                    visible={this.state.form_visible}
                    onCancel={()=>this.onFormCancel()}
                    onCreate={()=>this.onFormCreate()}
                  />
                </div>
                <Row type="flex" justify="space-between" align="middle" className="rowinCollapse">
                  <Col span={6}>
                    <div><Button onClick={()=>this.handleAddOneStu()}>添加成员</Button></div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Popconfirm 
                        title="确定删除整个分组?" 
                        onConfirm={()=>this.onDelGroup(item.stu_group_id)}
                        okText="确定" 
                        cancelText="取消"
                      >
                        <Button className="btn_delall">删除全部</Button>
                      </Popconfirm>
                    </div>
                  </Col>
                </Row>
                <div>
                  <StuTable 
                    studata = {stus} 
                    groupname = {item.group_name}
                    onDelOneStu = {(stuid,index)=>this.onDeleteOne(stuid,index)}
                  />
                </div>  
              </div> 
            </Panel>
          );
        });
      }
        
      return(
            <div>
              <Row type="flex" justify="space-between" align="middle">
                <Col span={6}>
                  <div className="p_class">班级分组</div>
                </Col>
                <Col span={6}>
                  <div className="p_button"><Button type="primary" onClick={()=>this.addGroup()}><Icon type="plus"/>添加班级</Button></div>
                </Col>
                <Modal title="新建班级分组" visible={visible} width={500} style={{height:400}} onOk={()=>this.handleOk()} onCancel={()=>this.handleCancel()} okText="确定">
                  <Input placeholder="输入班组名称" style={{width: 300}} onChange={(e)=>this.onChangeGroupName(e)} />
                </Modal>
              </Row>  
              <div>
                <Collapse accordion onChange={(key)=>this.handleData(key)}>
                  {groupDom}
                </Collapse>
              </div>
            </div>
      );
    }
}

export default connect(state => {
  console.log(state);
  return {
    groups: state.fetchClassGroupData.classgroup_data, 
    stus : state.fetchGroupStuData.groupstu_data,
    isFetching: state.fetchClassGroupData.isFetching, 
    userName: state.auth.userName,
    teacher_id: state.auth.userid
  }
}, action)(StuManager,StuTable);