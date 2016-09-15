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

  /*request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('.fullResults').html('<pre>' + str + '</pre>');
  });*/

  request.execute(function(response) {
    $('.fullResults').empty();
    for(var i = 0; i < 6; i++) {
      var template = $(".templates .videoResult").clone().appendTo(".fullResults");

      //Display video
      var videoThumbnail = template.find(".embed-responsive");
      var videoImage = JSON.stringify(response.result.items[i].id.videoId)
      var videoImgFormat = videoImage.replace(/['"]+/g, '');
      videoThumbnail.html("<iframe src='http://www.youtube.com/embed/"+videoImgFormat+"?enablejsapi=1&amp;origin=http://example.com'></iframe>");

      //Display video title
      var videoCaptionTitle = template.find(".h3");
      var videoTitle = JSON.stringify(response.result.items[i].snippet.title);
      videoCaptionTitle.append(videoTitle);

      //Display video description
      var videoDescr = JSON.stringify(response.result.items[i].snippet.description);    
      template.find(".p").append(videoDescr);
    }
  });
}
