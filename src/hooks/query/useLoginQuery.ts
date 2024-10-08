import { defaultAxios } from '../../api/axiosInstance'
import { SignInResponseType, SignInType } from '../../types/auth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { QUERY_KEYS } from '../../constants/queryKeys'
import { END_POINT } from '../../constants/endPoint'
import { useToast } from '../useToast'
import { useAuthStore } from '../../store/store.ts'
import { AxiosError } from 'axios'

const memberLogin = async (data: SignInType): Promise<SignInResponseType> => {
  const { id, password } = data

  const res = await defaultAxios.post(`${END_POINT.AUTH.LOGIN}`, {
    loginId: id,
    password,
  })

  // 응답 헤더에서 Authorization 토큰을 추출
  const authorizationHeader = res.headers['authorization']
  const authorizationBody = res.data.refreshToken
  const accessToken = authorizationHeader
  const refreshToken = authorizationBody

  return {
    accessToken,
    refreshToken,
    headers: { authorization: authorizationHeader },
    userInfo: res.data,
  }
}

export default function useLoginQuery() {
  const navigate = useNavigate()
  const { toastSuccess, toastError } = useToast()
  const setLoginState = useAuthStore((state) => state.login)
  const {
    data: loginData,
    mutate: loginMutate,
    isPending: loginPending,
    isError: loginError,
  } = useMutation<SignInResponseType, unknown, SignInType>({
    mutationKey: [QUERY_KEYS.LOGIN],
    mutationFn: memberLogin,
    onSuccess: async (data, variables) => {
      const accessToken = data.accessToken
      const refreshToken = data.refreshToken
      // Bearer ${accessToken}

      if (data.userInfo.statusCode) {
        toastError(`${data.userInfo.errorMessage}`)
        return
      }
      if (variables.rememberMe) {
        localStorage.setItem('userId', data.userInfo.id)
      }

      localStorage.setItem('Access-Token', accessToken)
      localStorage.setItem('Refresh-Token', refreshToken)
      localStorage.setItem('userPK', String(data.userInfo.id))

      setLoginState()

      navigate('/', { replace: true })
      toastSuccess('로그인에 성공하셨습니다 💪🏻')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toastError(`${error.response?.data?.errorMessage}`)
      }
    },
  })

  return { loginData, loginMutate, loginPending, loginError }
}
