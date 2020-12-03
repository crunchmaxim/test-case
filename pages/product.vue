<template lang="pug">
.container
  h1 Edit product
  form(@submit.prevent="submit")
    .product-wrapper
      .product-img
        img(:src="img")
        .input-group.mt-3
          .input-group-prepend
            span.input-group-text Product image URL
          input.form-control(
            type="text",
            placeholder="Image URL",
            v-model="img",
            required
          )
      .product-info
        .input-group
          .input-group-prepend
            span.input-group-text Product title
          input.form-control(
            type="text",
            placeholder="Title",
            v-model="title",
            required
          )
        .input-group.mt-4
          .input-group-prepend
            span.input-group-text Product description
          textarea.form-control(
            placeholder="Description",
            v-model="description",
            maxlength="220",
            required
          )
    .buttons
      button.btn.btn-info Save
      nuxt-link.btn.btn-danger.ml-3(to="/") Cancel
</template>

<script>
export default {
  middleware: ["auth", "user"],
  data() {
    return {
      img: "",
      title: "",
      description: "",
      id: "",
    };
  },
  mounted() {
    // Если в URL присутствует query параметр 'edit_id' значит мы редактируем уже существующий товар
    // в противном случае, создаем новый. На этом принципе основано разделение логики в компоненте

    // Получение данных редактируемого продукта из хранилища в случае редактирования товара
    // id редактируемого продукта указан в query параметрe
    if (this.$route.query.edit_id) {
      let product = this.$store.getters.getProductToEdit(
        +this.$route.query.edit_id
      );
      this.img = product.img;
      this.title = product.title;
      this.description = product.description;
      this.id = product.id;
    }
  },
  methods: {
    submit() {
      let product = {
        img: this.img,
        title: this.title,
        description: this.description,
      };
      // В зависимости от того, редактируем ли мы продукт или добавляем новый, вызываются разные экшены
      if (this.$route.query.edit_id) {
        // id редактируемого товара указан в query параметре 
        product.id = this.id
        this.$store.dispatch("updateProduct", product);
      } else {
        this.$store.dispatch("addProduct", product);
      }
    },
  },
};
</script>

<style lang="stylus">
  .product-wrapper 
    display: flex;

    .product-info 
      margin-left: 10px;
      width: 100%;

      textarea 
        height: 335px;

    .product-img 
      width: 500px;

      img 
        width: 100%;

  .input-group-text 
    width: 170px;

  .buttons 
    text-align: right;
    margin-top: 10px;
</style>