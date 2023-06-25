import {prod_comp}  from './components/product-component.js';

export default class Product {

	constructor(app){

		this.prod = app;
		this.token = core._get_cookie('token');
		this.api_storage = core.api_storage;
	}

	_render(){
		let self = this;
		
		this.prod.component('product-component',prod_comp);
		return {
			data(){
				return {
					title : 'Products',
					products : [],
					storage : self.api_storage
				}
			},
			components : ['header-component','product-component'],
			methods : {
				async get(params = ''){
					$('#body-loader').show();
					await fetch(core.api_url+"/product",{
						headers : {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json',
							'Authorization' : 'Bearer ' + self.token
						}
					}).then((res) => {
						return res.json();
					}).then((res) => {
						this.products = res.data.data;
						$('#body-loader').hide();
						console.log(this.products[0])
					});	
				}
			},
			template : `
					  <header-component :title="title"/>

				      <section class='content-section'>
				      	<div id="body-loader" class="">
				        	<div class="pre-container">
				              <span class="loader" style="display:block;"></span>
				            </div>              
				        </div>
				      	<product-component 
				      	v-for="(p,i) in products" :key="p.id"
				      	:product_name="p.name" 
				      	:p_src="p.product_photo.length ? storage+p.product_photo[0].path : '/no-image.png' " 
				      	:category = p.category.name
				      	/>
				      </section>`,
			beforeMount(){
				this.get();
				// //no-image.png
			}
		}
		// prod.mount('#main-container');

	}

	

}





