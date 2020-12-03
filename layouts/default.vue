<template lang="pug">
  div
    Navbar
    DatePicker(v-model="dateAttribute")
    Nuxt
</template>

<script>
import Navbar from "@/components/Navbar";
import DatePicker from "@/components/DatePicker";

export default {
  components: {
    Navbar,
    DatePicker
  },
  data() {
    return {
      dateAttribute: '3/12/2020'
    }
  }
};
</script>

<style lang="stylus">
  html 
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
</style>
