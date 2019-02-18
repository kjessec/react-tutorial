import React  from 'react';
import './App.css';

import initialData from './testdata.json'

class BoardState extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // testdata.json 으로 data 초기화
      data: initialData,

      // 몇번째 idx를 볼것인가? 초기값은 0
      currentDataIdx: 0,

      // 글쓰기 중간 데이터를 가지고 있을 버퍼
      writeBuffer: {
        "name": "",
        "email": "",
        "dateTime": "",
        "ip": "",
        "subject": "",
        "content": ''
      }
    }

    this.viewArticle = this.viewArticle.bind(this)
    this.updateWriteBuffer = this.updateWriteBuffer.bind(this)
    this.commitWriteBuffer = this.commitWriteBuffer.bind(this)
  }

  // article view
  viewArticle(idx) { this.setState({ currentDataIdx: idx }) }
  updateWriteBuffer(nextKey, nextValue) {
    this.setState({
      ...this.state, // 안해도 되지만 그냥 버릇. 원래 있던 state 깔기
      writeBuffer: { // writeBuffer 업데이트. 원래 있던 값을 깔고, [nextKey] (동적 키): nextValue로 업뎃
        ...this.state.writeBuffer,
        [nextKey]: nextValue
      }
    })
  }

  commitWriteBuffer() {
    this.setState({
      ...this.state,
      data: [ // data를 새 array를 만들면서, 방금 있던 writeBuffer 를 카피하고, 원래 있던 data를 뒤에 append
        { ...this.state.writeBuffer },
        ...this.state.data
      ],
      writeBuffer: { // writeBuffer 초기화
        "name": "",
        "email": "",
        "dateTime": "",
        "ip": "",
        "subject": "",
        "content": ''
      }
    })
  }

  render() {
    return <Board
      currentArticle={this.state.data[this.state.currentDataIdx]}
      currentList={this.state.data}
      writeBuffer={this.state.writeBuffer}
      viewArticle={this.viewArticle}
      updateWriteBuffer={this.updateWriteBuffer}
      commitWriteBuffer={this.commitWriteBuffer}
    />
  }
}

// 실질적으로 보드 렌더링을 담당할 컴포넌트
function Board(props) {
  const {
    currentArticle,
    currentList,
    writeBuffer,
    updateWriteBuffer,
    commitWriteBuffer,
    viewArticle } = props

  return (
    <div>
      <div>
        <Article article={currentArticle}/>
      </div>
      <div>
        <Write
          writeBuffer={writeBuffer}
          updateWriteBuffer={updateWriteBuffer}
          commitWriteBuffer={commitWriteBuffer}
        />
      </div>
      <div>
        <List list={currentList} viewArticle={viewArticle}/>
      </div>
    </div>
  )
}

function Article(props) {
  const { article } = props

  return (
    <div>
      <h1>{article.subject}</h1>
      <p>Writer: {article.name}</p>
      <p>Date: {article.dateTime}</p>
      <p>IP: {article.IP}</p>
      <p>
        {article.content}
      </p>
    </div>
  )
}

function List(props) {
  const { list, viewArticle } = props

  return (
    <div>
      <h4>글 리스트</h4>
      <ol>
      {list.map((data, idx) =>
        <li key={idx} onClick={() => viewArticle(idx)}>
          {data.subject}
        </li>
      )}
      </ol>
    </div>
  )
}

function Write(props) {
  const {
    writeBuffer,
    updateWriteBuffer,
    commitWriteBuffer
  } = props

  return (
    <div>
      <h4>글쓰기</h4>
      <div>
        <label>
          이름
          <input
            value={writeBuffer.name}
            onChange={ev => updateWriteBuffer('name', ev.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          이메일
          <input
            value={writeBuffer.email}
            onChange={ev => updateWriteBuffer('email', ev.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          제목
          <input
            value={writeBuffer.subject}
            onChange={ev => updateWriteBuffer('subject', ev.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          내용
          <textarea
          value={writeBuffer.content}
          onChange={ev => updateWriteBuffer('content', ev.target.value)}
          />
        </label>
      </div>

      <button onClick={commitWriteBuffer}>
        글 등록
      </button>
    </div>
  )
}

export default BoardState
