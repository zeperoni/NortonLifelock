const findYearAndSizeModule = require('./findYearAndSize');
const updateSizes = findYearAndSizeModule.updateSizes;
const findYearAndSize = findYearAndSizeModule.findYearAndSize;

// slimmed down planet data for readability, 
var planet =   { "PlanetIdentifier": "PSO J318.5-22",
"RadiusJpt": 1.53,
"PeriodDays": "",
"DiscoveryYear": 2013
}
let sizes = {
small: 0,
medium: 0,
large: 0
} 

var planet1 =   { "PlanetIdentifier": "PSO J18.5-22",
"RadiusJpt": 0.89,
"PeriodDays": "",
"DiscoveryYear": 2012
}

var planet2 =   { "PlanetIdentifier": "PSO J38.5-22",
"RadiusJpt": 2.09,
"PeriodDays": "",
"DiscoveryYear": 2012
}

var planet3 =   { "PlanetIdentifier": "PSO J38.5-22",
"RadiusJpt": 1.09,
"PeriodDays": "",
"DiscoveryYear": ""
}

// Testing updateSizes function with different inputs
// Invalid planets are filtered out in findYearAndSize function. So no need to test here
test('Update planet sizes with medium', ()=>{
    sizes = updateSizes(planet, sizes);
    expect(sizes).toStrictEqual({
        small: 0,
        medium: 1,
        large: 0
    } ); 
});


test('Update planet sizes with small', ()=>{
    sizes = updateSizes(planet1, sizes);
    expect(sizes).toStrictEqual({
        small: 1,
        medium: 1,
        large: 0
    } ); 
});



test('Update planet sizes with large', ()=>{
    sizes = updateSizes(planet2, sizes);
    expect(sizes).toStrictEqual({
        small: 1,
        medium: 1,
        large: 1
    } ); 
});

// Test findYearAndSize()
let hash = new Map();

// Test if hash is updating correctly with planets from above
test('Add planet to hash', ()=>{
    findYearAndSize(planet, hash);
    let example = hash.get(2013);

    expect(example).toStrictEqual({
         small: 0, medium: 1, large: 0 
    } ); 
});

test('Add planet1 to hash', ()=>{
    findYearAndSize(planet1, hash);
    let example = hash.get(2013);

    expect(example).toStrictEqual({
         small: 0, medium: 1, large: 0 
    } ); 
});