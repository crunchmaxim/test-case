<template lang="pug">
.container
  h1 Users List
  user-component(
    v-for="user in allUsers",
    :key="user.id",
    :id="user.id",
    :name="user.name",
    :email="user.email",
    :type="user.type",
    :img="user.img"
  )
</template>

<script>
import UserComponent from "@/components/UserComponent";

export default {
  middleware: ["admin"],
  components: {
    UserComponent,
  },
  computed: {
    allUsers() {
      return this.$store.getters["getAllUsers"];
    },
  },
};
</script>

<style lang="stylus">
</style>