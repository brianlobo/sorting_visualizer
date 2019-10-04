let i = 0;
// width of rects
let w = 10;

function setup() {
    createCanvas(1100, 400);
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
    frameRate(5);
    quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    }

    let index = await partition(arr, start, end);

    await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end)
    ]);
}

async function partition(arr, start, end) {
    let pivotIndex = start;
    let pivotVal = arr[end];

    for (let i = start; i < end; i++) {
        if (arr[i] < pivotVal) {
            await swapVal(arr, i, pivotIndex);
            pivotIndex++;
        }
    }
    await swapVal(arr, pivotIndex, end);
    return pivotIndex;
}

function draw() {
    background(23);

    for (let i = 0; i < values.length; i++) {
        stroke(0);
        fill(255);
        rect(i * w, height - values[i], w, values[i]);
    }

}

async function swapVal(arr, a, b) {
    await sleep(20);

    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
