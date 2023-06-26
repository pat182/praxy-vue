import NavBar from './components/nav-bar';
import Router from './router.js';


const start = () => {
	let token = core._get_cookie('token'),
	user_details = core._get_cookie('user_details');
	if(token && user_details){

		const nav = new NavBar();
		const router = new Router(core.vue_router);
		nav._render_nav();
		router._init_router();
		
		
	}else{

		location.href = core.main_path;

	}

}
start();





