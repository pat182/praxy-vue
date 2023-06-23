import LoginFormComponent from './components/logInForm';

export default class Auth {

	constructor(){

		this.form = core.vue;
		
	}

	_render_log_in_form(){
		
		let log_in = this.form.createApp({});
		let login_com = new LoginFormComponent(log_in);

		log_in.component('login-form',login_com._make_login_form())
		log_in.component('login-as',login_com._make_roles())
		log_in.component('custom-inputs',login_com._make_login_input())
		log_in.component('err',login_com._make_error())
		log_in.mount('#auth-page');
	}

	

}
const auth = new Auth()

auth._render_log_in_form()





