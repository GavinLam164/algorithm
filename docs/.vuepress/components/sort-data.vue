<template>
	<div class="sort-data-wrapper">
		<input v-model="item" type="text" placeholder="请输入数字，逗号分隔">
		<button @click="setArr">confirm</button>
		<button @click="rand">rand</button>
		<button @click="$emit('next')">next</button>
		<button @click="$emit('autoplay')">autoplay</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			item: '',
		}
	},
	mounted() {
		this.rand()
		this.setArr()
	},
	methods: {
		setArr() {
			this.$emit('setArr', this.item)
		},
		rand() {
			const arr = new Array(5)
			for(let i = 0; i < arr.length; i++)
			{
				arr[i] = i+1
			}
			arr.sort((a, b) => 0.5 - Math.random())
			this.item = arr.join(',')
		}
	}

}
</script>

<style>
.sort-data-wrapper input {
	width: 200px;
	line-height: 25px;
}

.sort-data-wrapper button {
	line-height: 25px;
} 
</style>