<template lang="pug">
  .container
    h1 Products Catalog
    nuxt-link.btn.btn-info(to="/product" v-if="authUser && (authUser.type === 'admin' || authUser.type === 'manager')") + Add new product
    .row
        product-component(
          v-for="product in products"
          :key="product.id"
          :title="product.title"
          :description="product.description"
          :img="product.img"
          :id="product.id"
          )
</template>

<script>
import ProductComponent from "@/components/ProductComponent"

export default {
  components: {
    ProductComponent
  },
  computed: {
    products() {
      // Получение списка продуктов из хранилища
      return this.$store.getters['getProducts']
    },
    authUser() {
      // Получение данных об авторизованном пользователе
      return this.$store.getters['getAuthUser']
    }
  }
}
</script>

<style lang="stylus">
</style>
