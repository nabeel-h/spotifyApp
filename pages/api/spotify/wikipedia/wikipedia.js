const fetch = require("node-fetch");

async function getArtistSummary(artist_name) {
    let artistName_list = artist_name.split();
    let artistName = artist_name;
    if (artistName_list.length > 1) {
        artistName = artistName_list.join("%20");
    };
    const Url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&rvsection=0&titles="+artistName;
    console.log(Url);
    const otherParam = {
        method: "GET",
        action: "parse",
        format: "json",
        headers: {
            "Content": "default-src"
        }
    };
    const response = await fetch(Url, otherParam)
    const json = await response.json()
    return json;
};


getArtistSummary("Kendrick Lamar").then(function(response){
    let pageid = Object.keys(response["query"]["pages"])[0].trim();

    //console.log("pageID:",pageid);
    return response["query"]["pages"][pageid]["revisions"];
}).then(function(response) {
    console.log(response[0]["*"].split("\n"));
})