
export default class Category {

	constructor(){

		// this.prod = core.vue;
		
	}
	_render(){
		
		return {
			data(){
				return {
					title : 'Category'
				}
			},
			components : ['header-component'],
			template : `
					  <header-component :title="title"/>
				      <section class='content-section'>

				      </section>`,
			beforeMount(){
				console.log(this.$router);
			}
		}
		// prod.mount('#main-container');

	}

	

}





