
import NavBar from './components/nav-bar';
// import MainSideBar from './components/main-side-bar';

const start = () => {
	let token = core._get_cookie('token'),
	user_details = core._get_cookie('user_details');

	if(token && user_details){
		const nav = new NavBar();
		nav._render_nav();
		// const msb = new MainSideBar();
		// msb._render_msb();
		
	}else{

		location.href = core.main_path;

	}
}
start();