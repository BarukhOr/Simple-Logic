import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import {
  breakDown,
  // pokerSymbols,
  // ranks
} from './helper'

class Poker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1Hand: [],
      player1Score: [],
      player2Hand: [],
      player2Score: []
    }
  }

  componentDidUpdate() {

  }
  
  updateHand = (player, hand) => {
    let parsedHand = hand.split(",").sort()
    this.setState({
      [`${player}Breakdown`]: this.evaluateHand(parsedHand)
    })
  }

  evaluateHand = (hand) => {
    const breakdown = breakDown(hand)
    return {
      hand,
      breakdown,
    }
  }

  render() {
    return (
      <Grid
        container
        direction="column"
        justify="center"
       >
        <Grid item><Typography>Analyze Poker Hand</Typography></Grid>

        <Grid item style={{paddingBottom: '5px'}}>
          <Grid container alignItems="center">
            <Typography>Player 1:</Typography><TextField inputProps={{maxLength: 20}} onChange={(event)=> this.updateHand('p1', event.target.value)}/>
          </Grid>
        </Grid>

        
        <Grid>
          {/* Player 1: {this.state.player1Hand} */}
        </Grid>

        ========================================================================
        
        <Grid item>
          <Grid container alignItems="center">
            <Typography>Player 2:</Typography><TextField value='A,K,10,J,Q' inputProps={{maxLength: 5}} onChange={(event)=> this.updateHand('p2', event.target.value)}/>
          </Grid>
        </Grid>

        <Grid>
          {/* Player 2: {this.state.player2Hand} */}
        </Grid>
      </Grid>
    );
  }
}

export default Poker;