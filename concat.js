let {Observable} = require('rxjs/Observable');
require('rxjs/add/observable/concat');
require('rxjs/add/observable/timer');
require('rxjs/add/operator/mapTo');

// Emulate first HTTP request that take 3 sec
let threeSecHTTPRequest = Observable.timer(3000).mapTo('First response');

// Emulate second HTTP request that takes 1 sec
let oneSecHTTPRequest = Observable.timer(1000).mapTo('Second response');

Observable
    .concat(threeSecHTTPRequest, oneSecHTTPRequest)
    .subscribe(res => console.log(res));