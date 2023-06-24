
export default class NavBarComponent {
	constructor(userDetails){
		this.ud = userDetails;
	}
	_make_nav (){

		let self = this;
		self.ud
		return {
			template : `<nav id='nav' class="main-header navbar navbar-expand navbar-light">
							<ul class="navbar-nav">
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
							</ul>
						</nav>
						<msb-component :brand="brand" :user_details="user_details" :role="role" :side_list="side_list" />
						`,
			components : ['msb-component'],
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
					]
				}		
			},
		}

	}
	_make_side_bar(){
		let self = this;
		return {
			components : ['list-items'],
			props : ['brand','user_details', 'role' , 'page', "side_list"],
			template : `
						<aside id='msb' class='main-sidebar sidebar-dark-primary'>
							<a :href="page" class="brand-link">
								<i class="brand-image fa-solid fa-code"></i>
								<span class="brand-text font-weight-light">{{brand}}</span>
							</a>
							<div class="user-panel">
								<div class="info">
									<span class="info-txt d-block"><label>Name:</label> {{user_details.f_name}} {{user_details.l_name}}</span>
									<span class="info-txt d-block"><label>Username:</label> {{user_details.username}}</span>
									<span class="info-txt d-block"><label>Permission:</label> {{role.permission}}</span>
								</div>
							</div>
							<nav class='nav-side-bar'>
								<ul>
									<list-items v-for="(l,i) in side_list" :name="l['name']" :key="i" 
									:icon="l['icon']"
									:route="l['href']"
									/>
								</ul>
							</nav>
						</aside>`,
			beforeMount() {
				// console.log(this.user_details);
			}
		}
	}
	_make_side_list(){
		return {
			template : `<li><a :href="route"><i :class="icon" ></i><span>{{name}}</span></a></li>`,
			props : ['name','icon','route']
		}
	}
	_make_nav_list(){



	}

	

	

}


