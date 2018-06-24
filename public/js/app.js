var iron = iron || {};

$(function (){
  var curDate = new Date();
  $('#curYear').text(curDate.getUTCFullYear());

  //setup scrolling effect
  $("nav a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
           window.location.hash = hash;
      });
    }
  });
});

//send email
iron.send = function(){
  AWS.config.region = 'us-east-1';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:6459ce9d-d22f-4737-a7ed-e50260fb0b02',
  });

  var sns = new AWS.SNS();
  var params = {
      Message: $('#msgemail').val() + '\n\n'  + $('#msgbody').val(),
      Subject: location.hostname + ': ' + $('#msgtopic').val(),
      TopicArn: 'arn:aws:sns:us-east-1:205705535084:contactLiam'
  }

  sns.publish(params, function(err, data) {
      if (err){
          $('#debug').toggle();
          $('#debug').append("Sorry there was an error!");
      }
      else{
          $('#form').toggle();
          $('#success').toggle();
      }
  });
}