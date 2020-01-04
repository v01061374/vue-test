<template>
    <div>
        <form @submit.prevent="register">
            <input type="email" name="email" id="register_email" placeholder="email" v-model="email">
            <input type="text" name="name" id="register_name" placeholder="name" v-model="name">
            <input type="password" name="password" id="login_password" placeholder="password" v-model="password">
            <input type="password" name="password_confirmation" id="login_password_confirmation" placeholder="password again" v-model="password_confirmation">
            <button type="submit" name="submit" class="pure-button pure-button-primary login-button" tabindex="3">register</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "DashboardRegister",
        data(){
            return {
                email: '',
                password: '',
                name: '',
                password_confirmation: ''
            }
        },
        methods: {
            register: function(){
                let email = this.email;
                let password = this.password;
                let password_confirmation = this.password_confirmation;
                let name = this.name;
                let $this = this;
                if(password === password_confirmation){
                    this.$store.dispatch('user/register',
                        {email: email, name: name, password: password, password_confirmation: password_confirmation})
                        .then(function (response) {

                            $this.$store.dispatch('user/login', {username:email, password:password}).then(
                                function(r) {
                                    return  $this.$router.push($this.$route.query.redirect || $this.$router.push({name: 'afterLogInRoute'}))
                            }).catch(() => {})
                        }
                    ).catch(() => {})
                }
            }
        }
    }
</script>

<style scoped>
    /*1 - modiriat va sabte brand*/
    /*2 - haman gheimat baraye shoma dar eine afzayeshe forush*/
    /*3 - bad az sabte brand -> gostareshe nam e brand*/
</style>