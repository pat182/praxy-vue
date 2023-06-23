import NavBarComponent from './navbar/nav-bar-component';

export default class NavBar {

	constructor(){

		this.nav = core.vue;
		this.user_details = JSON.parse(core._get_cookie('user_details'));
		
	}

	_render_nav(){
		let nav = this.nav.createApp({});
		let nav_comp = new NavBarComponent(this.user_details);
		nav.component('nav-bar-component',nav_comp._make_nav())
		nav.mount("#nav");
		// log_in.component('login-form',login_com._make_login_form())
		// log_in.component('login-as',login_com._make_roles())
		// log_in.component('custom-inputs',login_com._make_login_input())
		// log_in.component('err',login_com._make_error())
		// log_in.mount('#auth-page');
	}
	

}



