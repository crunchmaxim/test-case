// Middleware ограничивающий доступ не некоторые страницы неавторизованных пользователей
export default function({store, redirect}) {
    if (!store.getters['getAuthUser']) {
        redirect('/login')
    }   
}