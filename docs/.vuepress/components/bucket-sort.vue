<template>
	<div class="wrapper">
		<sort-data @setArr="setArr" @next="next" @autoplay="autoplay"/>
		<div class="row">
			<div>统计次数：</div><ul>
				<li v-for="(item, i) in bucket" :key="i" :class="i === a? 'red': ''">
					{{item}}
				</li>
			</ul>
		</div>
		<div class="row">
			<div>数组下标：</div><ul>
				<li v-for="(item, i) in bucket" :key="i" :class="i === d ? 'red': ''">
					{{i}}
				</li>
			</ul>
		</div>
		<div class="row">
			<div>原数组：</div>
		<transition-group name="flip-list" tag="ul">
			<li v-for="(item, i) in arr" v-bind:key="i" :class="i === b ? 'red': ''">
			{{ item }}
			</li>
		</transition-group>
		</div>
		<div class="row">
			<div>结果数组：</div>
		<transition-group name="flip-list" tag="ul">
			<li v-for="(item) in res" v-bind:key="item" :class="'success'">
			{{ item }}
			</li>
		</transition-group>
		</div>
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
			bucket: [],
			res: [],
			all: [],
			fn: null,
			a: null,
			b: null,
			c: null,
			d: null,
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
			let max = Number.MIN_VALUE
			for(const v of this.arr) {
				max = Math.max(v, max)
			}
			const bucket = new Array(max + 1)
			bucket.fill(0)
			this.a = null
			this.b = null
			this.c = null
			this.d = null
			this.bucket = bucket
			this.res = []
			this.fn = null
			this.msg = ''
		},
		*createFn() {
			for(let i = 0; i < this.arr.length; i++)
			{
				this.a = this.arr[i]
				this.b = i
				this.d = i
				yield

				this.bucket[this.arr[i]]++
				this.msg = `元素值：${this.arr[i]}，出现次数：${this.bucket[this.arr[i]]}`
			}
			this.b = null
			this.d = null
			for(let i = 0; i < this.bucket.length; i++) {
				this.a = i
				this.c = i
				this.d = i
				yield
				while(this.bucket[i] > 0)
				{
					this.msg = `元素值：${i}，出现次数：${this.bucket[i]}`
					yield
					this.bucket[i]--
					this.msg = `元素值：${i}，出现次数：${this.bucket[i]}`
					this.res.push(i)
					yield
				}
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
				this.a = null
				this.b = null
				this.d = null
				this.c = null
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

.row {
	display: flex;
	align-items: center;
}

.row div {
	width: 80px;
	text-align: right;
}
</style>