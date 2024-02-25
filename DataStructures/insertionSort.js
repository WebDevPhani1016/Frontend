let a = [9, 3, 2, 5, 1, 3, 8, 7];

function insertionSort(a){
    for(let i=1;i<a.length;i++){
        let j = i;
        while(j>0 && a[j-1]>a[j]){
            let temp = a[j];
            a[j] = a[j-1];
            a[j-1] = temp;
            j = j-1;
        }
    }
    return a;
}
console.log(insertionSort(a));