# 选择排序

## 实现思路

选择排序通过遍历待排序数组的**每个以(N-1)为结尾的区间**，并在每次遍历区间的过程中选出区间内元素值最小的一个元素，放到区间的开始位置。
## 动画(一图胜千言)

> 默认数据是随机产生的，可自行输入数据或再次点击随机生成，记得点击确认。
>
> 动画模式有单步调试/自动播放两种模式。
>
> 单步调试：需不停的点击"下一步"完成执行流程。

<br>
<select-sort />

## 代码

```java
public class SelectSort {
    public void sort(int[] arr) {
        for(int i = 0; i < arr.length - 1; i++) {
            int minIndex = i;
            for(int j = i + 1; j < arr.length; j++) {
                if(arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            int tmp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = tmp;
        }
    }
}
```