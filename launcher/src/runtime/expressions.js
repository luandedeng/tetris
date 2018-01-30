var ls;
(function (ls) {
	ls.MainScene = function() {
		return {
			"%22equalTo%22": function() { return "equalTo" },
			"BottomSprite": function() { return BottomSprite },
			"%22isExistActiveBrick%22": function() { return "isExistActiveBrick" },
			"Brick": function() { return Brick },
			"%22currentActiveBrick%22": function() { return "currentActiveBrick" },
			"true": function() { return true },
			"Brick.y": function() { return Brick.y },
			"false": function() { return false },
			"%22YES%22": function() { return "YES" },
			"Brick.height": function() { return Brick.height },
			"System.currentActiveBrick": function() { return System.currentActiveBrick },
			"Brick.u_id": function() { return Brick.u_id }
		}
	};
})(ls || (ls = {}));