

export default class MainSideBar {

	constructor(){

		this.msb = core.vue;
		this.user_details = JSON.parse(core._get_cookie('user_details'));
		
	}

	_render_msb(){
		let msb = this.msb.createApp({}),
		self = this;
		msb.component('msb-component',{
			components : ['list-items'],
			template : `<a :href="page" class="brand-link">
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
						</nav>`,
			data() {

				return {
					page : core.main_path,
					brand : 'PRAXY',
					user_details : {
						username : self.user_details.username,
						f_name : self.user_details.f_name,
						l_name : self.user_details.l_name,
					},
					role : {
						permission : String(self.user_details.role.permission).initCap()
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
			beforeMount() {
				// console.log(this.side_list);
			}
		})
		msb.component('list-items',{
			template : `<li><a :href="route"><i :class="icon" ></i><span>{{name}}</span></a></li>`,
			props : ['name','icon','route']
		})
		msb.mount("#msb");
		

		
	}
	

}