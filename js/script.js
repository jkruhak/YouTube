function keyWordSearch(){
  gapi.client.setApiKey('AIzaSyChZm1tt8S9m4kXntXYkdpOcLm5P1Y0GHs');
  gapi.client.load('youtube', 'v3', function() {
    search();
  });
}

// Search for a specified string.
function search() {
  var q = $('#srch').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    type: 'video',
    maxResults: '6'
  });

  request.execute(function(response) {
    console.log("check");
    for(var i = 0; i < 6; i++) {
      var videoImage = JSON.stringify(response.result.items[i].snippet.thumbnails.medium.url);
      $('#results').clone().appendTo('.resultVideo').html('<img src=' + videoImage + '>');
      console.log(videoImage);

      var videoTitle = JSON.stringify(response.result.items[i].snippet.title);
      $('#results').clone().appendTo('.resultVideo').html('<h3>' + videoTitle + '</h3>');
    }
    /* var str = JSON.stringify(response.result);
    $('#results').html('<pre>' + str + '</pre>');
    console.log(str);*/
  });
}