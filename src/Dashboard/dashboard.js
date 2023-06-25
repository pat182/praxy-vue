
export default class Dashboard {

	constructor(){

		this.dash = core.vue;
		
	}

	_render(){
		
		let dash = this.dash.createApp({});
		dash.component('dashboard-component',{
			template : `<div class='content-header'>
				        	<h1>Dashboard</h1>  
				      </div>
				      <section class='content-section'>

				      </section>`
		})
		dash.mount('#main-container');
		
	}

	

}





