// Middleware ограничивающий доступ не некоторые страницы если это обычный пользователь (не администратор и не менеджер)
export default function({store, redirect}) {
    if (store.getters['getAuthUser'] && store.getters['getAuthUser'].type === "user") {
        redirect('/')
    }   
}