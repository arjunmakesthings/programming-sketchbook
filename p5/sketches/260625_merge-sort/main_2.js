//merge sort function.

/*
given an array where length % 2 == 0:
- recursively divide array into smallest parts.
- sort between pairs. 
- return new sorted array.

we assume that this implementation of merge-sorting only does things in ascending order.

*/

function merge_sort(arr) {
  if (arr.length % 2 != 0) {
    console.log("cannot be sorted as array length % 2 !=0.");
    return;
  } else {
    //perform sorting.

    //make a copy of the original array to avoid mutating the original one.
    let array_to_sort = arr;

    let sorted = new array(array_to_sort.length);

    //split into halves until smallest half is one unit.
    let split_arrays =  
    split(array_to_sort);

    return sorted;
  }
}

//helpers:
function split(arr) {
  let left = arr.slice(0, arr.length / 2);
  let right = arr.slice(arr.length / 2, arr.length);
  return [left, right];
}

//we want to return a sorted list.
let org_arr = [6, 4, 7, 8, 2, 9];
// let sorted_arr = merge_sort(org_arr);
// console.log("original array was: " + org_arr + "\n" +
//   "new array is: " + sorted_arr
// );

console.log(split(org_arr));
