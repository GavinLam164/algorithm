<template>
	<div class="wrapper">
		<sort-data @setArr="setArr" @next="next" @autoplay="autoplay"/>
		
		<transition-group name="flip-list" tag="ul">
			<li v-for="(item, i) in arr" v-bind:key="i" :class="allSuccess ? 'success': a != null && i >= a && i <= b ? 'red': ''">
			{{ item }}
			</li>
		</transition-group>
		<div>
			<div>
				数组A：
			</div>
			<ul>
				<li v-for="(item, j) in A" v-bind:key="j" :class="aIndex != null && j === aIndex ? 'red': ''">
					{{ item }}
				</li>
			</ul>
			
		</div>
		<div>
			<div>
				数组B：
			</div>
			<ul>
				<li v-for="(item, j) in B" v-bind:key="j" :class="bIndex != null && j === bIndex ? 'red': ''">
					{{ item }}
				</li>
			</ul>
		</div>
		<div>
			<div>
				数组A、B合并的有序数组ret：
			</div>
			<ul>
				<li v-for="(item, j) in ret" v-bind:key="j" :class="j === retIndex ? 'red': ''">
					{{ item }}
				</li>
			</ul>
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
			all: [],
			A: [],
			B: [],
			ret: [],
			retIndex: null,
			fn: null,
			a: null,
			b: null,
			aIndex: null,
			bIndex: null,
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
			this.aIndex = null
			this.bIndex = null
			this.retIndex = null
		},
		*createFn() {
			let gn = this.mergeSort(this.arr, 0, this.arr.length - 1)
			while(!gn.next().done) {
				yield
			}
		},
		*mergeSort(arr, i, j) {
			if(i >= j) return
			const mid = i + Math.floor((j - i) / 2)
			
			let gn = this.mergeSort(arr, i, mid)
			while(!gn.next().done) {
				yield
			}
			
			gn = this.mergeSort(arr, mid + 1, j)
			while(!gn.next().done) {
				yield
			}
			
			gn = this.merge(arr, i, mid, j)
			while(!gn.next().done) {
				yield
			}
		},
		*merge(arr, i, m, j) {
			this.msg = `在[${i},${j}]的范围，将数组从下标${m}拆分为数组A、B，将合并的结果放到有序数组ret中`
			this.A = arr.filter((_, index) => index >= i && index <= m)
			this.B = arr.filter((_, index) => index > m && index <= j)
			this.a = i
			this.b = j
			const ret = new Array()
			this.ret = ret
			let l = i, r = m + 1
			yield
			while(l <= m && r <= j) {
				this.aIndex = l
				this.bIndex = r - (m - i + 1)
				yield
				this.ret.push(arr[l] < arr[r] ? arr[l++]: arr[r++])
				this.aIndex = l
				this.bIndex = r - (m - i + 1)
			}
			yield
			while(l <= m) {
				this.aIndex = l
				yield
				this.ret.push(arr[l++])
			}
			yield
			this.aIndex = null
			while(r <= j) {
				this.bIndex = r - (m - i + 1)
				yield
				this.ret.push(arr[r++])
			}
			yield
			this.bIndex = null
			this.msg = `将有序数组ret中的元素复制回原数组的[${i},${j}]的范围`
			for(let z = 0; z < ret.length; z++) {
				yield
				this.retIndex = z
				arr[i+z] = ret[z]
			}
			yield
			this.retIndex = null
			this.ret = []
			this.A = []
			this.B = []
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
				}, 2000)
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