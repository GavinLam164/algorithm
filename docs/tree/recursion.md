# 先/中/后序遍历(递归)

## 介绍

递归是遍历树结构较为简单的方式，因为递归天然适合处理同类型、多层级结构的数据结构，而树结构恰恰满足这一点。

而先/中/后序遍历指的是，处理当前节点的顺序。

先序遍历：中左右，意味着先处理当前节点`中`，再去处理左子树，最后再处理右子树。

中序遍历：左中右，意味着先处理左子树，再处理当前节点`中`，最后处理右子树。

后序遍历：左右中，意味着先处理左子树，再去处理右子树，最后处理当前节点`中`。

通过以上遍历顺序，可知先/中/后指的是当前节点的处理顺序。

熟悉递归遍历的执行顺序之后，可根据需求选择不同的遍历方式。

常见场景：

- 父节点影响子节点，可使用先序遍历，因为当前节点先被处理，再处理左子树、右子树，左右子树可得到当前节点的处理结果。
- 左子树影响父节点，可使用中序遍历，因为左子树先被处理，再处理当前节点，当前节点处理时可得到左子树的处理结果。
- 右子树影响父节点，可改写中序遍历，使得右子树先被处理，再处理当前节点，当前节点处理时刻得到右子树的处理结果。
- 左子树、右子树同时影响父节点，可使用后续遍历，因为左右子树处理完之后，再处理当前节点，当前节点处理时可得到左子树和右子树的处理结果。

## 代码

递归遍历的代码编写是较为简单的，重点在于理解递归的执行过程，后续会补充图文说明。

```java
public class TreeNodeRecursion {
    // 先序遍历，先输出当前节点，再递归左子树、后递归右子树
    public void preOrder(TreeNode root) {
        if(root == null) return;
        System.out.println(root.val);
        preOrder(root.left);
        preOrder(root.right);
    }

    // 中序遍历，先递归左子树，左子树处理完成后输出当前节点，再递归右子树
    public void inOrder(TreeNode root) {
        if(root == null) return;
        inOrder(root.left);
        System.out.println(root.val);
        inOrder(root.right);
    }

    // 后续遍历，先递归左子树、右子树，最后输出当前节点
    public void postOrder(TreeNode root) {
        if(root == null) return;
        postOrder(root.left);
        postOrder(root.right);
        System.out.println(root.val);
    }
}

```