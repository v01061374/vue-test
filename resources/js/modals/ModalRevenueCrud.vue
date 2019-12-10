<template>
    <base-modal show-modal="true" @close="close">
        <template #header>
            <p v-if="revenue">
                درباره"{{revenue.title}}"
            </p>
            <p v-else>
                درباره این درآمد بگویید
            </p>
        </template>
        <template #content>
            <ul class="navigation-stripe">
                <li :class="['step-link', {'active': currentTab === 0 }]" tabindex="0" aria-selected="true" @click="setCurrentTab(0)">
            <span class="circle" aria-label="step 1:">
            1
            </span>
                    نام
                </li>
                <li :class="['step-link', {'active': currentTab === 1 }]" tabindex="1" @click="setCurrentTab(1)">
            <span class="circle" aria-label="step 2:">
            2
            </span>
                    نوع
                </li>
                <li v-if="getRevenueType()===REVENUE_TYPE_UNIT_SALES" :class="['step-link', {'active': currentTab === 2 }]" tabindex="2" @click="setCurrentTab(2)">
                    <span class="circle" aria-label="step 3:">
                    3
                    </span>
                    تعداد فروش
                </li>
                <li  v-if="getRevenueType()===REVENUE_TYPE_UNIT_SALES" :class="['step-link', {'active': currentTab === 3 }]" tabindex="3" @click="setCurrentTab(3)">
                    <span class="circle" aria-label="step 4:">
                    4
                    </span>
                    قیمت واحد
                </li>


                <li v-if="getRevenueType()===REVENUE_TYPE_BILLABLE_HOURS" :class="['step-link', {'active': currentTab === 2 }]" tabindex="2" @click="setCurrentTab(2)">
                    <span class="circle" aria-label="step 3:">
                    3
                    </span>
                    پرداخت ساعتی
                </li>
                <li v-if="getRevenueType()===REVENUE_TYPE_BILLABLE_HOURS" :class="['step-link', {'active': currentTab === 3 }]" tabindex="3" @click="setCurrentTab(3)">
                    <span class="circle" aria-label="step 4:">
                    4
                    </span>
                    نرخ پرداخت ساعتی
                </li>


                <li v-if="getRevenueType()===REVENUE_TYPE_RECURRING_CHANGES" :class="['step-link', {'active': currentTab === 2 }]" tabindex="2" @click="setCurrentTab(2)">
                    <span class="circle" aria-label="step 3:">
                    3
                    </span>
                    ثبت نام ها
                </li>
                <li v-if="getRevenueType()===REVENUE_TYPE_RECURRING_CHANGES" :class="['step-link', {'active': currentTab === 3 }]" tabindex="3" @click="setCurrentTab(3)">
                    <span class="circle" aria-label="step 4:">
                    4
                    </span>
                    شارژ دوره ای
                </li>
                <li v-if="getRevenueType()===REVENUE_TYPE_RECURRING_CHANGES" :class="['step-link', {'active': currentTab === 4 }]" tabindex="4" @click="setCurrentTab(4)">
                    <span class="circle" aria-label="step 4:">
                    5
                    </span>
                    churn rate
                </li>
                <!--TODO IMPORTANT: get translations-->
                <li v-if="getRevenueType()===REVENUE_TYPE_REVENUE_ONLY" :class="['step-link', {'active': currentTab === 2 }]" tabindex="2" @click="setCurrentTab(2)">
                    <span class="circle" aria-label="step 3:">
                    3
                    </span>
                    منبع مالی
                </li>
            </ul>
            <div>
                <div>
                    <!--TODO resolve extra height caused by extra 30px paddings-->
                    <div class="section" v-if="currentTab===0">

                        <div class="title-top">
                            نام آن چیست؟
                        </div>
                        <div class="error">
                            <div class="max-length-input-container">
                                <input type="text"
                                       :class="['input-box', 'description' , $v.tempRevenueName.$error ? 'error' : '']"
                                       placeholder="لورم لورم"
                                       v-model.trim="$v.tempRevenueName.$model" :maxlength="255">
                                <span class="count-down-wrapper">
                                    {{(255 - tempRevenueName.length >= 0)? 255 - tempRevenueName.length : 0}}
                                </span>
                                <div class="feedback-line">
                                    <p v-if="$v.tempRevenueName.$error && !$v.tempRevenueName.required">
                                        مقداری را وارد کنید
                                    </p>
                                    <p v-if="$v.tempRevenueName.$error && !$v.tempRevenueName.maxLength">
                                        حداکثر طول 255 کاراکتر است.
                                    </p>
                                    <p v-if="$v.tempRevenueName.$error && $v.tempRevenueName.required && !$v.tempRevenueName.test">
                                        ارور چک با دیتابیس
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="section" v-if="currentTab===1">
                        <div class="title-top">نوع درآمد؟</div>
                        <div class="radio-buttons-list rtl" tabindex="0" role="radiogroup">
                            <p class="radio-right">
                                <input  v-model="$v.tempRevenueType.$model"
                                       type="radio" name="revenueType" class="radio-style" :value="REVENUE_TYPE_UNIT_SALES">
                                <label>تعداد فروش</label>
                            </p>
                            <p class="description">
                                Best for products that are sold in individual units or set quantities
                            </p>
                            <p class="radio-right">
                                <input  v-model="$v.tempRevenueType.$model"
                                       type="radio" name="revenueType" class="radio-style" :value="REVENUE_TYPE_BILLABLE_HOURS">
                                <label>
                                    Billable hours
                                </label>
                            </p>
                            <p class="description">
                                Best for services that are priced on a per-hour basis
                            </p>
                            <p class="radio-right">
                                <input  v-model="$v.tempRevenueType.$model"
                                       type="radio" name="revenueType" class="radio-style" :value="REVENUE_TYPE_RECURRING_CHANGES">
                                <label>
                                    Recurring charges
                                </label>
                            </p>
                            <p class="description">
                                Best for subscriptions, memberships, rentals, web apps, or other offerings with
                                monthly or periodic
                            </p>
                            <p class="radio-right">
                                <input v-model="$v.tempRevenueType.$model"
                                       type="radio" name="revenueType" class="radio-style" :value="REVENUE_TYPE_REVENUE_ONLY">
                                <label>
                                    Revenue only
                                </label>
                            </p>
                            <p class="description">
                                If none of the models above are applicable, or you already have a detailed
                                forecast in Excel or elsewhere, choose this option to just enter overall revenue
                                values without any detail
                            </p>
                        </div>
                    </div>
                    <!--<div class="forecast-item-editor" v-if="getRevenueType===REVENUE_TYPE_UNIT_SALES && currentTab===2">-->
                        <!--<div>-->
                            <!--<div class="section" style="margin-bottom: 30px">-->
                                <!--<div class="title-top">-->
                                    <!--How many units will you sell?-->
                                <!--</div>-->
                                <!--<p class="title-content">-->
                                    <!--How best to define a 'unit' depends on what you sell. If you offer widgets,-->
                                    <!--just enter the quantity of those widgets (shirts or computers or whatever)-->
                                    <!--you think you'll sell. For other offerings, you might want to use units to-->
                                    <!--mean consulting engagements or fixed-price contracts or pallets of low-value-->
                                    <!--materials. Do what makes sense for your business.-->
                                <!--</p>-->
                                <!--<div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"-->
                                     <!--aria-orientation="horizontal">-->
                                    <!--<ul>-->
                                        <!--<li class="horizontal">-->
                                            <!--<label>-->
                                                <!--<input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_CONSTANT"-->
                                                       <!--v-model="unitPriceType">-->
                                                <!--&lt;!&ndash; react-text: 131 &ndash;&gt;لورم&lt;!&ndash; /react-text &ndash;&gt;-->
                                            <!--</label>-->
                                        <!--</li>-->
                                        <!--<li class="horizontal">-->
                                            <!--<label>-->
                                                <!--<input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"-->
                                                       <!--v-model="unitPriceType">-->
                                                <!--&lt;!&ndash; react-text: 135 &ndash;&gt;Varying amounts over time-->
                                                <!--&lt;!&ndash; /react-text &ndash;&gt;-->
                                            <!--</label>-->
                                        <!--</li>-->
                                    <!--</ul>-->
                                    <!--<div class="clear"></div>-->

                                <!--</div>-->
                                <!--&lt;!&ndash;TODO constant amount selected (delete this todo&ndash;&gt;-->
                                <!--<div v-if="getRevenueType()===MEASURE_TYPE_CONSTANT">-->
                                    <!--<div class="input-with-dropdown length-selection">-->
                                        <!--<input type="number"-->
                                               <!--class="faNum input-box _36slfUixQ4wAFF1EUIGq5f error medium-cash"-->
                                               <!--v-model.trim="$v.tempConstantServiceCount.$model">-->
                                        <!--<div>-->
                                            <!--<span class="per">به ازای</span>-->
                                            <!--<drop-down v-model="selectedLength" :options="lengthOptions"-->
                                                       <!--optionLabel="title" optionValue="code"-->
                                                       <!--scrollHeight="100px"/>-->
                                        <!--</div>-->
                                        <!--<div class="clear"></div>-->
                                    <!--</div>&lt;!&ndash; react-empty: 148 &ndash;&gt;-->
                                <!--</div>-->
                                <!--<div v-if="unitSalesTypeIsConstant==='0'">-->

                                    <!--variable-->
                                    <!--&lt;!&ndash;<div class="financial-year-box" role="grid">&ndash;&gt;-->
                                        <!--&lt;!&ndash;<div class="financial-year-box-container">&ndash;&gt;-->
                                            <!--&lt;!&ndash;<div class="financial-year-box-wrapper"&ndash;&gt;-->
                                                 <!--&lt;!&ndash;style="height: 400px; width: 964px">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<div class="financial-year-box-header">&ndash;&gt;-->
                                                        <!--&lt;!&ndash;<p>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<strong class="faNum">1398 - </strong>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;فلان فلان فلان&ndash;&gt;-->
                                                        <!--&lt;!&ndash;</p>&ndash;&gt;-->
                                                        <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<div class="financial-year-box-header-controls">&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>تغییرات</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"&ndash;&gt;-->
                                                                         <!--&lt;!&ndash;style="width: 87px;">&ndash;&gt;-->
                                                                                <!--&lt;!&ndash;<span aria-hidden="true"&ndash;&gt;-->
                                                                                      <!--&lt;!&ndash;class="percent">%</span>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model="annualSalesUnitShiftPercent">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<button class="overlay-button primary"&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;@click="shiftAnnualSalesUnitChart()"&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;tabindex="-1">اعمال&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</button>&ndash;&gt;-->

                                                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<div class="financial-year-chart-container">&ndash;&gt;-->
                                                        <!--&lt;!&ndash;<highcharts class="chart"&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;:options="annualUnitSalesChartOptions"&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;:updateArgs="updateArgs"&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;@redraw="consolelog()"></highcharts>&ndash;&gt;-->
                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<div class="financial-year-input-container">&ndash;&gt;-->
                                                        <!--&lt;!&ndash;<ul class="labels faNum">&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>1398</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number" disabled readOnly&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;:value="currentYearAnnualUnitSales">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>فروردین</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model.number="annualSalesUnitPeriodsData[0]"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;@input="updateAnnualSalesUnitChart($event.target.value , 0)">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>اردیبهشت</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model.number="annualSalesUnitPeriodsData[1]"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;@input="updateAnnualSalesUnitChart($event.target.value, 1)">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>خرداد</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model.number="annualSalesUnitPeriodsData[2]"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;@input="updateAnnualSalesUnitChart($event.target.value, 2)">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>فروردین</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model.number="annualSalesUnitPeriodsData[3]"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;@input="updateAnnualSalesUnitChart($event.target.value, 3)">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>فروردین</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model.number="annualSalesUnitPeriodsData[4]"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;@input="updateAnnualSalesUnitChart($event.target.value, 4)">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>فروردین</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model.number="annualSalesUnitPeriodsData[5]"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;@input="updateAnnualSalesUnitChart($event.target.value,5)">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>فروردین</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model.number="annualSalesUnitPeriodsData[6]"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;@input="updateAnnualSalesUnitChart($event.target.value, 6)">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>فروردین</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model.number="annualSalesUnitPeriodsData[7]"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;@input="updateAnnualSalesUnitChart($event.target.value, 7)">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>فروردین</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model.number="annualSalesUnitPeriodsData[8]"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;@input="updateAnnualSalesUnitChart($event.target.value, 8)">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>فروردین</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model.number="annualSalesUnitPeriodsData[9]"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;@input="updateAnnualSalesUnitChart($event.target.value, 9)">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>فروردین</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model.number="annualSalesUnitPeriodsData[10]"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;@input="updateAnnualSalesUnitChart($event.target.value, 10)">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>اسفند</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;v-model.number="annualSalesUnitPeriodsData[11]"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;@input="updateAnnualSalesUnitChart($event.target.value, 11)">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>1399</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="text" value="">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<p>1340</p>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;<div class="valid">&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"&ndash;&gt;-->
                                                                               <!--&lt;!&ndash;type="text" value="">&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;<div class="fillRightDots"&ndash;&gt;-->
                                                                             <!--&lt;!&ndash;aria-hidden="true">&ndash;&gt;-->
                                                                            <!--&lt;!&ndash;&nbsp;&ndash;&gt;-->
                                                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                            <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                                        <!--&lt;!&ndash;</ul>&ndash;&gt;-->
                                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                <!--</div> &lt;!&ndash;TODO variable amount selected (delete this todo&ndash;&gt;-->


                                <!--&lt;!&ndash;TODO constant amount selected (delete this todo&ndash;&gt;-->

                            <!--</div>-->

                            <!--&lt;!&ndash;TODO constant amount selected (delete this todo&ndash;&gt;-->
                            <!--<div class="section" style="margin-bottom: 30px"-->
                                 <!--v-if="unitSalesTypeIsConstant==='1'">-->
                                <!--<div class="title-top">-->
                                    <!--When will this revenue start?-->
                                <!--</div>-->
                                <!--<div class="select-box period-selection">-->
                                    <!--<div class="valid">-->
                                        <!--<drop-down v-model="selectedPeriod" :options="periodOptions"-->
                                                   <!--optionLabel="title" optionValue="code" scrollHeight="150px"/>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;TODO constant amount selected (delete this todo&ndash;&gt;-->

                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
        </template>
        <template #footer>
            <div class="modal-footer-control-container right">
                <div>
                    <div v-if="isDeleting === false" class="trash-delete">
                        <a class="trashcan" role="button" aria-label="Delete">
                                <span class="trash-text" @click.prevent="toggleIsDeleting()">
                                    حذف
                                </span>
                        </a>
                    </div>
                    <div v-if="isDeleting === true" id="trash-confirm" aria-live="assertive">
                        <div class="trashcan-confirm">
                                <span class="trash-text-confirm">
                                    <p>آیا اطمینان دارید?</p>
                                    <a @click.prevent="deleteRecord()" role="button" tabindex="1">تایید</a>
                                    <span>
                                        یا
                                    </span>
                                    <a @click.prevent="toggleIsDeleting()" role="button" tabindex="2" >
                                        لغو
                                    </a>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer-controls-container left" v-if="currentTab===0">
                <button :class="['modal-button','primary', ($v.tempRevenueName.$error || !tempRevenueName.length)? 'disabled' : '']" tabindex="0">بعدی</button>
                <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
            </div>
            <div class="modal-footer-controls-container left" v-if="currentTab===1">
                <button :class="['modal-button','primary', ($v.tempRevenueType.$invalid)? 'disabled' : '']" tabindex="0">بعدی</button>
                <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
            </div>
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===20 && currentTab===3">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===21 && currentTab===2">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->

            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===21 && currentTab===3">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===22 && currentTab===2">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===21 && currentTab===2">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===22 && currentTab===3">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===22 && currentTab===4">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===23 && currentTab===2">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->

        </template>
    </base-modal>
</template>

<script>

    const NOT_SELECTED = -1;const REVENUE_TYPE_UNIT_SALES = 0;const REVENUE_TYPE_BILLABLE_HOURS = 1;const REVENUE_TYPE_RECURRING_CHANGES = 2;
    const REVENUE_TYPE_REVENUE_ONLY = 3;const MEASURE_TYPE_FREE = 0;const MEASURE_TYPE_CONSTANT = 1;const MEASURE_TYPE_VARIABLE = 2;
    const LENGTH_MONTH = 'm';const LENGTH_YEAR = 'y';const FAR_1398 = 1;const ORD_1398 = 2;const KHO_1398 = 3;const TIR_1398 = 4;
    const MOR_1398 = 5;const SHAH_1398 = 6;const MEHR_1398 = 7;const ABA_1398 = 8; const AZAR_1398 = 9; const DEY_1398 = 10;const BAH_1398 = 11;
    const ESF_1398 = 12; const _1399 = 13; const _1400 = 14;

    import BaseModal from './../components/BaseModal';
    import { required, integer, between, maxLength, numeric, minValue } from 'vuelidate/lib/validators';

    export default {
        name: "ModalRevenueCrud",
        data: function(){
            return {
                NOT_SELECTED : -1, REVENUE_TYPE_UNIT_SALES : 0, REVENUE_TYPE_BILLABLE_HOURS : 1, REVENUE_TYPE_RECURRING_CHANGES : 2, 
                REVENUE_TYPE_REVENUE_ONLY : 3, MEASURE_TYPE_FREE : 0, MEASURE_TYPE_CONSTANT : 1, MEASURE_TYPE_VARIABLE : 2, 
                LENGTH_MONTH : 'm', LENGTH_YEAR : 'y', FAR_1398 : 1, ORD_1398 : 2, KHO_1398 : 3, TIR_1398 : 4, 
                MOR_1398 : 5, SHAH_1398 : 6, MEHR_1398 : 7, ABA_1398 : 8, AZAR_1398 : 9, DEY_1398 : 10, BAH_1398 : 11, 
                ESF_1398 : 12, _1399 : 13, _1400 : 14,

                isDeleting: false,
                currentTab: 0,
                periodsOptions: [
                    {title: 'ماه', code: LENGTH_MONTH},
                    {title: 'سال', code: LENGTH_YEAR},
                ],
                startOptions :[
                    {title: 'فروردین 1398', code: FAR_1398},
                    {title: 'اردیبهشت 1398', code: ORD_1398},
                    {title: 'خرداد 1398', code: KHO_1398},
                    {title: 'تیر 1398', code: TIR_1398},
                    {title: 'مرداد 1398', code: MOR_1398},
                    {title: 'شهریور 1398', code: SHAH_1398},
                    {title: 'مهر 1398', code: MEHR_1398},
                    {title: 'آبان 1398', code: ABA_1398},
                    {title: 'آذر 1398', code: AZAR_1398},
                    {title: 'دی 1398', code: DEY_1398},
                    {title: 'بهمن 1398', code: BAH_1398},
                    {title: 'اسفند 1398', code: ESF_1398},
                    {title: '1399', code: _1399},
                    {title: '1400', code: _1400},
                ],
                revenueStart : FAR_1398,
                // tab 0
                tempRevenueName: '',
                // tab 1
                tempRevenueType: NOT_SELECTED,
                //type 0 - tab 2 && type 1 - tab 2 && && type 2 - tab 2 && type 3 - tab 1
                tempServiceCountType: MEASURE_TYPE_CONSTANT,
                tempConstantServicePeriod: LENGTH_MONTH, // for type 2 = LENGTH_MONTH
                tempConstantServiceCount: '',
                tempServiceCountPerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                // type 0 - tab 3 && type 1 - tab 3
                tempUnitPriceType: MEASURE_TYPE_CONSTANT,
                tempConstantUnitPrice: '',
                tempUnitPricePerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                // type 2 - tab 3
                tempUpFrontFeeType: MEASURE_TYPE_FREE,
                // constantUpFrontFee: '',
                tempUpFrontFeePerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                tempRecurringChargeType: MEASURE_TYPE_FREE,
                // constantRecurringCharge: '',
                tempRecurringChargePerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                tempRecurringChargeMonthFrequency: 1,
                tempRecurringChargeMonthFrequencyOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                // type 2 - tab 4
                tempChurnRateType: MEASURE_TYPE_CONSTANT,
                // constantChurnRate: '',
                tempChurnRatePerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
            }
        },
        methods: {
            setCurrentTab: function (tab) {
                this.currentTab = tab;
            },
            close() {
                this.$emit('close-modal');
            },
            
            toggleIsDeleting: function(){
                this.isDeleting = !this.isDeleting;
            },
            deleteRecord: function () {
                // TODO implement delete logic
                this.close();
            },
            getRevenueType: function(){
                if(typeof this.revenue !== 'undefined'){
                    return this.revenue.type;
                }
                else{
                    return this.tempRevenueType;
                }
            },
            setRevenueType: function (revenueType) {
                this.tempRevenueType = revenueType;
            }

        },
        validations:{
            tempRevenueName:{
                required,
                maxLength: maxLength(255),
                test: function(value){
                    // TODO server check
                    return true;
                }
            },
            tempRevenueType:{
                required,
                between: between(0,3),
                integer
            },
            tempConstantServiceCount: {
                required,
                numeric,
                minValue: minValue(1)
            }
        },
        props: {
            revenue: {
                type: Object,
            }
        },
        components:{
            BaseModal,
        }
    }
</script>

<style scoped>

</style>