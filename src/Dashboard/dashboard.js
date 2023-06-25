
export default class Dashboard {

	constructor(){

		// this.dash = core.vue;
		
	}

	_render(){
		
		// let dash = this.dash.createApp({});
		return {
			template : `<div class='content-header'>
				        	<h1>Dashboard</h1>  
				      </div>
				      <section class='content-section'>

				      </section>`,
			methods : {
				// dashboard(){
				// 	this.$router.push('#/dashboard')
				// }
			},
			beforeMount(){
				console.log(this.$router);
			}
		}
		return dash;
		// dash.mount('#main-container');
		
	}

	

}





