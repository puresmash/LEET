"""
271. Encode and Decode Strings
Medium
Time complexity: O(n), Space complexity: O(n)
where n is the number of characters in all strings

There are two ways to solve this problem:
1. Using length prefix
    diameter + len(str) + str
    then we just read the corresponding length,
    no matter the string contains the delimiter or not
    
2. Using escape character
    If we got a escape character, then we do special handling for the next character
    like lots of programming languages do for string literals

Solution1 is easier to implement, but it requires more space
Solution2 is more intuitive, likes a common string handling we already familiar with
"""
class Codec:
    escape = '|'
    def encode(self, strs) -> str:
        encoded_array = []
        for str in strs:
            encoded_str = str.replace(self.escape, self.escape+self.escape)
            encoded_array.append(encoded_str)
        joined_string = self.escape.join(encoded_array)
        return joined_string

    def decode(self, str) -> list:
        result = []
        is_escape = False
        prev = 0
        for i in range(len(str)):
            if is_escape:
                if str[i] != self.escape:
                    string = str[prev:i-1]
                    prev = i
                    result.append(string.replace(self.escape+self.escape, self.escape))
                is_escape = False
            elif str[i] == self.escape:
                is_escape = True
            if i == len(str) - 1:
                string = str[prev:]
                result.append(string.replace(self.escape+self.escape, self.escape))
        return result
# Test
codec = Codec()
# test case 1
input1 = ['hello', 'world']
data1 = codec.encode(input1)
assert data1 == 'hello|world'
assert codec.decode(data1) == input1, f"Expected {input1}, but got {codec.decode(data1)}"
# test case 2
input2 = ['hello|', 'world']
data2 = codec.encode(input2)
assert data2 == 'hello|||world'
assert codec.decode(data2) == input2, f"Expected {input2}, but got {codec.decode(data2)}"
# test case 3
input3 = ['a', 'b', 'a', 'c', 'd']
data3 = codec.encode(input3)
assert data3 == 'a|b|a|c|d'
assert codec.decode(data3) == input3, f"Expected {input3}, but got {codec.decode(data3)}"
