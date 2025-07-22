// 서버쪽에서도 필요하다면 shared로 이주? 유틸기능 추가되면 좋을것 만약 사용한다면 
export function useAuth() {
  const user = useSupabaseUser()
  const session = useSupabaseSession()
  const redirectInfo = useSupabaseCookieRedirect()

  return {
    user,
    session,
    redirectInfo
  }
}