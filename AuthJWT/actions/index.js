import { checkHttpStatus, parseJSON } from '../utils';
import {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA,REG_USER_REQUEST, REG_USER_FAILURE, REG_USER_SUCCESS} from '../constants';
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-fetch';
import NetUtil from '../utils/NetUtil';

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function regUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: REG_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function regUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: REG_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function regUserRequest() {
  return {
    type: REG_USER_REQUEST
  }
}
// export function getTestCenter() {
//   return {
//     type: GET_TESTCENTER_DATA
    
//   }
// }

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(push('/AuthJWT/login'));
    }
}

export function loginUser(username, password, redirect) {
    return function(dispatch) {
        let path = '/login';
        let target = 'http://39.108.85.119:3000';
        let url = target + path;
        dispatch(loginUserRequest());
        return fetch(url, {
            method: 'post',
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({username: username, password: password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token);
                    console.log('decoded:'+JSON.stringify(decoded));
                    console.log('response.token:'+response.token);
                    dispatch(loginUserSuccess(response.token));
                    dispatch(push(redirect));
                } catch (e) {
                    console.log('response.json():'+response.json());
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: response.json()
                        }
                    }));
                }
            })
            .catch(error => {
                console.log('error:'+error);
                dispatch(loginUserFailure(error));
            })
    }
}

export function regUser(username, password, redirect) {
    return function(dispatch) {
        let path = '/newuser';
        let target = 'http://39.108.85.119:3000';
        let url = target + path;
        dispatch(regUserRequest());
        return fetch(url, {
            method: 'post',
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({username: username, password: password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token);
                    dispatch(regUserSuccess(response.token));
                    dispatch(push(redirect));
                } catch (e) {
                    dispatch(regUserFailure({
                        response: {
                            status: 403,
                            statusText: response.json()
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST
  }
}

export function fetchProtectedData(token) {

    return (dispatch, state) => {
        dispatch(fetchProtectedDataRequest());
        let path = '/jwtcheck';
        let target = 'http://39.108.85.119:3000';
        let url = target + path;
        return fetch(url, {
                method: 'POST',
                mode: "cors",
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.data));
            })
            .catch(error => {
                if(error.response.status === 401) {
                  dispatch(loginUserFailure(error));
                  dispatch(push('/AuthJWT/login'));
                }
            })
       }
}

//开始获取数据
const requestPosts = path => {
  return {
    type: 'REQUEST_POSTS',
    path
  }
}

//获取数据成功
const receivePosts = (path, json) => {
  return {
        type: 'RECEIVE_POSTS',
        path ,
        json 
    }
}

export const fetchPosts = (path, postData) => {
    let target = 'http://39.108.85.119:3000';
    let url = target + path;
    return dispatch => {
        dispatch(requestPosts(postData));
        return NetUtil.get(url, postData, json => dispatch(receivePosts(path, json)), errors => {
            console.log(errors);
        })
    }
}

//开始获取数据
const getClassgroupStart = path => {
  return {
    type: 'GET_CLASSGROUP_START',
    path
  }
}

//获取数据成功
const getClassgroupSuc = (path, json) => {
  return {
        type: 'GET_CLASSGROUP_SUCESS',
        path ,
        json 
    }
}
//根据教师username获取 下带的班级分组数据
export const fetchClassGroup = (postData) => {
    let path = "/klmanager/getClassGroup";
    let target = 'http://39.108.85.119:3000';
    let url = target + path;
    return dispatch => {
        dispatch(getClassgroupStart(postData));
        return NetUtil.get(url, postData, json => dispatch(getClassgroupSuc(path, json)), errors => {
            console.log(errors);
        })
    }
}

//开始获取数据
const getGroupDataStart = path => {
  return {
    type: 'GET_GROUPDATA_START',
    path
  }
}

//获取数据成功
const getGroupDataSuc = (path, json) => {
  return {
        type: 'GET_GROUPDATA_SUCESS',
        path ,
        json 
    }
}
//根据班级id获取 班级里的学生信息
export const fetchGroupData = (postData) => {
    let path = "/klmanager/getGroupData";
    let target = 'http://39.108.85.119:3000';
    let url = target + path;
    return dispatch => {
        dispatch(getGroupDataStart(postData));
        return NetUtil.get(url, postData, json => dispatch(getGroupDataSuc(path, json)), errors => {
            console.log(errors);
        })
    }
}

//开始获取数据
const getBookmenuStart = path => {
  return {
    type: 'GET_BOOKMENU_START',
    path
  }
}

//获取数据成功
const getBookmenuSuc = (path, json) => {
  return {
        type: 'GET_BOOKMENU_SUCESS',
        path ,
        json 
    }
}

export const fetchBookMenu = (path, postData) => {
    let target = 'http://39.108.85.119:3000';
    let url = target + path;
    return dispatch => {
        dispatch(getBookmenuStart(postData));
        return NetUtil.get(url, postData, json => dispatch(getBookmenuSuc(path, json)), errors => {
            console.log(errors);
        })
    }
}

//开始获取数据
const getSelectmenuStart = path => {
  return {
    type: 'GET_SELECTMENU_START',
    path
  }
}

//获取数据成功
const getSelectmenuSuc = (path, json) => {
  return {
        type: 'GET_SELECTMENU_SUCESS',
        path ,
        json 
    }
}

export const fetchSelectMenu = (path, postData) => {
    let target = 'http://39.108.85.119:3000';
    let url = target + path;
    return dispatch => {
        dispatch(getSelectmenuStart(postData));
        return NetUtil.get(url, postData, json => dispatch(getSelectmenuSuc(path, json)), errors => {
            console.log(errors);
        })
    }
}

export const addToBasket = (data) =>{
    return {
        type: 'ADD_BASKET_DATA',
        data
    }
}

export const deleteFromBasket = (data) =>{
    return {
        type: 'DEL_BASKET_DATA',
        data
    }
}

//清除试题篮里数据
const clearBasketData = () => {
  console.log("clear!!!");
  return {
        type: 'CLEAR_BASKET_DATA',
  }
}

// 在test中心的测试信息中新增该行测试信息。
const addNewTest = (testname,testid) => {
  return {
        type: 'ADD_NEW_TEST',
        testname,
        testid
    }
}

// 保存新建测试信息，并上传后台
export const saveNewTest = (path, postData) => {
    let target = 'http://39.108.85.119:3000';
    let url = target + path;
    return dispatch => {
        console.log("postData:"+JSON.stringify(postData));
        return NetUtil.post(url, postData,'',json => {
            console.log("json:"+JSON.stringify(json));
            dispatch(clearBasketData());
            dispatch(addNewTest(postData.test_name,json.test_id));
            dispatch(push("/AuthJWT/t_center/testcenter"));
        }
        , errors => {console.log(errors);
        })
    }
}


//删除测试中心 一行测试数据
const deleteOneTest = (index) => {
  return {
        type: 'DEL_ONE_TEST',
        index
  }
}

export const delOneTest = (path,testid,index) => {
    let target = 'http://39.108.85.119:3000';
    let url = target + path;
    return dispatch => {
        return NetUtil.post(url, {test_id:testid},'',json => {
            console.log("json:"+JSON.stringify(json));
            dispatch(deleteOneTest(index));
        }
        , errors => {console.log(errors);
        })
    }
}

const changeTestState = (index,time) => {
  return {
        type: 'CHANGE_TEST_STATE',
        index,
        time
  }
}

//将试题要分发的班级和个人 传递到后台
export const distributeTest = (path,keys,testid,index) => {
    let target = 'http://39.108.85.119:3000';
    let url = target + path;
    return dispatch => {
        return NetUtil.post(url, {keys:keys,test_id:testid},'',json => {
            console.log("json:"+JSON.stringify(json));
            dispatch(changeTestState(index,json.enable_time));
        }
        , errors => {console.log(errors);
        })
    }
}

// 在教师所属分组下新增新建的分组
const addToGroups = (groupid,groupname) => {
  return {
        type: 'ADD_NEW_GROUP',
        groupname,
        groupid
    }
}

//新建老师管理的班级分组，并传到后台
export const addNewGroup = (id,gName) => {
    let path = "/klmanager/addNewGroup";
    let target = 'http://39.108.85.119:3000';
    let url = target + path;
    return dispatch => {
        return NetUtil.post(url, {teacher_id:id,group_name:gName},'',json => {
            console.log("json:"+JSON.stringify(json));
            dispatch(addToGroups(json.stu_group_id,gName));
        }
        , errors => {console.log(errors);
        })
    }
}

//删除测试中心 一行测试数据
const deleteOneGroup = (groupid) => {
  return {
        type: 'DEL_ONE_GROUP',
        groupid
  }
}

//删除老师管理的班级分组（包括分组里的学生信息）
export const delOneGroup = (groupid) => {
    let path = "/klmanager/deleteOneGroup";
    let target = 'http://39.108.85.119:3000';
    let url = target + path;
    return dispatch => {
        return NetUtil.post(url, {stu_group_id:groupid},'',json => {
            console.log("json:"+JSON.stringify(json));
            dispatch(deleteOneGroup(groupid));
        }
        , errors => {console.log(errors);
        })
    }
}

//删除storge保存的班级数据中单个学生数据
const deleteOneStudent = (index) => {
  return {
        type: 'DEL_ONE_STUDENT',
        index
  }
}

//删除班级分组里单个学生信息
export const delOneStu = (stuid,index) => {
    let path = "/klmanager/deleteOneStudent";
    let target = 'http://39.108.85.119:3000';
    let url = target + path;
    return dispatch => {
        return NetUtil.post(url, {student_id:stuid},'',json => {
            console.log("json:"+JSON.stringify(json));
            dispatch(deleteOneStudent(index));
        }
        , errors => {console.log(errors);
        })
    }
}

//新增
const addOneStudent = (values,groupid) => {
  return {
        type: 'ADD_ONE_STUDENT',
        values,
        groupid
  }
}

//新增班级分组里单个学生信息
export const addOneStu = (values,id) => {
    let url = 'http://39.108.85.119:3000/klmanager/addOneStudent';
    return dispatch => {
        return NetUtil.post(url, {student_name:values.stuname,student_id:values.stuid,phone_num:values
            .phonenum,stu_group_id:id},'',json => {
            console.log("json:"+JSON.stringify(json));
            dispatch(addOneStudent(values,id));
        }
        , errors => {console.log(errors);
        })
    }
}
