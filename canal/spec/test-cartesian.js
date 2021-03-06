var Canal = require('../canal.js');
var expect = require("expect.js");

describe("Test cartesian", function()
{
	it("cartesian() 3 vs 2", function()
	{
		var result = Canal.of([ 1, 2, 3 ]).cartesian(Canal.of([ "A", "B" ])).collect();
		expect(result).to.eql([ [ 1, "A" ], [ 1, "B" ], [ 2, "A" ], [ 2, "B" ], [ 3, "A" ], [ 3, "B" ] ]);
	});

	it("cartesian() 3 vs 2 partially", function()
	{
		var result = Canal.of([ 1, 2, 3 ]).cartesian(Canal.of([ "A", "B" ])).take(3);
		expect(result).to.eql([ [ 1, "A" ], [ 1, "B" ], [ 2, "A" ] ]);
	});

	it("cartesian() 3 vs 2 filter", function()
	{
		var result = Canal.of([ 1, 2, 3 ]).cartesian(Canal.of([ "A", "B" ])).filter(function(data)
		{
			return data[1] == "A";
		}).collect();
		expect(result).to.eql([ [ 1, "A" ], [ 2, "A" ], [ 3, "A" ] ]);
	});

	it("cartesian() 3 vs 1", function()
	{
		var result = Canal.of([ 1, 2, 3 ]).cartesian(Canal.of([ "A" ])).collect();
		expect(result).to.eql([ [ 1, "A" ], [ 2, "A" ], [ 3, "A" ] ]);
	});

	it("cartesian() 1 vs 2", function()
	{
		var result = Canal.of([ 1 ]).cartesian(Canal.of([ "A", "B" ])).collect();
		expect(result).to.eql([ [ 1, "A" ], [ 1, "B" ] ]);
	});

	it("cartesian() 3 vs 0", function()
	{
		var result = Canal.of([ 1, 2, 3 ]).cartesian(Canal.of([])).collect();
		expect(result).to.eql([]);
	});

	it("cartesian() 0 vs 2", function()
	{
		var result = Canal.of([]).cartesian(Canal.of([ "A", "B" ])).collect();
		expect(result).to.eql([]);
	});

	it("cartesian() 0 vs 0", function()
	{
		var result = Canal.of([]).cartesian(Canal.of([])).collect();
		expect(result).to.eql([]);
	});
});
