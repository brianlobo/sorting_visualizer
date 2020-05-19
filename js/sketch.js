let rectWidth;
let states = [];
let hist = [];
let depth = 0;
let go = document.getElementById('go');
let gist = [
    "a7a9d0616c454c2d048d486408f6221d",
    "f9ee532891f5eb891074b1a22a91339"
]
function setup() {
    let numOfRects = document.getElementById('numOfRects').value;
    let width = document.getElementById('canvas').offsetWidth;
    let height = document.getElementById('canvas').offsetHeight;
    let canvas = createCanvas(width, height);
    let sortType = Number(document.getElementById('sortType').value);

    rectWidth = floor(width / numOfRects);

    canvas.parent('canvas');
    values = new Array(floor(width / rectWidth));

    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
        states[i] = -1;
    }

    frameRate(100);
    if (sortType === 0){
        depth = 0
        displayCode('quick');
        quickSort(values, 0, values.length - 1);
    } else if (sortType === 1) {
        depth = 0
        displayCode('bubble');
        bubbleSort(values);
    } else if (sortType === 2) {
        // displayCode('merge');
        depth = 1;
    }
}

function draw() {
    background(23);
    if (depth > 0) {
        values = mergeSort(values, depth);
        depth++;
        for (let i = 0; i < values.length; i++) {
            stroke(0);
            fill(255);
            rect(i * rectWidth, height - values[i], rectWidth, values[i]);
        }
    } else {
        for (let i = 0; i < values.length; i++) {
            stroke(0);
            if (states[i] == 0) {
                fill('#E0777D');
            } else if (states[i] == 1) {
                fill('#D6FFB7');
            } else {
                fill(255);
            }
            rect(i * rectWidth, height - values[i], rectWidth, values[i]);
        }
    }
}

// function testFunc() {
//     values = mergeSort(values, depth);
//     depth++;
// }

function mergeSort(a, d) {
    if (a.length <= 1) {
        return a;
    }

    d--;
    if (d < 1) {
        console.log(a);
        return (a);
    }
    var mid = Math.round((a.length / 2));
    var left = a.slice(0, mid);
    var right = a.slice(mid);
    let leArr = mergeSort(left, d);
    let riArr = mergeSort(right, d);
    return merge(leArr, riArr);
}

function merge(left, right) {
    sorted = [];
    while (left && left.length > 0 && right && right.length > 0) {
        if (left[0] <= right[0]) {
            sorted.push(left.shift());
        } else {
            sorted.push(right.shift());
        }
    }  
    return sorted.concat(left, right);
}

async function bubbleSort(arr) {
    let isSorted = false;
    let end = arr.length - 1;

    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                isSorted = false;
                states[i] = 0;
                states[i + 1] = 1;
                await swapVal(arr, i, i + 1);
                states[i] = -1;
                states[i + 1] = -1;
            }
        }
        end--;
    }
}

// QuickSort func
async function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    }

    let index = await partition(arr, start, end);
    states[index] = -1;
    await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end)
    ]);
}
// Helper function for quicksort
async function partition(arr, start, end) {
    for (let i = start; i < end; i++) {
        states[i] = 1;
    }

    let pivotIndex = start;
    let pivotVal = arr[end];

    for (let i = start; i < end; i++) {
        if (arr[i] < pivotVal) {
            await swapVal(arr, i, pivotIndex);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }
    }
    await swapVal(arr, pivotIndex, end);

    for (let i = start; i < end; i++) {
        if (i != pivotIndex) {
            states[i] = -1;
        }
    }

    return pivotIndex;
}

// Swaps two vals in a given array
async function swapVal(arr, a, b) {
    await sleep(20);

    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function displayCode(typeOfSort){
    $('.sort-gists').addClass('d-none');
    $('.sort-info').addClass('d-none');
    $(`#${typeOfSort}-sort-info`).removeClass('d-none');
    $(`#${typeOfSort}-sort-gist`).removeClass('d-none');
}

// Event Listeners //
window.addEventListener("resize", function () {
    setup();
    draw();
});

go.addEventListener("click", function () {
    setup();
    draw();
});