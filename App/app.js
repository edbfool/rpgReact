var React = require('react')
var ReactDOM = require('react-dom')

import { render } from 'react-dom'

function Square(props){
  let status;
  let position = [props.items.coords.x,props.items.coords.y];
  if (position[0] == props.coords.coordX && position[1] == props.coords.coordY){
    status = props.items.desc;
  }
  console.log(position);
  console.log(props.coords);
  return(
    <td style={{height:20+'px',width:20+'px',border:1+'px solid black'}}>{status}</td>
  )
}

class Board extends React.Component {
  constructor(){
    super();
    this.state = {
      bawl: {
        coords : {x:0,y:0},
        desc : 'O'
      }
    }
  }
  renderSquare(x, y){
    let coords = {
      coordX: x,
      coordY: y
    }
    return <Square items={this.state.bawl} coords={coords} key={"square-"+x+"-row-"+y}/>;
  }

  componentDidMount(){
    window.addEventListener("keypress",(e)=>{console.log(e);
    let ord,abs;
      switch(e.charCode){
        case 122:
          ord = -1;
          abs = 0;
          break;
        case 113:
          ord = 0;
          abs = -1;
          break;
        case 115:
          ord = 1;
          abs = 0;
          break;
        case 100:
          ord = 0;
          abs = +1;
          break;

      }
      this.setState({
        bawl:{
          coords: {
            x: this.state.bawl.coords.x+abs,
            y: this.state.bawl.coords.y+ord
          },
          desc: this.state.bawl.desc
        }
      })
    });
  }
  componentWillMount(){
    this.renderBawl();
  }
  renderBawl(){
    let x = Math.floor((Math.random()*10));
    console.log(x);
    let y = Math.floor((Math.random()*10));
    console.log(y);
    this.state.bawl.coords = {x: x, y: y};
  }
  renderRow(y){
    let row = [];
    for (let i = 0; i < 10; i++){
      row.push(this.renderSquare(i,y));
    }
    return row;
  }
  render(){
    let table = [];
    for (let i = 0; i < 10; i++){
      let rowZ = <tr>{this.renderRow(i)}</tr>;
      table.push(rowZ);
    }
    return (
      <table style={{margin:'auto'}}><tbody>{table}</tbody></table>
    );
  }
}

ReactDOM.render(<Board onKeypress={(e)=>{console.log(e)}} />, document.getElementById('main'));
