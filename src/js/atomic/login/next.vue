<template>
	<div class="login-next" @click="handleClick">
		<svgicon
			name="arrow-right"
			:color="'black'"
			width="48"
			height="48"
		>
		</svgicon>
	</div>
</template>

<script>
	import '@/assets/compiled-icons/arrow-right';
	export default {
		name: 'login-next',
		methods: {
			handleClick () {
				this.$emit('next');
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.login-next {
		$size: 80px;
		height: 80px;
		width: 80px;
		border-radius: 50%;
		color: black;
		box-shadow: 0 0 20px 4px rgba(0,0,0,.1);
		position: absolute;
		bottom: 0;
		left: 50%;
		background-color: white;
		transform: translateX(-50%) translateY(50%);
		transition: all .5s;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
</style>
