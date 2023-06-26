
export const prod_comp = {
	props : ['product_name', 'p_src' , 'category'],
	template : `<div class="col-lg-2 col-md-4 prod-item-container">
					<img class="product-image cursor-pointer" :src="p_src" />
				    <div class='product-details'>
				      	<span>{{product_name}}</span>
				    </div>
				    <div class='product-details'>
				    	<span>{{category}}</span>
				   	</div>
				</div>`
}
export const prod_filter = {
	props : ['product_name', 'p_src' , 'category', 'cls','modelValue'],
	components : ['auto-complete'],
	emit : ['search','reset'],
	template : `<div class='product-filter-container'>
				      	<div class="col-lg-6">
				      		<label>Name or description:</label>
				      		<br/>
				      		<input :class="cls" type='text' v-model="input_value" />
				      	</div>
				      	<div class="col-lg-6">
				      		<label>Category</label>
				      		<br/>
				      		<input :class="cls" type='text' v-model="input_value" />
				      		
				      	</div>
				      	<div class='product-btn-container container-fluid pull-right'>
				      		<a @click="$emit('search')" class='col-xs-6 a-btn prevent-select'>Search</a>
				      		<a @click="$emit('reset')" class='col-xs-6 a-btn prevent-select'>Reset</a>
				      	</div>
				</div>`,
	computed : {
		input_value : {
			get(){

				return this.modelValue

			},
			set(val){

				this.$emit('update:modelValue', val)

			}
		}

	}
}
// <auto-complete :class="cls"/>
// <input class='prod-filter-input' type='text' />