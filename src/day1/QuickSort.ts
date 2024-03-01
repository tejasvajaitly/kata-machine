function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) {
        return;
    }

    const pivot = partition(arr, lo, hi);
    qs(arr, lo, pivot - 1);
    qs(arr, pivot + 1, hi);

    return;
}

function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];

    let indx = lo - 1;

    for (let i = lo; i < hi; ++i) {
        if (arr[i] <= pivot) {
            indx++;
            const tmp = arr[i];
            arr[i] = arr[indx];
            arr[indx] = tmp;
        }
    }

    indx++;

    arr[hi] = arr[indx];
    arr[indx] = pivot;

    return indx;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
