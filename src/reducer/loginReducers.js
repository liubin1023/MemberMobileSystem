import {SHOW_SUCCESS_MESSAGE, SHOW_ERROR_MESSAGE} from '../action/loginActions';

const InitState = '初始化...';

export default function message(state = InitState, action){
	if(action.type === SHOW_SUCCESS_MESSAGE){
		return {
			m : state + '成功消息！'
		};
	}
	if(action.type === SHOW_ERROR_MESSAGE){
		return {
			m : state + '错误消息！'
		};
	}
	return {
		m : state
	};
}