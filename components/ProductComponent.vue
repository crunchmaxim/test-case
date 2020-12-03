<template lang="pug">
  .col-sm-4.mt-4
    .card
      img.card-img-top(:src="img")
      .card-body
        h5.card-title {{title}}
        p.card-text(style="height: 144px") {{description}}
        div.d-flex.justify-content-between(v-if="authUser && (authUser.type==='admin' || authUser.type==='manager')")
          //- При переходе на страницу редактирования продукта, в URL передается так же id продукта,
          //- этот id используется для получения данных редактируемого продукта из хранилища
          nuxt-link.btn.btn-warning(:to="'/product?edit_id=' + id") Edit product 
          a.btn.btn-danger(@click="deleteProduct") Delete
</template>

<script>
export default {
  name: "ProductComponent",
  props: {
    title: String,
    description: String,
    img: String,
    id: Number
  },
  computed: {
    authUser() {
      return this.$store.getters['getAuthUser']
    }
  },
  methods: {
    deleteProduct() {
      return this.$store.dispatch('delete', this.id)
    }
  }
};
</script>

<style lang="stylus">
</style>