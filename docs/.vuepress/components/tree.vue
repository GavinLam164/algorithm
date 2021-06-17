<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
	props: {
		treeRoot: Object
	},
	data() {
		return {
			positionMap: new Map(),
			canvas: null
		}
	},
	mounted() {
		this.canvas = this.$refs.canvas
	},
	methods: {
		
	}
}
</script>

<style>

</style>