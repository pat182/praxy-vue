
import NavBar from './components/nav-bar';
import MainSideBar from './components/main-side-bar';

const start = () => {
	let token = core._get_cookie('token');

	if(token){
		const nav = new NavBar();
		const msb = new MainSideBar();
		nav._render_nav();
		msb._render_msb();
		
	}else{

		location.href = core.main_path;

	}
}
start();