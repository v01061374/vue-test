<template>
    <base-modal show-modal="true" @close="close">
        <template #header>
            <p v-if="currentRevenue.headerName.length">
                درباره"{{currentRevenue.headerName}}"
            </p>
            <p v-else>
                درباره این درآمد بگویید
            </p>
        </template>
        <template #content>
            <ul class="navigation-stripe">
                <li :class="['step-link', {'active': currentTab === 0 }]" tabindex="0" aria-selected="true" @click="handleTabChange(0)">
            <span class="circle" aria-label="step 1:">
            1
            </span>
                    نام
                </li>
                <li :class="['step-link', {'active': currentTab === 1 }]" tabindex="1" @click="handleTabChange(1)">
            <span class="circle" aria-label="step 2:">
            2
            </span>
                    نوع
                </li>
                <li v-if="getRevenueType()===REVENUE_TYPE_UNIT_SALES" :class="['step-link', {'active': currentTab === 2 }]" tabindex="2" @click="handleTabChange(2)">
                    <span class="circle" aria-label="step 3:">
                    3
                    </span>
                    تعداد فروش
                </li>
                <li  v-if="getRevenueType()===REVENUE_TYPE_UNIT_SALES" :class="['step-link', {'active': currentTab === 3 }]" tabindex="3" @click="handleTabChange(3)">
                    <span class="circle" aria-label="step 4:">
                    4
                    </span>
                    قیمت واحد
                </li>


                <li v-if="getRevenueType()===REVENUE_TYPE_BILLABLE_HOURS" :class="['step-link', {'active': currentTab === 2 }]" tabindex="2" @click="handleTabChange(2)">
                    <span class="circle" aria-label="step 3:">
                    3
                    </span>
                    پرداخت ساعتی
                </li>
                <li v-if="getRevenueType()===REVENUE_TYPE_BILLABLE_HOURS" :class="['step-link', {'active': currentTab === 3 }]" tabindex="3" @click="handleTabChange(3)">
                    <span class="circle" aria-label="step 4:">
                    4
                    </span>
                    نرخ پرداخت ساعتی
                </li>


                <li v-if="getRevenueType()===REVENUE_TYPE_RECURRING_CHANGES" :class="['step-link', {'active': currentTab === 2 }]" tabindex="2" @click="handleTabChange(2)">
                    <span class="circle" aria-label="step 3:">
                    3
                    </span>
                    ثبت نام ها
                </li>
                <li v-if="getRevenueType()===REVENUE_TYPE_RECURRING_CHANGES" :class="['step-link', {'active': currentTab === 3 }]" tabindex="3" @click="handleTabChange(3)">
                    <span class="circle" aria-label="step 4:">
                    4
                    </span>
                    شارژ دوره ای
                </li>
                <li v-if="getRevenueType()===REVENUE_TYPE_RECURRING_CHANGES" :class="['step-link', {'active': currentTab === 4 }]" tabindex="4" @click="handleTabChange(4)">
                    <span class="circle" aria-label="step 4:">
                    5
                    </span>
                    churn rate
                </li>
                <!--TODO IMPORTANT: get translations-->
                <li v-if="getRevenueType()===REVENUE_TYPE_REVENUE_ONLY" :class="['step-link', {'active': currentTab === 2 }]" tabindex="2" @click="handleTabChange(2)">
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
                                       :class="['input-box', 'description' , $v.currentRevenue.name.$error ? 'error' : '']"
                                       placeholder="لورم لورم"
                                       v-model.trim="$v.currentRevenue.name.$model" :maxlength="255"
                                       @focusin="nameCounterVisible=true" @focusout="nameCounterVisible=false" >
                                <span class="count-down-wrapper" v-show="nameCounterVisible">
                                    {{(255 - currentRevenue.name.length >= 0)? 255 - currentRevenue.name.length : 0}}
                                </span>
                                <div class="feedback-line">
                                    <p v-if="$v.currentRevenue.name.$error && !$v.currentRevenue.name.required">
                                        مقداری را وارد کنید
                                    </p>
                                    <p v-if="$v.currentRevenue.name.$error && !$v.currentRevenue.name.maxLength">
                                        حداکثر طول 255 کاراکتر است.
                                    </p>
                                    <p v-if="$v.currentRevenue.name.$error && $v.currentRevenue.name.required && !$v.currentRevenue.name.test">
                                        ارور چک با دیتابیس
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div> <!--name tab-->

                    <div class="section" v-if="currentTab===1"> <!--revenue type tab-->
                        <div class="title-top">نوع درآمد؟</div>
                        <div class="radio-buttons-list rtl" tabindex="0" role="radiogroup">
                            <p class="radio-right">
                                <input  v-model="$v.currentRevenue.type.$model"
                                       type="radio" name="revenueType" class="radio-style" :value="REVENUE_TYPE_UNIT_SALES" @change="resetValidators()">
                                <label>تعداد فروش</label>
                            </p>
                            <p class="description">
                                Best for products that are sold in individual units or set quantities
                            </p>
                            <p class="radio-right">
                                <input  v-model="$v.currentRevenue.type.$model"
                                       type="radio" name="revenueType" class="radio-style" :value="REVENUE_TYPE_BILLABLE_HOURS" @change="resetValidators()">
                                <label>
                                    Billable hours
                                </label>
                            </p>
                            <p class="description">
                                Best for services that are priced on a per-hour basis
                            </p>
                            <p class="radio-right">
                                <input  v-model="$v.currentRevenue.type.$model"
                                       type="radio" name="revenueType" class="radio-style" :value="REVENUE_TYPE_RECURRING_CHANGES" @change="resetValidators()">
                                <label>
                                    Recurring charges
                                </label>
                            </p>
                            <p class="description">
                                Best for subscriptions, memberships, rentals, web apps, or other offerings with
                                monthly or periodic
                            </p>
                            <p class="radio-right">
                                <input v-model="$v.currentRevenue.type.$model"
                                       type="radio" name="revenueType" class="radio-style" :value="REVENUE_TYPE_REVENUE_ONLY" @change="resetValidators()">
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
                                                       v-model="currentRevenue.unitSalesCountType" @change="$v.currentRevenue.constantUnitSales.$reset">
                                                <!--TODO add this reset to all radios-->
                                                <!-- react-text: 131 -->لورم<!-- /react-text -->
                                            </label>
                                        </li>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                       v-model="currentRevenue.unitSalesCountType" @change="$v.currentRevenue.constantUnitSales.$reset">
                                                <!-- react-text: 135 -->Varying amounts over time
                                                <!-- /react-text -->
                                            </label>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>

                                </div>
                                <!--TODO constant amount selected (delete this todo-->
                                <div v-if="currentRevenue.unitSalesCountType===MEASURE_TYPE_CONSTANT">
                                    <div class="input-with-dropdown length-selection">
                                        <input type="number"
                                               :class="['faNum','input-box', '_36slfUixQ4wAFF1EUIGq5f','medium-cash',
                                                $v.currentRevenue.constantUnitSales.$error ? 'error' : '' ]"
                                               v-model.trim="$v.currentRevenue.constantUnitSales.$model" min="1">
                                        <div>

                                            <span class="per">به ازای</span>
                                            <drop-down v-model="currentRevenue.constantUnitSalesPeriod" :options="periodsOptions"
                                                       optionLabel="title" optionValue="code"
                                                       scrollHeight="100px"/>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="feedback-line">
                                            <p v-if="$v.currentRevenue.constantUnitSales.$error && !$v.currentRevenue.constantUnitSales.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div><!-- react-empty: 148 -->
                                </div>
                                <div v-if="currentRevenue.unitSalesCountType===MEASURE_TYPE_VARIABLE">
                                    <div class="financial-year-box" role="grid">
                                        <div class="financial-year-box-container">
                                            <div class="financial-year-box-wrapper"
                                                 style="height: 400px; width: 964px">
                                                <div>
                                                    <div class="financial-year-box-header">
                                                        <p>
                                                            <strong class="faNum">1398 - </strong>
                                                            فلان فلان فلان
                                                        </p>
                                                        <div>
                                                            <div class="financial-year-box-header-controls">
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
                                                                <!--&lt;!&ndash;TODO implement applied effect&ndash;&gt;-->

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="financial-year-chart-container">
                                                        <highcharts class="chart"
                                                                    :options="getChartOptions(currentRevenue.unitSalesPerPeriod, UNIT_COUNT)"
                                                                    :updateArgs="chartUpdateArgs"></highcharts>
                                                    </div>
                                                    <div class="financial-year-input-container">
                                                        <ul class="labels faNum">
                                                            <li>
                                                                <p>1398</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number" disabled readOnly
                                                                               :value="getChartCurrentYearValue(UNIT_COUNT)">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>فروردین</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[0]"
                                                                               @input="updateChartFromInput($event.target.value, UNIT_COUNT, FAR_1398 )">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>اردیبهشت</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[1]"
                                                                               @input="updateChartFromInput($event.target.value, UNIT_COUNT, ORD_1398 )">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>خرداد</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[2]"
                                                                               @input="updateChartFromInput($event.target.value, UNIT_COUNT, KHO_1398 )">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>فروردین</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[3]"
                                                                               @input="updateChartFromInput($event.target.value, UNIT_COUNT, TIR_1398 )">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>فروردین</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[4]"
                                                                               @input="updateChartFromInput($event.target.value, UNIT_COUNT, MOR_1398 )">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>فروردین</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[5]"
                                                                               @input="updateChartFromInput($event.target.value, UNIT_COUNT, SHAH_1398 )">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>فروردین</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[6]"
                                                                               @input="updateChartFromInput($event.target.value, UNIT_COUNT, MEHR_1398 )">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>فروردین</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[7]"
                                                                               @input="updateChartFromInput($event.target.value, UNIT_COUNT, ABA_1398 )">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>فروردین</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[8]"
                                                                               @input="updateChartFromInput($event.target.value, UNIT_COUNT, AZAR_1398 )">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>فروردین</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[9]"
                                                                               @input="updateChartFromInput($event.target.value, UNIT_COUNT, DEY_1398 )">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>فروردین</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[10]"
                                                                               @input="updateChartFromInput($event.target.value, UNIT_COUNT, BAH_1398 )">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>اسفند</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[11]"
                                                                               @input="updateChartFromInput($event.target.value, UNIT_COUNT, ESF_1398 )">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>1399</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="text" value="">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <p>1340</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="text" value="">
                                                                        <div class="fillRightDots"
                                                                             aria-hidden="true">
                                                                            &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> <!--TODO variable amount selected (delete this todo-->


                                <!--TODO constant amount selected (delete this todo-->

                            </div>

                            <!--TODO constant amount selected (delete this todo-->
                            <div class="section" style="margin-bottom: 30px"
                                 v-if="currentRevenue.unitSalesCountType===MEASURE_TYPE_CONSTANT">
                                <div class="title-top">
                                    When will this revenue start?
                                </div>
                                <div class="select-box period-selection">
                                    <div class="valid">
                                        <drop-down v-model="currentRevenue.start" :options="startOptions"
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
                                                       v-model="currentRevenue.unitPriceMeasureType">
                                                <!-- react-text: 131 -->لورم<!-- /react-text -->
                                            </label>
                                        </li>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                       v-model="currentRevenue.unitPriceMeasureType">
                                                <!-- react-text: 135 -->Varying amounts over time
                                                <!-- /react-text -->
                                            </label>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>


                                </div>
                                <!--TODO constant amount selected (delete this todo-->
                                <div v-if="currentRevenue.unitPriceMeasureType===MEASURE_TYPE_CONSTANT">
                                    <div class="input-with-dropdown">
                                        <div class="input-box-wrapper " style="width: 140px;">
                                            <input type="number"
                                                   :class="['faNum','input-box', ' input-box-with-currency', '_36slfUixQ4wAFF1EUIGq5f','medium-cash', '_3nXdR_fo3j0MwFs8AZWYc5',
                                                $v.currentRevenue.constantUnitPrice.$error ? 'error' : '' ]"
                                                   v-model.trim="$v.currentRevenue.constantUnitPrice.$model" min="1">
                                            <span aria-hidden="true" class="currency">ریال</span>
                                        </div>
                                        <span></span>
                                        <div class="clear"></div>
                                        <div class="feedback-line">
                                            <p v-if="$v.currentRevenue.constantUnitPrice.$error && !$v.currentRevenue.constantUnitPrice.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="currentRevenue.unitPriceMeasureType===MEASURE_TYPE_VARIABLE">
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
                                                                <!--&lt;!&ndash;TODO implement applied effect&ndash;&gt;-->

                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</div>-->
                                                    <!--<div class="financial-year-chart-container">-->
                                                        <!--<highcharts class="chart"-->
                                                                    <!--:options="getChartOptions(this.currentRevenue.unitSalesPerPeriod)"-->
                                                                    <!--:updateArgs="chartUpdateArgs"></highcharts>-->
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
                                                       v-model="currentRevenue.billableHoursCountType">
                                                <!-- react-text: 131 -->لورم<!-- /react-text -->
                                            </label>
                                        </li>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                       v-model="currentRevenue.billableHoursCountType">
                                                <!-- react-text: 135 -->Varying amounts over time
                                                <!-- /react-text -->
                                            </label>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>

                                </div>
                                <!--TODO constant amount selected (delete this todo-->
                                <div v-if="currentRevenue.billableHoursCountType===MEASURE_TYPE_CONSTANT">
                                    <div class="input-with-dropdown length-selection">
                                        <input type="number"
                                               :class="['faNum','input-box', '_36slfUixQ4wAFF1EUIGq5f','medium-cash',
                                                $v.currentRevenue.constantBillableHours.$error ? 'error' : '' ]"
                                               v-model.trim="$v.currentRevenue.constantBillableHours.$model" min="1">
                                        <div>
                                            <span class="per">به ازای</span>
                                            <drop-down v-model="currentRevenue.constantBillableHoursPeriod" :options="periodsOptions"
                                                       optionLabel="title" optionValue="code"
                                                       scrollHeight="100px"/>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="feedback-line">
                                            <p v-if="$v.currentRevenue.constantBillableHours.$error && !$v.currentRevenue.name.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div><!-- react-empty: 148 -->
                                </div>
                                <div v-if="currentRevenue.billableHoursCountType===MEASURE_TYPE_VARIABLE">
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
                                 v-if="currentRevenue.billableHoursCountType===MEASURE_TYPE_CONSTANT">
                                <div class="title-top">
                                    When will this revenue start?
                                </div>
                                <div class="select-box period-selection">
                                    <div class="valid">
                                        <drop-down v-model="currentRevenue.start" :options="startOptions"
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
                                                       v-model="currentRevenue.hourPriceMeasureType">
                                                <!-- react-text: 131 -->لورم<!-- /react-text -->
                                            </label>
                                        </li>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                       v-model="currentRevenue.hourPriceMeasureType">
                                                <!-- react-text: 135 -->Varying amounts over time
                                                <!-- /react-text -->
                                            </label>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>


                                </div>
                                <!--TODO constant amount selected (delete this todo-->
                                <div v-if="currentRevenue.hourPriceMeasureType===MEASURE_TYPE_CONSTANT">
                                    <div class="input-with-dropdown">
                                        <div class="input-box-wrapper " style="width: 140px;">
                                            <input type="number"
                                                   :class="['faNum','input-box', ' input-box-with-currency', '_36slfUixQ4wAFF1EUIGq5f','medium-cash', '_3nXdR_fo3j0MwFs8AZWYc5',
                                                $v.currentRevenue.constantHourPrice.$error ? 'error' : '' ]"
                                                   v-model.trim="$v.currentRevenue.constantHourPrice.$model" min="1">
                                            <span aria-hidden="true" class="currency">ریال</span>
                                        </div>
                                        <span></span>
                                        <div class="clear"></div>
                                        <div class="feedback-line">
                                            <p v-if="$v.currentRevenue.constantHourPrice.$error && !$v.currentRevenue.constantHourPrice.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="currentRevenue.hourPriceMeasureType===MEASURE_TYPE_VARIABLE">
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
                                        <drop-down v-model="currentRevenue.start" :options="startOptions"
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
                                                       v-model="currentRevenue.customerCountType">
                                                <!-- react-text: 131 -->لورم<!-- /react-text -->
                                            </label>
                                        </li>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                       v-model="currentRevenue.customerCountType">
                                                <!-- react-text: 135 -->Varying amounts over time
                                                <!-- /react-text -->
                                            </label>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>

                                </div>
                                <!--TODO constant amount selected (delete this todo-->
                                <div v-if="currentRevenue.customerCountType===MEASURE_TYPE_CONSTANT">
                                    <div class="input-with-dropdown length-selection">
                                        <input type="number"
                                               :class="['faNum','input-box', '_36slfUixQ4wAFF1EUIGq5f','medium-cash',
                                                $v.currentRevenue.constantCustomerCount.$error ? 'error' : '' ]"
                                               v-model.trim="$v.currentRevenue.constantCustomerCount.$model" min="1">
                                        <div>
                                            <span class="per">به ازای</span>
                                            <drop-down v-model="currentRevenue.constantCustomerCountPeriod" :options="periodsOptions"
                                                       optionLabel="title" optionValue="code"
                                                       scrollHeight="100px"/>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="feedback-line">
                                            <p v-if="$v.currentRevenue.constantCustomerCount.$error && !$v.currentRevenue.constantCustomerCount.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div><!-- react-empty: 148 -->
                                </div>
                                <div v-if="currentRevenue.customerCountType===MEASURE_TYPE_VARIABLE">
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
                                                           v-model="currentRevenue.upFrontFeeMeasureType">
                                                    <!-- react-text: 131 -->free<!-- /react-text -->
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-types" :value="MEASURE_TYPE_CONSTANT"
                                                           v-model="currentRevenue.upFrontFeeMeasureType">
                                                    <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-types" :value="MEASURE_TYPE_VARIABLE"
                                                           v-model="currentRevenue.upFrontFeeMeasureType">
                                                    <!-- react-text: 135 -->Varying amounts over time
                                                    <!-- /react-text -->
                                                </label>
                                            </li>
                                        </ul>
                                        <div class="clear"></div>
                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->
                                    <div v-if="currentRevenue.upFrontFeeMeasureType===MEASURE_TYPE_CONSTANT">
                                        <div class="input-with-dropdown">
                                            <div class="input-box-wrapper " style="width: 140px;">
                                                <input type="number"
                                                       :class="['faNum','input-box', ' input-box-with-currency', '_36slfUixQ4wAFF1EUIGq5f','medium-cash', '_3nXdR_fo3j0MwFs8AZWYc5',
                                                $v.currentRevenue.constantUpFrontFee.$error ? 'error' : '' ]"
                                                       v-model.trim="$v.currentRevenue.constantUpFrontFee.$model" min="1">
                                                <span aria-hidden="true" class="currency">ریال</span>
                                            </div>
                                            <span></span>
                                            <div class="clear"></div>
                                            <div class="feedback-line">
                                                <p v-if="$v.currentRevenue.constantUpFrontFee.$error && !$v.currentRevenue.constantUpFrontFee.required">
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
                                                           v-model="currentRevenue.recurringChargeMeasureType">
                                                    <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                           v-model="currentRevenue.recurringChargeMeasureType">
                                                    <!-- react-text: 135 -->Varying amounts over time
                                                    <!-- /react-text -->
                                                </label>
                                            </li>
                                        </ul>
                                        <div class="clear"></div>
                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->
                                    <div v-if="currentRevenue.recurringChargeMeasureType===MEASURE_TYPE_CONSTANT">
                                        <div class="input-with-dropdown">
                                            <div class="input-box-wrapper " style="width: 140px;">
                                                <input type="number"
                                                       :class="['faNum','input-box', ' input-box-with-currency', '_36slfUixQ4wAFF1EUIGq5f','medium-cash', '_3nXdR_fo3j0MwFs8AZWYc5',
                                                $v.currentRevenue.constantRecurringCharge.$error ? 'error' : '' ]"
                                                       v-model.trim="$v.currentRevenue.constantRecurringCharge.$model" min="1">
                                                <span aria-hidden="true" class="currency">ریال</span>
                                            </div>
                                            <span></span>
                                            <div class="clear"></div>
                                            <div class="feedback-line">
                                                <p v-if="$v.currentRevenue.constantRecurringCharge.$error && !$v.currentRevenue.constantRecurringCharge.required">
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
                                                <drop-down v-model="currentRevenue.recurringChargeMonthFrequency" :options="currentRevenue.recurringChargeMonthFrequencyOptions"
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
                                                           v-model="currentRevenue.churnRateMeasureType">
                                                    <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                           v-model="currentRevenue.churnRateMeasureType">
                                                    <!-- react-text: 135 -->Varying amounts over time
                                                    <!-- /react-text -->
                                                </label>
                                            </li>
                                        </ul>
                                        <div class="clear"></div>

                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->
                                    <div v-if="currentRevenue.churnRateMeasureType===MEASURE_TYPE_CONSTANT">
                                        <div class="input-box-wrapper" style="width: unset;">
                                            <span aria-hidden="true"
                                            class="percent">%</span>
                                            <input :class="['input-box', '_1v965moXRbti5zqLRSk3wE','smallPercentage',
                                            '_3nXdR_fo3j0MwFs8AZWYc5', $v.currentRevenue.constantChurnRate.$error? 'error' : '']"
                                                   type="number"
                                                   v-model="currentRevenue.constantChurnRate">

                                            <div class="clear"></div>
                                            <div class="feedback-line">
                                                <p v-if="$v.currentRevenue.constantChurnRate.$error && !$v.currentRevenue.constantChurnRate.required">
                                                    مقداری را وارد کنید
                                                </p>
                                            </div>
                                        </div><!-- react-empty: 148 -->
                                    </div>
                                    <div v-if="currentRevenue.churnRateMeasureType===MEASURE_TYPE_VARIABLE">
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
                                                       v-model="currentRevenue.revenueStreamType">
                                                <!-- react-text: 131 -->لورم<!-- /react-text -->
                                            </label>
                                        </li>
                                        <li class="horizontal">
                                            <label>
                                                <input type="radio" name="sales-unit-type" :value="MEASURE_TYPE_VARIABLE"
                                                       v-model="currentRevenue.revenueStreamType">
                                                <!-- react-text: 135 -->Varying amounts over time
                                                <!-- /react-text -->
                                            </label>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>

                                </div>
                                <!--TODO constant amount selected (delete this todo-->
                                <div v-if="currentRevenue.revenueStreamType===MEASURE_TYPE_CONSTANT">
                                    <div class="input-with-dropdown length-selection">
                                        <input type="number"
                                               :class="['faNum','input-box', '_36slfUixQ4wAFF1EUIGq5f','medium-cash',
                                                $v.currentRevenue.constantRevenueStream.$error ? 'error' : '' ]"
                                               v-model.trim="$v.currentRevenue.constantRevenueStream.$model" min="1">
                                        <div>
                                            <span class="per">به ازای</span>
                                            <drop-down v-model="currentRevenue.constantRevenueStreamPeriod" :options="periodsOptions"
                                                       optionLabel="title" optionValue="code"
                                                       scrollHeight="100px"/>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="feedback-line">
                                            <p v-if="$v.currentRevenue.constantRevenueStream.$error && !$v.currentRevenue.constantRevenueStream.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div><!-- react-empty: 148 -->
                                </div>
                                <div v-if="currentRevenue.revenueStreamType===MEASURE_TYPE_VARIABLE">
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
                                 v-if="currentRevenue.revenueStreamType===MEASURE_TYPE_CONSTANT">
                                <div class="title-top">
                                    When will this revenue start?
                                </div>
                                <div class="select-box period-selection">
                                    <div class="valid">
                                        <drop-down v-model="currentRevenue.start" :options="startOptions"
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
                <button :class="['modal-button','primary']" tabindex="0" v-if="!$v.currentRevenue.type.$invalid" @click="handleTabChange(2)">بعدی</button>
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
    const LENGTH_MONTH = 0;const LENGTH_YEAR = 1;const FAR_1398 = 'f';const ORD_1398 = 'o';const KHO_1398 = 'k';const TIR_1398 = 't';
    const MOR_1398 = 'mo';const SHAH_1398 = 'sh';const MEHR_1398 = 'me';const ABA_1398 = 'ab'; const AZAR_1398 = 'az'; const DEY_1398 = 'd';const BAH_1398 = 'b';
    const ESF_1398 = 'es'; const _1399 = 'p1'; const _1400 = 'p2'; const UNIT_COUNT= 0;const UNIT_PRICE= 1;const UP_FEE= 2;const CHURN_RATE= 3; const REVENUE_STREAM = 4;

    import BaseModal from './../components/BaseModal';
    import { required, integer, between, maxLength, numeric, minValue, requiredIf } from 'vuelidate/lib/validators';
    import { EventBus } from "@/js/event-bus.js"

    export default {
        name: "ModalRevenueCrud",
        data: function(){
            return {
                nameCounterVisible: false,
                NOT_SELECTED : -1, REVENUE_TYPE_UNIT_SALES : 0, REVENUE_TYPE_BILLABLE_HOURS : 1, REVENUE_TYPE_RECURRING_CHANGES : 2, 
                REVENUE_TYPE_REVENUE_ONLY : 3, MEASURE_TYPE_FREE : 0, MEASURE_TYPE_CONSTANT : 1, MEASURE_TYPE_VARIABLE : 2,
                LENGTH_MONTH : 0, LENGTH_YEAR : 1, FAR_1398 : 0, ORD_1398 : 1, KHO_1398 : 2, TIR_1398 : 3,
                MOR_1398 : 4, SHAH_1398 : 5, MEHR_1398 : 6, ABA_1398 : 7, AZAR_1398 : 8, DEY_1398 : 9, BAH_1398 : 10,
                ESF_1398 : 11, _1399 : 12, _1400 : 13, UNIT_COUNT: 0, UNIT_PRICE: 1, UP_FEE: 2, CHURN_RATE: 3, REVENUE_STREAM: 4,

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
                chartUpdateArgs: [true, true, {duration: 1000}],
                headerName : "",
                currentRevenue:{
                    start: FAR_1398,
                    name: '',
                    headerName: '',
                    type: NOT_SELECTED,
                    unitSalesCountType: MEASURE_TYPE_CONSTANT,
                    constantUnitSalesPeriod: LENGTH_MONTH,
                    constantUnitSales: '',
                    unitSalesPerPeriod: {
                        FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '' ,
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

                    customerCountType: MEASURE_TYPE_CONSTANT,
                    constantCustomerCount: '',
                    customerCountPerPeriod: {
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
                // currentTabValidators: [],


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
                    return this.currentRevenue.type;
                }
            },
            setRevenueType: function (revenueType) {
                this.currentRevenue.type = revenueType;
            },
            updateHeaderName(){
                this.currentRevenue.headerName = this.currentRevenue.name;
            },
            resetValidators(){
                this.$v.$reset();
            },
            handleTabChange(to){
                let $this = this;
                let hasError = false;
                if(to > this.currentTab){
                    if(this.currentTabValidators.length){
                        this.currentTabValidators.forEach(function (validator, i) {
                            validator.$touch();
                            if(validator.$error){
                                console.log('error');
                                hasError = true;
                            }
                        });
                        if(!hasError){
                            if(this.currentTab === 0){
                                $this.updateHeaderName();
                            }
                            this.currentTab = to;
                        }
                    }
                    else{
                        if(this.currentTab === 0){
                            $this.updateHeaderName();
                        }
                        $this.currentTab=to;

                    }
                }
                else{
                    if(this.currentTab === 0){
                        $this.updateHeaderName();
                    }
                    $this.currentTab=to;

                }
            },
            getChartOptions: function (data, ref) {
                return {
                        chart: {
                            type: 'line',
                            height: 260,
                            animation: false,
                            backgroundColor: null,
                            ignoreHiddenSeries: false,

                            events: {
                                'click': function(e) {

                                    let x = e.xAxis[0].value;
                                    let y = e.yAxis[0].value;

                                    if(x < 0){
                                        x=0;
                                    }
                                    else if(x>=12){
                                        x=12;
                                    }
                                    else{
                                        x = Math.round(x);
                                    }
                                    this.series[0].data[x].y = y;
                                    this.series[0].setData(this.series[0].data, true, true, true);
                                },
                                'redraw': function(e) {
                                    let output = {'ref': ref, 'series' : []};
                                    for (let i = 0; i< 12 ; i++ ){
                                        output.series[i] = Math.round(this.series[0].data[i].y);
                                    }
                                    EventBus.$emit('modal-chart-redraw', output);
                                }
                            },
                        },

                        series: [{
                            name: 'unit-sales',
                            data: Object.keys(data).map(function(key) {
                                return data[key]? data[key] : 0;
                                // TODO solve totally null chart problem
                            }).slice(0,12),

                        }],
                        plotOptions: {
                            series: {
                                animation: false,
                                stickyTracking: false,
                                dragDrop: {
                                    draggableY: true,
                                    liveRedraw: false,
                                    animation: false,
                                    // TODO add mouse movement addition
                                    // TODO improve range and animation smoothness
                                },
                            },

                            line: {
                                cursor: 'ns-resize',
                            },
                        },
                        xAxis:{
                            reversed: true,
                            className: 'rtl-faNum',
                            labels: {
                                enabled: false // disable labels
                            },
                            visible: false
                        },
                        yAxis:{
                            opposite: true,
                            className: 'faNum',
                            softMin: -100,
                            softMax: 100,
                            title: {
                                text: null
                            },
                            allowDecimals: false,
                            minPadding: 2,
                            maxPadding: 2,
                            // TODO handle automatic y-axis
                        },
                        legend: {
                            enabled: false

                        },
                        tooltip: {
                            enabled: false,
                        },
                }
            },
            getChartCurrentYearValue(ref){
                let series = {};
                switch(this.currentRevenue.type){
                    case REVENUE_TYPE_UNIT_SALES: {
                        switch (ref) {
                            case UNIT_COUNT:{
                                series = this.currentRevenue.unitSalesPerPeriod;
                                break;
                            }
                            case UNIT_PRICE:{
                                series = this.currentRevenue.unitPricePerPeriod;
                                break;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_BILLABLE_HOURS: {
                        switch (ref) {
                            case UNIT_COUNT:{
                                series = this.currentRevenue.billableHoursPerPeriod;
                                break;
                            }
                            case UNIT_PRICE:{
                                series = this.currentRevenue.billableHoursPerPeriod;
                                break;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_RECURRING_CHANGES:{
                        switch (ref) {
                            case UNIT_COUNT:{
                                series = this.currentRevenue.customerCountPerPeriod;
                                break;
                            }
                            case UNIT_PRICE:{
                                series = this.currentRevenue.recurringChargePerPeriod;
                                break;
                            }
                            case UP_FEE:{
                                series = this.currentRevenue.upFrontFeePerPeriod;
                                break;
                            }
                            case CHURN_RATE:{
                                series = this.currentRevenue.churnRatePerPeriod;
                                break;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_REVENUE_ONLY:{
                        switch (ref) {
                            case REVENUE_STREAM:{;
                                series = this.currentRevenue.revenueStreamPerPeriod;
                                break;
                            }
                        }
                        break;
                    }

                }
                let sum = 0;
                for(let p in series){
                    if (!series.hasOwnProperty(p)){continue}
                    else{
                        if(!series[p] && series[p]!==0){}
                        else{
                            sum = sum + series[p];
                        }
                    }

                }
                return sum;
            },
            updateChartFromInput(value,ref,index){
                // if(!value){
                //     this.annualSalesUnitPeriodsData[index] = 0;
                // }
                // this.annualUnitSalesChartOptions.series[0].data = this.annualSalesUnitPeriodsData;
            },
            updateRevenueFromChart: function (data) {
                let ref = data['ref'];
                let series = data['series'];
                let $this = this;
                switch(this.currentRevenue.type){
                    case REVENUE_TYPE_UNIT_SALES: {
                        console.log('ref', ref);

                        switch (ref) {
                            case UNIT_COUNT:{
                                series.forEach(function (el, i) {
                                    console.log('$this.currentRevenue.unitSalesPerPeriod.i',$this.currentRevenue.unitSalesPerPeriod.i);
                                    $this.currentRevenue.unitSalesPerPeriod.i = el;
                                });
                                break;
                            }
                            case UNIT_PRICE:{
                                series.forEach(function (el, i) {
                                    $this.currentRevenue.unitPricePerPeriod.i = el;
                                });
                                break;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_BILLABLE_HOURS: {
                        switch (ref) {
                            case UNIT_COUNT:{
                                series.forEach(function (el, i) {
                                    $this.currentRevenue.billableHoursPerPeriod.i = el;
                                });
                                break;
                            }
                            case UNIT_PRICE:{
                                series.forEach(function (el, i) {
                                    $this.currentRevenue.hourPricePerPeriod.i = el;
                                });
                                break;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_RECURRING_CHANGES:{
                        switch (ref) {
                            case UNIT_COUNT:{
                                series.forEach(function (el, i) {
                                    $this.currentRevenue.customerCountPerPeriod.i = el;
                                });
                                break;
                            }
                            case UNIT_PRICE:{
                                series.forEach(function (el, i) {
                                    $this.currentRevenue.recurringChargePerPeriod.i = el;
                                });
                                break;
                            }
                            case UP_FEE:{
                                series.forEach(function (el, i) {
                                    $this.currentRevenue.upFrontFeePerPeriod.i = el;
                                });
                                break;
                            }
                            case CHURN_RATE:{
                                series.forEach(function (el, i) {
                                    $this.currentRevenue.churnRatePerPeriod.i = el;
                                });
                                break;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_REVENUE_ONLY:{
                        switch (ref) {
                            case REVENUE_STREAM:{
                                series.forEach(function (el, i) {
                                    $this.currentRevenue.revenueStreamPerPeriod.i = el;
                                });
                                break;
                            }
                        }
                        break;
                    }

                }

            }

        },
        validations(){
            return{
                currentRevenue:{
                    start: {
                        required,
                        between: between(FAR_1398,_1400),
                    },
                    name: {
                        required,
                        maxLength: maxLength(255),
                        // tab: 2,
                        // TODO use this for validation before save attempt
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
                        required: requiredIf(function () {
                            return this.currentRevenue.unitSalesCountType===MEASURE_TYPE_CONSTANT;
                        }),
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
                        required: requiredIf(function () {
                            return this.currentRevenue.unitPriceMeasureType===MEASURE_TYPE_CONSTANT;
                        }),
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
                        required: requiredIf(function () {
                            return this.currentRevenue.billableHoursCountType===MEASURE_TYPE_CONSTANT;
                        }),
                        between: between(LENGTH_MONTH,LENGTH_YEAR)
                    },
                    constantBillableHours: {
                        required: requiredIf(function () {
                            return this.currentRevenue.billableHoursCountType===MEASURE_TYPE_CONSTANT;
                        }),
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
                        required: requiredIf(function () {
                            return this.currentRevenue.hourPriceMeasureType===MEASURE_TYPE_CONSTANT;
                        }),
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
                    constantCustomerCount: '',
                    customerCountPerPeriod: {
                        FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                        MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                        _1399: '', _1400: ''
                    },
                    customerCountType: {
                        required,
                        between: between(MEASURE_TYPE_CONSTANT, MEASURE_TYPE_VARIABLE)
                    },
                    constantCustomerCountPeriod: {
                        required: requiredIf(function () {
                            return this.currentRevenue.unitSalesCountType===MEASURE_TYPE_CONSTANT;
                        }),
                        between: between(LENGTH_MONTH,LENGTH_YEAR)
                    },
                    upFrontFeeMeasureType: {
                        required,
                        between: between(MEASURE_TYPE_FREE, MEASURE_TYPE_VARIABLE)
                    },
                    constantUpFrontFee: {
                        required: requiredIf(function () {
                            return this.currentRevenue.upFrontFeeMeasureType===MEASURE_TYPE_CONSTANT;
                        }),
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
                        required:requiredIf(function () {
                            return this.currentRevenue.recurringChargeMeasureType===MEASURE_TYPE_CONSTANT;
                        }),
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
                        required: requiredIf(function () {
                            return this.currentRevenue.churnRateMeasureType===MEASURE_TYPE_CONSTANT;
                        }),
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
                        required: requiredIf(function () {
                            return this.currentRevenue.revenueStreamType===MEASURE_TYPE_CONSTANT;
                        }),
                        numeric,
                        minValue: minValue(1)
                    },
                    constantRevenueStreamPeriod: {
                        required: requiredIf(function () {
                            return this.currentRevenue.revenueStreamType===MEASURE_TYPE_CONSTANT;
                        }),
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
                        return [this.$v.currentRevenue.name];
                    }
                    case 1:{
                        return [this.$v.currentRevenue.type];
                    }
                    case 2:{
                        switch (this.currentRevenue.type) {
                            case REVENUE_TYPE_UNIT_SALES:{
                                return [this.$v.currentRevenue.unitSalesCountType,
                                    this.$v.currentRevenue.unitSalesPerPeriod,
                                    this.$v.currentRevenue.constantUnitSales,
                                    this.$v.currentRevenue.constantUnitSalesPeriod,
                                    this.$v.currentRevenue.start];

                            }
                            case REVENUE_TYPE_BILLABLE_HOURS:{
                                return [this.$v.currentRevenue.billableHoursCountType,
                                    this.$v.currentRevenue.billableHoursPerPeriod,
                                    this.$v.currentRevenue.constantBillableHours,
                                    this.$v.currentRevenue.constantBillableHoursPeriod,
                                    this.$v.currentRevenue.start];

                            }
                            case REVENUE_TYPE_RECURRING_CHANGES:{
                                return [this.$v.currentRevenue.customerCountType,
                                    this.$v.currentRevenue.constantCustomerCount,
                                    this.$v.currentRevenue.constantCustomerCountPeriod,
                                    this.$v.currentRevenue.start];

                            }
                            case REVENUE_TYPE_REVENUE_ONLY:{
                                return [this.$v.currentRevenue.revenueStreamType,
                                    this.$v.currentRevenue.constantRevenueStream,
                                    this.$v.currentRevenue.constantRevenueStreamPeriod,
                                    this.$v.currentRevenue.start];

                            }
                            default:{

                            }
                        }
                    }
                    case 3:{
                        switch (this.currentRevenue.type){
                            case REVENUE_TYPE_UNIT_SALES:{
                                return [this.$v.currentRevenue.unitPriceMeasureType, this.$v.currentRevenue.constantUnitPrice, this.$v.currentRevenue.unitPricePerPeriod];

                            }
                            case REVENUE_TYPE_BILLABLE_HOURS:{
                                return [this.$v.currentRevenue.hourPriceMeasureType, this.$v.currentRevenue.constantHourPrice, this.$v.currentRevenue.hourPricePerPeriod];

                            }
                            case REVENUE_TYPE_RECURRING_CHANGES:{
                                return [this.$v.currentRevenue.upFrontFeeMeasureType, this.$v.currentRevenue.constantUpFrontFee, this.$v.currentRevenue.upFrontFeePerPeriod,
                                        this.$v.currentRevenue.recurringChargeMeasureType, this.$v.currentRevenue.constantRecurringCharge, this.$v.currentRevenue.recurringChargePerPeriod,
                                        this.$v.currentRevenue.recurringChargeMonthFrequency];

                            }

                        }
                    }
                    case 4:{
                        return [this.$v.currentRevenue.churnRateMeasureType, this.$v.currentRevenue.constantChurnRate, this.$v.currentRevenue.churnRatePerPeriod];

                    }
                }
            },


        },
        mounted(){
            EventBus.$on('modal-chart-redraw', data => {
                this.updateRevenueFromChart(data);
            });
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