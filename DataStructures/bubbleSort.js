let a = [9, 3, 2, 5, 1, 3, 8, 7];

function bubbleSort(a) {
    for (let i = 1; i < a.length; i++) {
        for (let j = 0; j < a.length - 1; j++) {
            if (a[j] > a[j + 1]) {
                // swap(a[j], a[j+1]);
                let temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }
    return a;
}
console.log(bubbleSort(a));