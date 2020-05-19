let rectWidth;
let depth = 0;

function setup() {
    let numOfRects = document.getElementById('numOfRects').value;
    let width = document.getElementById('canvas').offsetWidth;
    let height = document.getElementById('canvas').offsetHeight;
    let canvas = createCanvas(width, height);

    rectWidth = floor(width / numOfRects);

    canvas.parent('canvas');
    values = new Array(floor(width / rectWidth));

    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }

    frameRate(1);
}

function draw() {
    background(23);
    values = mergeSort(values, depth);
    depth++;
    for (let i = 0; i < values.length; i++) {
        stroke(0);
        fill(255);
        rect(i * rectWidth, height - values[i], rectWidth, values[i]);
    }

}


function mergeSort(a, d) {
    if (a.length <= 1) {
        return a;
    }

    d--;
    if (d < 1) {
        return (a);
    }
    var mid = Math.round((a.length / 2));
    var left = a.slice(0, mid);
    var right = a.slice(mid);

    let leArr = mergeSort(left, d);
    let riArr = mergeSort(right, d);
    return merge(leArr, riArr);
}

async function merge(left, right) {
    sorted = [];
    while (left && left.length > 0 && right && right.length > 0) {
        if (left[0] <= right[0]) {
            sorted.push(left.shift());
        } else {
            sorted.push(right.shift());
        }
    }

    await sleep(50);

    return sorted.concat(left, right);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}