
const http = require('https');
const findYearAndSizeModule = require('./findYearAndSize');
const findYearAndSize = findYearAndSizeModule.findYearAndSize;
// request planet information 
http.get("https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets", res =>{

    // Get initial raw data
    let planetRaw = '';
    // pull in data 
    res.on('data', (data) => {
        planetRaw += data;
    });

        // start when finished downloading
    res.on('end', () =>{
        // initialize variables we need
        let orphans = 0;
        // I'm using an object to keep track of the hottset planet since this is NODE.js. In a different language we may use a pointer instead
        let hottest = {
             planet : "",
             temp : 0
        }

        let hash = new Map();


        // Parse into JSON object
        planets = JSON.parse(planetRaw);

        // loop through the data and find requisite planets
        for(i=0; i < planets.length; i++){
            // find orphans
            // I noticed there are some stars missing a few star attributes, but not all. So we check to make sure each is empty.
            if(planets[i].HostStarMassSlrMass === "" && planets[i].HostStarRadiusSlrRad === "" && planets[i].HostStarMetallicity === "" && planets[i].HostStarTempK === "" &&planets[i].HostStarAgeGyr === ""){
                orphans++;
            }
            // find Hottest
            if(planets[i].HostStarTempK > hottest.temp){
                hottest.planet = planets[i].PlanetIdentifier;
                hottest.temp = planets[i].HostStarTempK;
            }

            findYearAndSize(planets[i], hash);

        }
        console.log(`number of orphan planets ${orphans}`);
        console.log(`Hottest Planet: ${hottest.planet}, with temp ${hottest.temp}`);

        // this is unneccesary and was not a functional requirement, I thought it would be nicer to read it in order, but this can be removed for efficiency
        let hashSort = new Map([...hash.entries()].sort());
        writeYears(hashSort);
    });
});

// function for iterating through a list and presenting the data
function writeYears(hash){
    hash.forEach((value, key)=>{
        console.log(`In ${key} we dicsovered ${value.small} small planets, ${value.medium} medium planets, ${value.large} large planets.`);
    })
}