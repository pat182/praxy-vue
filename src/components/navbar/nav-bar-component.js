
export default class NavBarComponent {

	_make_nav (){

		let self = this;
		return {
			template : `<ul class="navbar-nav">
							<li class='nav-item'>
								<a href="javascript:void(0)" @click="open_side" class='nav-link'>
									<i class="fas fa-bars"></i>
								</a>
							</li>
						</ul>
						<ul class="navbar-nav navbar-right">
							<li>
								<a href="javascript:void(0)" @click="open_side" class='nav-link'>
									<label>logout</label>
								</a>
							</li>
						</ul>`,
			methods : {
				open_side(){

					$("#msb").style('width','250px');

				},
			},
			data() {
				return {
					is_side_hidden : true
				}		
			},
		}

	}
	_make_nav_list(){



	}

	

	

}


