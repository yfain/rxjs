let {Observable} = require('rxjs/Observable');
require('rxjs/add/observable/interval');
require('rxjs/add/observable/from');
require('rxjs/add/operator/combineLatest');
require('rxjs/add/operator/zip');


/*
let a1 = 2;
let b1 = 4;

let c1 = a1 + b1;  // c1 = 6  

a1 = 55;           // c1 = 6;     
b1 = 20;           // c1 = 6; 
*/


const a1$ = Observable.from([2, 55])
    .zip(Observable.interval(1200), x => x);  // emit 2 and 55  1.2 sec apart

const b1$ = Observable.from([4, 20])
    .zip(Observable.interval(2000), x => x);  // emit 4 and 20 two sec apart


// combine latest emits when either observable produces data
a1$.combineLatest(b1$, (x, y) => x + y)
    .subscribe(val => console.log(`a1+b1 = ${val}`));
