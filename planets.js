
const http = require('https');


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
        let hashSort = new Map([...hash.entries()].sort());
        console.log(hashSort);
    });
});

// Function to update our hashtable with planet sizes.
function findYearAndSize(planet, hash){
    // if we have no size, we're not going to count the planet, since the goal is to list sizes with year.
    if(planet.RadiusJpt === ""){
        return;
    }
    // If we already have something discovered this year, we're going to update the value
    if(hash.has(planet.DiscoveryYear)){
        sizes = hash.get(planet.DiscoveryYear);
        sizes = updateSizes(planet, sizes)
        hash.set(planet.Discovery, sizes);
    }// if we don't have the year, we need to create a new key and value
    else{// in a bigger program sizes would be a class, but since it's always initialized to 0, and doesn't have any methods. I did not feel the need to create one.
        let sizes = {
            small: 0,
            medium: 0,
            large: 0
        } 
        
        sizes = updateSizes(planet, sizes);
        hash.set(planet.DiscoveryYear, sizes);
    }
}
// function to update the size value. 
function updateSizes(planet, sizes){
    // find the smallest and update it.
    if(planet.RadiusJpt < 1){
        sizes.small = sizes.small + 1;
    }// check medium otherwise
    else if(planet.RadiusJpt< 2 ){
        sizes.medium = sizes.medium+ 1;
    }// we've already elimanated unknown sizes, so it must be large
    else{
        sizes.large = sizes.large + 1;
    }
    return sizes;
}
