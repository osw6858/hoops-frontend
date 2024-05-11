import { S } from './MyGameList.style.ts'
import MyGameItem from '../MyGameItem/MyGameItem.tsx'
import React, { useEffect, useState } from 'react'
import { Pagination, Stack } from '@mui/material'
import GameUserList from '../GameUserList/GameUserList.tsx'
import { useParams } from 'react-router-dom'
import { TestData, TestData2 } from '../../hooks/temp.ts'

export default function MyGameList() {
  const [selected, setSelected] = useState<number>(0)
  const [page, setPage] = React.useState(1)
  const params = useParams()

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  useEffect(() => {
    // console.log(params.id)
  }, [params.id])

  return (
    <S.Wrapper>
      <p>나의 경기</p>
      <S.ListContainer>
        <div>
          {TestData.map((gameItem) => (
            <MyGameItem
              key={gameItem.gameId}
              gameInfo={gameItem}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
        <div>
          <Stack spacing={1}>
            <Pagination
              size={'large'}
              count={5}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      </S.ListContainer>
      <GameUserList userInfo={TestData2} />
    </S.Wrapper>
  )
}