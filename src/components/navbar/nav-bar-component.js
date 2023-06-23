
export default class NavBarComponent {
	constructor(userDetails){
		this.ud = userDetails;
	}
	_make_nav (){

		let self = this;
		self.ud
		return {
			template : `<ul class="navbar-nav">
							<li class='nav-item'>
								<a href="javascript:void(0)" class='nav-link'>
									<i class="fas fa-bars"></i>
								</a>
							</li>
						</ul>
						<ul class="navbar-nav navbar-right">
							<li>
								<a style="cursor:pointer" href="javascript:void(0)" @click="logout" class='nav-link'>
									<label style="cursor:pointer">logout</label>
								</a>
							</li>
						</ul>`,
			methods : {
				logout(){
					$('#pre-loader').show();
					fetch(core.api_url+"/logout",{
						method : "POST",
						headers : {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json',
							'Authorization' : 'Bearer ' + self.ud.token
						},
					}).then((res) => {
						core._erase_cookie('user_details');
						core._erase_cookie('token');
						location.href = core.main_path;
					})
					
					

				},
			},
			data() {
				return {
					is_side_hidden : true
				}		
			},
		}

	}
	_make_nav_list(){



	}

	

	

}


