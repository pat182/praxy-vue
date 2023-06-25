
import NavBar from './components/nav-bar';
import Product from './Products/product';
import Dashboard from './Dashboard/dashboard';
// import {_routes} from './routing.js';



const start = () => {
	let token = core._get_cookie('token'),
	user_details = core._get_cookie('user_details');
	if(token && user_details){
		const nav = new NavBar();
		nav._render_nav();
		
	}else{

		location.href = core.main_path;

	}

}
start();





