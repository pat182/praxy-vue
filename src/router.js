import Product from './Products/product';
import Dashboard from './Dashboard/dashboard';
import Category from './Categories/category'
import {sec_head_comp} from './components/section-header-comp'

export default class Router{
	constructor(router){
		this.app = core.vue.createApp({})
		this.router = router;
		this.routes = [
		  {	path : '/',component:  new Dashboard(this.app)._render()},
		  { path: '/category', component: new Category(this.app)._render()},
		  { path: '/dashboard', component:  new Dashboard(this.app)._render()},
		  { path: '/product', component: new Product(this.app)._render() },
		]
	}
	_init_router(){

		
		let router = this.router.createRouter({
			history : this.router.createWebHashHistory(),
			routes : this.routes
		})
		this.app.use(router);
		this.app.component('header-component',sec_head_comp);
		this.app.mount('#main-container')

	}


}


// export const router = {
	
// 	console.log(core);

// }