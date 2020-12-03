// Импортируем каталог продуктов и список пользователей из JSON файлов
const products = require('./products.json')
const users = require('./users.json')

export const state = () => ({
    products: products,
    users: users,
    authUser: null,
    authError: null
})

export const mutations = {
    // Добавление в хранилище данных об авторизованном на данный момент пользователе
    setAuthUser(state, user) {
        state.authUser = user
    },

    // Добавление сообщения об ошибке в случае не верно введенных данных при авторизации
    setAuthError(state) {
        state.authError = "Wrong credentials, please try again"
    },

    // Удаление ошибки в случае правильно введенных данных
    clearAuthError(state) {
        state.authError = null
    },

    // Замена существующего продукта на продукт с обновленными данными
    updateEditedProduct(state, editedProduct) {
        // Находим в массиве продуктов индекс продукта, который нужно обновить
        let oldProduct = state.products.find(product => product.id === editedProduct.id)
        let index = state.products.indexOf(oldProduct)

        // Заменяем старый продукт на продукт с новыми данными
        state.products[index] = editedProduct
    },

    // Добавление нового продукта
    addNewProduct(state, newProduct) {
        // Находим наибольший доступный id (исходим из того, что продукты в массиве могут быть не отсортированы по id)
        let currentLargestId = 0;
        state.products.forEach(product => product.id > currentLargestId ? currentLargestId = product.id : '')

        // Присваеваем новому продукту id
        newProduct.id = currentLargestId+1

        // Добавляем новый товар в начало массива
        state.products.unshift(newProduct)
    },

    // Удаление продукта
    deleteProduct(state, productId) {
        // Находим в массиве продуктов индекс продукта, который нужно удалить
        let oldProduct = state.products.find(product => product.id === productId)
        let index = state.products.indexOf(oldProduct)

        // Удаляем продукт
        state.products.splice(index, 1)
    }
}

export const actions = {
    login({ commit, state }, userCredentials) {
        // Находим пользователя с введенным емейлом в стейте
        let authUser = state.users.filter(user => user.email === userCredentials.email)[0]

        // Проверяем нашелся ли пользователь с таким емейлом
        if (!authUser) return commit('setAuthError')

        // Поверяем совпадает ли пароль
        if (authUser.password !== userCredentials.password) return commit('setAuthError')

        // Сброс ошибки если данные введены верно
        commit('clearAuthError')

        // Устанавливаем данного пользователя как текущего авторизованного
        commit('setAuthUser', authUser)
        this.$router.push('/')
    },

    logout({ commit }) {
        commit('setAuthUser', null)
        this.$router.push('/login')
    },

    // Редактирование существующего продукта
    updateProduct({ commit }, editedProduct) {
        commit('updateEditedProduct', editedProduct)
        this.$router.push('/')
    },

    // Добавление нового продукта
    addProduct({ commit }, newProduct) {
        commit('addNewProduct', newProduct)
        this.$router.push('/')
    },

    // Удаление продукта
    delete({commit}, productId) {
        commit('deleteProduct', productId)
    }
}

export const getters = {
    getProducts: state => state.products, // Получение списка всех продуктов
    getAuthError: state => state.authError, // Вывод ошибки в случае некорректных данных при авторизации
    getAuthUser: state => state.authUser, // Получение данных авторизованного пользователя
    getAllUsers: state => state.users, // Получение списка всех пользователей
    getProductToEdit: state => productId => state.products.filter(product => product.id === productId)[0] // Получение данных о редактируемом продукте
}