console.log("Spotify Playlist script loaded.");

let CLIENT_ID = "5a9ee656e60549c5999eb591375e3af9";
let CLIENT_SECRET = "50c5be6ce3684f578b1693b8007d6c0e";

// Used to supply proper body format for x-www-form-urlencoded in body POST request to /token endpoint
function createFormBody(Data) {
    var formBody = [];
    for (var property in Data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(Data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    };
    return formBody
};

async function getAccessToken() {
    const Url = "https://accounts.spotify.com/api/token";
    const Data = {grant_type: "client_credentials"};

    const otherParam = {
        method: "POST",
        headers: {
            Authorization: `Basic ${btoa(CLIENT_ID +":" + CLIENT_SECRET)}`,
            "Content-Type": 'application/x-www-form-urlencoded',
        },
        body: createFormBody(Data)
    };

    const response = await fetch(Url, otherParam)
    const json = await response.json()
    return json;
};

async function searchArtist(artist, access_token) {
    let artist_split = artist.split();
    let artist_query = artist_split.join("%20")
    console.log(artist_query)

    const Url = "https://api.spotify.com/v1/search?"+"q="+artist_query+"&type=artist";
    console.log(Url);
    const otherParam = {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+access_token
        }
    };
    const response = await fetch(Url, otherParam)
    const json = await response.json()
    return json;
};

async function getArtistAlbums(artistID, access_token) {
    const Url = "https://api.spotify.com/v1/artists/"+artistID+"/albums";
    console.log(Url);
    const otherParam = {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+access_token
        }
    };
    const response = await fetch(Url, otherParam)
    const json = await response.json()
    return json;
};

    
const artistInputBtn = document.querySelector("#artistInputBtn");
artistInputBtn.addEventListener('click', generateArtistAlbums);

const artistResults = document.querySelector("#albumResults");

function generateArtistAlbums() {
    const artistInput = document.querySelector("#artistInput").value;
    
    getAccessToken().then(function(token) {
        deleteResults();
        let accessToken = token["access_token"];
          searchArtist(artistInput, accessToken).then(function(response) {
            console.log(response);
            let artistID = response.artists.items[0]["id"];
            getArtistAlbums(artistID, accessToken).then(function(albums) {
                console.log(albums);

                // keeps track of unique album names
                // if already in there, then dont list
                let albumUniques = [];
                for (let j=0;j <albums.items.length;j++) {
                    let albumPic300 = albums.items[j].images[1]
                    let albumName = albums.items[j]["name"];
                    if (albumUniques.indexOf(albumName) > 0) {
                        continue;
                        };
                    albumUniques.push(albumName);    
                    
                    let albumDiv = document.createElement("div")
                    albumDiv.classList.add("albumDiv");

                    let albumP = document.createElement("p");
                    albumP.textContent = albumName;

                    let albumPic = document.createElement("img");
                    albumPic.src = albumPic300.url;
                    albumPic.height = albumPic300.height;
                    albumPic.width = albumPic300.width;
                    albumPic.alt = albumName;

                    
                    albumDiv.appendChild(albumPic);
                    albumDiv.appendChild(albumP)

                    artistResults.appendChild(albumDiv);
                };
            });
          });


        //artistResults.appendChild(newP);
    });
}

function deleteResults() {
    var child = artistResults.lastElementChild;
        while (child) { 
            artistResults.removeChild(child); 
            child = artistResults.lastElementChild; 
        };
};
