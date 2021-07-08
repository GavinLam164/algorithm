# Morris遍历

## 介绍

在学习完在迭代版本遍历二叉树的方法之后，发现必须使用数据结构栈来辅助，用以找到之前遍历过的节点，那有没有不使用额外数据结构也能进行遍历的方式呢？

Morris就是一种不使用额外的数据结构，也能够实现先/中/后序遍历的方法，其思想是利用了树中叶子节点的right为null的引用，解决如何找到之前遍历过的节点的问题。

设置right引用的步骤：
1. 在遍历节点cur1时，先获取cur1的左孩子cur2，即`cur2 = cur1.left`。
2. cur2不停的向右孩子方向移动，即：`cur2 = cur2.right`，直至cur2.right为null。
3. 当cur2.right为null时，使cur2.right指向cur1，即：`cur2.right= cur1`。
4. 已经设置好引用后，cur1可以继续往左孩子进行遍历，即：`cur1 = cur1.left`。

使用与删除right引用：
5. 在不停的进行上述流程后，cur1.left为空，证明cur1已经是未遍历过的最左节点了，此时可根据遍历顺序输出该节点
6. 之后通过`cur1 = cur1.right`，回到之前遍历过的节点。
7. 回到遍历过的节点之后，重复步骤1，找到cur2.right指向cur1的节点，并将该引用重置为null，即：`cur2.right = null`。

总结：
上述流程是利用了当前节点cur1的左子树的最右节点cur2的right指针。

1. 若cur2.right指针为空，则证明是第一次遍历到cur1，可指向cur1。
2. 若cur2.right指针为cur1，则证明是第二次遍历到cur1，将cur2.right设置为空。

## 代码

```java
public class TreeNodeMorris {

    private void preOrder(TreeNode root) {
        if(root == null) return;
        TreeNode cur1 = root;
        TreeNode cur2 = null;
        while(cur1 != null) {
            cur2 = cur1.left;
            if(cur2 != null) {
                while(cur2.right != null && cur2.right != cur1) {
                    cur2 = cur2.right;
                }

                if(cur2.right == null) { // 第一次遍历到cur1，设置从cur2回到cur1的引用
                    cur2.right = cur1;
                    System.out.print(cur1.val + "\t"); // 第一次到cur1就输出，先序遍历

                    cur1 = cur1.left; // cur1继续遍历左孩子
                }else { // 第二次遍历到cur1，证明左子树遍历完了
                    cur2.right = null;
                    cur1 = cur1.right; // cur1继续遍历右孩子
                }
            }else {
                System.out.print(cur1.val + "\t"); // cur1是叶子节点，直接输出
                cur1 = cur1.right;
            }
        }
        System.out.println();
    }


    private void inOrder(TreeNode root) {
        if(root == null) return;
        TreeNode cur1 = root;
        TreeNode cur2 = null;
        while(cur1 != null) {
            cur2 = cur1.left;
            if(cur2 != null) {
                while(cur2.right != null && cur2.right != cur1) {
                    cur2 = cur2.right;
                }

                if(cur2.right == null) { // 第一次遍历到cur1，设置从cur2回到cur1的引用
                    cur2.right = cur1;

                    cur1 = cur1.left; // cur1继续遍历左孩子
                }else { // 第二次遍历到cur1，证明左子树遍历完了

                    // 左子树遍历完之后输出当前节点，即中序
                    System.out.print(cur1.val + "\t");

                    cur2.right = null;
                    cur1 = cur1.right; // cur1继续遍历右孩子
                }
            }else {
                System.out.print(cur1.val + "\t"); // cur1是叶子节点，直接输出
                cur1 = cur1.right;
            }
        }
        System.out.println();
    }

    private void postOrder(TreeNode root) {

    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(5);
        root.left = new TreeNode(3);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(4);

        root.right = new TreeNode(7);
        root.right.left = new TreeNode(6);
        root.right.right = new TreeNode(8);

        TreeNodeMorris traverse = new TreeNodeMorris();
        /*
        5	3	1	4	7	6	8
        1	3	4	5	6	7	8
        1	4	3	6	8	7	5
         */
        traverse.preOrder(root);
        traverse.inOrder(root);
        traverse.postOrder(root);
    }

}

```


