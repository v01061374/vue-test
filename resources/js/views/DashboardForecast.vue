<template>

        <div class="tabs-container">

                <tabs-bar :is-primary="true" :tabs="tabs"></tabs-bar>
                <router-view></router-view>

        </div>


</template>

<script>
    import TabsBar from './../parts/DashboardTabsBar';
    export default {
        name: "DashboardForecast",
        components:{
            TabsBar
        },
        data(){
            return{
                tabs: {
                    'forecast-tables': {
                        'text': 'جداول مالی',
                        'url': '/dashboard/forecast/financial-tables',
                        'type': 'link'
                    },
                    'profit-and-loss': {
                        'text': 'سود و ضرر',
                        'url': '/dashboard/forecast/profit-and-loss',
                        'type': 'link'
                    },
                    'balance-sheet': {
                        'text': 'ترازنامه',
                        'url': '/dashboard/forecast/balance-sheet',
                        'type': 'link'
                    },
                    'cash-flow': {
                        'text': 'ورودی مالی',
                        'url': '/dashboard/forecast/cash-flow',
                        'type': 'link'
                    },
                    'download-and-print': {
                        'text': 'دانلود و چاپ',
                        'url': '/dashboard/forecast/download-and-print',
                        'type': 'action',
                    },

                }
            }
        }

    }
</script>

<style scoped>

</style>