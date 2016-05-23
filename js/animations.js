$(document).ready(function() {
//Initially, the Tweet button and the character count button should be hidden (CSS).
//Recommendation is to save all your paths as variables for easy use later.
(function(){
  $('#char-count').hide();
  $('#tweet-submit').hide();
  $('.tweet-actions').hide();
  $('.stats').hide();
})();

var storage = [];
var userName = '@bearabon';
var fullName = "Scott Hendrickson";
var avatarLocation = "img/volibear.jpg";
var Tweet = function(dateStamp, userName, fullName, avatarLocation, message) {
  this.dateStamp = dateStamp;
  this.favoritedCount = 0;
  this.retweetedCount = 0;
  this.userName = userName;
  this.fullName = fullName;
  this.avatarLocation = avatarLocation;
  this.message = message;
}

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
    $('#dashboard').mouseenter(function() {
      $('#char-count').fadeTo('fast', 1);
      $('#tweet-submit').fadeTo('fast', 1);
  });
    $('#dashboard').mouseleave(function() {
      $('#char-count').slideToggle();
      $('#tweet-submit').slideToggle();
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
/*   var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    for (var i = 0; i < monthNames.length; i++) {
      if (i === month) {
        month = monthNames[i];
      }
    };
    var day = date.getDate();
    var dateStamp = month + " " + day + ", " + year;  */

    var dateStamp = jQuery.timeago(new Date());
    $('#stream').prepend(
      '<div class="tweet">' +
      '<div class="content">' +

    //should fix this block to use the persons actual account info rather than hard coded information
        '<img class="avatar" src="' + avatarLocation + '" />' +
        '<strong class="fullname">' + fullName +  '</strong>' +
        '<span class="username">' + userName + '</span>' +

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

              '<img src="' + avatarLocation + '" />' +
              '<img src="img/vklimenko.jpg" />' +
            '</div>' +
          '</div>' +

        '<div class="time">' +
            '<time class="timeago" datetime="2008-07-17T09:24:17Z">' + dateStamp + '</time>' +
          '</div>' +
        '</div>' +
        '<div class="reply">' +
          '<img class="avatar" src="' + avatarLocation + '" />' +
          '<textarea class="tweet-compose" placeholder="Reply to '+ userName + '"/></textarea>' +
        '</div>' +
      '</div>' +
    '</div><!-- .tweet -->'
    );
  } else if ( text.length > 140){
    alert('Your text must have fewer than 140 characters. Currently you are at: ' + text.length);
  } else if (text.length === 0) {
    alert('Please add text to your tweet');
  }
  (function(){
    $('#char-count').hide();
    $('#tweet-submit').hide();
    $('.tweet-actions').hide();
    $('.stats').hide();
  })();
  $('.tweet').mouseenter(function() {
    $(this).find('.tweet-actions').fadeIn('fast');
    });
  $('.tweet').mouseleave(function() {
    $(this).find('.tweet-actions').fadeOut('fast');
  });
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
    });
    $('.tweet').click(function() {
      $(this).find('.stats').show('fast');
    });
    $('.tweet').mouseleave(function() {
      $(this).find('.stats').hide('fast');
    });
};



      $('#tweet-submit').on('click', function(e) {
        e.preventDefault();
        text = $('.tweet-compose').val();
        addTweet(text);
        $('.tweet-compose').val('');
      });





//The tweet actions (Reply, Retweet, etc) should only show up when you hover
//over that individual tweet. Otherwise, they should be hidden.

$('.tweet').mouseenter(function() {
  $(this).find('.tweet-actions').fadeIn('fast');
  });
$('.tweet').mouseleave(function() {
  $(this).find('.tweet-actions').fadeOut('fast');
});



/*The Retweets/timestamp/Reply areas should also be hidden by default.
These should only expand if you click on the tweet. Have the students
use a jQuery animation to accomplish the reveal, similar to how it’s
done on Twitter.com*/

$('.tweet').click(function() {
  $(this).find('.stats').show('fast');
});
$('.tweet').mouseleave(function() {
  $(this).find('.stats').hide('fast');
});



//## Black Diamond
var storage = [];
var userName = '@bearabon';
var fullName = "Scott Hendrickson";
var avatarLocation = "img/alagoon.jpg";
var Tweet = function(dateStamp, userName, fullName, avatarLocation, message) {
  this.dateStamp = dateStamp;
  this.favoritedCount = 0;
  this.retweetedCount = 0;
  this.userName = userName;
  this.fullName = fullName;
  this.avatarLocation = avatarLocation;
  this.message = message;
}
/*My assumption is that in order for each of these parts to work I will need to create an array
with each attribute (timeOfCreation, favoritedCount, retweetedCount, userName, fullName, and avatarLocation)
being stored as an object in the array. Every time a tweet is created it will need to create an object.

What I need to figure out from here though is how do I identify this information?
Should I do it as the date stamp? That would keep everything unique.
*/


//* Make timestamps similar to how they look on Twitter (1h, 18m, 1m) and use the
//jQuery "timeago" plugin to make them automatic.






//* Implement the icons for when a tweet is favorited/retweeted in the upper right of the tweet.

//$('.tweet-actions').find('.action-retweet').on('click', function() {
var retweets = 0;
$('.tweet-actions').find('.action-retweet').on('click', function() {
        retweets++;
        $('.tweet').find('num-retweets').val(retweets);
        console.log(retweets);
});




//* Implement the Bootstrap tooltips for when you hover over a user’s avatar image






//* Persist new tweets using local storage






//* Persist new tweets using a service like parse https://parse.com/

});
jQuery(document).ready(function() {
  jQuery("time.timeago").timeago();
});
