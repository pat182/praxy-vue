import Product from './Products/product';
import Dashboard from './Dashboard/dashboard';
import Category from './Categories/category'

export default class Router{
	constructor(router){
		this.router = router;
		this.routes = [
		  {	path : '/',component:  new Dashboard()._render()},
		  { path: '/category', component: new Category()._render()},
		  { path: '/dashboard', component:  new Dashboard()._render()},
		  { path: '/product', component: new Product()._render() },
		]
	}
	_init_router(){

		const app = core.vue.createApp({})
		let router = this.router.createRouter({
			history : this.router.createWebHashHistory(),
			routes : this.routes
		})
		app.use(router);
		app.mount('#main-container')

	}


}


// export const router = {
	
// 	console.log(core);

// }