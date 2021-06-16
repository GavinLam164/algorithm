<template>
	<div class="wrapper">
		<sort-data @setArr="setArr" @next="next" @autoplay="autoplay"/>
		<div>
			<ul v-for="(arr, i) in all" :key="i">
				<li v-for="(item, j) in arr" v-bind:key="j" :class="j <= i? 'success': ''">
					{{ item }}
				</li>
			</ul>
		</div>
		<transition-group name="flip-list" tag="ul">
			<li v-for="(item, i) in arr" v-bind:key="item" :class="i == a || i == b ? 'red': (i < all.length || allSuccess) ? 'success': ''">
			{{ item }}
			</li>
		</transition-group>
		<div>
			log: {{msg}}
		</div>
	</div> 
</template>

<script>
import SortData from './sort-data'
export default {
	components: {
		SortData
	},
	data() {
		return {
			backup: [],
			arr: [],
			all: [],
			fn: null,
			a: null,
			b: null,
			allSuccess: false,
			msg: '',
			str: ''
		}
	},
	methods: { 
		setArr(str) {
			this.str = str
			this.all = []
			this.allSuccess = false
			this.arr = str.split(',').map((v) => Number(v))
			this.fn = null
			this.msg = ''
		},
		*createFn() {

			for(let i = 1; i < this.arr.length; i++)
			{
				for(let j = i; j > 0 && this.arr[j-1] > this.arr[j]; j--)
				{
					yield;
					this.a = j-1
					this.b = j
					this.msg = '比较相邻元素'
					yield;
					if(this.arr[j-1] > this.arr[j])
					{
						this.msg = '发现前面的元素大于后面的元素'
						yield;
						const tmp = this.arr[j]
						this.arr[j] = this.arr[j-1]
						this.arr[j-1] = tmp
						this.arr = [...this.arr]
						this.msg = '进行前后交换'
					}
					this.a = null
					this.b = null
				}
				yield;
				this.all = this.all.concat([[...this.arr]])
			}
		},
		nextStep() {
			if(this.fn == null) return
			const res = this.fn.next()
			if(res.done)
			{
				this.msg = '排序完成'
				this.allSuccess = true
				this.fn = null
			}else {
				
			}
		},
		initFn() {
			if(this.fn == null) {
				this.all = []
				this.setArr(this.str)
				this.fn = this.createFn()
			}
		},
		next() {
			this.initFn()
			this.nextStep()
		},
		autoplay() {
			this.initFn()
			this.nextStep()
			const next = async() => {
				await this.$nextTick()
				setTimeout(() => {
					if(this.fn == null) return
					this.nextStep()
					next()
				}, 1200)
			}
			next()
		}
	}
}
</script>

<style>
.flip-list-move {
  transition: transform 1s;
}
.wrapper ul {
	list-style: none;
	padding: 0;
}
.wrapper li {
	margin-left: 10px;
	display: inline-block;
	width: 40px;
	height: 40px;
	line-height: 40px;
	font-weight: bold;
	text-align: center;
	font-size: 16px;
	border: 2px solid black;
}
.wrapper li.success {
	border: 2px solid green;
}
.wrapper li.red {
	border: 2px solid red;
}
.wrapper ul li:first-child {
	margin-left: 0;
}
</style>