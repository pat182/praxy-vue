

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
							<img src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png" 
							alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
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
								<list-items v-for="(l,i) in side_list" :name="l['name']" :key="i"/>
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
							name : 'Products',
							icon : 'test'
						},
						{
							name : 'Categories',
							icon : 'test'
						}
					]
				}
				
			},
			beforeMount() {
				// console.log(this.side_list);
			}
			// methods : {



			// }
		})
		msb.component('list-items',{
			template : `<li><i class="fa fa-check" aria-hidden="true"></i><span>{{name}}</span></li>`,
			props : ['name']
		})
		msb.mount("#msb");
		

		
	}
	

}