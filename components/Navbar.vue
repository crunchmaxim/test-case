<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-light.bg-info
  nuxt-link.navbar-brand(to="/") Navbar
  #navbarNav.collapse.navbar-collapse
    ul.navbar-nav
      li.nav-item
        nuxt-link.nav-link(exact, active-class="active", to="/") Catalog
      li.nav-item
        nuxt-link.nav-link(active-class="active", to="/profile") Profile
      li.nav-item(v-if="authUser && authUser.type === 'admin'")
        nuxt-link.nav-link(active-class="active", to="/users") Users List
    </ul>

    ul.navbar-nav.ml-auto
      .user-info(v-if="authUser") {{ authUser.email }}
      nuxt-link.nav-link(v-if="!authUser", active-class="active", to="/login") Login
      a.nav-link(v-else, active-class="active", href="#", @click="logout") Logout
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    authUser() {
      return this.$store.getters["getAuthUser"];
    },
  },
  methods: {
    logout() {
      return this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="stylus">
  .user-info 
    display: flex;
    align-items: center;  
</style>