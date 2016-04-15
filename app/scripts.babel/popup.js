'use strict';

// import { getState } from './chat';

let vue = new Vue({
  el: '#live-chat',
  data: {
    currentState: undefined
  }
});

let options = {
  authEndpoint: 'http://www.tuisongbao.com/api/engineDemo/authUser'
};

let engine = new Engine('ab3d5241778158b2864c0852', options);

let connection = engine.connection;

connection.bind('state_changed', function(states) {
  console.log(states.previous, states.current);
  vue.currentState = states.current;
});

connection.bind('connecting_in', function(delay) {
  console.log('重连将在 ' + delay + 'ms 后进行');
});

connection.bind('connecting', function() {
  // 提醒用户网络不稳定，正在尝试建立连接
});

let chatUserId = 'ansonhu';
let chatManager = engine.chatManager;

chatManager.bind('login:succeeded', () => {
  chatManager.conversations.loadOne({
    target: 'aaronwang',
    type: 'singleChat'
  }).then((conversation) => {
    console.log(conversation);
  });
});

chatManager.login({
  authData: chatUserId
});
