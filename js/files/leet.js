console.log(check("hhb", "hh"));

function check(ransomNote, magazine) {
  let ransom_arr = Array.from(ransomNote);
  let mag_arr = Array.from(magazine);

  let mag = {};

  for (let i = 0; i < magazine.length; i++) {
    let char = magazine[i];
    if (!(char in mag)) {
      mag[char] = 1;
    } else {
      mag[char] += 1;
    }
  }

  for (let i = 0; i < ransom_arr.length; i++) {
    let char = ransom_arr[i];

    if (char in mag && mag[char] > 0) {
      mag[char] -= 1;
    } else {
      return false;
    }
  }
  return true;
}
