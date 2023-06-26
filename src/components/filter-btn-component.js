export const filter_btn = {
	props : ['label','icon_class','is_open'],
	emit : ['toggle-filter'],
	template : `<a @click="$emit('toggle-filter')" class='filter-txt prevent-select'>{{label}} 
					<i :class="icon_class"></i>
				</a>`
}