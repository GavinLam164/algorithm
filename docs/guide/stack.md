# 栈

## 介绍

队列是一种先进后出的数据结构，缩写为FILO(first in last out)，有压栈和弹栈两种基本操作，这两种操作是增删元素，所以我们可以用链表实现。

> 理解队列可参照现实中的洗盘子，先洗好的盘子会放在下面，后洗好的盘子会放在上面，在使用的时候总是先使用上面的盘子，后洗好的盘子先使用，先洗好的盘子后使用，也就是先进后出。

> 内核中的执行栈是用数组实现的，因为限制了栈的空间大小，所以可由连续的内存空间加上栈指针实现栈的先进后出。


## 实现

这里我们使用双向链表实现栈结构，将刚学的知识用起来。（虽说用数组可能更简单些）

由于使用的是双向链表，所以在弹栈时需要额外注意`prev`和`next`引用的指向。

```java
public class Stack {
    public DoubleLinkNode pointer;

    public void push(int val) {
        if(pointer == null) { // 栈为空，则创建栈底的节点
            pointer = new DoubleLinkNode(val);
            return;
        }
        // 栈不为空，则在栈顶追加新建节点，并将栈指针移动到新加的节点上，即pointer始终指向栈顶
        pointer.next = new DoubleLinkNode(val);
        pointer.next.prev = pointer;
        pointer = pointer.next;
    }

    public int pop() {
        if(isEmpty()) return -1;
        // 栈顶元素
        int val = pointer.val;
        pointer = pointer.prev;
        if(pointer != null) { // 将刚弹出的栈顶元素从链表中删除
            pointer.next.prev = null;
            pointer.next = null;
        }
        return val;
    }

    public boolean isEmpty() {
        return pointer == null;
    }

    public static void main(String[] args) {
        Stack stack = new Stack();
        stack.push(1);
        stack.push(2);
        stack.push(3);

        while(!stack.isEmpty()) {
            System.out.println(stack.pop());
        }
    }
}

```




