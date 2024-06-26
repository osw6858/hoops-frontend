import { useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import { CompatClient, Stomp } from '@stomp/stompjs'

const SOCKET_URL = `${import.meta.env.VITE_HOOPS_CHAT_API}/ws`

export const useWebSocket = (
  chatRoomId: string,
  accessToken: string,
  nickName: string
) => {
  const [messages, setMessages] = useState<
    { sender: string; content: string }[]
  >([])
  const [client, setClient] = useState<CompatClient | null>(null)

  useEffect(() => {
    if (!chatRoomId || !accessToken) {
      console.error('토큰값과 룸 아이디가 없음')
      return
    }
    setMessages([])

    const newClient = Stomp.over(() => new SockJS(SOCKET_URL))

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      gameId: String(chatRoomId),
    }

    const connectCallback = () => {
      console.log('웹소켓 연결 성공!')
      // subscribe 메서드를 connectCallback 함수 내부에서 호출하도록 변경
      newClient.subscribe(
        `/topic/${chatRoomId}`,
        (response) => {
          const message = JSON.parse(response.body)
          setMessages((prevMessages) => [...prevMessages, message])
        },
        headers
      )
      newClient.send('/app/loadMessages/' + chatRoomId, headers)
    }

    const errorCallback = (error: unknown) => {
      console.error('웹소켓 연결 오류:', error)
    }

    newClient.connect(headers, connectCallback, errorCallback)
    setClient(newClient)

    return () => {
      // 연결 해제 로직을 명시적으로 disconnect 메서드 호출 전에 확인
      if (client && client.connected) {
        client.disconnect(() => {
          console.log('웹소켓 연결 해제 성공')
        })
      }
    }
  }, [chatRoomId])

  const sendMessage = (message: string) => {
    // client 상태를 직접 사용하고 옵셔널 체이닝 연산자로 안전하게 확인
    if (client?.connected) {
      const data = { sender: nickName, content: message, type: 'CHAT' }

      client.send(
        `/app/sendMessage/${chatRoomId}`,
        {
          Authorization: `Bearer ${accessToken}`,
          gameId: String(chatRoomId),
        },
        JSON.stringify(data)
      )
    }
  }

  return { messages, sendMessage }
}
