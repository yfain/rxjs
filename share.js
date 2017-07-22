let {Observable} = require('rxjs/Observable');
require('rxjs/add/observable/interval');
require('rxjs/add/operator/take');
require('rxjs/add/operator/share');

let numbers = Observable
    .interval(1000)
    .take(5)
    .share();


function subscribeToNumbers(name) {
    numbers
        .subscribe(
            x => console.log(` ${name} got ${x}`)
        );
}

subscribeToNumbers('Subscriber 1');

let addSubscription = () =>  subscribeToNumbers('Subscriber 2');

setTimeout(addSubscription, 2500); // Second subscriber joins in 2.5 sec