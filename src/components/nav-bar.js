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
	}
	

}



