
export default class Product {

	constructor(){

		// this.prod = core.vue;
		
	}

	_render(){
		
		// let prod = this.prod.createApp({});
		return {
			data(){
				return {
					title : 'Product'
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





