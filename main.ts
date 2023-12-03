function toCoordinate (pos: number) {
    ledX = pos % 5
    ledY = Math.trunc(pos / 5)
    return [ledX, ledY]
}
function removeLine () {
    lines = [
    [
    0,
    1,
    2,
    3,
    4
    ],
    [
    5,
    6,
    7,
    8,
    9
    ],
    [
    10,
    11,
    12,
    13,
    14
    ],
    [
    15,
    16,
    17,
    18,
    19
    ],
    [
    20,
    21,
    22,
    23,
    24
    ]
    ]
    for (let l = 0; l <= lines.length - 1; l++) {
        if (containsAll(background, lines[l])) {
            background = background.filter(function (n) {
                return !contains(lines[l], n)
            })
for (let m = 0; m <= background.length - 1; m++) {
                if (background[m] < lines[l][0]) {
                    background[m] += 5
                }
            }
        }
    }
}
function rotateBrick () {
    _type = brickType()
    possibleBrick4 = current
    switch (_type) {
        case 3:
            possibleBrick4[0] -= 4
            break
        case 4:
            possibleBrick4[0] += 4
            break
        case 5:
            possibleBrick4[0] += 1
            break
        case 6:
            possibleBrick4[0] -= 1
            possibleBrick4[1] -= 4
            break
        case 7:
            possibleBrick4[1] += 4
            possibleBrick4[2] += 1
            break
        case 8:
            possibleBrick4[2] -= 1
        default:
            break
    }
if (!(containsAny(background, possibleBrick4))) {
        current = possibleBrick4
        generateImage()
    }
}
function generateImage () {
    basic.clearScreen()
    for (let i = 0; i <= background.length - 1; i++) {
        coor = toCoordinate(background[i])
        led.plot(coor[0], coor[1])
    }
    for (let j = 0; j <= current.length - 1; j++) {
        coor2 = toCoordinate(current[j])
        led.plot(coor2[0], coor2[1])
    }
}
function containsAny (array: any[], nums: any[]) {
    if (array.length == 0) {
        return false
    }
    return nums.some(function (n) {
        return contains(array, n)
    })
}
function containsAll (array: any[], nums: any[]) {
    if (array.length == 0) {
        return false
    }
    return nums.every(function (n) {
        return contains(array, n)
    })
}
function reachLeftEdge () {
    return current.some(function (n) {
        return n % 5 == 0
    })
}
function moveBrickDown () {
    while (true) {
        let possibleBrick3 = current.map(function (n) {
            return n + 5
        })
if (containsAny(background, possibleBrick3) || reachBottom()) {
            background = background.concat(current)
removeLine()
            if (background.some(function (n) {
                return n < 0
            })) {
                break;
            }
            current = randomBrick()
        } else {
            current = possibleBrick3
        }
        generateImage()
        basic.pause(wait)
    }
}
input.onButtonPressed(Button.A, function () {
    let possibleBrick2 = current.map(function (n) {
        return n - 1
    })
if (!(reachLeftEdge()) && !(containsAny(background, possibleBrick2))) {
        current = possibleBrick2
        generateImage()
    }
})
function brickType () {
    if (current.length == 4) {
        return 1
    } else if (current.length == 1) {
        return 2
    } else if (current.length == 2) {
        if (current[0] + 1 == current[1]) {
            return 3
        } else {
            return 4
        }
    } else {
        if (current[0] + 5 == current[1]) {
            // 1,6,7
            return 5
        } else if (current[0] + 5 == current[2] && current[1] + 1 == current[2]) {
            // 2,6,7
            return 6
        } else if (current[0] + 5 == current[2]) {
            // 1,2,6
            return 7
        } else {
            // 1,2,7
            return 8
        }
    }
}
function randomBrick () {
    return bricks[randint(0, bricks.length - 1)]
}
function contains (array: any[], n: number) {
    for (let k = 0; k <= array.length - 1; k++) {
        if (array[k] == n) {
            return true
        }
    }
    return false
}
function reachBottom () {
    return current.some(function (n) {
        return n + 5 >= 25
    })
}
input.onButtonPressed(Button.AB, function () {
    rotateBrick()
})
input.onButtonPressed(Button.B, function () {
    let possibleBrick = current.map(function (n) {
        return n + 1
    })
if (!(reachRightEdge()) && !(containsAny(background, possibleBrick))) {
        current = possibleBrick
        generateImage()
    }
})
function reachRightEdge () {
    return current.some(function (n) {
        return (n + 1) % 5 == 0
    })
}
let coor2: number[] = []
let coor: number[] = []
let ledY = 0
let ledX = 0
let wait = 0
let bricks: number[][] = []
let background: number[] = []
let current: number[] = []
let lines: number[][] = []
let _type = 0
let possibleBrick4: number[] = []
bricks = [
[
-9,
-8,
-4,
-3
],
[-9, -4, -3],
[-8, -4, -3],
[-8, -3],
[-4, -3],
[-3]
]
current = randomBrick()
wait = 500
basic.forever(function () {
    moveBrickDown()
    basic.clearScreen()
    basic.showString("Game Over!")
})
