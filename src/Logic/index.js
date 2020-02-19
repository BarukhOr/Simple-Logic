import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import _ from 'lodash'

import {
  breakDown,
  compareHands
} from './helper'

const PENDING = 'pending'

class Poker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p1Breakdown: {},
      p2Breakdown: {},

      p1value: '1,1,2,2,10',
      p2value: '1,2,3,4,5',

      result: PENDING,
      intialized: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { p1Breakdown, p2Breakdown, p1value, p2value, intialized } = this.state
    if(Object.values(p1Breakdown).length && Object.values(p2Breakdown).length && !_.isEqual(this.state, prevState)){
      const result = compareHands(p1Breakdown, p2Breakdown)
      this.setState({ result })
    }

    if(intialized){
      this.state({ intialized: true}, this.updateHand)
    }

    const p1Hand = p1value.split(",").sort()
    const p2Hand = p2value.split(",").sort()

    console.log("Equality Check: ", p1value, prevState.p1value)
    console.log("isEqual: ", p1value === prevState.p1value)
    console.log("notEqual: ", p1value !== prevState.p1value)

    if(p1Hand.length === 5 && (p1value !== prevState.p1value)){
      this.updateHand('p1Breakdown', p1Hand)
    }

    if(p2Hand.length === 5 && (p2value !== prevState.p2value)){
      this.updateHand('p2Breakdown', p2Hand)
    }
  }
  
  updateHand = (player, hand) => {
    console.log("Many are called, but few are chosen")
    this.setState({
      [player]: breakDown(hand),
      result: PENDING
    })
  }

  render() {
    const { p1Breakdown, p2Breakdown, p1value, p2value } = this.state
    return (
      <Grid
        container
        direction="column"
        justify="center"
       >
        <Grid item>
          <Typography variant="h4">Analyze Poker Hand</Typography>
          <Typography variant="body2">For this to work, you must have 5 comma seperated fields.</Typography>
          <Typography variant="body2">These are the expected values: 2, 3, 4, 5, 6, 7, 8, 9, 10, A, J, K, Q</Typography>
        </Grid>

        <Grid item style={{paddingBottom: '5px'}}>
          <Grid container alignItems="center">
            <Typography>Player 1's Hand:</Typography><TextField value={p1value} onChange={(event)=> this.setState({p1value: event.target.value})}/>
          </Grid>
          <Grid container alignItems="center">
            <Typography>Player 2's Hand:</Typography><TextField value={p2value} onChange={(event)=> this.setState({p2value: event.target.value})}/>
          </Grid>
        </Grid>

        <Grid>
          <Typography>Result: {this.state.result}</Typography>
          {p1Breakdown.rank ? <Typography>Player 1 Stats => Rank: {this.state.p1Breakdown.rank} , High Card: {this.state.p1Breakdown.highCard}</Typography> : null}
          {p2Breakdown.rank ? <Typography>Player 2 Stats => Rank: {this.state.p2Breakdown.rank} , High Card: {this.state.p2Breakdown.highCard}</Typography> : null}
        </Grid>
      </Grid>
    );
  }
}

export default Poker;