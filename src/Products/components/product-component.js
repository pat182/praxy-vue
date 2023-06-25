export const prod_comp = {
	props : ['product_name', 'p_src' , 'category'],
	template : `<div class="col-lg-2 prod-item-container">
					<img class="product-image" :src="p_src" />
				    <div class='product-details'>
				      	<span><label>Name:</label> {{product_name}}</span>
				    </div>
				    <div class='product-details'>
				    	<span><label>Category:</label> {{category}}</span>
				   	</div>
				</div>`
}