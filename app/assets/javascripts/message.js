$(function() {
  function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="chat-main__message-list__all">
          <div class="chat-main__message-list__all__title">
            <div class="chat-main__message-list__all__title__name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__all__title__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__all__maessages">
            <p class="chat-main__message-list__all__maessages__content">
              ${message.content}
            </p>
            <img src=${message.image}>
          </div>
        </div>`
      return html;
    } else {
      var html =
        `<div class="chat-main__message-list__all">
          <div class="chat-main__message-list__all__title">
            <div class="chat-main__message-list__all__title__name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__all__title__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__all__maessages">
            <p class="chat-main__message-list__all__maessages__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
   }

  $("#new_message").on('submit', function(e) {
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  });

  $(document).on('turbolinks:load', function(){
 
    var reloadMessages = function() {
    
      var last_message_id = $(".chat-main__message-list__all:last").data("message-id");

      $.ajax({
        url: "api/messages",
        type: "get",
        dataType: "json",
        data: {last_id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0){
          var insertHTML = '';
          $.each(messages, function(i,message){
            insertHTML += buildHTML(message);
          });
          $(".chat-main__message-list").append(insertHTML);
          $(".chat-main__message-list").animate({scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert("自動更新エラー");
      });
    };
  });
  
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});