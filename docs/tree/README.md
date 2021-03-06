# 介绍

树结构是一种类似链表的结构，但我们会赋予树结构更多的含义。

一棵树由一到多个树节点构成，每个节点存在父子关系，通过约束每个树节点的子节点个数，可将多个树节点从扁平的关联关系拆分成多个层级、具有父子关系的树结构。

二叉树是树形结构中最常见的一种，每个树节点有left、right两个子节点，像一条树枝岔开两条分支。

<div style="text-align: center">
<img src="/二叉树.png">
</div>

代码如下：
```java
public class TreeNode {
    TreeNode left;
    TreeNode right;
    int val;
    public TreeNode(int val) {
        this.val = val;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(2);
        root.left = new TreeNode(1);
        root.right = new TreeNode(3);
    }
}
```


大部分树结构是根据某个属性值有序组织的，通过有序这个特性可以在树中使用二分搜索快速定位到某个节点，所以查询时间复杂度是O(LogN)，这类树结构我们称之为搜索二叉树。

> 这里的有序组织是指，以某个节点为头的子树，对应的左子树中所有的节点的val都比该节点的val要小，对应的右子树中所有的节点的val都比该节点的val要大。
>
> 这一性质使得树的中序遍历结果是按照val严格递增的，中序遍历后续会进行讲解。

<div style="text-align: center">
<img src="/平衡搜索二叉树.png">
</div>

但每个树节点只有一个子节点时，则会退化为链表导致查询时间复杂度O(N)，无法通过二分搜索提高查询效率。

<div style="text-align: center">
<img src="/搜索二叉树(退化).png">
</div>

所以缺少平衡性的树结构无法满足工程上的复杂度需求：查询O(LogN)。

所以通常会约束其平衡性，也就是常说的平衡搜索二叉树：红黑树、AVL树、SB树等，这些树分别从节点颜色、节点的高度、节点的数量等性质保证了树的平衡性，并维护了树的节点次序是有序组织的。

接下来我们会学习常见的树结构及其性质，以及遍历、调整树结构等基本操作。
