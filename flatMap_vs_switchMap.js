let {Observable} = require('rxjs/Observable');
require('rxjs/add/observable/interval');
require('rxjs/add/operator/mergeMap'); // flatMap is an alias of mergeMap
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/take');
require('rxjs/add/operator/map');

let outer = Observable.interval(1000).take(2);

let combined = outer.flatMap((x) => {
    return Observable
        .interval(400)
        .take(3)
        .map(y => `outer ${x}: inner ${y}`)
});

combined.subscribe(result => console.log(`result ${result} `));

/*
* Although the third value of the inner observable is emmited after the outer observable emits new value,
* all emissions of the inner observable are present in the merged output.
*
* Change flatMap to switchMap and the third value of the inner observable is not emitted because
* the outer observable emitted new value and the inner one starts handling it.
* */