<template>
	<div class="wrapper">
		<sort-data @setArr="setArr" @next="next" @autoplay="autoplay"/>
		
		<transition-group name="flip-list" tag="ul">
			<li v-for="(item, i) in arr" v-bind:key="item" :class="allSuccess ? 'success': a != null && (i >= a && i <= b) ? 'red': ''">
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
			let gn = this.quickSort(this.arr, 0, this.arr.length - 1)
			while(!gn.next().done) {
				yield
			}
		},
		*quickSort(arr, i, j) {
			if(i >= j) return
			const randIndex = i + Math.floor((Math.random() * (j - i + 1)))
			const K = arr[randIndex]
			let gn = this.partition(arr, i, j, K)
			let res
			while(!(res = gn.next()).done) {
				yield
			}

			const range = res.value
			this.msg = `划分结束。小于${K}的区域为:[${i}, ${range[0] - 1}]，等于${K}的区域为:[${range[0]}, ${range[1]}]，大于${K}的区域为[${range[1] + 1}, ${j}]`
			yield

			gn = this.quickSort(arr, i, range[0] - 1)
			while(!gn.next().done) {
				yield
			}
			
			gn = this.quickSort(arr, range[1] + 1, j)
			while(!gn.next().done) {
				yield
			}
		},
		swap(arr, i ,j) {
			const tmp = arr[i]
			this.$set(this.arr, i, arr[j])
			this.$set(this.arr, j, tmp)
		},
		*partition(arr, start, end, K) {
			this.msg = `当前区间[${start}, ${end}]，以K值:${K}，进行划分`
			this.a = start
			this.b = end
			let l = start - 1, r = end + 1, i = start;
			while(i < r) { // 当前遍历的元素下标碰到了元素值大于K的区域，表示区域划分结束
				yield
				if(arr[i] < K) {
					this.swap(arr, ++l, i);
					i++; // [0,i]的元素我们已经遍历过了，所以`i++`
				}else if(arr[i] > K) {
					this.swap(arr, --r, i);
					// 交换后的arr[i]我们没有判断，所以i不可以加1
				}else {
					i++; // 元素值arr[i] == K，直接i++跳过即可
				}
			}
			this.a = null
			this.b = null
			// 区域划分结束
			// [start,l]为元素值小于K的区域
			// [r,end]为元素值大于K的区域
			// [l+1,r-1]为元素值等于K的区域，若区域交错则证明数组arr中没有等于K的元素值
			return [
				l + 1,
				r - 1
			]
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