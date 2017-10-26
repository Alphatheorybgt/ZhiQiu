import React from 'react';
import {Route, IndexRoute} from 'react-router';
import TeacherCenter from '../containers/TeacherCenter';
import {app,HomeView, LoginView, ProtectedView,TestCenter,StuManager,StuCapacity,KpExerciseView,ExercisesView,TestResult} from '../components';
import { requireAuthentication } from '../utils';



export default(
    <Route path='/AuthJWT' component={app}>
        <IndexRoute component={HomeView}/>
    	<Route path='t_center' component={requireAuthentication(TeacherCenter)}>
			<Route path="testcenter" component={TestCenter}/>
			<Route path="stu_manager" component={StuManager}/>
    	</Route>

    	<Route path="stu_capacity/:id" component={StuCapacity}/>
        <Route path="exerview" component={KpExerciseView}/>
		<Route path="testresult/:id" component={TestResult}/>
        <Route path="login" component={LoginView}/>
        <Route path="protected" component={requireAuthentication(ProtectedView)}/>
    </Route>
    


);
