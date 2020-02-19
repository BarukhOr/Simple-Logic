const ROYAL = 'Royal Flush',
STRAIGHT = 'Straight Flush',
FOURKIND = 'Four Of Kind',
THREEKIND_ONEPAIR = 'Three of kind and One Pair',
THREEKIND = 'Three of Kind',
TWOPAIR = 'Two Pairs',
ONEPAIR = 'One Pair',
HIGHCARD = 'High Card'

export const constants = {
  pokerSymbols: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'K', 'Q'],
  ranks: [ ROYAL, STRAIGHT, FOURKIND, THREEKIND_ONEPAIR, THREEKIND, TWOPAIR, ONEPAIR, HIGHCARD],
}

export const breakDown = pHand => {  
  let rank = null

  if (isRoyal(pHand)){
    rank = ROYAL
  } else if (isStraight(pHand)) {
    rank = STRAIGHT
  } else if (findMatchingKinds(countCards(pHand))) {
    rank = findMatchingKinds(countCards(pHand))
  }  

  return {
    rank,
    highCard: highCard(countCards(pHand)),
  }
}

function countCards(pHand =[]) {
  let cardMap = {}
  pHand.map(card => {
    if (cardMap[card]){
      cardMap[card] += 1
    } else {
      cardMap[card] = 1
    }
    return null
  })

  return cardMap
}

function highCard(cardMap = {}) {
  let highCard = null
  // TODO: This logic does not seem to work consistently
  Object.entries(cardMap).map(entry => {
    if (entry[1] === 1) {
      if (entry[0] > highCard) highCard = entry[0]
    }
    return null
  })

  return highCard
}

function isRoyal(pHand = []) {
  if (JSON.stringify(pHand) === JSON.stringify(["10", "A", "J", "K", "Q"])){
    return true
  } else {
    return false
  }
}

function isStraight(pHand = []) {
  const { pokerSymbols } = constants
  let isStraight = true
  let startingPoint = pokerSymbols.indexOf(pHand[0])

  for(let count=1; count < 5; count++){
    if(pokerSymbols[startingPoint+count] !== pHand[count]) {
      isStraight = false
      break;
    }
  }

  return isStraight
}

function findMatchingKinds(cardCount = {}){
  let countTemp = Object.values(cardCount).sort()
  let kind = null
  if (countTemp.includes(4)) {
    kind = FOURKIND
  } else if (countTemp.includes(3)) {
    if (countTemp.includes(2)) {
      kind = THREEKIND_ONEPAIR
    }else {
      kind = THREEKIND
    }
  } else if (countTemp.includes(2)) {
    if(countTemp[countTemp.indexOf(2)+1] === 2){
      kind = TWOPAIR
    }else {
      kind = ONEPAIR
    }    
  } else {
    kind = HIGHCARD
  }
  return kind
}

export function compareHands(p1Breakdown, p2Breakdown){
  const { rank: p1Rank } = p1Breakdown
  const { rank: p2Rank } = p2Breakdown
  const { ranks } = constants

  let result = null

  if (ranks.indexOf(p1Rank) < ranks.indexOf(p2Rank)) {
    result = "Player 1 won"
  } else if (ranks.indexOf(p1Rank) > ranks.indexOf(p2Rank)) {
    result = "Player 2 won"
  } else {
    result = "It is a draw"
  }

  return result
}
