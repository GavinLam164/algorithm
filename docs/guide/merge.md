# 归并排序

## 算法原型

在学习归并排序之前，我们先解决一个基本问题。

如何高效的合并两个长度不相等的**有序数组**，合并后的数组也要保持有序。
### 合并思路

已知数组A、数组B为有序数组，若A数组长度为N，B数组长度为M，则合并后的数组ret长度为(N+M)。

设i为数组A的下标，j为数组B的下标，z为数组ret的下标。

我们依次比较A[i]与B[j]的元素值。

- 若A[i]的元素值比B[j]的元素值要小，证明A[i]在合并后的数组ret中顺序靠前，则将A[i]放到ret中，同时由于A[i]已经被放到ret中，则z++，i++，简化代码：`ret[z++] = A[i++]`。
- 若A[i]的元素值比B[j]的元素值要大，证明A[i]在合并后的数组ret中顺序靠后，则将B[j]放到ret中，同时由于B[j]已经被放到ret中，则z++，j++，简化代码：`ret[z++] = B[j++]`。

简短实现：
```java
while(i < A.length && j < B.length) {
	ret[z++] = A[i] < B[j] ? A[i++]: B[j++];
}
```

在以上过程中，有可能A先遍历完或B先遍历完，所以需要单独处理没遍历完的情况。

```java
while(i < A.length) {
	ret[z++] = A[i++];
}

while(j < B.length) {
	ret[z++] = B[j++];
}
```

### 完整代码
```java
public class MergeBase {
    public int[] base(int[] A, int[] B) {
        int[] ret = new int[A.length + B.length];
        int i = 0, j = 0, z = 0;

        while(i < A.length && j < B.length) {
            ret[z++] = A[i] < B[j] ? A[i++]: B[j++];
        }

        while(i < A.length) {
            ret[z++] = A[i++];
        }

        while(j < B.length) {
            ret[z++] = B[j++];
        }
        return ret;
    }
}
```

## 实现思路

归并排序基于**分治思想**实现，通过将一个大的数组arr，从中间拆分为两个较小的数组A、数组B，在**假设数组A、数组B已经有序的情况下**，通过上述的**算法原型**进行合并数组，再将合并后的有序数组复制到原数组arr中，完成排序过程。

那么如何让数组A、数组B变的有序呢，实际上，数组A也可以从中间拆分为两个较小的数组A1、数组B1，数组A1也可以从中间拆分为两个较小的数组A2、B2，数组A2也可以从中间拆分为两个较小的数组A3、B3...直至拆分出的两个数组元素个数为1时，无法进行拆分。

假设，将**数组A2**也可以从中间拆分为**两个较小的数组A3、B3**，A3、B3是两个元素个数为1的数组，此时进行**算法原型**进行合并数组的过程，将A3、B3进行合并，再复制回A2，即可使得A2成为有序数组。

在解决完A2数组有序之后，将**数组B2**也可以从中间拆分为**两个较小的数组A3、B3**，进行**算法原型**进行合并数组的过程，将A3、B3进行合并，再复制回B2，即可使得B2成为有序数组。

当A2、B2都成为有序数组后，进行**算法原型**进行合并数组的过程，将A2、B2进行合并，再复制回A1，即可使得A1成为有序数组。

同理，B1也进行相同的过程。

此时A1、B1都成为了有序数组，进行**算法原型**进行合并数组的过程后，再复制回A，即可使得A成为有序数组。

同理，B也进行相同过程，A、B合并后复制到数组arr中，使得arr成为有序数组。

在上述过程中，不断的将输入数组拆分为两个规模更小的子数组，在解决两个规模更小的子数组的问题之后，再将这两个有序子数组进行合并，体现了**分治思想**。
由于执行过程高度相似，可通过递归实现，读者初次接触可能会比较难理解，可结合代码理解上述过程。

## 代码

```java
public class MergeSort {

    public void sort(int[] arr) {
        mergeSort(arr, 0, arr.length - 1);
    }

    private void mergeSort(int[] arr, int i, int j) {
        if(i >= j) return;
        int mid = i + (j - i) / 2;
        // 解决[i, mid]的子数组问题
        mergeSort(arr, i, mid);
        // 解决[mid+1, j]的子数组问题
        mergeSort(arr, mid + 1, j);
        // 合并两个有序数组
        merge(arr, i, mid, j);
    }

    // 改写算法原型MergeBase
    private void merge(int[] arr, int i, int m, int j) {
        int[] ret = new int[j - i + 1];
        int z = 0;
	// 通过数组下标m将arr划分为两个子数组，l为子数组A下标，r为子数组B下标
        int l = i, r = m + 1;

        while(l <= m && r <= j) {
            ret[z++] = arr[l] < arr[r] ? arr[l++]: arr[r++];
        }

        while(l <= m) {
            ret[z++] = arr[l++];
        }

        while(r <= j) {
            ret[z++] = arr[r++];
        }

        // 将ret复制回原数组
        for(z = 0; z < ret.length; z++) {
            arr[i+z] = ret[z];
        }
    }

}
```







