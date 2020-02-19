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
  // result: { win: 1, loss: 2, tie: 3 },
}

export const breakDown = pHand => {  
  let hand = null

  if (isRoyal(pHand)){
    hand = ROYAL
  } else if (isStraight(pHand)) {
    hand = STRAIGHT
  } else if (findMatchingKinds(countCards(pHand))) {
    hand = findMatchingKinds(countCards(pHand))
  }
  

  return {
    hand,
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
  Object.entries(cardMap).map(entry => {
    if (entry[1] === 1){
      if (entry[0] > highCard) highCard = entry[0]
    }
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

function isFourOfKind(cardCount = {}) {
  if(Object.values(cardCount).includes(4)){
    return true
  }
  return false
}

function isThreeOfKind(cardCount = {}) {
  if(Object.values(cardCount).includes(4)){
    return true
  }
  return false
}

function findMatchingKinds(cardCount = {}){
  let countTemp = Object.values(cardCount).sort()
  if (countTemp.indexOf(4)) {
    return FOURKIND
  } else if (countTemp.indexOf(3)) {
    if (countTemp.indexOf(2)) {
      return THREEKIND_ONEPAIR
    }else {
      return THREEKIND
    }
  } else if (countTemp.indexOf(2)) {
    if(countTemp[countTemp.indexOf(2)+1] === 2){
      return TWOPAIR
    }else {
      return ONEPAIR
    }    
  } else {
    return HIGHCARD
  }
}