import Product from './Products/product';
import Dashboard from './Dashboard/dashboard';
import Category from './Categories/category'
import {sec_head_comp} from './components/section-header-comp'

export default class Router{
	constructor(router){
		this.app = core.vue.createApp({})
		this.router = router;
		this.dashboard = new Dashboard(this.app);
		this.product = new Product(this.app);
		this.category = new Category(this.app);

		
	}
	_init_router(){

		let routes = [
		  {	path : '/',component:  this.dashboard._render()},
		  { path: '/category', component: this.category._render()},
		  { path: '/dashboard', component:  this.dashboard._render()},
		  { path: '/product', component: this.product._render() },
		  { path: '/product/add', component: this.product._render_add() },
		]
		
		let router = this.router.createRouter({
			history : this.router.createWebHashHistory(),
			routes : routes
		})
		this.app.use(router);
		this.app.component('header-component',sec_head_comp);
		this.app.mount('#main-container')

	}


}


// export const router = {
	
// 	console.log(core);

// }