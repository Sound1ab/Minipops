<script type="text/jsx">
	import VueTypes from 'vue-types';
	import LoginInput from '@/js/atomic/login/login-input';
	import RememberMe from '@/js/atomic/login/remember-me';
	import NavigateForm from '@/js/atomic/login/navigate-form';
	import Copy from '@/js/atomic/login/copy';
	import ForgotPassword from '@/js/atomic/login/forgot-password';
	import SubmitButton from '@/js/atomic/login/submit-button';
	export default {
		name: 'render-form',
		props: {
			schema: VueTypes.array.def([]),
			emailAddress: VueTypes.string.def(''),
			username: VueTypes.string.def(''),
			password: VueTypes.string.def(''),
			verification: VueTypes.string.def(''),
			rememberMe: VueTypes.bool.def(false)
		},
		methods: {
			handleUpdate ({dataKey, value}) {
				this.$emit('updateInput', {dataKey, value});
			},
			handleSubmit () {
				this.$emit('submit');
			},
			loginInput (h, schema) {
				return <LoginInput
					title={schema.title}
					value={this.$props[schema.value]}
					dataKey={schema.value}
					type={schema.type}
					onUpdateInput={this.handleUpdate}
				/>
			},
			forgotPassword (h) {
				return <ForgotPassword />
			},
			remember (h, schema) {
				return <RememberMe
					dataKey={schema.value}
					value={this.$props[schema.value]}
					onCheckboxUpdate={this.handleUpdate}
				/>
			},
			copy (h, schema) {
				return <Copy copy={schema.value}/>
			},
			navigateForm (h, schema) {
				return <NavigateForm
					schema={schema.schema}
				/>
			},
			submitButton (h) {
				return <SubmitButton />
			}
		},
		render (h) {
			return (
				<form
					onSubmit:prevent={this.handleSubmit}
				>
					{this.$props.schema.map(el => {
						return this[el.component](h, el);
					})}
				</form>
			)
		}
	};
</script>
