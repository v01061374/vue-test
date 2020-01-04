<template>
    <div>
        <form action="#" @submit.prevent="login">
            <input required type="email" name="email" id="login_email" placeholder="email" v-model="username">
            <input required type="password" name="password" id="login_password" placeholder="password" v-model="password">
            <button type="submit" name="submit" class="pure-button pure-button-primary login-button" tabindex="3">login</button>
            <!--<input type="password" name="password_confirmation" id="">-->
        </form>
    </div>
</template>

<script>
    export default {
        name: "DashboardLogin",
        data: function () {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            login: function(){
                let username = this.username;
                let password = this.password;
                this.$store.dispatch('user/login', {username, password}).then(
                    ()=>
                        this.$router.push(this.$route.query.redirect || this.$router.push({name: 'afterLogInRoute'}))
                ).catch(() => {})
            }
        }
    }
</script>

<style scoped>

</style>