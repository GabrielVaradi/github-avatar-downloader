var request = require('request');
var token = require('./secrets')

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
  console.log("Result:", result);
  for (let i = 0; i < result.length; i++){
    console.log(result[i].avatar_url)
  }

});



// request.get('https://sytantris.github.io/http-examples/future.jpg')
//        .on('error', function (err) {
//          throw err;
//        })
//        .on('response', function (response) {
//          console.log('Response Status Code: ', response.statusCode);
//          console.log('Response Message: ', response.statusMessage);
//          console.log('Response Header: ', response.headers['content-type'])
//          console.log('Downloading Image')
//        })
//        .pipe(fs.createWriteStream('./future.jpg'))

//        .on('finish', function(){
//         console.log("Download complete")
//        })