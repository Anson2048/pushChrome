'use strict';

(function() {

  $('#live-chat header').on('click', function() {

    $('.chat').slideToggle(100, 'swing');
    $('.chat-message-counter').fadeToggle(100, 'swing');

  });

  $('.chat-close').on('click', function(e) {

    e.preventDefault();
    $('#live-chat').fadeOut(100);

  });

  var genItem = function(data) {
    var item = $('<div class="chat-message clearfix"><img src="https://dn-bearychat.qbox.me/Fo9fALKAM1L61Ww7XQhXtQWs2S2o?imageView2/1/h/72/w/72" alt="" width="32" height="32"><div class="chat-message-content clearfix"><span class="chat-time">13:35</span><h5>Me</h5><p>'+data.content.text+'</p></div></div>');
    return item;
  };

  var rander = function (datas) {
    datas.map(function(data){
      $('#chat-history').append(genItem(data));
    });
  };

  var options = {
    authEndpoint: 'http://www.tuisongbao.com/api/engineDemo/authUser'
  };

  var engine = new Engine('ab3d5241778158b2864c0852', options);

  var connection = engine.connection;

  connection.bind('state_changed', function(states) {
    console.log(states.previous, states.current);
  });

  connection.bind('connecting_in', function(delay) {
    console.log('重连将在 ' + delay + 'ms 后进行');
  });

  connection.bind('connecting', function() {
    // 提醒用户网络不稳定，正在尝试建立连接
  });

  connection.bind('error', function(err) {
    console.log(err);
  });

  var chatUserId = 'ansonhu';
  var chatManager = engine.chatManager;

  var onNewMessage = function(message) {
    debug('message:new', message);
  }

  var onLoginSucceeded = function() {
    chatManager.conversations.loadOne({
      target: 'aaronwang',
      type: 'singleChat'
    }).then(function(conversation) {
      console.log('==============');
      if (conversation.length < 1) {
        return;
      }
      console.log('==============', conversation);
      console.log('==============');

      conversation.loadMessages().then(function(messages) {
          console.log('成功获取会话消息', messages);
          // 在开启支持离线功能时，离线存储的 message 包含三个状态 `sending`， `succeeded`， `failed` 。当状态为 `sending` 时会在调用 loadMessages 之前重发消息，过程中可能导致 message 状态改变，如果需要跟踪 message 的状态，你可以监听 `state:changed` 事件
          rander(messages);
          messages.map(function (message){
            console.log(message);
          });
      }).catch(function(err) {
          console.log('获取失败，请稍后再试',err);
      });

    });
  };
  var onLoginError = function(err) {
    console.log('login failed：', err);
  };

  chatManager.bind('login:succeeded', onLoginSucceeded);

  chatManager.bind('login:failed', onLoginError);

  chatManager.login({
    authData: chatUserId
  });
})();
