// Middleware ограничивающий доступ не некоторые страницы если пользователь не администратор
export default function({store, redirect}) {
    if (!store.getters['getAuthUser'] || store.getters['getAuthUser'].type !== "admin") {
        redirect('/login')
    }   
}