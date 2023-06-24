export default class SideBarComponent{
	constructor(nav){
		this.nav = nav;
	}
	_side_bar(){
		let self = this.nav;
		return {
			// v-show="settings.is_hidden" 
			// emit : ['toggleSb'],
			components : ['list-items'],
			props : ['brand','user_details', 'role' , 'page', "side_list" , "settings"],
			template : `
						<aside v-if="!settings.is_hidden" id='msb' class='main-sidebar sidebar-dark-primary'>
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
				console.log(this.settings.is_hidden);
			}
		}
	}
	_side_bar_list(){
		return {

			template : `<li><a :href="route"><i :class="icon" ></i><span>{{name}}</span></a></li>`,
			props : ['name','icon','route']
			
		}
	}
}