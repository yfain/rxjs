let {Observable} = require('rxjs/Observable');
require('rxjs/add/operator/share');
require('rxjs/add/operator/map');

function getData(){

    return Observable.create( observer => {
        let beers = [
            {name: "Stella", country: "Belgium", price: 9.50},
            {name: "Sam Adams", country: "USA", price: 8.50},
            {name: "Bud Light", country: "USA", price: 6.50},
            {name: "Brooklyn Lager", country: "USA", price: 8.00},
            {name: "Sapporo", country: "Japan", price: 7.50}
        ];

        let delay = 1000;
        let timeout = () => setTimeout(sendNext, delay);
        timeout();

        function sendNext(){
            observer.next(beers.shift()); // shift removes and returns the removed array element

            timeout(sendNext, delay);     // send next element to observer

            if (!beers.length) {
                observer.complete();
                clearTimeout(timeout);
            }
        }
    });
}
 
const beerObservable  = getData()
    .map(beer => beer.name + ", " + beer.country)
    .share();         // make it hot

function subscribeToBeers(name) {
    beerObservable
        .subscribe(
            beer => console.log(` ${name} got ${beer}`)
        );
}

subscribeToBeers('Subscriber 1');   // Starting first subscription

let secondSubscriber = () =>  subscribeToBeers('Subscriber 2');

setTimeout(secondSubscriber, 4000); // Second subscriber joins in 4 sec

