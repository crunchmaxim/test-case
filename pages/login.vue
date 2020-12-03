<template lang="pug">
.login-wrapper
    h1 Login
    form(@submit.prevent="onLogin")
        .form-group
            label(for="email") Email address
            input.form-control(type="email" id="email" placeholder="Enter email" required v-model="email")
        .form-group
            label(for="password") Password
            input.form-control(type="password" id="password" placeholder="Password" required v-model="password")
        .alert.alert-danger(role="alert" v-if="error") {{error}}
        button.btn.btn-info(type="submit") Login
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        onLogin() {
            let userCredentials = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('login', userCredentials)
        }
    },
    computed: {
        error() {
            return this.$store.getters['getAuthError']
        }
    }
};
</script>

<style lang="stylus">
    .login-wrapper
        width: 500px;
        margin: 20px auto;
        border: 2px solid gray;
        border-radius: 10px;
        padding: 20px;

        h1
            text-align: center;

</style>