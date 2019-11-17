<template>
        <the-container>
            <the-heading/>
            <div class="content-container">

                            <div style="padding-bottom: 0">

                                    <the-nav-bar/>

                                        <div class="inner-content-container">

                                                        <div class="inner-content">
                                                            <router-view></router-view>
                                                        </div>

                                        </div>


                            </div>

            </div>
            <the-footer/>
        </the-container>

</template>

<script>
    import TheContainer from '@/js/layouts/TheDashboardContainer.vue';
    import TheHeading from '@/js/parts/TheDashboardHeading.vue';
    import TheNavBar from '@/js/parts/TheDashboardNavigationBar.vue';
    import TheFooter from '@/js/parts/TheDashboardFooter.vue';



    export default {
        name: "Dashboard",
        components:{
            TheContainer,
            TheHeading,
            TheNavBar,
            TheFooter
        }
    }
</script>

<style scoped>

</style>