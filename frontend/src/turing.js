var solution = function (s) {
  let obj = {};
  let max = 0;
  let str = "";
  for (let i = 0; i < s.length; i++) {
    if (("A" <= s[i] && s[i] <= "Z") || ("a" <= s[i] && s[i] <= "z")) {
      obj[s[i]] = (obj[s[i]] || 0) + 1;
    }
    if (obj[s[i]] > max) {
      max = obj[s[i]];
      str = s[i];
    }
  }
  console.log(str);
  return s;
};

// solution("ABCDAAAA1233456bbbbbbbbb");

// isHappy(2);

function isHappy(n) {
  let sum = 0;
  while (sum != 1) {
    let num = returnSum(n);
    if (sum > num) return false;
    sum = num;
  }
  return true;
}

function returnSum(num) {
  let sum = 0;
  while (num > 0) {
    sum += Math.pow(num % 10, 2);
    num /= 10;
  }
  return sum;
}

function plusOne(digits) {
  let numByIncrement = 0;
  let i = 0;
  while (i < digits.length) {
    numByIncrement = numByIncrement * 10 + digits[i];
    i++;
    console.log(numByIncrement);
  }
  numByIncrement++;
  // console.log(numByIncrement);
  digits = numByIncrement.toString().split("").map(Number);
  return digits;
}

// plusOne([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3])

// var clearDigits = function (s) {
//   var stack = [];
//   for (var i = 0; i < s.length; i++) {
//     if ("0123456789".indexOf(s[i]) < 0) {
//       stack.push(s[i]);
//     } else {
//       stack.pop();
//     }
//   }
//   return stack.join("");
// };

// console.log(clearDigits("bc34"))




// function minimumMoves(s){
//   let counter = 0;
//   let str = s;
//   for(let i = 0; i < s.length-2; i++){
//       if(s[i] === 'X' || s[i+1] === 'X' || s[i+2] === 'X'){
//           counter++;
//           s = s.substring(0,i) + 'OOO';
//           if(i+3>str.length-1) break;
//           s = s + str.substring(i+3,str.length);
//       }
//   }
//   return counter;
// };



// console.log(minimumMoves("OXOX"));




