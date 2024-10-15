## Use index to save space

Many of the array related questions rely on `Hash Map`, which can lead to O(N) time and O(N) space. But most of the questions require a O(1) space.

Thus, we need to use the **index of the input array**, replace the extra cost of a `Hash Map`.
Therefore, it will become `O(N) time` but `O(1) space`.

### Examples

- 442. Find All Duplicates in an Array
- 287. Find the Duplicate Number
- 448. Find all Numbers Disappeared in an Array
