export let requireImage = {
	methods: {
		requireImage (image) {
			return require(`@/assets/images/${image}`);
		}
	}
};
