# 基数排序

## 实现思路

基数排序与桶排序类似，同是基于**统计计数**进行排序，但基数排序是基于数位统计来进行排序。

其思想是根据个位数、百位、千位直至最高位，遍历数组中每个元素对应的位的具体值，从而确定每个元素个位、百位、千位直至最高位的相对次序。

由于先从个位数确定相对次序，而百位次序又基于个位的相对次序来确定，千位次序则基于百位、个位的相对次序，由此从低位到高位每一位都确定相对次序后，排序完成。

对于位数较少的数，逻辑中默认补前导0处理，以达到每个数都是相同的位数。

## 代码

```java
public class RadixSort {

    public int getMaxDigit(int[] arr) {
        int max = Integer.MIN_VALUE;
        for(int i: arr) {
            max = Math.max(max, i);
        }
        int digit = 0;
        while(max != 0) {
            max /= 10;
            digit++;
        }
        return digit;
    }

    public int getCurrentDigit(int num, int digit) {
        return (num / (int)Math.pow(10, digit - 1)) % 10;
    }

    public void sort(int[] arr) {
        int maxDigit = getMaxDigit(arr);
        // 统计当前位中，0-9的个数
        int[] count = new int[10];

        // 暂时存放相对次序，每次统计结束后需要复制回原数组
        int[] bucket = new int[arr.length];

        // 从个位向最高位进行统计
        for(int digit = 1; digit <= maxDigit; digit++) {
            // 清空上一位的统计结果
            for(int i = 0; i < count.length; i++) {
                count[i] = 0;
            }

            // 统计数组元素在当前位中，0-9出现的次数
            for(int i = 0; i < arr.length; i++) {
                count[getCurrentDigit(arr[i], digit)]++;
            }

            // 从0-9进行次序累加，值较高的相对次序靠后
            for(int i = 1; i < count.length; i++) {
                count[i] += count[i-1];
            }

            // 由于arr中已经按照低位确定好了相对次序，所以需要倒着计算当前位的相对次序，避免影响低位的相对次序
            for(int i = arr.length - 1; i >= 0; i--) {
                int j = getCurrentDigit(arr[i], digit);
                int index = count[j]; // 获取元素当前位的次序
                count[j]--; // 该位出现的元素次序-1
                bucket[index - 1] = arr[i]; // 将元素放到对应的次序中，这里减1是因为数组从下标是从0开始，我们的统计从1开始
            }

            // 将当前位的相对次序排序结果复制回原数组
            for(int i = 0; i < bucket.length; i++) {
                arr[i] = bucket[i];
            }
        }
    }

}

```