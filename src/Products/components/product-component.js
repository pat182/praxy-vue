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
	props : ['product_name', 'p_src' , 'category'],
	template : `<div class='product-filter-container'>
				      	<div class="col-lg-6">
				      		<label>Name or description:</label>
				      		<br/>
				      		<input class='prod-filter-input' type='text' />
				      	</div>
				      	<div class="col-lg-6">
				      		<label>Category</label>
				      		<br/>
				      		<input class='prod-filter-input' type='text' />
				      	</div>
				</div>`
}