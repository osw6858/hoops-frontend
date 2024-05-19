import { Link } from 'react-router-dom'
import BasicButton from '../../components/common/BasicButton/BasicButton.tsx'
import MainNav from '../../components/MainNav/MainNav.tsx'
import MainCarousel from '../../components/MainCarousel/MainCarousel.tsx'
import Calender from '../../components/Calender/Calender.tsx'
import { useSelectBox } from '../../hooks/useSelectBox.ts'
import MainSelectList from '../../components/MainSelectList/MainSelectList.tsx'
import { useState } from 'react'
import { CS } from '../../styles/commonStyle.ts'
import { S } from './Main.style.ts'
import { theme } from '../../styles/theme.ts'
import { useDateStore } from '../../store/calender.ts'
import { useGameList } from '../../hooks/query/useGameList.ts'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.ts'
import MatchItem from '../../components/MatchItem/MatchItem.tsx'
import { Match } from '../../types/match.ts'

export default function Main() {
  const selected = useSelectBox()
  // NOTICE : 임시 데이터
  // 나중에 로그인 토큰으로 조건문 렌더링 해야됨~
  const [isAdmin] = useState(false)
  // NOTICE: 임시 데이터

  const { date: globalDate } = useDateStore()

  const gameFilter = {
    localData: globalDate,
    cityName: selected.region,
    fieldStatus: selected.gamePlace,
    gender: selected.gender,
    matchFormat: selected.gameType,
  }

  const { data, fetchNextPage, hasNextPage } = useGameList({
    gameFilter,
  })

  const { loader } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  })

  console.log(data)

  return (
    <CS.DefaultContainer>
      <S.Wrapper>
        <S.CenterWrapper>
          {isAdmin ? (
            <Link className='admin' to='/admin/report'>
              <BasicButton
                children={'신고 목록'}
                type={'button'}
                $bgColor={theme.colors.red}
                $fontcolor={theme.colors.white}
              />
            </Link>
          ) : (
            <MainNav />
          )}
        </S.CenterWrapper>
        <MainCarousel />
        <Calender />
        <MainSelectList selected={selected} />
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page.content.map((content: Match) => (
              <MatchItem key={content.gameId} match={content} />
            ))}
          </div>
        ))}
      </S.Wrapper>
      <div ref={loader} />
    </CS.DefaultContainer>
  )
}
