import {createReducer} from '../utils';
import {RECEIVE_PROTECTED_DATA, FETCH_PROTECTED_DATA_REQUEST} from '../constants';

// const initialState = {
//     data: null,
//     isFetching: false
// };

// export default createReducer(initialState, {
//     [RECEIVE_PROTECTED_DATA]: (state, payload) => {
//         return Object.assign({}, state, {
//             'data': payload.data,
//             'isFetching': false
//         });
//     },
//     [FETCH_PROTECTED_DATA_REQUEST]: (state, payload) => {
//         return Object.assign({}, state, {
//             'isFetching': true
//         });
//     }
// });

export const getData = (state ={data: null, isFetching: false}, action = {}) => {
    switch(action.type){
        case 'RECEIVE_PROTECTED_DATA':
            return Object.assign({}, state, {
                'data': action.payload.data,
                'isFetching': false
            });
        case 'FETCH_PROTECTED_DATA_REQUEST':
            return Object.assign({}, state, {
                'isFetching': true
            });
        default:
            return state;
    }
}

export const fetchData = (state = {test_data: [], isFetching: false} , action = {}) => {
    switch(action.type){
        case 'REQUEST_POSTS':
            return {'isFetching': true};
        case 'RECEIVE_POSTS':
            // console.log("test_data:"+action.json);
            return {'test_data':action.json,'isFetching':false};//返回一个新的state
        case 'ADD_NEW_TEST':
            var newtest = {'key':action.testid,'testname':action.testname,'teststate':0,'time':''}
            return Object.assign({}, state, {
                'test_data': [newtest,...state.test_data],
            });
        case 'DEL_ONE_TEST':
            let data = Object.assign([], state.test_data);
            data.splice(action.index,1);
            return Object.assign({}, state, {
                'test_data': data,
            });
        case 'CHANGE_TEST_STATE':
            let newdata = Object.assign([], state.test_data);
            newdata[action.index].teststate = 1;
            newdata[action.index].time = action.time;
            return Object.assign({}, state, {
                'test_data': newdata,
            });
        default:
            return state;
    }
}

export const fetchBookMenuData = (state ={bookmenu_data: [], isFetching: false}, action = {}) => {
    switch(action.type){
        case 'GET_BOOKMENU_START':
            return {'isFetching': true};
        case 'GET_BOOKMENU_SUCESS':
            return {'bookmenu_data':action.json,'isFetching':false};//返回一个新的state
        default:
            return state;
    }
}

export const fetchClassGroupData = (state ={classgroup_data: [], isFetching: false}, action = {}) => {
    switch(action.type){
        case 'GET_CLASSGROUP_START':
            return {'isFetching': true};
        case 'GET_CLASSGROUP_SUCESS':
            return {'classgroup_data':action.json,'isFetching':false};//返回一个新的state
        case 'ADD_NEW_GROUP':
            var newgroup = {'stu_group_id':action.groupid,'group_name':action.groupname};
            return Object.assign({}, state, {
                'classgroup_data': [...state.classgroup_data,newgroup],
            });
        case 'DEL_ONE_GROUP':
            let data = Object.assign([], state.classgroup_data);
            var index = 0;
            for(var i=0;i<data.length;i++){
                if(data[i].stu_group_id === action.groupid){
                    index = i;
                }
            }
            data.splice(index,1);
            return Object.assign({}, state, {
                'classgroup_data': data,
            });
        default:
            return state;
    }
}

export const fetchGroupStuData = (state ={groupstu_data: [], isFetching: false}, action = {}) => {
    switch(action.type){
        case 'GET_GROUPDATA_START':
            return {'isFetching': true};
        case 'GET_GROUPDATA_SUCESS':
            return {'groupstu_data':action.json,'isFetching':false};//返回一个新的state
        case 'DEL_ONE_STUDENT':
            let data = Object.assign([], state.groupstu_data);
            data.splice(action.index,1);
            return Object.assign({}, state, {
                'groupstu_data': data,
            });
        case 'ADD_ONE_STUDENT':
            var newstu = {'stu_group_id':action.groupid,
                          'student_name':action.values.stuname,
                          'student_id':action.values.stuid,
                          'phone_num':action.values.phonenum};
            return Object.assign({}, state, {
                'groupstu_data': [...state.groupstu_data,newstu],
            });
        default:
            return state;
    }
}

export const fetchSelMenuData = (state ={selmenu_data: [], isFetching: false}, action = {}) => {
    switch(action.type){
        case 'GET_SELECTMENU_START':
            return {'isFetching': true};
        case 'GET_SELECTMENU_SUCESS':
            // console.log("test_data:"+action.json);
            return {'selmenu_data':action.json,'isFetching':false};//返回一个新的state
        default:
            return state;
    }
}

Array.prototype.indexOf = function (val) {
    for(var i = 0; i < this.length; i++){
        if(this[i] == val){return i;}
    }
    return -1;
}
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if(index > -1){
        this.splice(index,1);
    }
}

export const basketDataMonitor = (state ={basket_data: []}, action = {}) => {
    switch(action.type){
        case 'ADD_BASKET_DATA':
            return Object.assign({}, state, {
	            'basket_data': [...state.basket_data, action.data],
	        });
        case 'DEL_BASKET_DATA':
            let data = Object.assign([], state.basket_data);
            data.remove(action.data);
        	return Object.assign({}, state, {
	            'basket_data': data,
	        });
        case 'CLEAR_BASKET_DATA':
            return {'basket_data': []};
        default:
            return state;
    }
}


