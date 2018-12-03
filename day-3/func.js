var exports = module.exports = {};

exports.fillerSymbol = '.';

exports.makeFabric = (length, width) => {
	const fabric = [];
	for (let j = 0; j < length; j++) {
		fabric[j] = [];
		for (let i = 0; i < width; i++) {
			fabric[j][i] = new Set();
		}
	}
	return fabric;
}

exports.parseClaims = (claims) => {
	return claims.map(claim => {
		const claimPieces = claim.replace('#', '').replace('@', '').replace(':', '').replace('  ', ' ').split(' ');
		const coords = claimPieces[1].split(',');
		const dimensions = claimPieces[2].split('x');
		return {
			id: claimPieces[0],
			coords: {
				x: parseInt(coords[0], 10),
				y: parseInt(coords[1], 10)
			},
			dimensions: {
				width: parseInt(dimensions[0], 10),
				length: parseInt(dimensions[1], 10)
			}
		}
	});
}

exports.claimFabric = (fabric, claims) => {
	claims.forEach(claim => {
		for (let y = claim.coords.y; y < (claim.coords.y + claim.dimensions.length); y++) {
			for (let x = claim.coords.x; x < (claim.coords.x + claim.dimensions.width); x++) {
				fabric[y][x].add(claim.id);
			}
		}
	});
	return fabric;
}
