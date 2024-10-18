## Time complexity

### Basic

- Construct at once: O(n)
- Construct one by one: O(nlogn)
- Insert: O(logn)
- Delete: O(logn)
- Peak: O(1)

### Else

- Top k elements of n elements: O(klogn) <- O(logn) \* k

## Implement Heap

The _JavaScript_ language doesn't provide a native `Heap` approach, so you need to implement it yourself. However, implementing a `MaxHeap` from scratch actually takes some time...

### Construct a Max Heap

Start from the middle of the array, compare it with its child, do this respectively until reach the root.

e.g. Take `MaxHeap` for example.

```
    1
   / \
  2   3
 / \ / \
 4 5 6 7
```

From the position of 3, compare with its child node 6 and 7, since 7 is the largest, swap 3 and 7.

```
    1
   / \
  2   7
 / \ / \
 4 5 6 3
```

Then continue this operation on node 2

```
    1
   / \
  5   7
 / \ / \
 4 2 6 3
```

Then on node 1, swap 1 and 7, then 1 and 6, this process called `heapifyDown`.
Finally we will get the following, every parent is greater than its child.

```
    7
   / \
  5   6
 / \ / \
 4 2 1 3
```

### Pop the max (Delete)

Swap the first element(root/max node) and last element, then `array.pop()` the last element.
Hence now the balance is broken, need to adopt one `heapifyDown` at the root node.

### Add a node (Insert)

```
7
 \
  6
 / \
1
```

Add the new value after the last element, then find the parent of the new element. Compare with the parent.

If the new value is smaller, end the process.

```
7
 \
  6
 / \
1   2
```

If the new value is greater, swap them, continue this process until reach the root.

```
7        7         8
 \        \         \
  6   ->   8    ->   7
 / \      / \       / \
1   8    1   6     1   6
```

This process is also called `heapifyUp`.
