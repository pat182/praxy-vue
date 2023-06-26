import {prod_comp,prod_filter}  from './components/product-component.js'
import {filter_btn} from '.././components/filter-btn-component.js'
import {paginate_btn} from '.././components/paginate-btn-component.js'
import {auto_complete} from '.././components/auto-complete-input.js'

export default class Product {

	constructor(app){

		this.prod = app;
		this.token = core._get_cookie('token');
		this.api_storage = core.api_storage;

	}

	_render(){
		let self = this;
		
		// this.prod.component('auto-complete',auto_complete);
		this.prod.component('product-component',prod_comp);
		this.prod.component('filter-btn', filter_btn );
		this.prod.component('product-filter',prod_filter);
		this.prod.component('pagination-component',paginate_btn);

		return {
			
			data(){
				return {
					title : 'Products',
					filter_settings : {
						label :  'filter products',
						icon_class : "fas fa-angle-double-right",
						is_open : true,
						input_fltr_class : 'prod-filter-input'
					},
					filter_value : {
						n_or_d : '',
						category : ''
					},
					products : [],
					storage : self.api_storage,
					page_details : {}
				}
			},
			components : [
				'header-component',
				'filter-btn',
				'product-filter',
				'product-component',
				'pagination-component'
			],
			methods : {
				toggle_filter(){
					let status = this.filter_settings.is_open = this.filter_settings.is_open ? false : true;
					if(status){

						this.filter_settings.icon_class = "fas fa-angle-double-down"
						
					}else{

						this.filter_settings.icon_class = "fas fa-angle-double-right"
						
					}

				},
				search(){
					
					console.log(this.filter_value.n_or_d);
				},
				async get(params = ''){
					// console.log(params);
					$('#body-loader').show();
					$('.pagination-btn').hide()
					$('.product-content-section').hide();
					await fetch(core.api_url+"/product" + params,{
						headers : {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json',
							'Authorization' : 'Bearer ' + self.token
						}
					}).then((res) => {
						return res.json();
					}).then((res) => {
						this.products = res.data.data
						this.page_details.current_page = res.data.current_page
						this.page_details.last_page = res.data.last_page
						$('.product-content-section').show()
						$('.pagination-btn').show()
						$('#body-loader').hide()
						
						// console.log(this.page_details)
					});	
				}
			},
			template : `
					  <header-component :title="title"/>
					  <filter-btn @toggle-filter="toggle_filter()"
					  :icon_class="filter_settings.icon_class"
					  :label="filter_settings.label"/>
					  <Transition name="slide-filter">
				      	<product-filter 
				      	@search="search()"
				      	@reset="get()"
				      	v-if="filter_settings.is_open"
				      	:model="filter_value.n_or_d"
				      	:cls="filter_settings.input_fltr_class"/>

				      </Transition>
				      <section class='content-section'>
				      	<div id="body-loader" class="">
				        	<div class="pre-container">
				              <span class="loader" style="display:block;"></span>
				            </div>              
				        </div>

				        <div class='container-fluid product-content-section'>
					      	<product-component 
					      	v-for="(p,i) in products" :key="p.id"
					      	:product_name="String(p.name).initCap()" 
					      	:p_src="p.product_photo.length ? storage+p.product_photo[0].path : '/no-image.png' " 
					      	:category = String(p.category.name).initCap()
					      	/>
				      	</div>
				      	
						<pagination-component 
							:current="page_details.current_page"
							:last="page_details.last_page"
							@next_page="get('?page='+

							(page_details.current_page == this.page_details.last_page
							? 1  : page_details.current_page+1) 

							)"

							@prev_page="get('?page='+

							(page_details.current_page == 1
							? page_details.last_page : page_details.current_page+-1)

							)"


							@last_page="get('?page='+page_details.last_page)"
							@first_page="get('?page=1')"
						/>
				      </section>
				      `,
			beforeMount(){
				
				this.get();
			}

		}
		// prod.mount('#main-container');

	}

	

}





