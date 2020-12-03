<template lang="pug">
  .card.mt-3
    .user
      .user-img
        img(:src="img")
      .user-info
        div
          strong id: 
          span {{id}}
        div
          strong Name: 
          span {{name}}
        div
          strong Email: 
          span {{email}}
        div
          strong Type: 
          span {{type}}
</template>

<script>
export default {
  name: "UserComponent",
  props: {
    email: String,
    id: Number,
    img: String,
    name: String,
    type: String,
  },
};
</script>

<style lang="stylus">
  .user 
    height: 150px;
    display: flex;
    font-size: 20px;

    .user-img 
      width: 150px;
      padding: 10px;

      img 
        width: 100%;  
    
    .user-info 
        display: flex;
        flex-direction: column;
        align-items: flex-start;     
</style>