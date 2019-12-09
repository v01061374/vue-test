import Vue from 'vue';
import VueRouter from 'vue-router';




import Dashboard from './views/Dashboard.vue';
import Forecast from './views/DashboardForecast.vue';
import FinancialTables from './views/DashboardForecastFinancialTables.vue';
import ProfitAndLoss from "./views/DashboardForecastProfitAndLoss";
import BalanceSheet from "./views/DashboardForecastBalanceSheet";
import CashFlow from "./views/DashboardForecastCashFlow";
import Revenue from "./views/DashboardForecastRevenue";
import DirectCosts from "./views/DashboardForecastDirectCosts";
import Personnel from "./views/DashboardForecastPersonnel";
import Expenses from "./views/DashboardForecastExpenses";
import Assets from "./views/DashboardForecastAssets";
import Taxes from "./views/DashboardForecastTaxes";
import Dividends from "./views/DashboardForecastDividends";
import CashFlowAssumptions from "./views/DashboardForecastCashFlowAssumptions";
import Financing from "./views/DashboardForecastFinancing";




Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/dashboard',
            name: 'dashboard.index',
            component: Dashboard,
            children: [
                {
                    path: '/dashboard/forecast',
                    component: Forecast,
                    name: 'dashboard.forecast',

                    children: [
                        {
                            path: '/dashboard/forecast/financial-tables',
                            component: FinancialTables,
                            name: 'dashboard.forecast.financialTables',
                            redirect: { name: 'dashboard.forecast.financialTables.revenue' },
                            children:[
                                {
                                    path: 'revenue',
                                    component: Revenue,
                                    name: 'dashboard.forecast.financialTables.revenue',
                                },
                                {
                                    path: 'direct-costs',
                                    component: DirectCosts,
                                    name: 'dashboard.forecast.financialTables.direct-costs',
                                },
                                {
                                    path: 'personnel',
                                    component: Personnel,
                                    name: 'dashboard.forecast.financialTables.personnel',
                                },
                                {
                                    path: 'expenses',
                                    component: Expenses,
                                    name: 'dashboard.forecast.financialTables.expenses',
                                },
                                {
                                    path: 'assets',
                                    component: Assets,
                                    name: 'dashboard.forecast.financialTables.assets',
                                },
                                {
                                    path: 'taxes',
                                    component: Taxes,
                                    name: 'dashboard.forecast.financialTables.taxes',
                                },
                                {
                                    path: 'dividends',
                                    component: Dividends,
                                    name: 'dashboard.forecast.financialTables.dividends',
                                },
                                {
                                    path: 'cash-flow-assumptions',
                                    component: CashFlowAssumptions,
                                    name: 'dashboard.forecast.financialTables.cashFlowAssumptions',
                                },
                                {
                                    path: 'financing',
                                    component: Financing,
                                    name: 'dashboard.forecast.financialTables.financing',
                                },


                            ]

                        },
                        {
                            path: 'profit-and-loss',
                            component: ProfitAndLoss,
                            name: 'dashboard.forecast.profitAndLoss',
                        },
                        {
                            path: 'balance-sheet',
                            component: BalanceSheet,
                            name: 'dashboard.forecast.balanceSheet',
                        },
                        {
                            path: 'cash-flow',
                            component: CashFlow,
                            name: 'dashboard.forecast.cashFlow',
                        },

                    ]


                }
            ]
        }
    ]
});
export default router;