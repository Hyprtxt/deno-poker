import Deck from "./deck.js"
import Poker from "./poker.js"
import Strategy from "./strategy.js"

import * as Colors from "https://deno.land/std@0.91.0/fmt/colors.ts"

const Play = () => {
    const cards = Deck.getNewCards()
    const hand = cards.slice(0,5)
    const strat = Strategy.simpleStrategy(hand)
    const integerStrat = strat.strategy.map( ( thing ) => parseInt(thing.replace('HOLD_','')) )
    let currentSlice = 4
    const final = hand.map( ( card, index ) => {
        if( integerStrat.indexOf( index+1 ) === -1 ) {
            currentSlice++
            return cards.slice(currentSlice,currentSlice+1)[0]
        } else {
            return card        
        }
    })
    // console.log( " " + hand.map( ( card, index ) => {
    //     if( integerStrat.indexOf( index+1 ) === -1 ) {
    //         return Colors.red(card)
    //     } else {
    //         return Colors.green(card)
    //     }
    // }) + "\n " + Colors.green(final + "\n"), 
    // Colors.blue( strat.rule_number + " " ) + "- " + Colors.cyan( strat.rule + "\n" ),
    // Poker.score(final) )
    return Poker.score(final).win - 5
}
const HOW_MANY = 10000

const start = Date.now()

let result = 0;
let i = 0;
do {
  i = i + 1;
  result = result + Play();
//   console.log(result)
} while (i < HOW_MANY);

const how_long = Date.now() - start

console.log( result, how_long, HOW_MANY, how_long/HOW_MANY)

// console.log( hand + "\n" + final + "\n", strat, Poker.score(final) )

