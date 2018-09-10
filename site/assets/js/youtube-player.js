
  var youtubePlayer = (function() {
    
    return {

      player: null,
      

      // 4. The API will call this function when the video player is ready.
      onPlayerReady: function(event) {
        event.target.playVideo();
      },

      done: false,

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      onPlayerStateChange: function(event) {

        if (event.data == YT.PlayerState.PLAYING && !youtubePlayer.done) {
          setTimeout(youtubePlayer.stopVideo, 6000);
          youtubePlayer.done = true;
        }

      },


      stopVideo: function() {
        youtubePlayer.player.stopVideo();
      }


    };

  })();

  // Load the SDK asynchronously
  (function() {

      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

   })();

