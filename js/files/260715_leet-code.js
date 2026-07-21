/*
originally tried with rishabh. 

394: decode string: https://leetcode.com/problems/decode-string/

given an encrypted string 's', decode it with the following rules: 

Example 1:

Input: s = "3[a]2[bc]"
Output: "aaabcbc"
Example 2:

Input: s = "3[a2[c]]"
Output: "accaccacc"
Example 3:

Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"

assume input is always structured & clean.
*/

var decodeString = function (s) {
	let input = s;
	let output = [];

	//we read from the back of the input, until we have no more to read. 
	let i = s.length - 1;
	while (i >= 0) {
		let temp_buffer = [];

		let ch = input[i]; 

		if (ch == "")
		i--;
	}

	//return final output as a string.
	return output;
};

let test = decodeString("3[a]bc");

console.log(test); 
