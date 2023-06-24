import NavBarComponent from './navbar/nav-bar-component';
// import SideBarComponent from './navbar/side-bar-component';

export default class NavBar {

	constructor(){

		this.nav = core.vue;
		this.user_details = JSON.parse(core._get_cookie('user_details'));
		
	}

	_render_nav(){
		let nav = this.nav.createApp({});
		let nav_comp = new NavBarComponent(this.user_details);
		nav.component('nav-bar-component',nav_comp._make_nav())
		nav.component('msb-component',nav_comp._make_side_bar())
		nav.component('list-items',nav_comp._make_side_list())
		nav.component('nav-left',nav_comp._make_left_list())
		nav.component('nav-right',nav_comp._make_right_list())
		nav.mount("#nav-app");
	}
	

}



