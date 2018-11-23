
//////////////// CommonJS Module Syntax
//  const team1 = require('./module1');

//  console.log('====================================');
//  console.log(team1.nickname);
//  console.log(team1.city);
//  console.log('====================================');

////////////// ES2015 Module
// import { team2, team3 } from './module2';
import { team2, team3 } from './module2';
import * as teams from './module2';


// console.log('====================================');
// console.log(team2.city);
// console.log(team3.nickname);
// console.log('====================================');

// console.log('====================================');
// console.log(teams.team3.city);
// console.log('====================================');

console.log('====================================');
console.log(teams.favTeam());
console.log('====================================');
