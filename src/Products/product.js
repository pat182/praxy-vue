import {prod_comp,prod_filter}  from './components/product-component.js'
import {filter_btn} from '.././components/filter-btn-component.js'
import {paginate_btn} from '.././components/paginate-btn-component.js'
import {auto_complete} from '.././components/auto-complete-input.js'
import Swal from 'sweetalert2';

export default class Product {

	constructor(app){

		this.prod = app;
		this.token = core._get_cookie('token');
		this.api_storage = core.api_storage;

	}

	_render(){
		let self = this;
		this.prod.config.productionTip = false;
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
						is_open : false,
						input_fltr_class : 'prod-filter-input'
					},
					filter_inputs : [
						{
							label : 'Name',
							value : ''
						},
						{
							label : 'Description',
							value : ''
						},
						// {
												
						// 	label : 'Category',
						// 	value : '',
						// 	type : 'auto_complete'
						// }

					],
					err : {
						no_data : false
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
				reset_filter(){
					for(let i in this.filter_inputs){
						this.filter_inputs[i].value = '';
					}
					this.get()
				},
				search(){
					let q_string = "?name=" +this.filter_inputs[0].value+
					"&description="+this.filter_inputs[1].value
					// "&category="+this.filter_inputs[2].value;
					this.get(q_string)
				},
				async get(params = ''){
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
					}).then((d) => {
						if(!d.hasOwnProperty('errors') && !d.hasOwnProperty('error_code')){
							this.err.no_data = false;
							this.products = d.data.data
							this.page_details.current_page = d.data.current_page
							this.page_details.last_page = d.data.last_page
							$('.pagination-btn').show()
						}else{
							$('.pagination-btn').hide()
							this.err.no_data = true;
							this.products = [];
							this.page_details = {}
						}
						
						$('.product-content-section').show()
						$('#body-loader').hide()
						
					});	
				},
				async del(id){
					await fetch(core.api_url+"/product/" +id, {
						method : "DELETE",
						headers : {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json',
							'Authorization' : 'Bearer ' + self.token
						}
					}).then((res) => {

						return res.json();

					}).then((d) =>{
						if(!d.hasOwnProperty('errors') && !d.hasOwnProperty('error_code')){
							let i = this.products.findIndex( ({ id }) => id == d.data.id)
							this.products.splice(i, 1);
							Swal.fire(
							    'Deleted!',
							    String(d.data.name).initCap() + ' successfully deleted',
							    'success'
							)
						}
						
					});	
				},
				async rem(name,id){
					
					await Swal.fire({
					  title: 'Are you sure?!',
					  text: 'Are you sure you want to remove ' + name,
					  icon: 'warning',
					  heightAuto : false,
					  showCancelButton: true,
					  confirmButtonColor: '#fdb917',
					  confirmButtonText: 'yes'
					}).then((result) => {
					  	if (result.isConfirmed) {
					  		this.del(id)
					  	}
					});
					
				}
			},
			template : `
					  <header-component :title="title"/>
					  <filter-btn @toggle-filter="toggle_filter()"
					  :icon_class="filter_settings.icon_class"
					  :label="filter_settings.label"/>
					  <Transition name="slide-filter">
					  <div v-if="filter_settings.is_open" class='product-filter-container'>
					  	<product-filter v-for="(fi,i) in filter_inputs" :key="i"
					  	:label = "fi.label"
					  	v-model = "fi.value"
					  	:cls="filter_settings.input_fltr_class"
					  	/>
				      	<div class='product-btn-container container-fluid pull-right'>
				      		<a @click='search()' class='col-xs-6 a-btn prevent-select'>Search</a>
				      		<a @click="reset_filter()" class='col-xs-6 a-btn prevent-select'>Reset</a>
				      	</div>
				      </div>
				      </Transition>
				      <section class='content-section'>
				      	<div id="body-loader" class="">
				        	<div class="pre-container">
				              <span class="loader" style="display:block;"></span>
				            </div>              
				        </div>

				        <div class='container-fluid product-content-section'>
				        	<h1 v-if="err.no_data">No Data</h1>
					      	<product-component 
					      	v-for="(p,i) in products" :key="p.id"
					      	@del="rem(String(p.name).initCap(), p.encId)"
					      	:product_name="String(p.name).initCap()" 
					      	:p_src="p.product_photo.length ? storage+p.product_photo[0].path : '/no-image.png' " 
					      	:category = String(p.category.name).initCap()
					      	/>
				      	</div>
				      	
						<pagination-component 
							:current="page_details.current_page"
							:last="page_details.last_page"
							@next_page="get('?name='+filter_inputs[0].value+
							'&description='+filter_inputs[1].value+
							'&page='+

							(page_details.current_page == this.page_details.last_page
							? 1  : page_details.current_page+1) 

							)"

							@prev_page="get('?name='+filter_inputs[0].value+
							'&description='+filter_inputs[1].value+
							'&page='+

							(page_details.current_page == 1
							? page_details.last_page : page_details.current_page+-1)

							)"


							@last_page="get('?name='+filter_inputs[0].value+
							'&description='+filter_inputs[1].value+
							'&page='+page_details.last_page)"
							
							@first_page="get('?name='+filter_inputs[0].value+
							'&description='+filter_inputs[1].value+
							'&page=1')"
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





