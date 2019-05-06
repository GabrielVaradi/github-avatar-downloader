var request = require('request');
var token = require('./secrets')
var fs = require('fs')
console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    let parsedBody = JSON.parse(body)

    cb(err, parsedBody);

  });
}
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
  for (let i = 0; i < result.length; i++) {
    let URLS = result[i].avatar_url
    downloadImageByURL(URLS, `./images/${result[i].login}.jpg`)
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

