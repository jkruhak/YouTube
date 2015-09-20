function keyWordSearch(){
  gapi.client.setApiKey('AIzaSyChZm1tt8S9m4kXntXYkdpOcLm5P1Y0GHs');
  gapi.client.load('youtube', 'v3', function() {
    search();
  });
}

// Search for a specified string.
function search() {
  var q = $('#srch').val();
  
  //Display search results
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    type: 'video',
    maxResults: '6'
  });

  request.execute(function(response) {
    for(var i = 0; i < 6; i++) {
      var template = $(".templates .videoResult").clone().appendTo(".fullResults");

      var videoThumbnail = template.find(".thumbnail");
      var videoImage = JSON.stringify(response.result.items[i].snippet.thumbnails.medium.url);
      videoThumbnail.html("<img src=" + videoImage + ">");

      var videoCaptionTitle = template.find(".h3");
      var videoTitle = JSON.stringify(response.result.items[i].snippet.title);
      videoCaptionTitle.append(videoTitle);

      var videoDescr = JSON.stringify(response.result.items[i].snippet.description);    
      template.find(".p").append(videoDescr);
    }
  });
}