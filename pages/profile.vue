<template lang="pug">
  .profile
    .profile-img
      img.user-image(:src="authUser.img")
    .profile-info
      h2 Profile info
      div
        strong Name: 
        span {{authUser.name}}        
      div
        strong Email: 
        span {{authUser.email}}
      div
        strong Type: 
        span {{authUser.type}}
    </div>
  </div>

</template>

<script>
export default {
  middleware: ["auth"],
  computed: {
    authUser() {
      return this.$store.getters["getAuthUser"];
    },
  },
};
</script>

<style lang="stylus">
  .profile 
    margin: 20px auto;
    max-width: 600px;
    height: 280px;
    border: 2px solid gray;
    border-radius: 10px;
    padding: 20px;
    display: flex;  

  .profile-img 
    width: 200px;
    margin-right: 10px;

    img 
      width: 100%;      

  .profile-info 
      font-size: 20px;  
</style>