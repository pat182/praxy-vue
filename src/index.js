
window.onload = (event) =>{
	let token = core._get_cookie('token');
    
	if(token){
		location.href = core.main_path +'/main.html';
	}
};
