require('dotenv').config()
console.log(process.env.DB_HOST)

// const result = dotenv.config()

// if (result.error) {
//   throw result.error
// }
// console.log(result.parsed)



var request = require('request');
var token = require('./secrets')
var fs = require('fs')
console.log('Welcome to the GitHub Avatar Downloader!');
var input1 = process.argv.slice(2);



function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token.GITHUB_TOKEN}`
    }
  };



  request(options, function(err, res, body) {
    let parsedBody = JSON.parse(body);

    cb(err, parsedBody);

  });
}
getRepoContributors(input1[0], input1[1], function(err, result) {


  // console.log(result)
  // if(!result[0].avatar_url) {
  //   return console.log("Please enter a valid repo owner or repo name")
  // }

  if (input1.length < 2) {
    return console.log("You need to input the repository owner and \n the repo like so : node download_avatars.js repoOwner repo");
  } else if (input1.length > 2) {
    return console.log("Please limit yourself to two inputs.");
  }

  if (!fs.existsSync('./avatar_images')) {
    fs.mkdir('./avatar_images')
    for (let i = 0; i < 2; i++) {
      let URLS = result[i].avatar_url;

      downloadImageByURL(URLS, `./avatar_images/${result[i].login}.jpg`);

    }
  }


  for (let i = 0; i < result.length; i++) {
    let URLS = result[i].avatar_url;
    downloadImageByURL(URLS, `./avatar_images/${result[i].login}.jpg`);
  }


});

function downloadImageByURL(url, filePath) {

  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {

      console.log('Downloading Image')
    })
    .pipe(fs.createWriteStream(filePath))

    .on('finish', function() {
      console.log("Download complete")
    })
}