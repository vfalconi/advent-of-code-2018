var exports = module.exports = {};

exports.distance = (coordinates) => {
	return Math.abs(coordinates[0][0] - coordinates[1][0]) + Math.abs(coordinates[0][1] - coordinates[1][1]);
};

exports.findLimits = (P) => {
	return {
		x: {
			max: P.reduce((a, b) => a.x > b.x ? a : b).x,
			min: P.reduce((a, b) => a.x < b.x ? a : b).x
		},
		y: {
			max: P.reduce((a, b) => a.y > b.y ? a : b).y,
			min: P.reduce((a, b) => a.y < b.y ? a : b).y
		}
	}
};
