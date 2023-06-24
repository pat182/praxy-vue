

export default class LoginFormComponent{

	_make_login_form(){
		let self = this;

		return {
			template: `
					<h3 class='margin-bottom-10'>
		      			{{header}}
		    		</h3>
		    		
		    		<div v-if="error_visible" class="log-in-err alert alert-danger" role="alert">
		    			<err v-for="(error,k) in errors" :err_msg="errors[k][0]" :key="k"/>
		    		</div>
		    		<div class="signin-user-role">
		    			<login-as v-for="(role,i) in user_roles"
		    			:active="role['is_active'] ? 'active' : ''"
		    			:perm="String(role['permission']).initCap()"
		    			:role_id="role['role_id']"
		    			:key="role['role_id']" @set_role="change_role(role)"/>
					</div>
	    			<div id='log-in-app' class='form-group log-in-form-container align-left'>
							<div class='align-left'>
								<custom-inputs type='text' v-model='user_name' label="Username"/>
							</div>
							<br/>
							<div class='align-left'>
	        					<custom-inputs type='password' v-bind:type=password v-model='pass' label="Password" />
	        				</div>
	        				<div class="align-left margin-top-15 login-icheck">
	        				  <label class="margin-right-5">Remember Me</label>
						      <input class="i-check" type="checkbox" id="rember-me">
						      
						    </div>
	        				<div class='margin-top-10'>
	        					<button id='log-in-btn' class='btn btn-primary' @click=log_in>Log In</button>
	        				</div>
					</div>`,
			mounted: function(){
				let self = this;
			    $('#rember-me').iCheck({
			        checkboxClass: 'icheckbox_minimal',
			        increaseArea: '20%'
			    });
			    $('#rember-me').on('ifChecked', function(e){
			      	self.remember_me = true;
			    });
			    $('#rember-me').on('ifUnchecked', function(e){
			      	self.remember_me = false;
			    });

			},
			beforeMount : function(){
				this.roles().then((d) => {
					this.user_roles = d
					this.user_roles[0]['is_active'] = true;
					this.current_active = d[0]['role_id'];
				});
				
			},
			components : ['custom-inputs','err','login-as'],
			data() {
				return {
					// user_name : 'pat182',
					// pass : 'test123!@#',
					header : 'Praxy',
					user_name : '',
					pass : '',
					errors : {},
					user_roles : [],
					error_visible : false,
					remember_me : false,
				}
			},
			methods : {
				logIn_payload(){
					let role = $('.signin-user-role').find('.active').attr('data-id'),
					pload = {
						'password' : this.pass,
						'role'  : role,
						'remember_me' : this.remember_me
					};
					if(role == 1){
						if(core._is_email(this.user_name))

							pload.email = this.user_name;

						else

							pload.username = this.user_name;
						
					}else

						pload.email = this.email

					return pload;	

				},
				change_role(role){

					if(!role['is_active']){
						for(let r in this.user_roles){
							if(this.user_roles[r]){
								this.user_roles[r].is_active = false;
							}
						}
						role['is_active'] = true;
					}

				},
				async roles(){
					$('#pre-loader').show();
					let data = await self._get_roles().then(
						
						(res) =>{ 
							$('#pre-loader').hide();
							return res.json()
						}
					);
					return data.data
				},
				async log_in() {
					$('#pre-loader').show();
					await self._log_in(this.logIn_payload())
					.then(res => res.json())
					.then((d) => {
						let e ='';
						if(!d.hasOwnProperty('errors') && !d.hasOwnProperty('error_code')){
							this.error_visible = false;
							if(d.data.expires_in)

								e = d.data.expires_in/86400;
							
							core._create_cookie('token',d.data.token,e)
							core._create_cookie('user_details',JSON.stringify(d.data),e);
							location.href = core.main_path +'/main.html';
						}else{
							$('#pre-loader').hide();
							this.errors = {};
							this.error_visible = true;
							if(d.errors == null)
								this.errors['message'] = [d.message];
							else
								this.errors  = d.errors;
							
						}
					})
				}
			}

		};

	}
	_make_roles(){
		return {
			template : `<div @click="$emit('set_role')" class="signin-user-role-el pull-left" :data-perm="perm" :data-id="role_id" :class="{active}">
							<a href="#">{{perm}}</a>
						</div>`,
			props : ["perm","role_id", "active"],
			emit : ['set_role'],
		}
	}
	_make_login_input() {

		return {

			template : `<label>
							{{label}}
						</label>
						<br/>
						<input class="login-str-input" :type=type v-model="input_value"/>`,

			props : ['label','type','modelValue'],
			computed : {

				input_value : {
					get(){

						return this.modelValue

					},
					set(val){

						this.$emit('update:modelValue', val)

					}
				}

			}

		}

	}
	_make_error(){
		
		return {

			template : `<li>{{err_msg}}</li>`,
		    props : ['err_msg'],

		}
	}
	_get_roles(){
		
		return fetch(core.api_url+"/roles",{
			
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
			}

		});		
	}
	_log_in(data){

		let x = fetch(core.api_url+"/login",{
			method : "POST",
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
			},
			body : JSON.stringify(data)
		})
		return x;
	
	}

}

