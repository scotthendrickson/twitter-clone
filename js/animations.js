$(document).ready(function() {
//Initially, the Tweet button and the character count button should be hidden (CSS).
(function(){
  $('#char-count').hide();
  $('#tweet-submit').hide();
})();
//When the user clicks on the textarea, the textarea should double in size
// and the character count and Tweet buttons should be revealed.
  $('.tweet-compose').focus(function() {
       $(this).animate({
           height: '5em'
       });
       //$('#char-count').fadeTo('fast', 1);
       //$('#tweet-submit').fadeTo('fast', 1);
   });
   $('.tweet-compose').focusout(function() {
        $(this).animate({
            height: '2.5em'
        });
        //$('#char-count').fadeTo('fast', 0);
        //$('#tweet-submit').fadeTo('fast', 0);
    });

//Experimentation is the spice of life!
    $('#tweet-content').mouseenter(function() {
      $('#char-count').fadeTo('fast', 1);
      $('#tweet-submit').fadeTo('fast', 1);
  });
    $('#tweet-content').mouseleave(function() {
      $('#char-count').hide('slow');
      $('#tweet-submit').hide('slow');
    });


//As the user types, the character count should decrease.
    var max = 140;
  $('.tweet-compose').keyup(function () {
    var length = $(this).val().length;
    var newLength = max - length;
    $('#char-count').text(newLength);
//When there are 10 or less characters, the character counter should turn red.
    if (newLength <= 10) {
      $('#char-count').css('color', 'red');
    }else {
      $('#char-count').css('color', '#999');
    }
//If the user puts in more than 140 characters,
//the tweet button should be disabled (and re-enabled when there are <= 140 chars).
    if(newLength <= 0) {
       $('#tweet-submit').removeClass('button').addClass('button:disabled');
    } else {
      $('#tweet-submit').removeClass('button:disabled').addClass('button');
    };
  });

/*When the user successfully inputs characters and clicks the “Tweet” button, a
new tweet should be created and added to the tweet stream in the main column,
using the user’s fake profile image in the top left and username/fullname.*/
var text ='';
var addTweet = function(text) {
  if(text.length > 0 && text.length <= 140) {

    $('#stream').prepend(
      '<div class="tweet">' +
      '<div class="content">' +

    //should fix this block to use the persons actual account info rather than hard coded information
        '<img class="avatar" src="img/alagoon.jpg" />' +
        '<strong class="fullname">Your Name Here</strong>' +
        '<span class="username">@Your Name Here</span>' +

            '<p class="tweet-text">' + text + '</p>' +

        '<div class="tweet-actions">' +
          '<ul>' +
            '<li><span class="icon action-reply"></span> Reply</li>' +
            '<li><span class="icon action-retweet"></span> Retweet</li>' +
            '<li><span class="icon action-favorite"></span> Favorite</li>' +
            '<li><span class="icon action-more"></span> More</li>' +
          '</ul>' +
        '</div>' +

        '<div class="stats">' +
          '<div class="retweets">' +
            '<p class="num-retweets">30</p>' +
            '<p>RETWEETS</p>' +
          '</div>' +
          '<div class="favorites">' +
            '<p class="num-favorites">6</p>' +
            '<p>FAVORITES</p>' +
          '</div>' +
          '<div class="users-interact">' +
            '<div>' +

              '<img src="img/alagoon.jpg" />' +
              '<img src="img/vklimenko.jpg" />' +
            '</div>' +
          '</div>' +

        '<div class="time">' +
            ':04 PM - 19 Sep 13' +
          '</div>' +
        '</div>' +
        '<div class="reply">' +
          '<img class="avatar" src="img/alagoon.jpg" />' +
          '<textarea class="tweet-compose" placeholder="Reply to @mybff"/></textarea>' +
        '</div>' +
      '</div>' +
    '</div>'
    );
  } else if ( text.length > 140){
    alert('Your text must have fewer than 140 characters. Currently you are at: ' + text.length);
  } else if (text.length === 0) {
    alert('Please add text to your tweet');
  }
};



      $('#tweet-submit').click( function(e) {
        e.preventDefault();
        text = $('.tweet-compose').val();
        addTweet(text);
        $('.tweet-compose').val('');
      });





//The tweet actions (Reply, Retweet, etc) should only show up when you hover
//over that individual tweet. Otherwise, they should be hidden.






/*The Retweets/timestamp/Reply areas should also be hidden by default.
These should only expand if you click on the tweet. Have the students
use a jQuery animation to accomplish the reveal, similar to how it’s
done on Twitter.com*/


















/*## Black Diamond
* Make timestamps similar to how they look on Twitter (1h, 18m, 1m) and use the jQuery "timeago" plugin to make them automatic.
* Implement the icons for when a tweet is favorited/retweeted in the upper right of the tweet.
* Implement the Bootstrap tooltips for when you hover over a user’s avatar image
* Persist new tweets using local storage
* Persist new tweets using a service like parse https://parse.com/*/

});
