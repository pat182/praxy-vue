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
					settings_sb : {
						is_hidden : false 
					},
					brand : 'PRAXY',
					user_details : {
						username : self.ud.username,
						f_name : String(self.ud.f_name).initCap(), //"Patrick",
						l_name : String(self.ud.l_name).initCap(),
						p_path : self.ud.p_path ? self.ud.p_path : "/public/blankpic.png" //
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
							icon : 'fa-solid fa-cube',
							href : '#/category'
						},
						{
							name : 'Products',
							icon : 'fa-solid fa-box-open',
							href : '#/product'
						}
					],
					right_list : [
						{
							label : 'logout',
						}
					],
					left_list : [
						// {
						// 	label : "Home"
						// }
					]
				}		
			},
			methods : {
				toggle_side_bar(){
					this.settings_sb.is_hidden = !this.settings_sb.is_hidden;
					if(this.settings_sb.is_hidden){
						$('#nav').css('margin-left',0);
						$('.main-container').css('margin-left',0);
					}else{
						$('#nav').css('margin-left','27.9rem');
						$('.main-container').css('margin-left','28rem');
					}
					
				},
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
			components : ['msb-component', 'nav-right','nav-left'],
			template : `<nav id='nav' class="main-header navbar navbar-expand navbar-light">
							<ul class="navbar-nav">
								<li class='nav-item burger-btn'>
									<a @click="toggle_side_bar()" href="javascript:void(0)" class='nav-link'>
										<i class='fas fa-bars'></i>
									</a>
								</li>
								<nav-left v-for="(ll,li) in left_list"
								:label = "ll['label']"
								:key="li"/>
							</ul>
							<ul class="navbar-nav navbar-right">
								<nav-right v-for="(rl,i) in right_list" 
								@logout=logout()
								:label="rl['label']" 
								:key="i"/>
							</ul>
						</nav>
						<Transition name="slide">
						<msb-component 
							:settings="settings_sb"
							:brand="brand" 
							:user_details="user_details" 
							:role="role" 
							:side_list="side_list" />
						</Transition>
			`,
			beforeMount(){
				// console.log(this.user_details.p_path)
			}

		}
	}
	_make_side_bar(){

		return this.sb._side_bar();
	}
	_make_side_list(){

		return this.sb._side_bar_list()
	}
	_make_left_list(){

		return {
			props : ['label'],
			template : `<li class='nav-item'>
							<a href="javascript:void(0)" class='nav-link left-nav' v-html=label>

							</a>
						</li>`,
		}
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


