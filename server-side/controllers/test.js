// let today = new Date();
// console.log(
//   "Hari, Tanggal dan Tahun hari ini:",
//   today.toLocaleDateString({
//     // weekday: "long",
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//   })
// );

function countTwoDigitNumbers(arr) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 10 && arr[i] <= 99) {
      count++;
    }
    console.log(count);
  }

  return count;
}

console.log(1, 2, 3, 4, 5, 6);
