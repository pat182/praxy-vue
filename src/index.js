import Auth from './Auth/_auth';

window.onload = (event) =>{
	let token = core._get_cookie('token'),
	user_details = core._get_cookie('user_details');
    
	if(token){
		location.href = core.main_path +'/main.html';
	}else{
		let a = new Auth();
		a._render()
	}
};
