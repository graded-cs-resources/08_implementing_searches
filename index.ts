import { linearSorted, linearUnsorted, binary } from "./searches"
import { quickSort } from "./sorts"

// to run this file, open a Terminal window (in VS code can do this with
// Terminal -> New Terminal from the menu) and type `ts-node index.ts`
// You can also do this by simply typing ctrl-shift-b (cmd-shift-b on mac)

let failed = [false, false, false];

let arrSize = 10000000
let minVal = 0;
let maxVal = 10000;

// test all three algorithms on this simple array first
let arr1 = [-2, 2, 2, 2, 2, 2, 2, 2, 3, 8];


if (arr1[linearSorted(arr1, 9)] != 8) {
    failed[0] = true;
    console.log("linearSorted failed on arr1 searching for 9");
}
if (arr1[linearSorted(arr1, 2)] != 2) {
    failed[1] = true;
    console.log("linearSorted failed on arr1 searching for 2");
}
if (linearSorted(arr1, -3) != -1) {
    failed[2] = true;
    console.log("linearSorted failed on arr1 searching for -3");
}
if (arr1[linearUnsorted(arr1, 9)] != 8) {
    failed[1] = true;
    console.log("linearUnsorted failed on arr1 searching for 9");
}
if (arr1[linearUnsorted(arr1, 2)] != 2) {
    failed[1] = true;
    console.log("linearUnsorted failed on arr1 searching for 2");
}
if (linearUnsorted(arr1, -3) != -1) {
    failed[1] = true;
    console.log("linearUnsorted failed on arr1 searching for -3");
}

if (arr1[binary(arr1, 9)] != 8) {
    failed[2] = true;
    console.log("binary failed on arr1 searching for 9");
}
if (arr1[binary(arr1, 2)] != 2) {
    failed[2] = true;
    console.log("binary failed on arr1 searching for 2");
}
if (binary(arr1, -3) != -1) {
    failed[2] = true;
    console.log("binary failed on arr1 searching for -3");
}

console.log("Generating array with " + arrSize +
    " elements between " + minVal + " and " + maxVal);

let checkValue = minVal + Math.random() * (maxVal - minVal);
console.log("Searching for values <= " + checkValue);

let unsorted: number[] = [];
let sorted: number[] = [];
let sorted2: number[] = [];

let actualAnswer = minVal;
unsorted[0] = minVal;
sorted[0] = minVal;

for (let i = 1; i < arrSize; i++) {
    let n = Math.random() * maxVal;
    if (n > actualAnswer && n <= checkValue) {
        actualAnswer = n
    }
    unsorted[i] = n;
    sorted[i] = n;
}

console.time("Time to sort array (quickSort)");
quickSort(sorted, 0, sorted.length - 1, sorted.length);
console.timeEnd("Time to sort array (quickSort)");
if (!failed[0]) {
    console.time("linearUnsorted");
    let i = linearUnsorted(unsorted, checkValue);
    let works = (unsorted[i] == actualAnswer) ? "It worked!" : "It didn't work."
    console.log("\nlinearUnsorted: unsorted[" + i + "] = " + unsorted[i] + " - " + works);
    console.timeEnd("linearUnsorted");
}
if (!failed[1]) {
    console.time("linearSorted");
    let i = linearSorted(sorted, checkValue);
    let works = (sorted[i] == actualAnswer) ? "It worked!" : "It didn't work."
    console.log("\nlinearSorted: sorted[" + i + "] = " + sorted[i] + " - " + works);
    console.timeEnd("linearSorted");
}
if (!failed[2]) {
    console.time("binary");
    let i = binary(sorted, checkValue);
    let works = (sorted[i] == actualAnswer) ? "It worked!" : "It didn't work."
    console.log("\nbinary: sorted[" + i + "] = " + sorted[i] + " - " + works);
    console.timeEnd("binary");
}
