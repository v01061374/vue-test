<template>
    <div>
        <form action="/">
            <input type="email" name="email" id="login_email" placeholder="email">
            <input type="password" name="password" id="login_password" placeholder="password">
            <input type="password" name="password_confirmation" id="login_password_confirmation">
            <button type="submit" name="submit" class="pure-button pure-button-primary login-button" tabindex="3">register</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "DashboardRegister"
    }
</script>

<style scoped>

</style>