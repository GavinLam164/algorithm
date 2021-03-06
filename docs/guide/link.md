# 链表

## 介绍

链表的数据是存储在称为节点的数据结构中，节点是一个具有`next`引用的结构，链表中的每个节点通过`next`引用串联在一起，所以不要求内存空间是连续的，而我们持有的通常是链表头节点引用。

优点：
链表的节点之间是通过`next`引用的指向连接的，所以可以很方便的串联、拆分节点之间的联系，所以插入、删除节点的效率很高。时间复杂度：O(1)。适用于增删频率较高的场景。

缺点：
由于我们只持有头节点引用，且内存分配不一定是连续的，所以无法通过类似数组下标的方式快速的定位到链表的某个节点。只能通过遍历，不停的通过`next`指向链表中的下一个节点查询节点，所以查询的时间复杂度为：O(N)。

速记：链表可以是非连续内存分配，查询慢，增删快。

学好链表是对学习数据结构非常有帮助的，很多经典的数据结构都是基于链表概念进行实现的。

## 单向链表

以下是一个简单的单向链表，每个节点中包含下一个节点的指针`next`以及当前节点的值`val`。

```java
public class LinkNode {
    public LinkNode next;
    public int val;

    public LinkNode(int val) {
        this.val = val;
    }

    public static void main(String[] args) {
        // 链表头节点 1
        LinkNode head = new LinkNode(1);
        // 1 -> 2
        head.next = new LinkNode(2);
        // 1 -> 2 -> 3
        head.next.next = new LinkNode(3);

        // 通过头节点遍历链表
        LinkNode tmp = head;
        while(tmp != null) {
            System.out.println(tmp.val);
            tmp = tmp.next; // 不断的next，将指针挪到下一个节点
        }
    }
}
```

## 双向链表

双向链表与单向链表的实现类似，不同之处在于，每个节点不仅仅只有`next`指向下一个节点的指针，还有`prev`指向上一个节点的指针，所以在增删时需要格外注意相邻节点的前后链接。

```java
public class DoubleLinkNode {
    public DoubleLinkNode prev;
    public DoubleLinkNode next;
    int val;

    public DoubleLinkNode(int val) {
        this.val = val;
    }

    public static void main(String[] args) {
        // 双向链表头节点 1
        DoubleLinkNode head = new DoubleLinkNode(1);

        // 1 -> 2
        head.next = new DoubleLinkNode(2);
        // 1 <-> 2
        head.next.prev = head; // 需要维护prev关系

        // 1 <-> 2 -> 3
        head.next.next = new DoubleLinkNode(3);
        // 1 <-> 2 <-> 3
        head.next.next.prev = head.next; // 需要维护prev关系

        System.out.println("正向遍历");
        DoubleLinkNode tmp = head;
        while(tmp != null) { // 正向遍历 1 -> 2 -> 3
            System.out.println(tmp.val);
            tmp = tmp.next;
        }
        System.out.println("反向遍历");
        tmp = head.next.next;
        while(tmp != null) { // 反向遍历 3 -> 2 -> 1
            System.out.println(tmp.val);
            tmp = tmp.prev;
        }
    }

}
```
