function numberOfWaysToTraverseGraph(width, height) {
	let n = width + height - 2
	let output = 1
	for (let k = 0; k < Math.min(height, width) - 1; k++) {
		output *= (n - k)
		output /= (k + 1)
	}
	return output
}


console.log(numberOfWaysToTraverseGraph(3, 3))
module.exports = numberOfWaysToTraverseGraph
