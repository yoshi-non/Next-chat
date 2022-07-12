import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import io from "socket.io-client"
import { useState } from 'react'

const socket = io("http://localhost:5000")

export default function Home() {
  const [message, setMessage] = useState("")
  const [list, setList] = useState([])

  const handleSendMessage = () => {
    // サーバーへ送信
    socket.emit("send_message", {message: message})
    setMessage("")
  }

  // サーバーから受信
  socket.on("received_message", (data) => {
    console.log(data)
    setList([...list, data])
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h2>チャットアプリ</h2>
        <div className={styles.chatInputButton}>
          <input type="text" placeholder='チャット...' onChange={(e) => setMessage(e.target.value)} value={message}/>
          <button onClick={() => handleSendMessage()}>チャット送信</button>
        </div>
        {list.map((chat) => (
          <div className={styles.chatArea} key={chat.message}>{chat.message}</div>
        ))}
      </div>
    </div>
  )
}
