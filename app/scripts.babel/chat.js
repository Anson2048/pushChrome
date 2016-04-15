'use strict';

let options = {
  authEndpoint: 'http://www.tuisongbao.com/api/engineDemo/authUser'
};

let engine = new Engine('ab3d5241778158b2864c0852', options);

let connection = engine.connection;

let currentState = undefined;

connection.bind('state_changed', function(states) {
 console.log(states.previous, states.current);
 currentState = states.current;
});

connection.bind('connecting_in', function(delay) {
 console.log('重连将在 ' + delay + 'ms 后进行');
});

connection.bind('connecting', function() {
 // 提醒用户网络不稳定，正在尝试建立连接
});

exports.getState = () => {
  return currentState;
}
