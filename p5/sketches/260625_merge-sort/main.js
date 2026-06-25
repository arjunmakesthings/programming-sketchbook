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
    let original = arr;
    let sorted = [];

    let split_up = split(original);

    //divide into two.

    return split_up;
  }
}

//helpers:
function split(arr){
  let left = []; 
  let right = []; 

  for (let i = 0; i<arr.length/2; i++){
    left.push(arr[i]); 
    arr.splice(i,1); 
  }
  for (let i = 0; i<arr.length; i++){
    right.push(arr[i]); 
    arr.splice(i,1); 
  }
  return [left, right]; 
}

//we want to return a sorted list.
let org_arr = [6, 4, 7, 8, 2, 9];
let sorted_arr = merge_sort(org_arr); 
console.log("original array was: " + org_arr + "\n" + 
  "new array is: " + sorted_arr
); 
