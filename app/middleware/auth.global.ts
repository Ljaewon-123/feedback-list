// 어차피 이건 supabase가 해주지 않나


// import defu from "defu"

// type MiddlewareOptions = false | {
//   redirectTo?: string
// }

// declare module 'vue-router' {
//   interface RouteMeta {
//     auth?: MiddlewareOptions
//   }
// }


// export default defineNuxtRouteMiddleware(async (to) => {
//   // If auth is disabled, skip middleware
//   if (to.meta?.auth === false) {
//     return
//   }
//   const user = useSupabaseUser()
//   const redirectOptions = useRuntimeConfig().public.auth.redirectTo

//   const { redirectTo } = defu(to.meta?.auth, redirectOptions)

//   // If not authenticated, redirect to home
//   if (!user) {
//     // Avoid infinite redirect
//     if (to.path === redirectTo) {
//       return
//     }
//     return navigateTo(redirectTo)
//   }
// })
