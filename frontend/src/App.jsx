import { useState } from 'react'
import send from "./assets/send.svg"
import user from "./assets/user.png"
import loader from "./assets/loader.svg"
// import bot from "./assets/send.svg"

function App() {

  const[input, setInput] = useState('');
  const[posts,setPosts] = useState([])

  const clickHandler = () => {

  }

  return (
    <div className='app'>
      <section className='chat-container'>
        <div className='layout'>

          {posts.map((post, index) => (

            <div className={`chat-bubble ${post.type === 'bot' || post.type ==='loading'
              ? 'bot' : ''}`}>

              <div className='avatar'>
                <img src={post.type === 'bot' || post.type ==='loading'
                ? 'bot' : 'user'} />
              </div>

              {post.type === 'loading' ? (
                <div className='loader'>
                  <img src={loader} />
                </div>
                ) : <div className='post'>{post.post}</div>
              }

            </div>
          ))}

        </div>
      </section>

      <footer>
        <input
          className='composebar'
          autoFocus
          type='text'
          placeholder='Send a message...'
          onChange={(event) => setInput(event.target.value)}
         />

        <div className='send-button' onClick={clickHandler}>
          <img src={send} />
        </div>
      </footer>
    </div>
  )
}

export default App
