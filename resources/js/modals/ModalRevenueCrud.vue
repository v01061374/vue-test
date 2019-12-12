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
                    <!--TODO reset data on type change-->
                    <div class="section" v-if="currentTab===0">

                        <div class="title-top">
                            نام آن چیست؟
                        </div>
                        <div class="error">
                            <div class="max-length-input-container">
                                <input type="text"
                                       :class="['input-box', 'description' , $v.tempRevenueName.$error ? 'error' : '']"
                                       placeholder="لورم لورم"
                                       v-model.trim="$v.tempRevenueName.$model" :maxlength="255"
                                       @focusin="nameCounterVisible=true" @focusout="nameCounterVisible=false" >
                                <span class="count-down-wrapper" v-show="nameCounterVisible">
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

                    <div class="forecast-item-editor" v-if="getRevenueType()===REVENUE_TYPE_UNIT_SALES && currentTab===2">

                        <div>
                            <div class="section" style="margin-bottom: 30px">
                                <div class="title-top">
                                    How many units will you sell?
                                </div>
                                <p class="title-content">
                                    How best to define a 'unit' depends on what you sell. If you offer widgets,
                                    just enter the quantity of those widgets (shirts or computers or whatever)
                                    you think you'll sell. For other offerings, you might want to use units to
                                    mean consulting engagements or fixed-price contracts or pallets of low-value
                                    materials. Do what makes sense for your business.
                                </p>
                                <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                     aria-orientation="horizontal">
                                    <ul>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_CONSTANT"
                                                       v-model="tempUnitPriceType">
                                                <!-- react-text: 131 -->لورم<!-- /react-text -->
                                            </label>
                                        </li>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                       v-model="tempUnitPriceType">
                                                <!-- react-text: 135 -->Varying amounts over time
                                                <!-- /react-text -->
                                            </label>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>

                                </div>
                                <!--TODO constant amount selected (delete this todo-->
                                <div v-if="tempServiceCountType===MEASURE_TYPE_CONSTANT">
                                    <div class="input-with-dropdown length-selection">
                                        <input type="number"
                                               :class="['faNum','input-box', '_36slfUixQ4wAFF1EUIGq5f','medium-cash',
                                                $v.tempConstantServiceCount.$error ? 'error' : '' ]"
                                               v-model.trim="$v.tempConstantServiceCount.$model" min="1">
                                        <div>
                                            <span class="per">به ازای</span>
                                            <drop-down v-model="tempConstantServicePeriod" :options="periodsOptions"
                                                       optionLabel="title" optionValue="code"
                                                       scrollHeight="100px"/>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="feedback-line">
                                            <p v-if="$v.tempConstantServiceCount.$error && !$v.tempRevenueName.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div><!-- react-empty: 148 -->
                                </div>
                                <div v-if="tempServiceCountType===MEASURE_TYPE_VARIABLE">
                                    variable
                                    <!--<div class="financial-year-box" role="grid">-->
                                        <!--<div class="financial-year-box-container">-->
                                            <!--<div class="financial-year-box-wrapper"-->
                                                 <!--style="height: 400px; width: 964px">-->
                                                <!--<div>-->
                                                    <!--<div class="financial-year-box-header">-->
                                                        <!--<p>-->
                                                            <!--<strong class="faNum">1398 - </strong>-->
                                                            <!--فلان فلان فلان-->
                                                        <!--</p>-->
                                                        <!--<div>-->
                                                            <!--<div class="financial-year-box-header-controls">-->
                                                                <!--<p>تغییرات</p>-->
                                                                <!--<div>-->
                                                                    <!--<div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"-->
                                                                         <!--style="width: 87px;">-->
                                                                                <!--<span aria-hidden="true"-->
                                                                                      <!--class="percent">%</span>-->
                                                                        <!--<input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model="annualSalesUnitShiftPercent">-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                                <!--<button class="overlay-button primary"-->
                                                                        <!--@click="shiftAnnualSalesUnitChart()"-->
                                                                        <!--tabindex="-1">اعمال-->
                                                                <!--</button>-->

                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</div>-->
                                                    <!--<div class="financial-year-chart-container">-->
                                                        <!--<highcharts class="chart"-->
                                                                    <!--:options="annualUnitSalesChartOptions"-->
                                                                    <!--:updateArgs="updateArgs"-->
                                                                    <!--@redraw="consolelog()"></highcharts>-->
                                                    <!--</div>-->
                                                    <!--<div class="financial-year-input-container">-->
                                                        <!--<ul class="labels faNum">-->
                                                            <!--<li>-->
                                                                <!--<p>1398</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number" disabled readOnly-->
                                                                               <!--:value="currentYearAnnualUnitSales">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>فروردین</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model.number="annualSalesUnitPeriodsData[0]"-->
                                                                               <!--@input="updateAnnualSalesUnitChart($event.target.value , 0)">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>اردیبهشت</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model.number="annualSalesUnitPeriodsData[1]"-->
                                                                               <!--@input="updateAnnualSalesUnitChart($event.target.value, 1)">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>خرداد</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model.number="annualSalesUnitPeriodsData[2]"-->
                                                                               <!--@input="updateAnnualSalesUnitChart($event.target.value, 2)">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>فروردین</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model.number="annualSalesUnitPeriodsData[3]"-->
                                                                               <!--@input="updateAnnualSalesUnitChart($event.target.value, 3)">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>فروردین</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model.number="annualSalesUnitPeriodsData[4]"-->
                                                                               <!--@input="updateAnnualSalesUnitChart($event.target.value, 4)">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>فروردین</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model.number="annualSalesUnitPeriodsData[5]"-->
                                                                               <!--@input="updateAnnualSalesUnitChart($event.target.value,5)">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>فروردین</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model.number="annualSalesUnitPeriodsData[6]"-->
                                                                               <!--@input="updateAnnualSalesUnitChart($event.target.value, 6)">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>فروردین</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model.number="annualSalesUnitPeriodsData[7]"-->
                                                                               <!--@input="updateAnnualSalesUnitChart($event.target.value, 7)">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>فروردین</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model.number="annualSalesUnitPeriodsData[8]"-->
                                                                               <!--@input="updateAnnualSalesUnitChart($event.target.value, 8)">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>فروردین</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model.number="annualSalesUnitPeriodsData[9]"-->
                                                                               <!--@input="updateAnnualSalesUnitChart($event.target.value, 9)">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>فروردین</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model.number="annualSalesUnitPeriodsData[10]"-->
                                                                               <!--@input="updateAnnualSalesUnitChart($event.target.value, 10)">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>اسفند</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="number"-->
                                                                               <!--v-model.number="annualSalesUnitPeriodsData[11]"-->
                                                                               <!--@input="updateAnnualSalesUnitChart($event.target.value, 11)">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>1399</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="text" value="">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                            <!--<li>-->
                                                                <!--<p>1340</p>-->
                                                                <!--<div class="valid">-->
                                                                    <!--<div>-->
                                                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                               <!--type="text" value="">-->
                                                                        <!--<div class="fillRightDots"-->
                                                                             <!--aria-hidden="true">-->
                                                                            <!--&nbsp;-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                            <!--</li>-->
                                                        <!--</ul>-->
                                                    <!--</div>-->
                                                <!--</div>-->
                                            <!--</div>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                </div> <!--TODO variable amount selected (delete this todo-->


                                <!--TODO constant amount selected (delete this todo-->

                            </div>

                            <!--TODO constant amount selected (delete this todo-->
                            <div class="section" style="margin-bottom: 30px"
                                 v-if="tempUnitPriceType===MEASURE_TYPE_CONSTANT">
                                <div class="title-top">
                                    When will this revenue start?
                                </div>
                                <div class="select-box period-selection">
                                    <div class="valid">
                                        <drop-down v-model="revenueStart" :options="startOptions"
                                                   optionLabel="title" optionValue="code" scrollHeight="150px"/>
                                    </div>
                                </div>
                            </div>
                            <!--TODO constant amount selected (delete this todo-->

                        </div>
                    </div>
                    <div class="forecast-item-editor" v-if="getRevenueType()===REVENUE_TYPE_UNIT_SALES && currentTab===3">
                        <div>
                            <div class="section" style="margin-bottom: 30px">
                                <div class="title-top">
                                    قیمت واحد؟
                                </div>
                                <p class="title-content">
                                    How best to define a 'unit' depends on what you sell. If you offer widgets,
                                    just enter the quantity of those widgets (shirts or computers or whatever)
                                    you think you'll sell. For other offerings, you might want to use units to
                                    mean consulting engagements or fixed-price contracts or pallets of low-value
                                    materials. Do what makes sense for your business.
                                </p>


                                <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                     aria-orientation="horizontal">
                                    <ul>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_CONSTANT"
                                                       v-model="tempUnitPriceType">
                                                <!-- react-text: 131 -->لورم<!-- /react-text -->
                                            </label>
                                        </li>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                       v-model="tempUnitPriceType">
                                                <!-- react-text: 135 -->Varying amounts over time
                                                <!-- /react-text -->
                                            </label>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>


                                </div>
                                <!--TODO constant amount selected (delete this todo-->
                                <div v-if="tempUnitPriceType===MEASURE_TYPE_CONSTANT">
                                    <div class="input-with-dropdown">
                                        <div class="input-box-wrapper " style="width: 140px;">
                                            <input type="number"
                                                   :class="['faNum','input-box', ' input-box-with-currency', '_36slfUixQ4wAFF1EUIGq5f','medium-cash', '_3nXdR_fo3j0MwFs8AZWYc5',
                                                $v.tempConstantUnitPrice.$error ? 'error' : '' ]"
                                                   v-model.trim="$v.tempConstantUnitPrice.$model" min="1">
                                            <span aria-hidden="true" class="currency">ریال</span>
                                        </div>
                                        <span></span>
                                        <div class="clear"></div>
                                        <div class="feedback-line">
                                            <p v-if="$v.tempConstantUnitPrice.$error && !$v.tempConstantUnitPrice.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="tempUnitPriceType===MEASURE_TYPE_VARIABLE">
                                    variable
                                    <!--<div class="financial-year-box" role="grid">-->
                                    <!--<div class="financial-year-box-container">-->
                                    <!--<div class="financial-year-box-wrapper"-->
                                    <!--style="height: 400px; width: 964px">-->
                                    <!--<div>-->
                                    <!--<div class="financial-year-box-header">-->
                                    <!--<p>-->
                                    <!--<strong class="faNum">1398 - </strong>-->
                                    <!--فلان فلان فلان-->
                                    <!--</p>-->
                                    <!--<div>-->
                                    <!--<div class="financial-year-box-header-controls">-->
                                    <!--<p>تغییرات</p>-->
                                    <!--<div>-->
                                    <!--<div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"-->
                                    <!--style="width: 87px;">-->
                                    <!--<span aria-hidden="true"-->
                                    <!--class="percent">%</span>-->
                                    <!--<input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model="annualSalesUnitShiftPercent">-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<button class="overlay-button primary"-->
                                    <!--@click="shiftAnnualSalesUnitChart()"-->
                                    <!--tabindex="-1">اعمال-->
                                    <!--</button>-->

                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="financial-year-chart-container">-->
                                    <!--<highcharts class="chart"-->
                                    <!--:options="annualUnitSalesChartOptions"-->
                                    <!--:updateArgs="updateArgs"-->
                                    <!--@redraw="consolelog()"></highcharts>-->
                                    <!--</div>-->
                                    <!--<div class="financial-year-input-container">-->
                                    <!--<ul class="labels faNum">-->
                                    <!--<li>-->
                                    <!--<p>1398</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number" disabled readOnly-->
                                    <!--:value="currentYearAnnualUnitSales">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[0]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value , 0)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>اردیبهشت</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[1]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 1)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>خرداد</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[2]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 2)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[3]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 3)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[4]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 4)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[5]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value,5)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[6]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 6)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[7]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 7)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[8]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 8)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[9]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 9)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[10]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 10)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>اسفند</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[11]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 11)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>1399</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="text" value="">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>1340</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="text" value="">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--</ul>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                </div> <!--TODO variable amount selected (delete this todo-->


                                <!--TODO constant amount selected (delete this todo-->

                            </div>

                        </div>
                    </div>
                    <!--TODO implement variable-->

                    <div class="forecast-item-editor" v-if="getRevenueType()===REVENUE_TYPE_BILLABLE_HOURS && currentTab===2">

                        <div>
                            <div class="section" style="margin-bottom: 30px">
                                <div class="title-top">
                                    How many hours?
                                </div>
                                <p class="title-content">
                                    How best to define a 'unit' depends on what you sell. If you offer widgets,
                                    just enter the quantity of those widgets (shirts or computers or whatever)
                                    you think you'll sell. For other offerings, you might want to use units to
                                    mean consulting engagements or fixed-price contracts or pallets of low-value
                                    materials. Do what makes sense for your business.
                                </p>
                                <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                     aria-orientation="horizontal">
                                    <ul>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_CONSTANT"
                                                       v-model="tempServiceCountType">
                                                <!-- react-text: 131 -->لورم<!-- /react-text -->
                                            </label>
                                        </li>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                       v-model="tempServiceCountType">
                                                <!-- react-text: 135 -->Varying amounts over time
                                                <!-- /react-text -->
                                            </label>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>

                                </div>
                                <!--TODO constant amount selected (delete this todo-->
                                <div v-if="tempServiceCountType===MEASURE_TYPE_CONSTANT">
                                    <div class="input-with-dropdown length-selection">
                                        <input type="number"
                                               :class="['faNum','input-box', '_36slfUixQ4wAFF1EUIGq5f','medium-cash',
                                                $v.tempConstantServiceCount.$error ? 'error' : '' ]"
                                               v-model.trim="$v.tempConstantServiceCount.$model" min="1">
                                        <div>
                                            <span class="per">به ازای</span>
                                            <drop-down v-model="tempConstantServicePeriod" :options="periodsOptions"
                                                       optionLabel="title" optionValue="code"
                                                       scrollHeight="100px"/>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="feedback-line">
                                            <p v-if="$v.tempConstantServiceCount.$error && !$v.tempRevenueName.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div><!-- react-empty: 148 -->
                                </div>
                                <div v-if="tempServiceCountType===MEASURE_TYPE_VARIABLE">
                                    variable
                                    <!--<div class="financial-year-box" role="grid">-->
                                    <!--<div class="financial-year-box-container">-->
                                    <!--<div class="financial-year-box-wrapper"-->
                                    <!--style="height: 400px; width: 964px">-->
                                    <!--<div>-->
                                    <!--<div class="financial-year-box-header">-->
                                    <!--<p>-->
                                    <!--<strong class="faNum">1398 - </strong>-->
                                    <!--فلان فلان فلان-->
                                    <!--</p>-->
                                    <!--<div>-->
                                    <!--<div class="financial-year-box-header-controls">-->
                                    <!--<p>تغییرات</p>-->
                                    <!--<div>-->
                                    <!--<div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"-->
                                    <!--style="width: 87px;">-->
                                    <!--<span aria-hidden="true"-->
                                    <!--class="percent">%</span>-->
                                    <!--<input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model="annualSalesUnitShiftPercent">-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<button class="overlay-button primary"-->
                                    <!--@click="shiftAnnualSalesUnitChart()"-->
                                    <!--tabindex="-1">اعمال-->
                                    <!--</button>-->

                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="financial-year-chart-container">-->
                                    <!--<highcharts class="chart"-->
                                    <!--:options="annualUnitSalesChartOptions"-->
                                    <!--:updateArgs="updateArgs"-->
                                    <!--@redraw="consolelog()"></highcharts>-->
                                    <!--</div>-->
                                    <!--<div class="financial-year-input-container">-->
                                    <!--<ul class="labels faNum">-->
                                    <!--<li>-->
                                    <!--<p>1398</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number" disabled readOnly-->
                                    <!--:value="currentYearAnnualUnitSales">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[0]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value , 0)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>اردیبهشت</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[1]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 1)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>خرداد</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[2]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 2)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[3]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 3)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[4]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 4)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[5]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value,5)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[6]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 6)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[7]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 7)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[8]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 8)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[9]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 9)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[10]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 10)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>اسفند</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[11]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 11)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>1399</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="text" value="">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>1340</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="text" value="">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--</ul>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                </div> <!--TODO variable amount selected (delete this todo-->


                                <!--TODO constant amount selected (delete this todo-->

                            </div>

                            <!--TODO constant amount selected (delete this todo-->
                            <div class="section" style="margin-bottom: 30px"
                                 v-if="tempServiceCountType===MEASURE_TYPE_CONSTANT">
                                <div class="title-top">
                                    When will this revenue start?
                                </div>
                                <div class="select-box period-selection">
                                    <div class="valid">
                                        <drop-down v-model="revenueStart" :options="startOptions"
                                                   optionLabel="title" optionValue="code" scrollHeight="150px"/>
                                    </div>
                                </div>
                            </div>
                            <!--TODO constant amount selected (delete this todo-->

                        </div>
                    </div>
                    <div class="forecast-item-editor" v-if="getRevenueType()===REVENUE_TYPE_BILLABLE_HOURS && currentTab===3">
                        <div>
                            <div class="section" style="margin-bottom: 30px">
                                <div class="title-top">
                                    قیمت واحد؟
                                </div>
                                <p class="title-content">
                                    How best to define a 'unit' depends on what you sell. If you offer widgets,
                                    just enter the quantity of those widgets (shirts or computers or whatever)
                                    you think you'll sell. For other offerings, you might want to use units to
                                    mean consulting engagements or fixed-price contracts or pallets of low-value
                                    materials. Do what makes sense for your business.
                                </p>


                                <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                     aria-orientation="horizontal">
                                    <ul>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_CONSTANT"
                                                       v-model="tempUnitPriceType">
                                                <!-- react-text: 131 -->لورم<!-- /react-text -->
                                            </label>
                                        </li>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                       v-model="tempUnitPriceType">
                                                <!-- react-text: 135 -->Varying amounts over time
                                                <!-- /react-text -->
                                            </label>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>


                                </div>
                                <!--TODO constant amount selected (delete this todo-->
                                <div v-if="tempUnitPriceType===MEASURE_TYPE_CONSTANT">
                                    <div class="input-with-dropdown">
                                        <div class="input-box-wrapper " style="width: 140px;">
                                            <input type="number"
                                                   :class="['faNum','input-box', ' input-box-with-currency', '_36slfUixQ4wAFF1EUIGq5f','medium-cash', '_3nXdR_fo3j0MwFs8AZWYc5',
                                                $v.tempConstantUnitPrice.$error ? 'error' : '' ]"
                                                   v-model.trim="$v.tempConstantUnitPrice.$model" min="1">
                                            <span aria-hidden="true" class="currency">ریال</span>
                                        </div>
                                        <span></span>
                                        <div class="clear"></div>
                                        <div class="feedback-line">
                                            <p v-if="$v.tempConstantUnitPrice.$error && !$v.tempConstantUnitPrice.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="tempUnitPriceType===MEASURE_TYPE_VARIABLE">
                                    variable
                                    <!--<div class="financial-year-box" role="grid">-->
                                    <!--<div class="financial-year-box-container">-->
                                    <!--<div class="financial-year-box-wrapper"-->
                                    <!--style="height: 400px; width: 964px">-->
                                    <!--<div>-->
                                    <!--<div class="financial-year-box-header">-->
                                    <!--<p>-->
                                    <!--<strong class="faNum">1398 - </strong>-->
                                    <!--فلان فلان فلان-->
                                    <!--</p>-->
                                    <!--<div>-->
                                    <!--<div class="financial-year-box-header-controls">-->
                                    <!--<p>تغییرات</p>-->
                                    <!--<div>-->
                                    <!--<div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"-->
                                    <!--style="width: 87px;">-->
                                    <!--<span aria-hidden="true"-->
                                    <!--class="percent">%</span>-->
                                    <!--<input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model="annualSalesUnitShiftPercent">-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<button class="overlay-button primary"-->
                                    <!--@click="shiftAnnualSalesUnitChart()"-->
                                    <!--tabindex="-1">اعمال-->
                                    <!--</button>-->

                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="financial-year-chart-container">-->
                                    <!--<highcharts class="chart"-->
                                    <!--:options="annualUnitSalesChartOptions"-->
                                    <!--:updateArgs="updateArgs"-->
                                    <!--@redraw="consolelog()"></highcharts>-->
                                    <!--</div>-->
                                    <!--<div class="financial-year-input-container">-->
                                    <!--<ul class="labels faNum">-->
                                    <!--<li>-->
                                    <!--<p>1398</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number" disabled readOnly-->
                                    <!--:value="currentYearAnnualUnitSales">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[0]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value , 0)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>اردیبهشت</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[1]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 1)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>خرداد</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[2]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 2)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[3]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 3)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[4]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 4)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[5]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value,5)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[6]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 6)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[7]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 7)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[8]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 8)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[9]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 9)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[10]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 10)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>اسفند</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[11]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 11)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>1399</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="text" value="">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>1340</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="text" value="">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--</ul>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                </div> <!--TODO variable amount selected (delete this todo-->


                                <!--TODO constant amount selected (delete this todo-->

                            </div>

                        </div>
                    </div>
                    <!--TODO implement variable-->


                    <div class="forecast-item-editor" v-if="getRevenueType()===REVENUE_TYPE_RECURRING_CHANGES && currentTab===2">

                        <div>
                            <!--TODO constant amount selected (delete this todo-->
                            <div class="section" style="margin-bottom: 30px">
                                <div class="title-top">
                                    When will this revenue start?
                                </div>
                                <div class="select-box period-selection">
                                    <div class="valid">
                                        <drop-down v-model="revenueStart" :options="startOptions"
                                                   optionLabel="title" optionValue="code" scrollHeight="150px"/>
                                    </div>
                                </div>
                            </div>
                            <!--TODO constant amount selected (delete this todo-->
                            <div class="section" style="margin-bottom: 30px">
                                <div class="title-top">
                                    How many customers?
                                </div>
                                <p class="title-content">
                                    How best to define a 'unit' depends on what you sell. If you offer widgets,
                                    just enter the quantity of those widgets (shirts or computers or whatever)
                                    you think you'll sell. For other offerings, you might want to use units to
                                    mean consulting engagements or fixed-price contracts or pallets of low-value
                                    materials. Do what makes sense for your business.
                                </p>
                                <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                     aria-orientation="horizontal">
                                    <ul>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_CONSTANT"
                                                       v-model="tempServiceCountType">
                                                <!-- react-text: 131 -->لورم<!-- /react-text -->
                                            </label>
                                        </li>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                       v-model="tempServiceCountType">
                                                <!-- react-text: 135 -->Varying amounts over time
                                                <!-- /react-text -->
                                            </label>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>

                                </div>
                                <!--TODO constant amount selected (delete this todo-->
                                <div v-if="tempServiceCountType===MEASURE_TYPE_CONSTANT">
                                    <div class="input-with-dropdown length-selection">
                                        <input type="number"
                                               :class="['faNum','input-box', '_36slfUixQ4wAFF1EUIGq5f','medium-cash',
                                                $v.tempConstantServiceCount.$error ? 'error' : '' ]"
                                               v-model.trim="$v.tempConstantServiceCount.$model" min="1">
                                        <div>
                                            <span class="per">به ازای</span>
                                            <drop-down v-model="tempConstantServicePeriod" :options="periodsOptions"
                                                       optionLabel="title" optionValue="code"
                                                       scrollHeight="100px"/>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="feedback-line">
                                            <p v-if="$v.tempConstantServiceCount.$error && !$v.tempRevenueName.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div><!-- react-empty: 148 -->
                                </div>
                                <div v-if="tempServiceCountType===MEASURE_TYPE_VARIABLE">
                                    variable
                                    <!--<div class="financial-year-box" role="grid">-->
                                    <!--<div class="financial-year-box-container">-->
                                    <!--<div class="financial-year-box-wrapper"-->
                                    <!--style="height: 400px; width: 964px">-->
                                    <!--<div>-->
                                    <!--<div class="financial-year-box-header">-->
                                    <!--<p>-->
                                    <!--<strong class="faNum">1398 - </strong>-->
                                    <!--فلان فلان فلان-->
                                    <!--</p>-->
                                    <!--<div>-->
                                    <!--<div class="financial-year-box-header-controls">-->
                                    <!--<p>تغییرات</p>-->
                                    <!--<div>-->
                                    <!--<div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"-->
                                    <!--style="width: 87px;">-->
                                    <!--<span aria-hidden="true"-->
                                    <!--class="percent">%</span>-->
                                    <!--<input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model="annualSalesUnitShiftPercent">-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<button class="overlay-button primary"-->
                                    <!--@click="shiftAnnualSalesUnitChart()"-->
                                    <!--tabindex="-1">اعمال-->
                                    <!--</button>-->

                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="financial-year-chart-container">-->
                                    <!--<highcharts class="chart"-->
                                    <!--:options="annualUnitSalesChartOptions"-->
                                    <!--:updateArgs="updateArgs"-->
                                    <!--@redraw="consolelog()"></highcharts>-->
                                    <!--</div>-->
                                    <!--<div class="financial-year-input-container">-->
                                    <!--<ul class="labels faNum">-->
                                    <!--<li>-->
                                    <!--<p>1398</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number" disabled readOnly-->
                                    <!--:value="currentYearAnnualUnitSales">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[0]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value , 0)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>اردیبهشت</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[1]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 1)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>خرداد</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[2]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 2)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[3]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 3)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[4]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 4)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[5]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value,5)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[6]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 6)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[7]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 7)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[8]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 8)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[9]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 9)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[10]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 10)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>اسفند</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[11]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 11)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>1399</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="text" value="">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>1340</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="text" value="">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--</ul>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                </div> <!--TODO variable amount selected (delete this todo-->


                                <!--TODO constant amount selected (delete this todo-->

                            </div>

                        </div>
                    </div>
                    <div v-if="getRevenueType()===REVENUE_TYPE_RECURRING_CHANGES && currentTab===3">
                        <div class="forecast-item-editor">
                            <div>
                                <div class="section" style="margin-bottom: 30px">
                                    <div class="title-top">
                                        Do you charge an up-front fee?
                                    </div>
                                    <p class="title-content">
                                        Enter your average selling price (excluding sales tax) for each unit of
                                        this product or service. You can vary prices over time, if necessary, to
                                        reflect seasonal changes in demand, planned increases, or scheduled
                                        discount promotions.
                                    </p>
                                    <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                         aria-orientation="horizontal">
                                        <ul>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-types" :value="MEASURE_TYPE_FREE"
                                                           v-model="tempUpFrontFeeType">
                                                    <!-- react-text: 131 -->free<!-- /react-text -->
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-types" :value="MEASURE_TYPE_CONSTANT"
                                                           v-model="tempUpFrontFeeType">
                                                    <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-types" :value="MEASURE_TYPE_VARIABLE"
                                                           v-model="tempUpFrontFeeType">
                                                    <!-- react-text: 135 -->Varying amounts over time
                                                    <!-- /react-text -->
                                                </label>
                                            </li>
                                        </ul>
                                        <div class="clear"></div>
                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->
                                    <div v-if="tempUpFrontFeeType===MEASURE_TYPE_CONSTANT">
                                        <div class="input-with-dropdown">
                                            <div class="input-box-wrapper " style="width: 140px;">
                                                <input type="number"
                                                       :class="['faNum','input-box', ' input-box-with-currency', '_36slfUixQ4wAFF1EUIGq5f','medium-cash', '_3nXdR_fo3j0MwFs8AZWYc5',
                                                $v.tempConstantUpFrontFee.$error ? 'error' : '' ]"
                                                       v-model.trim="$v.tempConstantUpFrontFee.$model" min="1">
                                                <span aria-hidden="true" class="currency">ریال</span>
                                            </div>
                                            <span></span>
                                            <div class="clear"></div>
                                            <div class="feedback-line">
                                                <p v-if="$v.tempConstantUpFrontFee.$error && !$v.tempConstantUpFrontFee.required">
                                                    مقداری (بیش از 0) را وارد کنید
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->

                                </div>
                                <div class="section" style="margin-bottom: 30px">
                                    <div class="title-top">
                                        How much is the recurring charge?
                                    </div>
                                    <p class="title-content">
                                        Enter your average selling price (excluding sales tax) for each unit of
                                        this product or service. You can vary prices over time, if necessary, to
                                        reflect seasonal changes in demand, planned increases, or scheduled
                                        discount promotions.
                                    </p>
                                    <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                         aria-orientation="horizontal">
                                        <ul>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_CONSTANT"
                                                           v-model="tempRecurringChargeType">
                                                    <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                           v-model="tempRecurringChargeType">
                                                    <!-- react-text: 135 -->Varying amounts over time
                                                    <!-- /react-text -->
                                                </label>
                                            </li>
                                        </ul>
                                        <div class="clear"></div>
                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->
                                    <div v-if="tempRecurringChargeType===MEASURE_TYPE_CONSTANT">
                                        <div class="input-with-dropdown">
                                            <div class="input-box-wrapper " style="width: 140px;">
                                                <input type="number"
                                                       :class="['faNum','input-box', ' input-box-with-currency', '_36slfUixQ4wAFF1EUIGq5f','medium-cash', '_3nXdR_fo3j0MwFs8AZWYc5',
                                                $v.tempConstantRecurringCharge.$error ? 'error' : '' ]"
                                                       v-model.trim="$v.tempConstantRecurringCharge.$model" min="1">
                                                <span aria-hidden="true" class="currency">ریال</span>
                                            </div>
                                            <span></span>
                                            <div class="clear"></div>
                                            <div class="feedback-line">
                                                <p v-if="$v.tempConstantRecurringCharge.$error && !$v.tempConstantRecurringCharge.required">
                                                    مقداری (بیش از 0) را وارد کنید
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->

                                </div>
                                <div class="section" style="margin-bottom: 30px">
                                    <div class="title-top">
                                        How often is this charge assessed?
                                    </div>
                                    <p class="title-content">
                                        Enter your average selling price (excluding sales tax) for each unit of
                                        this product or service. You can vary prices over time, if necessary, to
                                        reflect seasonal changes in demand, planned increases, or scheduled
                                        discount promotions.
                                    </p>
                                    <div class="faNum input-with-dropdown length-selection">
                                        <div>
                                            <span class="per">هر</span>
                                            <span class="little-drop-down">
                                                <drop-down v-model="tempRecurringChargeMonthFrequency" :options="tempRecurringChargeMonthFrequencyOptions"
                                                           optionLabel="title" optionValue="code"
                                                           scrollHeight="100px"/>
                                            </span>
                                            <span class="per">ماه</span>
                                        </div>
                                        <div class="clear"></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="getRevenueType()===REVENUE_TYPE_RECURRING_CHANGES && currentTab===4">
                        <div class="forecast-item-editor">
                            <div>
                                <div class="section" style="margin-bottom: 30px">
                                    <div class="title-top">
                                        What is your churn rate?
                                    </div>
                                    <p class="title-content">
                                        How best to define a 'unit' depends on what you sell. If you offer widgets,
                                        just enter the quantity of those widgets (shirts or computers or whatever)
                                        you think you'll sell. For other offerings, you might want to use units to
                                        mean consulting engagements or fixed-price contracts or pallets of low-value
                                        materials. Do what makes sense for your business.
                                    </p>
                                    <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                         aria-orientation="horizontal">
                                        <ul>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_CONSTANT"
                                                           v-model="tempChurnRateType">
                                                    <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                           v-model="tempChurnRateType">
                                                    <!-- react-text: 135 -->Varying amounts over time
                                                    <!-- /react-text -->
                                                </label>
                                            </li>
                                        </ul>
                                        <div class="clear"></div>

                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->
                                    <div v-if="tempChurnRateType===MEASURE_TYPE_CONSTANT">
                                        <div class="input-box-wrapper" style="width: unset;">
                                            <span aria-hidden="true"
                                            class="percent">%</span>
                                            <input :class="['input-box', '_1v965moXRbti5zqLRSk3wE','smallPercentage',
                                            '_3nXdR_fo3j0MwFs8AZWYc5', $v.tempConstantChurnRate.$error? 'error' : '']"
                                                   type="number"
                                                   v-model="tempConstantChurnRate">

                                            <div class="clear"></div>
                                            <div class="feedback-line">
                                                <p v-if="$v.tempConstantChurnRate.$error && !$v.tempConstantChurnRate.required">
                                                    مقداری را وارد کنید
                                                </p>
                                            </div>
                                        </div><!-- react-empty: 148 -->
                                    </div>
                                    <div v-if="tempChurnRateType===MEASURE_TYPE_VARIABLE">
                                        variable
                                        <!--<div class="financial-year-box" role="grid">-->
                                        <!--<div class="financial-year-box-container">-->
                                        <!--<div class="financial-year-box-wrapper"-->
                                        <!--style="height: 400px; width: 964px">-->
                                        <!--<div>-->
                                        <!--<div class="financial-year-box-header">-->
                                        <!--<p>-->
                                        <!--<strong class="faNum">1398 - </strong>-->
                                        <!--فلان فلان فلان-->
                                        <!--</p>-->
                                        <!--<div>-->
                                        <!--<div class="financial-year-box-header-controls">-->
                                        <!--<p>تغییرات</p>-->
                                        <!--<div>-->
                                        <!--<div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"-->
                                        <!--style="width: 87px;">-->
                                        <!--<span aria-hidden="true"-->
                                        <!--class="percent">%</span>-->
                                        <!--<input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model="annualSalesUnitShiftPercent">-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--<button class="overlay-button primary"-->
                                        <!--@click="shiftAnnualSalesUnitChart()"-->
                                        <!--tabindex="-1">اعمال-->
                                        <!--</button>-->

                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--<div class="financial-year-chart-container">-->
                                        <!--<highcharts class="chart"-->
                                        <!--:options="annualUnitSalesChartOptions"-->
                                        <!--:updateArgs="updateArgs"-->
                                        <!--@redraw="consolelog()"></highcharts>-->
                                        <!--</div>-->
                                        <!--<div class="financial-year-input-container">-->
                                        <!--<ul class="labels faNum">-->
                                        <!--<li>-->
                                        <!--<p>1398</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number" disabled readOnly-->
                                        <!--:value="currentYearAnnualUnitSales">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>فروردین</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model.number="annualSalesUnitPeriodsData[0]"-->
                                        <!--@input="updateAnnualSalesUnitChart($event.target.value , 0)">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>اردیبهشت</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model.number="annualSalesUnitPeriodsData[1]"-->
                                        <!--@input="updateAnnualSalesUnitChart($event.target.value, 1)">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>خرداد</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model.number="annualSalesUnitPeriodsData[2]"-->
                                        <!--@input="updateAnnualSalesUnitChart($event.target.value, 2)">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>فروردین</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model.number="annualSalesUnitPeriodsData[3]"-->
                                        <!--@input="updateAnnualSalesUnitChart($event.target.value, 3)">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>فروردین</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model.number="annualSalesUnitPeriodsData[4]"-->
                                        <!--@input="updateAnnualSalesUnitChart($event.target.value, 4)">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>فروردین</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model.number="annualSalesUnitPeriodsData[5]"-->
                                        <!--@input="updateAnnualSalesUnitChart($event.target.value,5)">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>فروردین</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model.number="annualSalesUnitPeriodsData[6]"-->
                                        <!--@input="updateAnnualSalesUnitChart($event.target.value, 6)">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>فروردین</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model.number="annualSalesUnitPeriodsData[7]"-->
                                        <!--@input="updateAnnualSalesUnitChart($event.target.value, 7)">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>فروردین</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model.number="annualSalesUnitPeriodsData[8]"-->
                                        <!--@input="updateAnnualSalesUnitChart($event.target.value, 8)">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>فروردین</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model.number="annualSalesUnitPeriodsData[9]"-->
                                        <!--@input="updateAnnualSalesUnitChart($event.target.value, 9)">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>فروردین</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model.number="annualSalesUnitPeriodsData[10]"-->
                                        <!--@input="updateAnnualSalesUnitChart($event.target.value, 10)">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>اسفند</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="number"-->
                                        <!--v-model.number="annualSalesUnitPeriodsData[11]"-->
                                        <!--@input="updateAnnualSalesUnitChart($event.target.value, 11)">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>1399</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="text" value="">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                        <!--<p>1340</p>-->
                                        <!--<div class="valid">-->
                                        <!--<div>-->
                                        <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                        <!--type="text" value="">-->
                                        <!--<div class="fillRightDots"-->
                                        <!--aria-hidden="true">-->
                                        <!--&nbsp;-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                        <!--</ul>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                    </div> <!--TODO variable amount selected (delete this todo-->


                                    <!--TODO constant amount selected (delete this todo-->

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="forecast-item-editor" v-if="getRevenueType()===REVENUE_TYPE_REVENUE_ONLY && currentTab===2">
                        <div>
                            <div class="section" style="margin-bottom: 30px">
                                <div class="title-top">
                                    How much will you make from this revenue stream?
                                </div>
                                <p class="title-content">
                                    How best to define a 'unit' depends on what you sell. If you offer widgets,
                                    just enter the quantity of those widgets (shirts or computers or whatever)
                                    you think you'll sell. For other offerings, you might want to use units to
                                    mean consulting engagements or fixed-price contracts or pallets of low-value
                                    materials. Do what makes sense for your business.
                                </p>
                                <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                     aria-orientation="horizontal">
                                    <ul>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_CONSTANT"
                                                       v-model="tempRevenueStreamType">
                                                <!-- react-text: 131 -->لورم<!-- /react-text -->
                                            </label>
                                        </li>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                       v-model="tempRevenueStreamType">
                                                <!-- react-text: 135 -->Varying amounts over time
                                                <!-- /react-text -->
                                            </label>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>

                                </div>
                                <!--TODO constant amount selected (delete this todo-->
                                <div v-if="tempRevenueStreamType===MEASURE_TYPE_CONSTANT">
                                    <div class="input-with-dropdown length-selection">
                                        <input type="number"
                                               :class="['faNum','input-box', '_36slfUixQ4wAFF1EUIGq5f','medium-cash',
                                                $v.tempConstantRevenueStream.$error ? 'error' : '' ]"
                                               v-model.trim="$v.tempConstantRevenueStream.$model" min="1">
                                        <div>
                                            <span class="per">به ازای</span>
                                            <drop-down v-model="tempConstantRevenueStreamPeriod" :options="periodsOptions"
                                                       optionLabel="title" optionValue="code"
                                                       scrollHeight="100px"/>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="feedback-line">
                                            <p v-if="$v.tempConstantRevenueStream.$error && !$v.tempConstantRevenueStream.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div><!-- react-empty: 148 -->
                                </div>
                                <div v-if="tempRevenueStreamType===MEASURE_TYPE_VARIABLE">
                                    variable
                                    <!--<div class="financial-year-box" role="grid">-->
                                    <!--<div class="financial-year-box-container">-->
                                    <!--<div class="financial-year-box-wrapper"-->
                                    <!--style="height: 400px; width: 964px">-->
                                    <!--<div>-->
                                    <!--<div class="financial-year-box-header">-->
                                    <!--<p>-->
                                    <!--<strong class="faNum">1398 - </strong>-->
                                    <!--فلان فلان فلان-->
                                    <!--</p>-->
                                    <!--<div>-->
                                    <!--<div class="financial-year-box-header-controls">-->
                                    <!--<p>تغییرات</p>-->
                                    <!--<div>-->
                                    <!--<div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"-->
                                    <!--style="width: 87px;">-->
                                    <!--<span aria-hidden="true"-->
                                    <!--class="percent">%</span>-->
                                    <!--<input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model="annualSalesUnitShiftPercent">-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<button class="overlay-button primary"-->
                                    <!--@click="shiftAnnualSalesUnitChart()"-->
                                    <!--tabindex="-1">اعمال-->
                                    <!--</button>-->

                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="financial-year-chart-container">-->
                                    <!--<highcharts class="chart"-->
                                    <!--:options="annualUnitSalesChartOptions"-->
                                    <!--:updateArgs="updateArgs"-->
                                    <!--@redraw="consolelog()"></highcharts>-->
                                    <!--</div>-->
                                    <!--<div class="financial-year-input-container">-->
                                    <!--<ul class="labels faNum">-->
                                    <!--<li>-->
                                    <!--<p>1398</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number" disabled readOnly-->
                                    <!--:value="currentYearAnnualUnitSales">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[0]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value , 0)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>اردیبهشت</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[1]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 1)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>خرداد</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[2]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 2)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[3]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 3)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[4]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 4)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[5]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value,5)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[6]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 6)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[7]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 7)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[8]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 8)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[9]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 9)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>فروردین</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[10]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 10)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>اسفند</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="number"-->
                                    <!--v-model.number="annualSalesUnitPeriodsData[11]"-->
                                    <!--@input="updateAnnualSalesUnitChart($event.target.value, 11)">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>1399</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="text" value="">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                    <!--<p>1340</p>-->
                                    <!--<div class="valid">-->
                                    <!--<div>-->
                                    <!--<input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                    <!--type="text" value="">-->
                                    <!--<div class="fillRightDots"-->
                                    <!--aria-hidden="true">-->
                                    <!--&nbsp;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <!--</ul>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                </div> <!--TODO variable amount selected (delete this todo-->


                                <!--TODO constant amount selected (delete this todo-->

                            </div>

                            <!--TODO constant amount selected (delete this todo-->
                            <div class="section" style="margin-bottom: 30px"
                                 v-if="tempUnitPriceType===MEASURE_TYPE_CONSTANT">
                                <div class="title-top">
                                    When will this revenue start?
                                </div>
                                <div class="select-box period-selection">
                                    <div class="valid">
                                        <drop-down v-model="revenueStart" :options="startOptions"
                                                   optionLabel="title" optionValue="code" scrollHeight="150px"/>
                                    </div>
                                </div>
                            </div>
                            <!--TODO constant amount selected (delete this todo-->
                        </div>
                    </div>

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
                <button :class="['modal-button','primary']" tabindex="0" @click="handleTabChange(1)">بعدی</button>
                <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
            </div>
            <div class="modal-footer-controls-container left" v-if="currentTab===1">
                <button :class="['modal-button','primary']" tabindex="0" v-if="!$v.tempRevenueType.$invalid" @click="handleTabChange(2)">بعدی</button>
                <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
            </div>
            <!--<div class="modal-footer-controls-container left" v-if="currentTab===2">-->
                <!--<button :class="['modal-button','primary','disabled']" tabindex="0" >بعدی</button>-->
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
    const LENGTH_MONTH = 0;const LENGTH_YEAR = 1;const FAR_1398 = 1;const ORD_1398 = 2;const KHO_1398 = 3;const TIR_1398 = 4;
    const MOR_1398 = 5;const SHAH_1398 = 6;const MEHR_1398 = 7;const ABA_1398 = 8; const AZAR_1398 = 9; const DEY_1398 = 10;const BAH_1398 = 11;
    const ESF_1398 = 12; const _1399 = 13; const _1400 = 14;

    import BaseModal from './../components/BaseModal';
    import { required, integer, between, maxLength, numeric, minValue, requiredIf } from 'vuelidate/lib/validators';

    export default {
        name: "ModalRevenueCrud",
        data: function(){
            return {
                nameCounterVisible: false,
                NOT_SELECTED : -1, REVENUE_TYPE_UNIT_SALES : 0, REVENUE_TYPE_BILLABLE_HOURS : 1, REVENUE_TYPE_RECURRING_CHANGES : 2, 
                REVENUE_TYPE_REVENUE_ONLY : 3, MEASURE_TYPE_FREE : 0, MEASURE_TYPE_CONSTANT : 1, MEASURE_TYPE_VARIABLE : 2,
                LENGTH_MONTH : 0, LENGTH_YEAR : 1, FAR_1398 : 1, ORD_1398 : 2, KHO_1398 : 3, TIR_1398 : 4,
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
                recurringChargeMonthFrequencyOptions: [
                    {title: '1', code: 1},
                    {title: '2', code: 2},
                    {title: '3', code: 3},
                    {title: '4', code: 4},
                    {title: '5', code: 5},
                    {title: '6', code: 6},
                    {title: '7', code: 7},
                    {title: '8', code: 8},
                    {title: '9', code: 9},
                    {title: '10', code: 10},
                    {title: '11', code: 11},
                    {title: '12', code: 12}
                ],
                currentRevenue:{
                    start: FAR_1398,
                    name: '',
                    type: NOT_SELECTED,

                    unitSalesCountType: MEASURE_TYPE_CONSTANT,
                    constantUnitSalesPeriod: LENGTH_MONTH,
                    constantUnitSales: '',
                    unitSalesPerPeriod: {
                        FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                        MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                        _1399: '', _1400: ''
                    },
                    unitPriceMeasureType: MEASURE_TYPE_CONSTANT,
                    constantUnitPrice: '',
                    unitPricePerPeriod: {
                        FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                        MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                        _1399: '', _1400: ''
                    },

                    billableHoursCountType: MEASURE_TYPE_CONSTANT,
                    constantBillableHoursPeriod: LENGTH_MONTH,
                    constantBillableHours: '',
                    billableHoursPerPeriod: {
                        FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                        MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                        _1399: '', _1400: ''
                    },
                    hourPriceMeasureType: MEASURE_TYPE_CONSTANT,
                    constantHourPrice: '',
                    hourPricePerPeriod: {
                        FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                        MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                        _1399: '', _1400: ''
                    },


                    upFrontFeeMeasureType: MEASURE_TYPE_FREE,
                    constantUpFrontFee: '',
                    upFrontFeePerPeriod: {
                        FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                        MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                        _1399: '', _1400: ''
                    },
                    recurringChargeMeasureType: MEASURE_TYPE_CONSTANT,
                    constantRecurringCharge: '',
                    recurringChargePerPeriod: {
                        FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                        MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                        _1399: '', _1400: ''
                    },
                    recurringChargeMonthFrequency: 1,

                    // type 2 - tab 4
                    churnRateMeasureType: MEASURE_TYPE_CONSTANT,
                    constantChurnRate: '',
                    churnRatePerPeriod: {
                        FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                        MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                        _1399: '', _1400: ''
                    },
                    revenueStreamType: MEASURE_TYPE_CONSTANT,
                    constantRevenueStream: '',
                    constantRevenueStreamPeriod: LENGTH_MONTH,
                    revenueStreamPerPeriod: {
                        FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                        MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                        _1399: '', _1400: ''
                    },
                },

                revenueStart : FAR_1398,//

                // tab 0
                tempRevenueName: '',//
                // tab 1
                tempRevenueType: NOT_SELECTED,//
                //type 0 - tab 2 && type 1 - tab 2 && && type 2 - tab 2 && type 3 - tab 1
                tempServiceCountType: MEASURE_TYPE_CONSTANT,//
                tempConstantServicePeriod: LENGTH_MONTH, // for type 2 = LENGTH_MONTH//
                tempConstantServiceCount: '',//

                tempServiceCountPerPeriod: {//
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                // type 0 - tab 3 && type 1 - tab 3
                tempUnitPriceType: MEASURE_TYPE_CONSTANT,//
                tempConstantUnitPrice: '',//
                tempUnitPricePerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                // type 2 - tab 3
                tempUpFrontFeeType: MEASURE_TYPE_FREE,
                tempConstantUpFrontFee: '',
                tempUpFrontFeePerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                tempRecurringChargeType: MEASURE_TYPE_CONSTANT,
                tempConstantRecurringCharge: '',
                tempRecurringChargePerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                tempRecurringChargeMonthFrequency: 1,

                // type 2 - tab 4
                tempChurnRateType: MEASURE_TYPE_CONSTANT,
                tempConstantChurnRate: '',
                tempChurnRatePerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                tempRevenueStreamType: MEASURE_TYPE_CONSTANT,
                tempConstantRevenueStream: '',
                tempConstantRevenueStreamPeriod: LENGTH_MONTH,
                tempRevenueStreamPerPeriod: {
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
            },
            
            handleTabChange(to){
                let $this = this;
                if(this.currentTabValidators.length){
                    this.currentTabValidators.forEach(function (validator, i) {
                        validator.$touch();
                        if(validator.$error){
                            return;
                        }
                        $this.currentTab=to;
                    });
                }
                else{
                    $this.currentTab=to;
                }
            },

        },
        validations(){
            return{
                currentRevenue:{
                    start: {
                        required,
                        between: between(FAR_1398,_1400)
                    },
                    name: {
                        required,
                        maxLength: maxLength(255),
                    },
                    type: {
                        required,
                        between: between(REVENUE_TYPE_UNIT_SALES,REVENUE_TYPE_REVENUE_ONLY),
                        integer
                    },
                    unitSalesCountType:{
                        required,
                        //     : function (value) {
                        //     if(this.currentRevenue.type===REVENUE_TYPE_UNIT_SALES){
                        //         return value.length>0;
                        //     }
                        //     else{
                        //         return true;
                        //     }
                        // },
                        between: between(MEASURE_TYPE_CONSTANT,MEASURE_TYPE_VARIABLE)
                    },
                    constantUnitSalesPeriod: {
                        required: requiredIf(this.currentRevenue.unitSalesCountType===MEASURE_TYPE_CONSTANT),
                        between: between(LENGTH_MONTH,LENGTH_YEAR)
                    },
                    constantUnitSales:{
                        required: requiredIf(this.currentRevenue.unitSalesCountType===MEASURE_TYPE_CONSTANT),
                        numeric,
                        minValue: minValue(1)
                    },
                    unitSalesPerPeriod:{
                        filled: function (array) {
                            if(this.currentRevenue.unitSalesCountType===MEASURE_TYPE_VARIABLE){
                                //TODO implement logic
                                return true;
                            }
                            else{
                                return true;
                            }
                        }
                    },
                    unitPriceMeasureType: {
                        required,
                        between: between(MEASURE_TYPE_CONSTANT, MEASURE_TYPE_VARIABLE)
                    },
                    constantUnitPrice: {
                        required: requiredIf(this.currentRevenue.unitPriceMeasureType===MEASURE_TYPE_CONSTANT),
                        numeric,
                        minValue: minValue(1)

                    },
                    unitPricePerPeriod:{
                        filled: function (array) {
                            if(this.currentRevenue.unitPriceMeasureType===MEASURE_TYPE_VARIABLE){
                                //TODO implement logic
                                return true;
                            }
                            else{
                                return true;
                            }
                        }
                    },
                    billableHoursCountType:{
                        required,
                        between: between(MEASURE_TYPE_CONSTANT, MEASURE_TYPE_VARIABLE)
                    },
                    constantBillableHoursPeriod:{
                        required: requiredIf(this.currentRevenue.billableHoursCountType===MEASURE_TYPE_CONSTANT),
                        between: between(LENGTH_MONTH,LENGTH_YEAR)
                    },
                    constantBillableHours: {
                        required: requiredIf(this.currentRevenue.billableHoursCountType===MEASURE_TYPE_CONSTANT),
                        numeric,
                        minValue: minValue(1)
                    },
                    billableHoursPerPeriod: {
                        filled: function (array) {
                            if(this.currentRevenue.billableHoursCountType===MEASURE_TYPE_VARIABLE){
                                //TODO implement logic
                                return true;
                            }
                            else{
                                return true;
                            }
                        }
                    },
                    hourPriceMeasureType: {
                        required,
                        between: between(MEASURE_TYPE_CONSTANT, MEASURE_TYPE_VARIABLE)
                    },
                    constantHourPrice: {
                        required: requiredIf(this.currentRevenue.hourPriceMeasureType===MEASURE_TYPE_CONSTANT),
                        numeric,
                        minValue: minValue(1)
                    },
                    hourPricePerPeriod: {
                        filled: function (array) {
                            if(this.currentRevenue.hourPriceMeasureType===MEASURE_TYPE_VARIABLE){
                                //TODO implement logic
                                return true;
                            }
                            else{
                                return true;
                            }
                        }
                    },
                    upFrontFeeMeasureType: {
                        required,
                        between: between(MEASURE_TYPE_FREE, MEASURE_TYPE_VARIABLE)
                    },
                    constantUpFrontFee: {
                        required: requiredIf(this.currentRevenue.upFrontFeeMeasureType===MEASURE_TYPE_CONSTANT),
                        numeric,
                        minValue: minValue(1)
                    },
                    upFrontFeePerPeriod: {
                        filled: function (array){
                            if(this.currentRevenue.upFrontFeeMeasureType===MEASURE_TYPE_VARIABLE){
                                //TODO implement logic
                                return true;
                            }
                            else{
                                return true;
                            }
                        }
                    },
                    recurringChargeMeasureType: {
                        required,
                        between: between(MEASURE_TYPE_CONSTANT, MEASURE_TYPE_VARIABLE)
                    },
                    constantRecurringCharge: {
                        required: requiredIf(this.currentRevenue.recurringChargeMeasureType===MEASURE_TYPE_CONSTANT),
                        numeric,
                        minValue: minValue(1)
                    },
                    recurringChargePerPeriod: {
                        filled: function (array){
                            if(this.currentRevenue.recurringChargeMeasureType===MEASURE_TYPE_VARIABLE){
                                //TODO implement logic
                                return true;
                            }
                            else{
                                return true;
                            }
                        }
                    },
                    recurringChargeMonthFrequency: {
                        required,
                        between: between(1,14)
                    },
                    churnRateMeasureType: {
                        required,
                        between: between(MEASURE_TYPE_CONSTANT, MEASURE_TYPE_VARIABLE)
                    },
                    constantChurnRate: {
                        required: requiredIf(this.currentRevenue.churnRateMeasureType===MEASURE_TYPE_CONSTANT),
                        numeric,
                        minValue: minValue(1)
                    },
                    churnRatePerPeriod: {
                        filled: function (array){
                            if(this.currentRevenue.churnRateMeasureType===MEASURE_TYPE_VARIABLE){
                                //TODO implement logic
                                return true;
                            }
                            else{
                                return true;
                            }
                        }
                    },
                    revenueStreamType: {
                        required,
                        between: between(MEASURE_TYPE_CONSTANT, MEASURE_TYPE_VARIABLE)
                    },
                    constantRevenueStream: {
                        required: requiredIf(this.currentRevenue.revenueStreamType===MEASURE_TYPE_CONSTANT),
                        numeric,
                        minValue: minValue(1)
                    },
                    constantRevenueStreamPeriod: {
                        required: requiredIf(this.currentRevenue.revenueStreamType===MEASURE_TYPE_CONSTANT),
                        between: between(MEASURE_TYPE_CONSTANT, MEASURE_TYPE_VARIABLE)
                    },
                    revenueStreamPerPeriod: {
                        filled: function (array){
                            if(this.currentRevenue.revenueStreamType===MEASURE_TYPE_VARIABLE){
                                //TODO implement logic
                                return true;
                            }
                            else{
                                return true;
                            }
                        }
                    },
                },
                tempRevenueName:{
                    required: function(value){
                        return value.length>0;
                    },
                    maxLength: maxLength(255)
                },
                revenueStart:{
                    required,
                    between: between(1,14)
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
                    // TODO make conditional (on variable vs constant)
                },
                tempServiceCountPerPeriod:{
                    filled: function () {
                        // TODO implement array emptiness check
                        return true;
                    }
                },
                tempConstantServicePeriod:{
                    required
                },
                tempConstantUnitPrice:{
                    required,
                    numeric,
                    minValue: minValue(1)
                },
                tempUnitPricePerPeriod:{
                    filled: function () {
                        // TODO implement array emptiness check
                        return true;
                    }
                },
                tempConstantUpFrontFee:{
                    required,
                    numeric,
                    minValue: minValue(1)
                },
                tempUpFrontFeePerPeriod:{
                    filled: function () {
                        // TODO implement array emptiness check
                        return true;
                    }
                },
                tempConstantRecurringCharge:{
                    required,
                    numeric,
                    minValue: minValue(1)
                },
                tempRecurringChargePerPeriod:{
                    filled: function () {
                        // TODO implement array emptiness check
                        return true;
                    }
                },
                tempRecurringChargeMonthFrequency:{
                    required
                },
                tempConstantChurnRate:{
                    required,
                    numeric,
                },
                tempChurnRatePerPeriod:{
                    filled: function () {
                        // TODO implement array emptiness check
                        return true;
                    }
                },

                tempConstantRevenueStream:{
                    required,
                    numeric,
                    minValue: minValue(1)
                },
                tempRevenueStreamPerPeriod:{
                    filled: function () {
                        // TODO implement array emptiness check
                        return true;
                    }
                },
            }

        },
        computed:{
            currentTabValidators: function () {
                switch (this.currentTab) {
                    case 0: {
                        return [this.$v.tempRevenueName];
                    }
                    case 1:{
                        return [this.$v.tempRevenueType];
                    }
                    case 2:{
                        switch (this.tempRevenueType) {
                            case REVENUE_TYPE_UNIT_SALES:{
                                return [this.$v.tempConstantServiceCount,
                                    this.$v.tempServiceCountPerPeriod,
                                    this.$v.tempConstantServicePeriod,
                                    this.$v.revenueStart];
                                
                            }
                            case REVENUE_TYPE_BILLABLE_HOURS:{
                                return [this.$v.tempConstantServiceCount,
                                    this.$v.tempServiceCountPerPeriod,
                                    this.$v.tempConstantServicePeriod,
                                    this.$v.revenueStart];
                                
                            }
                            case REVENUE_TYPE_RECURRING_CHANGES:{
                                return [this.$v.tempConstantServiceCount,
                                    this.$v.tempServiceCountPerPeriod,
                                    this.$v.revenueStart];
                                
                            }
                            case REVENUE_TYPE_REVENUE_ONLY:{
                                return [this.$v.tempConstantRevenueStream,
                                    this.$v.tempConstantRevenueStream,
                                    this.$v.revenueStart]
                                
                            }
                            default:{

                            }
                        }
                    }
                    case 3:{
                        switch (this.tempRevenueType){
                            case REVENUE_TYPE_UNIT_SALES:{
                                return [this.$v.tempConstantUnitPrice, this.$v.tempUnitPricePerPeriod];
                                
                            }
                            case REVENUE_TYPE_BILLABLE_HOURS:{
                                return [this.$v.tempConstantUnitPrice, this.$v.tempUnitPricePerPeriod];
                                
                            }
                            case REVENUE_TYPE_RECURRING_CHANGES:{
                                return [this.$v.tempConstantUpFrontFee,
                                    this.$v.tempUpFrontFeePerPeriod,
                                    this.$v.tempRecurringChargeMonthFrequency
                                ];
                                
                            }

                        }
                    }
                    case 4:{
                        return [
                            this.$v.tempConstantChurnRate,
                            this.$v.tempChurnRatePerPeriod
                        ];
                        
                    }
                }
            }
        },
        watch:{
            
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