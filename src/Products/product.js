import {prod_comp,prod_filter}  from './components/product-component'
import {filter_btn} from '.././components/filter-btn-component'
import {paginate_btn} from '.././components/paginate-btn-component'
// import {auto_complete} from '.././components/auto-complete-input.js'
import {_option} from '.././components/option-component'
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
		this.prod.component('option-component',_option);
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

					// auto_comp_data : [],
					option_data : {
						selected : "",
						data : []
					},
					err : {
						no_data : false
					},
					products : [],
					storage : self.api_storage,
					page_details : {}
				}
			},
			components : [
				// 'header-component',
				'filter-btn',
				'product-filter',
				'product-component',
				'pagination-component'
			],
			methods : {
				onChange(event) {
					this.option_data.selected = event.target.value;
					this.search();
        		},
				toggle_filter(){
					let status = this.filter_settings.is_open = this.filter_settings.is_open ? false : true;
					if(status){
						this.get_cat_option();
						this.filter_settings.icon_class = "fas fa-angle-double-down"
						
					}else{

						this.filter_settings.icon_class = "fas fa-angle-double-right"
						
					}

				},
				// set_selected(){


				// }
				reset_filter(){
					for(let i in this.filter_inputs){
						this.filter_inputs[i].value = '';
					}
					this.option_data.selected = '';
					this.get()
				},
				seach_on_enter(){
					this.search();
				},
				search(){
					let q_string = "?name=" +this.filter_inputs[0].value+
					"&description="+this.filter_inputs[1].value +
					"&category="+this.option_data.selected;
					this.get(q_string)
				},
				async get_cat_option(){
					await fetch(core.api_url+"/category/option",{
						headers : {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json',
							'Authorization' : 'Bearer ' + self.token
						}
					}).then((res) => {

						return res.json();

					}).then((d) => {

						if(!d.hasOwnProperty('errors') && !d.hasOwnProperty('error_code')){ 

							let opt = [{
								id : '',
								name : "Select Category"
							}];
							console.log();
							this.option_data.data = opt.concat(d.data);
							
						}						

					})
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
					  <a href='#/product/add' class='add-lnk-btn d-block'>
					  <i class="fa fa-plus" aria-hidden="true"></i>add product</a>
					  <filter-btn @toggle-filter="toggle_filter()"
					  :icon_class="filter_settings.icon_class"
					  :label="filter_settings.label"/>
					  <Transition name="slide-filter">
					  <div v-if="filter_settings.is_open" class='product-filter-container'>
					  	<product-filter v-for="(fi,i) in filter_inputs"
					  		@search.enter = "seach_on_enter()"
					  		:key="i"
					  		:label = "fi.label"
					  		v-model = "fi.value"
					  		:cls="filter_settings.input_fltr_class"
					  	/>
					  	<div class="col-xs-4">
					  		<label>Category</label>
					  		<br/>
						  	<select @change="onChange($event)" class='prod-filter-input height-2rem' v-model="option_data.selected">
						  		<option-component v-for="(o,i) in option_data.data" :key="i"
						  		:val = "o.id"
						  		:label = "String(o.name).initCap()"
						  		/>
						  	</select>
					  	</div>
				      	<div class='product-btn-container container-fluid pull-right'>
				      		<a @click='search()' class='col-xs-6 a-btn'>Search</a>
				      		<a @click="reset_filter()" class='col-xs-6 a-btn'>Reset</a>
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
							'&category='+option_data.selected+
							'&page='+

							(page_details.current_page == this.page_details.last_page
							? 1  : page_details.current_page+1) 

							)"

							@prev_page="get('?name='+filter_inputs[0].value+
							'&description='+filter_inputs[1].value+
							'&category='+option_data.selected+
							'&page='+

							(page_details.current_page == 1
							? page_details.last_page : page_details.current_page+-1)

							)"
							
							@last_page="get('?name='+filter_inputs[0].value+
							'&description='+filter_inputs[1].value+
							'&category='+option_data.selected+
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





