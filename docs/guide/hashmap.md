# 哈希表

## 介绍

哈希表是编程中常用的数据结构之一，主要用于key=>value的查询，使用场景不限于：统计、分组、映射等等。

哈希表的内部原理是维护一个大小为`M`的数组，并将一个较大的值域的`key`值通过`hash`函数算出一个较小值域的`hashKey`值，然后将`hashKey % M`作为查询的索引，后通过`hashKey`可以找到对应的`value`。

若`key`为字符串类型，通常会将字符串计算出`hash值`再插入到表中。

但将个较大的值域的`key`值通过`hash`函数算出一个较小值域的`hashKey`值会导致冲突，因为两个不同的`key`也有可能计算出同样的`hashKey`，称之为`hash碰撞/冲突`。

当`hash碰撞/冲突`现象发生时，可使用拉链法进行处理，也就是在碰撞的`hashKey`上挂载一个链表。

> 假设key=a、key=b计算出同样的hashKey为c，那么解决冲突后如下所示：
> 
> c => a -> b
> 
> 也就是c映射到了一个链表上，那么在查询a、b的时候可算出hashKey为c，然后基于c找到链表，遍历该链表查询a、b是否存在。

聪明的读者已经想到了，如果冲突时常发生，那么`hashKey`映射到的链表长度可能会特别长导致查询效率很低，所以java内部并不是使用链表，而是使用了红黑树去优化查询效率。

## 实现

这里我们只做一个简单的实现，基于拉链法(链表)，并且java提供了hashCode函数的实现，可以轻松的实现key为String类型的哈希表。

```java

public class HashMap {

    class LinkNode {
        String key;
        int val;
        LinkNode next;

        public LinkNode(String key, int val) {
            this.key = key;
            this.val = val;
        }
    }

    LinkNode[] map;

    public HashMap(int capacity) {
        map = new LinkNode[capacity];
    }

    private int getIndex(String key) {
        return key.hashCode() % map.length;
    }

    public void put(String key, int val) {
        int index = getIndex(key);
        if(map[index] == null) {
            map[index] = new LinkNode(key, val);
        }else {
            LinkNode head = null;
            // 从头节点开始查询，直至为空或等于key值停下
            for(head = map[index]; head != null && !head.key.equals(key); head = head.next);

            if(head == null) { // 没有找到对应key的节点，则创建一个从头部插入
                head = new LinkNode(key, val);
                head.next = map[index];
                map[index] = head;
            }else { // 找到对应key的节点，更新值即可
                head.val = val;
            }
        }
    }

    public int get(String key) {
        int index = getIndex(key);
        LinkNode head = null;
        // 从头节点开始查询，直至为空或等于key值停下
        for(head = map[index]; head != null && !head.key.equals(key); head = head.next);
        return head == null ? -1: head.val;
    }

    public void remove(String key) {
        int index = getIndex(key);
        LinkNode pre = null;
        LinkNode head = null;
        // 从头节点开始查询，直至为空或等于key值停下
        for(head = map[index]; head != null && !head.key.equals(key); pre = head, head = head.next);
        if(head == null) return; // 没有找到对应的key值则直接return
        // 找到了对应的key值，还需要判断删除的是否是头节点
        if(pre == null) { // 删除的是头节点
            map[index] = head.next;
        }else { // 删除的不是头节点
            pre.next = head.next;
        }
    }

    public static void main(String[] args) {
        HashMap hashMap = new HashMap(10);
        hashMap.put("164", 96);
        hashMap.put("165", 95);
        hashMap.put("167", 97);

        System.out.println(hashMap.get("164"));
        System.out.println(hashMap.get("165"));
        System.out.println(hashMap.get("167"));

        hashMap.remove("164");

        System.out.println(hashMap.get("164"));
    }

}

```
