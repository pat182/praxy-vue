
export const prod_comp = {
	props : ['product_name', 'p_src' , 'category'],
	emit : ['del'],
	template : `<div class="col-lg-2 col-md-4 prod-item-container">
					<img class="product-image cursor-pointer" :src="p_src" />
				    <div class='product-details'>
				      	<span>{{product_name}}</span>
				    </div>
				    <div class='product-details'>
				    	<span>{{category}}</span>
				   	</div>
				   	<div class='delete-product product-details'>
				   		<a @click="$emit('del')" class='delete-product btn'><i class="fas fa-trash" ></i></a>
				   	</div>
				</div>`
}
export const prod_filter = {
	props : ['label' , 'cls','modelValue'],
	components : ['auto-complete'],
	template : `<div class="col-xs-4">
				    <label>{{label}}</label>
				    <br/>
				    <input :class="cls" type='text' v-model="input_value" />
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