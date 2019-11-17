<template>
    <fragment>
        <tabs-bar :is-primary="false" :tabs="tabs"></tabs-bar>
        <router-view></router-view>
    </fragment>
</template>

<script>
    import { Fragment } from 'vue-fragment';
    import TabsBar from '@/js/parts/DashboardTabsBar';
    export default {
        name: "DashboardForecastFinancialTables",
        components:{
            Fragment,
            TabsBar
        },
        data(){
            return{
                tabs: {
                    'revenue': {
                        'text': 'درآمد',
                        'url': 'revenue',
                        'type': 'link'
                    },
                    'direct-costs': {
                        'text': 'هزینه های مستقیم',
                        'url': 'direct-costs',
                        'type': 'link'
                    },
                    'personnel': {
                        'text': 'پرسنل',
                        'url': 'personnel',
                        'type': 'link'
                    },
                    'expenses': {
                        'text': 'مخارج',
                        'url': 'expenses',
                        'type': 'link'
                    },
                    'assets': {
                        'text': 'دارایی ها',
                        'url': 'assets',
                        'type': 'link'
                    },
                    'taxes': {
                        'text': 'مالیات',
                        'url': 'taxes',
                        'type': 'link'
                    },
                    'dividends': {
                        'text': 'سهام ها',
                        'url': 'dividends',
                        'type': 'link'
                    },
                    'cash-flow-assumptions': {
                        'text': 'مفروضات جریان های مالی',
                        'url': 'cash-flow-assumptions',
                        'type': 'link'
                    },
                    'financing': {
                        'text': 'سرمایه گذاری',
                        'url': 'financing',
                        'type': 'link'
                    },


                }
            }
        }
    }
</script>

<style scoped>

</style>