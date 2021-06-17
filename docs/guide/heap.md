# 堆排序

## 实现思路

堆排序是通过以数组的形式模拟**堆**，注意，这里的堆并不是内存管理中的概念“堆”，而是数据结构中的堆。

堆通常有大根堆、小根堆两种表现形式，并具有**完全二叉树**的性质，这里暂时不讨论**完全二叉树**。

> 大根堆：根元素是左子树所有节点、右子树所有节点中的最大值。
>
> 小根堆：根元素是左子树所有节点、右子树所有节点中的最小值。

由以上性质可得：大根堆的根元素为整个堆的最大值，小根堆的根元素为整个堆的最小值。

这里我们仅使用大根堆概念。

由于我们输入的数据是一个数组，我们需要在数组中模拟大根堆。

假定，下标`0`为大根堆元素的根节点，那么，可根据公式计算出每个节点的左孩子节点下标、右孩子节点下标，同时也可以通过子节点反推出父节点。

子节点公式：
1. 左子节点下标：parentIndex * 2 + 1。
2. 右子节点下标：parentIndex * 2 + 2，也可简化为左子节点下标+1。

父节点公式：
1. 子节点计算父节点下标：(currentIndex - 1) / 2。

那对于大根堆来说有两个基本操作：
1. 堆的插入：heapInsert，在插入元素时，若元素值大于父节点，则不断的向父节点进行交换，即建堆过程维持大根堆性质。
2. 堆的调整：heapify，即弹出最大值后，将堆中的某个较小的值移动至堆顶，再与左子节点、右子节点进行比较，选出最大值交换至堆顶，若发生了交换，则以交换后的节点继续向下执行此过程，这里不断向下是为了维持每个子树的大根堆性质。

利用公式实现堆操作：
1. 对于堆的插入，我们使用父节点公式，不断的向父节点进行交换。
2. 对于堆的调整，我们先排除最大值，并将堆的大小减1，再从下标`0`开始(即堆顶)，使用子节点公式，并比较选出父节点、左子节点、右子节点最大值，交换至父节点的下标位置，若发生了交换则需要以发生交换的子节点下标位置再不停的向下进行相同的堆调整操作。

执行流程：
- 通过维持堆大小为`N`的大根堆，可以很容易得到数组中的第一最大值，在得到第一最大值之后，将第一最大值从堆中移除。
- 通过维持堆大小为`N-1`的大根堆，可以很容易得到数组中的第二最大值(因为第一最大值已经被移除)，在得到第二最大值之后，将第二最大值从堆中移除。
- ...依次类推。
- 当堆大小为`1`时，上述过程已经将第一最大值、第二最大值、...、第N最大值确定好，排序结束。

## 代码

```java
public class HeapSort {
    public void sort(int[] arr) {
        // 建堆过程
        for(int i = 0; i < arr.length; i++) {
            heapInsert(arr, i); // 将每个下标位置插入至堆中
        }

        // 调堆过程
        for(int heapSize = arr.length; heapSize > 1; heapSize--) {
            // 堆顶的元素为最大值，将最大值放到数组的最后一个位置
            swap(arr, 0, heapSize - 1);
            // 在选出了一个最大值之后，heapSize需要减1执行调堆过程
            heapify(arr, heapSize - 1);
        }
    }

    public void swap(int[] arr, int i, int j) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

    public void heapInsert(int[] arr, int currentIndex) {
        int parentIndex = (currentIndex - 1) / 2; // 计算父节点下标位置
        while(arr[parentIndex] < arr[currentIndex]) { // 若父节点大于当前节点，则已经满足了大根堆性质，跳出循环
            swap(arr, parentIndex, currentIndex);
            currentIndex = parentIndex; // 移动至父节点下标位置
            parentIndex = (currentIndex - 1) / 2; // 计算父节点下标位置
        }
    }

    public void heapify(int[] arr, int heapSize) {
        int currentIndex = 0;
        int leftChildIndex = currentIndex * 2 + 1; // 计算左子节点下标
        int rightChildIndex = leftChildIndex + 1; // 计算右子节点下标
        while(leftChildIndex < heapSize) {
            // 左子节点与右子节点比较
            int largestIndex = rightChildIndex < heapSize && arr[rightChildIndex] > arr[leftChildIndex] ? rightChildIndex: leftChildIndex;
            // 子节点与当前节点比较
            largestIndex = arr[largestIndex] > arr[currentIndex] ? largestIndex: currentIndex;
            // 若当前节点已经是最大值，则满足大根堆性质，break
            if(largestIndex == currentIndex) break;

            // 将最大值交换至当前节点
            swap(arr, currentIndex, largestIndex);

            // 不断向下进行比较
            currentIndex = largestIndex;
            leftChildIndex = currentIndex * 2 + 1; // 计算左子节点下标
            rightChildIndex = leftChildIndex + 1; // 计算右子节点下标
        }
    }

}
```
