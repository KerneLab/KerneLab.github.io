var Canal = require('../canal.js');
var expect = require("expect.js");

describe("Test rightJoin", function()
{
	var mapper = function(l, r)
	{
		return [ l.or("_"), r ];
	};

	it("rightJoin()", function()
	{
		var result = Canal.of([ [ "b", 1 ], [ "c", 2 ], [ "d", 3 ] ]) //
		.rightJoin(Canal.of([ [ "a", 1 ], [ "b", 2 ], [ "b", 3 ], [ "c", 4 ] ])) //
		.mapJoint(mapper).collect();
		expect(result).to.eql([ [ "_", 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 4 ] ]);
	});

	it("rightJoin() partially", function()
	{
		var result = Canal.of([ [ "b", 1 ], [ "c", 2 ], [ "d", 3 ] ]) //
		.rightJoin(Canal.of([ [ "a", 1 ], [ "b", 2 ], [ "b", 3 ], [ "c", 4 ] ])) //
		.mapJoint(mapper).take(1);
		expect(result).to.eql([ [ "_", 1 ] ]);
	});

	it("rightJoin() 1 vs empty", function()
	{
		var result = Canal.of([ [ "b", 1 ] ]).rightJoin(Canal.of([])) //
		.mapJoint(mapper).collect();
		expect(result).to.eql([]);
	});

	it("rightJoin() empty vs 1", function()
	{
		var result = Canal.of([]).rightJoin(Canal.of([ [ "a", 1 ] ])) //
		.mapJoint(mapper).collect();
		expect(result).to.eql([ [ "_", 1 ] ]);
	});

	it("rightJoin() empty vs 3 partially", function()
	{
		var result = Canal.of([]) //
		.rightJoin(Canal.of([ [ "a", 1 ], [ "b", 2 ], [ "c", 3 ] ])) //
		.mapJoint(mapper).take(2);
		expect(result).to.eql([ [ "_", 1 ], [ "_", 2 ] ]);
	});

	it("rightJoin() empty vs empty", function()
	{
		var result = Canal.of([]).rightJoin(Canal.of([])) //
		.mapJoint(mapper).collect();
		expect(result).to.eql([]);
	});
	
	it("rightJoin() row", function()
	{
		var left = [
			{"id":1,"sal":100}
		];
		var right = [
			{"id":1,"name":"mike"},
			{"id":2,"name":"john"}
		];
		var result = Canal.of(left).keyBy(Canal.col("id"))	//
					.rightJoin(Canal.of(right).keyBy(Canal.col("id"))) //
					.mapJoint(function(l,r){
						var a = Canal.Some(r);
						return Canal.row({
							"id":a.col("id"),
							"name":a.col("name"),
							"sal":l.col("sal")
						});
					}).collect();
		expect(result).to.eql([
			{"id":1,"name":"mike","sal":100},
			{"id":2,"name":"john","sal":undefined}
		]);
	});
});
