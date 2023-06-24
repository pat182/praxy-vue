import SideBarComponent from './side-bar-component';

export default class NavBarComponent {
	constructor(userDetails){
		
		this.ud = userDetails;
		this.sb = new SideBarComponent(this);
	}
	_make_nav (){

		let self = this;
		self.ud
		return {
			data() {
				return {
					page : core.main_path,
					settings : {
						is_hidden : true
					},
					brand : 'PRAXY',
					user_details : {
						username : self.ud.username,
						f_name : self.ud.f_name,
						l_name : self.ud.l_name,
					},
					role : {
						permission : String(self.ud.role.permission).initCap()
					},
					side_list : [
						{
							name : 'DashBoard', 
							icon : 'fa-solid fa-dashboard',
							href : '#/dashboard' 
						},
						{
							name : 'Categories',
							icon : 'fa-solid fa-box-open',
							href : '#/category'
						}
					],
					right_list : [
						{
							label : 'logout'
						}
					]
				}		
			},
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
			components : ['msb-component', 'nav-right'],
			template : `<nav id='nav' class="main-header navbar navbar-expand navbar-light">
							<ul class="navbar-nav">
								<li class='nav-item'>
									<a href="javascript:void(0)" class='nav-link'>
										<i class="fas fa-bars"></i>
									</a>
								</li>
							</ul>
							<ul class="navbar-nav navbar-right">
								<nav-right v-for="(rl,i) in right_list" 
								@logout=logout()
								:label="rl['label']" 
								:key="i"/>
							</ul>
						</nav>
						<msb-component :brand="brand" :user_details="user_details" :role="role" :side_list="side_list" />
			`,

		}

	}
	_make_side_bar(){
		
		let self = this;

		return this.sb._side_bar();
	}
	_make_side_list(){
		return this.sb._side_bar_list()
	}
	_make_right_list(){
		return {
			props : ['label'],
			emit : ['logout'],
			template : `<li>
							<a @click="$emit('logout')" style="cursor:pointer" href="javascript:void(0)" class='nav-link'>
								<label style="cursor:pointer">{{label}}</label>
							</a>
						</li>`
		}

	}

	

	

}


