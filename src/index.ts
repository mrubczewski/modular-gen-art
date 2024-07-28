console.log('modular gen art')

const helloWorldElement = document.getElementById('hello-world')
if (helloWorldElement) helloWorldElement.textContent = 'Hello, World!'

const canvas = document.getElementById('modular-canvas') as HTMLCanvasElement
canvas.width = 595
canvas.height = 842
const context = canvas.getContext('2d')
if (context) {
    // Seedable random number generator (LCG - Linear Congruential Generator)
    function seededRandom(seed: number) {
        let m = 0x80000000 // 2**31;
        let a = 1103515245
        let c = 12345
        let state = seed

        return function () {
            state = (a * state + c) % m
            return state / (m - 1)
        }
    }

    const random = seededRandom(1234)

    function drawModule(originX: number, originY: number) {
        const moduleWidth = 100
        const moduleHeight = 200

        context!.beginPath()
        context!.lineJoin = 'miter'
        context!.moveTo(originX, originY)
        context!.lineTo(originX, originY + moduleHeight)
        context!.lineTo(originX + moduleWidth, originY + moduleHeight)
        context!.lineTo(originX + moduleWidth, originY)
        // context!.quadraticCurveTo(400, 150, 20, 20)
        context!.closePath()
        context!.fillStyle = '#C96576'
        context!.fill()
        context!.lineWidth = 2
        context!.strokeStyle = '#222'
        context!.stroke()

        drawKnob(originX + 50, originY + 50)
        drawKnob(originX + 50, originY + 100)
    }

    function drawKnob(originX: number, originY: number) {
        context!.beginPath()
        context!.arc(originX, originY, 20, 0, Math.PI * 2, false)
        context!.fillStyle = `rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, 0.5)`
        context!.fill()
    }

    function drawCable(x1: number, y1: number, x2: number, y2: number) {
        context!.beginPath()

        // Calculate control points for the Bézier curve
        const cp1x = x1 + (x2 - x1) / 3
        const cp1y = y1 - 50 // Adjust this value to control the curvature
        const cp2x = x1 + (2 * (x2 - x1)) / 3
        const cp2y = y2 - 50 // Adjust this value to control the curvature

        context!.moveTo(x1, y1)
        context!.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2)

        context!.lineWidth = 5
        context!.strokeStyle = '#8B4513' // Rope color
        context!.stroke()
    }

    function getRandomInt(min: number, max: number): number {
        return Math.floor(random() * (max - min + 1)) + min
    }

    drawModule(20, 20)
    drawModule(200, 200)
    drawCable(20, 20, 200, 200)
    drawModule(400, 100)
}
