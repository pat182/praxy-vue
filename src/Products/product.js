
export default class Product {

	constructor(){

		this.prod = core.vue;
		
	}

	_render(){
		
		let prod = this.prod.createApp({});
		prod.component('product-component',{
			template : `<div class='content-header'>
				        	<h1>Product</h1>  
				      </div>
				      <section class='content-section'>

				      </section>`
		})
		prod.mount('#main-container');

	}

	

}





