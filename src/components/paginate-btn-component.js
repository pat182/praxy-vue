export const paginate_btn = {
	props : ['current', 'last'],
	emit : ['first_page','prev_page', 'next_page','last_page'],
	template : `<div class="pagination-btn hide-el">
	                <a  @click="$emit('first_page')"
	                	id=''
	                    href="javascript:void(0)"
	                    class="">
	                		<i class="fas fa-angle-double-left"></i>
	                </a>
	                <a @click="$emit('prev_page')"
	                href="javascript:void(0)">
	                	<i class="fas fa-angle-left"></i>
	                </a>
	                <a  href="javascript:void(0)" 
	                    class="" >
	                    <span id=''>{{current}} of {{last}}</span>
	                </a>
	                <a  @click="$emit('next_page')"
	                	href="javascript:void(0)" 
	                    class="" >
	                    <i class="fas fa-angle-right"></i>
	                </a>
	                <a  @click="$emit('last_page')"
	                	href="javascript:void(0)"
	                    id = ""
	                    class="">
	                    	<i class="fas fa-angle-double-right"></i>
	                </a>
	            </div>`
}