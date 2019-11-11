<template>
    <div>
        <div class="tabs-container">
            <div>
                <div></div>
                <div>
                    <div style="padding-bottom: 0;"></div>
                </div>
                <tabs-bar :is-primary="true" :tabs="tabs"></tabs-bar>
                <router-view></router-view>
            </div>
        </div>
    </div>

</template>

<script>
    import TabsBar from '@/js/parts/DashboardTabsBar.vue';
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
                        'url': 'revenue',
                        'type': 'link'
                    },
                    'profit-and-loss': {
                        'text': 'سود و ضرر',
                        'url': 'profit-and-loss',
                        'type': 'link'
                    },
                    'balance-sheet': {
                        'text': 'ترازنامه',
                        'url': 'balance-sheet',
                        'type': 'link'
                    },
                    'cash-flow': {
                        'text': 'ورودی مالی',
                        'url': 'cash-flow',
                        'type': 'link'
                    },
                    'download-and-print': {
                        'text': 'دانلود و چاپ',
                        'url': 'download-and-print',
                        'type': 'action',
                    },

                }
            }
        }

    }
</script>

<style scoped>

</style>