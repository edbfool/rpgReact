var React = require('react')
var ReactDOM = require('react-dom')
import { render } from 'react-dom'
//test
function Square(props){
  //console.log(props);
  return (
    <button className="square" onClick={() => props.onClick()}>{props.value}</button>
  );
}

class Board extends React.Component {
  renderSquare(i, rowCount){
    console.log(this.props);
    return <Square key={"square-"+i+"-"+rowCount} value={this.props.value.history[0].squares[i]} onClick={() => this.props.onClick(i)}/>;
  }
  renderRow(j, rowCount){
    var row = [];
    for (var i = 0; i < 3; i++){
      row.push(this.renderSquare((j+i), rowCount));
    }
    return row;
  }
  render() {
    var table = [];
    for (var i = 0; i < 9; i+=3){
      var rowCount = "row-"+i;
        var rowZ = <div className="board-row" key={"row-"+i}>{this.renderRow(i, rowCount)}</div>
        table.push(rowZ);
    }
    return ( <div className="boArd" key="bordONE">
                <div className="status">{this.props.value.status}</div>
                {table}
            </div> );
  }
}

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      status: '',
    };
  }
  handleClick(i){
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]), xIsNext: !this.state.xIsNext,
    });
  }
  render(){
    //console.log(this.state.history[0].squares);
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    if (winner){
      this.status = 'Winner : '+winner;
    } else {
      this.status = 'Next player : '+(this.state.xIsNext ? 'X' : 'O');
    }
    return(
      <div className="game">
        <div className="game-board">
          <Board value={this.state} onClick={() => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('main'));

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
