
export default class Dashboard {

	constructor(){

		// this.dash = core.vue;
		
	}

	_render(){
		
		return {
			data(){
				return {
					title : 'Dashboard'
				}
			},
			components : ['header-component'],
			methods : {
				
			},
			template : `
					  <header-component :title="title"/>
				      <section class='content-section'>
				      
				      </section>`,
			beforeMount(){
				console.log(this.$router);
			}
		}
		return dash;
		
	}

	

}





