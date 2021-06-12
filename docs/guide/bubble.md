# 冒泡排序

## 实现思路

冒泡排序通过遍历数组，依次比较**两个相邻的元素**，若前一个元素的值大于后一个元素的值，则进行交换，形象的比喻为“冒泡”。

## 动画(一图胜千言)

> 默认数据是随机产生的，可自行输入数据或再次点击随机生成，记得点击确认。
>
> 动画模式有单步调试/自动播放两种模式。
>
> 单步调试：需不停的点击"下一步"完成执行流程。

<br>
<bubble-sort />

## 代码

```java
public class BubbleSort {
    public void sort(int[] arr) {
        for(int i = 0; i < arr.length - 1; i++) {
            for(int j = 1; j < arr.length - i; j++) {
                if(arr[j-1]> arr[j]) {
                    int tmp = arr[j-1];
                    arr[j-1] = arr[j];
                    arr[j] = tmp;
                }
            }
        }
    }
}
```