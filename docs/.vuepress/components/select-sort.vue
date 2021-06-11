<template>
	<div class="wrapper">
		<sort-data @setArr="setArr" @next="next" @autoplay="autoplay"/>
		<div>
			<ul v-for="(arr, i) in all" :key="i">
				<li v-for="(item, j) in arr" v-bind:key="item" :class="j <= i ? 'success': ''">
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
			minIndex:{{a}}
		</div>
		<div>
			{{msg}}
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
			msg: ''
		}
	},
	methods: { 
		setArr(str) {
			this.all = []
			this.allSuccess = false
			this.arr = str.split(',').map((v) => Number(v))
			this.fn = null
			this.msg = ''
		},
		*createFn() {

			for(let i = 0; i < this.arr.length - 1; i++)
			{
				let minIndex = i
				this.a = minIndex
				for(let j = i + 1; j < this.arr.length; j++)
				{
					yield;
					this.b = j
					this.msg = '比较元素'
					yield;
					if(this.arr[j] < this.arr[minIndex])
					{
						this.msg = '当前元素小于当前最小值'
						yield;
						minIndex = j
						this.a = minIndex
						this.msg = `更新最小值的元素下标为:${minIndex}`
					}
					
				}
				yield;
				this.a = minIndex
				this.b = i
				const tmp = this.arr[minIndex]
				this.arr[minIndex] = this.arr[i]
				this.arr[i] = tmp
				this.msg = `得到了一个最小值的下标:${minIndex}，并且放到了区间开始位置`
				yield;
				this.a = null
				this.b = null
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