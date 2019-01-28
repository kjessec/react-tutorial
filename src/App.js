import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const data = [
  { title: 'Hello World', content: 'Hello 1234', writer: 'JESSE'},
  { title: 'Hello World1', content: 'Hello 1asdf234'},
  { title: 'Hello World2', content: 'Helasdflo 1234'},
  { title: 'Hello World3', content: 'Heladsflo 1234'},
  { title: 'Hello World4', content: 'Helasdblo 1234'},
  { title: 'Hello World5', content: 'Helsaeflo 1234'},
  { title: 'Hello World6', content: 'Helasdvlo 1234'},
  { title: 'Hello World4', content: 'Helasdblo 1234'},
  { title: 'Hello World5', content: 'Helsaeflo 1234'},
  { title: 'Hello World6', content: 'Helasdvlo 1234'},
  { title: 'Hello Worlsadfsadfd4', content: 'Helasdblo 1234'},
  { title: 'Hello World5', content: 'Helsaeflo 1234'},
  { title: 'Hello Worlfsadfsd6', content: 'Helasdvlo 1234'},
  { title: 'Hello World4', content: 'Helasdblo 1234'},
  { title: 'Hello World5', content: 'Helsaeflo 1234'},
  { title: 'Hello ssdfsadfadfsdaWorld6', content: 'Helasdvlo 1234'},
  { title: 'asdf World4', content: 'Helasdblo 1234'},
  { title: 'Helloadfsadfasdf World5', content: 'Helsaeflo 1234'},
  { title: 'Hesadfsafllo World6', content: 'Helasdvlo 1234'},
]

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { myVisitCounter: 0 }
    this.addVisitCounter = this.addVisitCounter.bind(this)
    this.reset = this.reset.bind(this)
  }

  addVisitCounter() {
    this.setState({ myVisitCounter: this.state.myVisitCounter+1 })
  }

  reset() {
    this.setState({ myVisitCounter: 0 })
  }

  render() {
    const IconListRender = ({ writer, title, content, onClick }) => (
      <div onClick={onClick}>
        <p>{writer}</p>
        <code>{title}</code>
        <p>{content}</p>
        <hr/>
      </div>
    )

    const { myVisitCounter } = this.state

    return (
      <div>
        <h1>My Visit Counter: {this.state.myVisitCounter}</h1>
        <button onClick={this.reset}>
          Reset my counter
        </button>
        <MyBoard
          onClick={() => this.addVisitCounter()}
          boardId={() => Math.random()}
          data={data}
          visit={myVisitCounter}
          ListRender={IconListRender}
        />
      </div>
    );
  }
}

function MyBoard(props) {
  const { boardId, data, ListRender, onClick, myVisitCounter } = props
  return (
    <div id={boardId()}>
      <h1>{boardId()}: {myVisitCounter}</h1>
      <input type="text"/>
      {data.map(function(entry, entryIdx) {
        return <ListRender
          writer={entry.writer}
          title={entry.title}
          content={entry.content}
          key={entryIdx}
          onClick={onClick}
        />
      })}
    </div>
  )
}

export default App;
