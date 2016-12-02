var React = require('react')
var ReactDOM = require('react-dom')
import { render } from 'react-dom'


function Square(props){
  return (
    <button className="square" onClick={() => props.onClick()}>{props.value}</button>
  );
}

class Board extends React.Component {
  renderSquare(i, rowCount){
    return <Square key={"square-"+i+"-"+rowCount} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
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
                <div className="status"></div>
                {table}
            </div> );
  }
}

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      squares: Array(9).fill(null),
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      status: '',
      stepNumber: 0,
      rvrsOrder: false,
    };
  }
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }
  handleClick(i){
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]), xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
  reverseOrder(){
    var ol = document.querySelector('ol');
    for (var i = 0; i < ol.childNodes.length; i++){
      ol.insertBefore(ol.childNodes[i], ol.firstChild);
    }
    this.setState({
      rvrsOrder: !this.state.rvrsOrder,
    });
  }
  render(){
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game start';
      return (
        <li id='test' key={move}>
          <a href="#" onClick={(e) => {
              this.jumpTo(move);
              document.querySelectorAll('a').forEach(function(item){item.style.fontWeight = 'normal';});
              e.target.style.fontWeight = "bold";
            }}>{desc}</a>
        </li>
      );
    });
    let status;
    if (winner){
      status = 'Winner : '+winner;
    } else {
      status = 'Next player : '+(this.state.xIsNext ? 'X' : 'O');
    }
    let rvrOrder = this.state.rvrsOrder ? 'DSC' : 'ASC';
    return(
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <button onClick={() => this.reverseOrder()}>{rvrOrder}</button>
          <div>{status}</div>
          <ol>{moves}</ol>
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
      console.log(squares[a]);
      return squares[a];
    }
  }
  return null;
}
