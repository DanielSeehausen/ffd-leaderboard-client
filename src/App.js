import React, { Component } from 'react';
import './App.css';

const colorMap = {
  1:  '#C0392B',
  2:  '#E74C3C',
  3:  '#9B59B6',
  4:  '#8E44AD',
  5:  '#2980B9',
  6:  '#3498DB',
  7:  '#1ABC9C',
  8:  '#16A085',
  9:  '#27AE60',
  10: '#2ECC71',
  11: '#F1C40F',
  12: '#F39C12',
  13: '#E67E22',
  14: '#D35400',
  15: '#BDC3C7',
  16: '#34495E',
  17: '#17202A',
  18: '#641E16',
  19: '#512E5F',
  20: '#154360',
  21: '#0E6251',
  22: '#145A32',
  23: '#7D6608',
  24: '#7E5109'
}

const Tile = (props) => (
  <div id={props.id} className="tile" style={{backgroundColor: props.color}}>{props.score}</div>
)


class App extends Component {

  constructor() {
    super()
    this.state = {
      groups: []
    }
    this.x()
  }


  comparator(a, b) {
    if (a[2] < b[2]) return -1
    if (a[2] > b[2]) return 1
    return 0
  }

  updateGroups(update) {
    let groups = update.map((score, idx) => ([idx+1, colorMap[idx+1], score]))
    groups = groups.sort(this.comparator)
    this.setState({ groups })
  }


  x() {
    setInterval(() => {
      fetch('http://mayisgr8.win/getScores?id=0', {
        method: 'GET',
      })
      .then(response => response.json())
      .then(myJson => this.updateGroups(JSON.parse(myJson)))
    }, 2000)
  }

  render() {
    return (
      <div className="App">
        { this.state.groups.map((g, idx) => (
          <Tile key={idx} id={g[0]} color={g[1]} score={g[2]} />
        ))}
      </div>
    );
  }
}

export default App;
