import { useState } from 'react'
import send from "./assets/send.svg"
import user from "./assets/user.png"
import loader from "./assets/loader.svg"
import bot from "./assets/bot.png" 
import axios from "axios"

function App() {

  const[input, setInput] = useState('');
  const[posts,setPosts] = useState([])

  const fetchBotResponse = async () => {
    const { data } = await axios.post(
        "http://localhost:4000/",
        {input},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
    );
    return data;
};

const autoTypingBotResponse = (text) => {
  let index = 0;
  let interval = setInterval(() => {
      if (index < text.length) {
          setPosts((prevState) => {
              let lastItem = prevState.pop();
              if (lastItem.type !== "bot") {
                  prevState.push({
                      type: "bot",
                      post: text.charAt(index - 1),
                  });
              } else {
                  prevState.push({
                      type: "bot",
                      post: lastItem.post + text.charAt(index - 1),
                  });
              }
              return [...prevState];
          });
          index++;
      } else {
          clearInterval(interval);
      }
  }, 20);
};

  const clickHandler = () => {
    if(input.trim() === '') return
    updatePosts(input)
    updatePosts("loading...", false, true);
    setInput("");
    fetchBotResponse().then((res) => {
      console.log(res.bot.trim());
      updatePosts(res.bot.trim(), true);
    });
  }

  const updatePosts = (post, isBot, isLoading) => {
    if (isBot) {
        autoTypingBotResponse(post);
    } else{
    setPosts(prevData => {
      return [
        ...prevData,
        {type: isLoading ? "loading" : "user", post}
      ]
    })
  } 
 } 

  const onKeyUp = (event) => {
      if(event.key == "Enter")
      clickHandler()
  }

  return (
    <div className='app'>
      <section className='chat-container'>
        <h1 className='heading'>TalkGenius</h1>
        <div className='layout'>

          {posts?.map((post, index) => (

            <div key={index}
             className={`chat-bubble ${post.type === "bot" || post.type ==="loading"
              ? "bot" : ""}`}> 

              <div className='avatar'>
                <img src={post.type === "bot" || post.type ==="loading"
                ? {bot} : {user}} />
              </div>

              {post.type === 'loading' ? (
                <div className='loader'>
                  <img src={loader} />
                </div>
                ) : (<div className='post'>{post.post}</div>
              )}

            </div> 
          ))}

        </div>
      </section>

      <footer>
        <input
          value={input}
          className='composebar'
          autoFocus
          type='text'
          placeholder='Send a message...'
          onChange={(event) => setInput(event.target.value)}
          onKeyUp={onKeyUp}
         />

        <div className='send-button' onClick={clickHandler}>
          <img src={send} />
        </div>
      </footer>
    </div>
  )
}

export default App
