// Function to update our hashtable with planet sizes.
function findYearAndSize(planet, hash){
    // if we have no size or year listed, we're not going to count the planet, since the goal is to list sizes with year.
    if(planet.RadiusJpt === "" || planet.DiscoveryYear === ""){
        return;
    }
    // If we already have something discovered this year, we're going to update the value
    if(hash.has(planet.DiscoveryYear)){
        sizes = hash.get(planet.DiscoveryYear);
        sizes = updateSizes(planet, sizes)
        hash.set(planet.DiscoveryYear, sizes);
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

// export both for use. Although sizes we only export to test on
module.exports.updateSizes = updateSizes;
module.exports.findYearAndSize = findYearAndSize;