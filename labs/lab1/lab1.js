'use strict';
/**
 * Reflection question 1
 * Because all objects that do not contain the evaluated property will return false
 */

const imported = require("./inventory.js");
//console.log(imported.inventory['Sallad']);
/*

console.log('Object.keys():')
let names = Object.keys(imported.inventory);
names
.sort((a, b) => a.localeCompare(b, "sv", {sensitivity: 'case'}))
.forEach(name => console.log(name));
*/

/**
 * Reflection question 2
 * forEach will only print enumareables while a loop can handle nonenumerables as well using 
 * dedicated functions within the loop
 */

console.log('\n--- Assignment 1 ---------------------------------------');

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function makeOptions(inventory, type){
    let prprts = Object.values(inventory);
    return prprts.reduce((ingredients, newIngr) => {
        if (!!newIngr[type]) {
            let name = getKeyByValue(inventory, newIngr)
            return ingredients + '<option value="' + name + '"> ' + name + ', ' + newIngr['price'] + ' kr</option>\n'
        } else {
            return ingredients;
        }
    }, '');
}

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {

    add(name, properties){
        this[name] = properties;
        return this;
    };

    remove(name){
        delete this[name];
        return this;
    };
}

let myCaesarSalad = new Salad()
.add('Sallad', imported.inventory['Sallad'])
.add('Kycklingfilé', imported.inventory['Kycklingfilé'])
.add('Bacon', imported.inventory['Bacon'])
.add('Krutonger', imported.inventory['Krutonger'])
.add('Parmesan', imported.inventory['Parmesan'])
.add('Ceasardressing', imported.inventory['Ceasardressing'])
.add('Gurka', imported.inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice = function getPrice(){
    return Object.values(this).reduce((totPrice, price) => {
        return totPrice + price['price'];
    }, 0);
}

Salad.prototype.count = function count(type){
    return Object.values(this).reduce((count, prop) => {
        if(!!prop[type]){
            return count + 1;
        } else {
            return count;
        }
    }, 0);
}

console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör

/* reflection question 3
Classes are represented as functions, which in turn inherit the Object prototype. 
myCeasarSallad is a prototype of Salad and thus typeOf myCeasarSallad === typeOf Salad.prototype.
All functions have a default prototype.
You get the next object in the prototype chain with .prototype. 
*/

/*
console.log('----- Reflection question 3 -----\n')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));
*/

console.log('\n--- Assignment 4 ---------------------------------------')

class GourmetSalad extends Salad {

    add(name, properties, size){
        let propertiesWithSize = Object.create(properties);
        if(!size){
            propertiesWithSize['size'] = 1;
        } else if(!!this[name]){
            propertiesWithSize['size'] = this[name]['size'] + size;
        } else {
            propertiesWithSize['size'] = size;
        }
        super.add(name, propertiesWithSize);
        return this;
    };

    getPrice(){
        return Object.values(this).reduce((totPrice, ingr) => {
            return totPrice + (ingr['price'] * ingr['size']);
        }, 0);
    }
    
}

let myGourmetSalad = new GourmetSalad()
.add('Sallad', imported.inventory['Sallad'], 0.5)
.add('Kycklingfilé', imported.inventory['Kycklingfilé'], 2)
.add('Bacon', imported.inventory['Bacon'], 0.5)
.add('Krutonger', imported.inventory['Krutonger'])
.add('Parmesan', imported.inventory['Parmesan'], 2)
.add('Ceasardressing', imported.inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');


console.log('\n--- Assignment 5 ---------------------------------------')
//console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

/**
 * Reflection question 4
 */
/**
 * Reflection question 5
 */
/**
 * Reflection question 6
 */
