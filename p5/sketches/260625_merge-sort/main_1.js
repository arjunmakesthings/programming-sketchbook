//merge sort function.

/*
given an array where length % 2 == 0:
- recursively divide array into smallest parts.
- sort between pairs. 
- return new sorted array.

we assume that this implementation of merge-sorting only does things in ascending order.

*/

function merge_sort(arr) {
  if (arr.length <= 1) return arr;

  let half = Math.floor(arr.length / 2);

  let left = merge_sort(arr.slice(0, half));
  let right = merge_sort(arr.slice(half));

  return merge(left, right);
}

//helper:
function merge(l, r) {
  let result = [];

  let i = 0;
  let j = 0;

  while (i < l.length && j < r.length) {
    if (l[i] <= r[j]) {
      result.push(l[i]);
      i++;
    } else {
      result.push(r[j]);
      j++;
    }
    while (i < l.length) {
      result.push(l[i]);
      i++;
    }

    while (j < r.length) {
      result.push(r[j]);
      j++;
    }
  }
  return result;
}

//we want to return a sorted list.
let org_arr = [6, 4, 7, 8, 2, 9];
let sorted_arr = merge_sort(org_arr);
console.log(
  "original array was: " + org_arr + "\n" + "new array is: " + sorted_arr,
);
