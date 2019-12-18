<template>
    <base-modal show-modal="true" @close="close" :wider="modalWidth">
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
                                       type="radio" name="revenueType" class="radio-style" :value="REVENUE_TYPE_UNIT_SALES" @change="resetTypes()">
                                <label>تعداد فروش</label>
                            </p>
                            <p class="description">
                                Best for products that are sold in individual units or set quantities
                            </p>
                            <p class="radio-right">
                                <input  v-model="$v.currentRevenue.type.$model"
                                       type="radio" name="revenueType" class="radio-style" :value="REVENUE_TYPE_BILLABLE_HOURS" @change="resetTypes()">
                                <label>
                                    Billable hours
                                </label>
                            </p>
                            <p class="description">
                                Best for services that are priced on a per-hour basis
                            </p>
                            <p class="radio-right">
                                <input  v-model="$v.currentRevenue.type.$model"
                                       type="radio" name="revenueType" class="radio-style" :value="REVENUE_TYPE_RECURRING_CHANGES" @change="resetTypes()">
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
                                       type="radio" name="revenueType" class="radio-style" :value="REVENUE_TYPE_REVENUE_ONLY" @change="resetTypes()">
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
                                                                <p>تغییرات</p>
                                                                <div>
                                                                    <div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"
                                                                         style="width: 87px;">
                                                                        <span aria-hidden="true"
                                                                              class="percent">%</span>
                                                                        <input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="chartShiftPercent[0]">
                                                                    </div>
                                                                </div>
                                                                <button class="overlay-button primary"
                                                                        @click="shiftChart(UNIT_COUNT)"
                                                                        v-if="chartShiftPercent[0] !== 0"
                                                                        tabindex="-1">اعمال
                                                                </button>
                                                                <button class="overlay-button primary"
                                                                        style="opacity: 0.7"
                                                                        v-else-if="applyingChartShift[0] === true"
                                                                        tabindex="-1">اعمال شد
                                                                </button>
                                                                <button class="overlay-button primary"
                                                                        v-else
                                                                        tabindex="-1">اعمال
                                                                </button>
                                                                <!--&lt;!&ndash;TODO implement applied effect&ndash;&gt;-->

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="financial-year-chart-container" id="unit-sales-chart">
                                                        <highcharts class="chart"
                                                                    :options="getChartOptions(currentRevenue.unitSalesPerPeriod, UNIT_COUNT)"
                                                                    :updateArgs="chartUpdateArgs" :highcharts="hc"></highcharts>
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
                                                                               >
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
                                                                               >
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
                                                                               >
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
                                                                               >
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
                                                                               >
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
                                                                               >
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
                                                                               >
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
                                                                               >
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
                                                                               >
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
                                                                              >
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
                                                                               >
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
                                                                               >
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
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[12]"
                                                                        >
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
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitSalesPerPeriod[13]"
                                                                        >
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
                                                                <p>تغییرات</p>
                                                                <div>
                                                                    <div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"
                                                                         style="width: 87px;">
                                                                        <span aria-hidden="true"
                                                                              class="percent">%</span>
                                                                        <input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="chartShiftPercent[1]">
                                                                    </div>
                                                                </div>
                                                                <button class="overlay-button primary"
                                                                        @click="shiftChart(UNIT_PRICE)"
                                                                        v-if="chartShiftPercent[1] !== 0"
                                                                        tabindex="-1">اعمال
                                                                </button>
                                                                <button class="overlay-button primary"
                                                                        style="opacity: 0.7"
                                                                        v-else-if="applyingChartShift[1] === true"
                                                                        tabindex="-1">اعمال شد
                                                                </button>
                                                                <button class="overlay-button primary"
                                                                        v-else
                                                                        tabindex="-1">اعمال
                                                                </button>
                                                                <!--&lt;!&ndash;TODO implement applied effect&ndash;&gt;-->

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="financial-year-chart-container" id="unit-prices-chart">
                                                        <highcharts class="chart"
                                                                    :options="getChartOptions(currentRevenue.unitPricePerPeriod, UNIT_PRICE)"
                                                                    :updateArgs="chartUpdateArgs" :highcharts="hc"></highcharts>
                                                    </div>
                                                    <div class="financial-year-input-container">
                                                        <ul class="labels faNum">
                                                            <li>
                                                                <p>1398</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number" disabled readOnly
                                                                               :value="getChartCurrentYearValue(UNIT_PRICE)">
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
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[0]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[1]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[2]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[3]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[4]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[5]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[6]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[7]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[8]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[9]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[10]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[11]"
                                                                        >
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
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[12]"
                                                                        >
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
                                                                               type="number"
                                                                               v-model.number="currentRevenue.unitPricePerPeriod[13]"
                                                                        >
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
                        </div>
                    </div>


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
                                            <p v-if="$v.currentRevenue.constantBillableHours.$error && !$v.currentRevenue.constantBillableHours.required">
                                                مقداری (بیش از 0) را وارد کنید
                                            </p>
                                        </div>
                                    </div><!-- react-empty: 148 -->
                                </div>
                                <div v-if="currentRevenue.billableHoursCountType===MEASURE_TYPE_VARIABLE">
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
                                                                <p>تغییرات</p>
                                                                <div>
                                                                    <div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"
                                                                         style="width: 87px;">
                                                                        <span aria-hidden="true"
                                                                              class="percent">%</span>
                                                                        <input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="chartShiftPercent[0]">
                                                                    </div>
                                                                </div>
                                                                <button class="overlay-button primary"
                                                                        @click="shiftChart(UNIT_COUNT)"
                                                                        v-if="chartShiftPercent[0] !== 0"
                                                                        tabindex="-1">اعمال
                                                                </button>
                                                                <button class="overlay-button primary"
                                                                        style="opacity: 0.7"
                                                                        v-else-if="applyingChartShift[0] === true"
                                                                        tabindex="-1">اعمال شد
                                                                </button>
                                                                <button class="overlay-button primary"
                                                                        v-else
                                                                        tabindex="-1">اعمال
                                                                </button>
                                                                <!--&lt;!&ndash;TODO implement applied effect&ndash;&gt;-->

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="financial-year-chart-container" id="billable-hours-chart">
                                                        <highcharts class="chart"
                                                                    :options="getChartOptions(currentRevenue.billableHoursPerPeriod, UNIT_COUNT)"
                                                                    :updateArgs="chartUpdateArgs" :highcharts="hc"></highcharts>
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
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[0]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[1]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[2]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[3]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[4]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[5]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[6]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[7]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[8]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[9]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[10]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[11]"
                                                                        >
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
                                                                               type="number"
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[12]"
                                                                        >
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
                                                                               type="number"
                                                                               v-model.number="currentRevenue.billableHoursPerPeriod[13]"
                                                                        >
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
                                                                <p>تغییرات</p>
                                                                <div>
                                                                    <div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"
                                                                         style="width: 87px;">
                                                                        <span aria-hidden="true"
                                                                              class="percent">%</span>
                                                                        <input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="chartShiftPercent[1]">
                                                                    </div>
                                                                </div>
                                                                <button class="overlay-button primary"
                                                                        @click="shiftChart(UNIT_PRICE)"
                                                                        v-if="chartShiftPercent[1] !== 0"
                                                                        tabindex="-1">اعمال
                                                                </button>
                                                                <button class="overlay-button primary"
                                                                        style="opacity: 0.7"
                                                                        v-else-if="applyingChartShift[1] === true"
                                                                        tabindex="-1">اعمال شد
                                                                </button>
                                                                <button class="overlay-button primary"
                                                                        v-else
                                                                        tabindex="-1">اعمال
                                                                </button>
                                                                <!--&lt;!&ndash;TODO implement applied effect&ndash;&gt;-->

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="financial-year-chart-container" id="hour-price-chart">
                                                        <highcharts class="chart"
                                                                    :options="getChartOptions(currentRevenue.hourPricePerPeriod, UNIT_PRICE)"
                                                                    :updateArgs="chartUpdateArgs" :highcharts="hc"></highcharts>
                                                    </div>
                                                    <div class="financial-year-input-container">
                                                        <ul class="labels faNum">
                                                            <li>
                                                                <p>1398</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number" disabled readOnly
                                                                               :value="getChartCurrentYearValue(UNIT_PRICE)">
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
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[0]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[1]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[2]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[3]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[4]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[5]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[6]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[7]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[8]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[9]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[10]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[11]"
                                                                        >
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
                                                                               type="number"
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[12]"
                                                                        >
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
                                                                               type="number"
                                                                               v-model.number="currentRevenue.hourPricePerPeriod[13]"
                                                                        >
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
                                                        <p>تغییرات</p>
                                                        <div>
                                                            <div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"
                                                                 style="width: 87px;">
                                                                        <span aria-hidden="true"
                                                                              class="percent">%</span>
                                                                <input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"
                                                                       type="number"
                                                                       v-model.number="chartShiftPercent[0]">
                                                            </div>
                                                        </div>
                                                        <button class="overlay-button primary"
                                                                @click="shiftChart(UNIT_COUNT)"
                                                                v-if="chartShiftPercent[0] !== 0"
                                                                tabindex="-1">اعمال
                                                        </button>
                                                        <button class="overlay-button primary"
                                                                style="opacity: 0.7"
                                                                v-else-if="applyingChartShift[0] === true"
                                                                tabindex="-1">اعمال شد
                                                        </button>
                                                        <button class="overlay-button primary"
                                                                v-else
                                                                tabindex="-1">اعمال
                                                        </button>
                                                        <!--&lt;!&ndash;TODO implement applied effect&ndash;&gt;-->

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="financial-year-chart-container" id="customer-count-chart">
                                                <highcharts class="chart"
                                                            :options="getChartOptions(currentRevenue.customerCountPerPeriod, UNIT_COUNT)"
                                                            :updateArgs="chartUpdateArgs" :highcharts="hc"></highcharts>
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
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[0]"
                                                                >
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
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[1]"
                                                                >
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
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[2]"
                                                                >
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
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[3]"
                                                                >
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
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[4]"
                                                                >
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
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[5]"
                                                                >
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
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[6]"
                                                                >
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
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[7]"
                                                                >
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
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[8]"
                                                                >
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
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[9]"
                                                                >
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
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[10]"
                                                                >
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
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[11]"
                                                                >
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
                                                                       type="number"
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[12]"
                                                                >
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
                                                                       type="number"
                                                                       v-model.number="currentRevenue.customerCountPerPeriod[13]"
                                                                >
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
                                    <div v-if="currentRevenue.upFrontFeeMeasureType===MEASURE_TYPE_VARIABLE">
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
                                                                    <p>تغییرات</p>
                                                                    <div>
                                                                        <div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"
                                                                             style="width: 87px;">
                                                                        <span aria-hidden="true"
                                                                              class="percent">%</span>
                                                                            <input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"
                                                                                   type="number"
                                                                                   v-model.number="chartShiftPercent[1]">
                                                                        </div>
                                                                    </div>
                                                                    <button class="overlay-button primary"
                                                                            @click="shiftChart(UP_FEE)"
                                                                            v-if="chartShiftPercent[1] !== 0"
                                                                            tabindex="-1">اعمال
                                                                    </button>
                                                                    <button class="overlay-button primary"
                                                                            style="opacity: 0.7"
                                                                            v-else-if="applyingChartShift[1] === true"
                                                                            tabindex="-1">اعمال شد
                                                                    </button>
                                                                    <button class="overlay-button primary"
                                                                            v-else
                                                                            tabindex="-1">اعمال
                                                                    </button>
                                                                    <!--&lt;!&ndash;TODO implement applied effect&ndash;&gt;-->

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="financial-year-chart-container" id="up-fee-chart">
                                                            <highcharts class="chart"
                                                                        :options="getChartOptions(currentRevenue.upFrontFeePerPeriod, UP_FEE)"
                                                                        :updateArgs="chartUpdateArgs" :highcharts="hc"></highcharts>
                                                        </div>
                                                        <div class="financial-year-input-container">
                                                            <ul class="labels faNum">
                                                                <li>
                                                                    <p>1398</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                                   type="number" disabled readOnly
                                                                                   :value="getChartCurrentYearValue(UP_FEE)">
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
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[0]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[1]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[2]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[3]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[4]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[5]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[6]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[7]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[8]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[9]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[10]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[11]"
                                                                            >
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
                                                                                   type="number"
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[12]"
                                                                            >
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
                                                                                   type="number"
                                                                                   v-model.number="currentRevenue.upFrontFeePerPeriod[13]"
                                                                            >
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
                                    <div v-if="currentRevenue.recurringChargeMeasureType===MEASURE_TYPE_VARIABLE">
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
                                                                    <p>تغییرات</p>
                                                                    <div>
                                                                        <div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"
                                                                             style="width: 87px;">
                                                                        <span aria-hidden="true"
                                                                              class="percent">%</span>
                                                                            <input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"
                                                                                   type="number"
                                                                                   v-model.number="chartShiftPercent[2]">
                                                                        </div>
                                                                    </div>
                                                                    <button class="overlay-button primary"
                                                                            @click="shiftChart(UNIT_PRICE)"
                                                                            v-if="chartShiftPercent[2] !== 0"
                                                                            tabindex="-1">اعمال
                                                                    </button>
                                                                    <button class="overlay-button primary"
                                                                            style="opacity: 0.7"
                                                                            v-else-if="applyingChartShift[2] === true"
                                                                            tabindex="-1">اعمال شد
                                                                    </button>
                                                                    <button class="overlay-button primary"
                                                                            v-else
                                                                            tabindex="-1">اعمال
                                                                    </button>
                                                                    <!--&lt;!&ndash;TODO implement applied effect&ndash;&gt;-->

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="financial-year-chart-container" id="recurring-charge-chart">
                                                            <highcharts class="chart"
                                                                        :options="getChartOptions(currentRevenue.recurringChargePerPeriod, UNIT_PRICE)"
                                                                        :updateArgs="chartUpdateArgs" :highcharts="hc"></highcharts>
                                                        </div>
                                                        <div class="financial-year-input-container">
                                                            <ul class="labels faNum">
                                                                <li>
                                                                    <p>1398</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                                   type="number" disabled readOnly
                                                                                   :value="getChartCurrentYearValue(UNIT_PRICE)">
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
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[0]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[1]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[2]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[3]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[4]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[5]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[6]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[7]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[8]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[9]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[10]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[11]"
                                                                            >
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
                                                                                   type="number"
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[12]"
                                                                            >
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
                                                                                   type="number"
                                                                                   v-model.number="currentRevenue.recurringChargePerPeriod[13]"
                                                                            >
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
                                    </div>

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
                                                <drop-down v-model="currentRevenue.recurringChargeMonthFrequency" :options="recurringChargeMonthFrequencyOptions"
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
                                                   v-model.trim="$v.currentRevenue.constantChurnRate.$model">

                                            <div class="clear"></div>

                                        </div><!-- react-empty: 148 -->
                                        <div class="feedback-line">
                                            <p v-if="$v.currentRevenue.constantChurnRate.$error && !$v.currentRevenue.constantChurnRate.required">
                                                مقداری را وارد کنید
                                            </p>
                                        </div>

                                    </div>
                                    <div v-if="currentRevenue.churnRateMeasureType===MEASURE_TYPE_VARIABLE">
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
                                                                    <p>تغییرات</p>
                                                                    <div>
                                                                        <div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"
                                                                             style="width: 87px;">
                                                                        <span aria-hidden="true"
                                                                              class="percent">%</span>
                                                                            <input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"
                                                                                   type="number"
                                                                                   v-model.number="chartShiftPercent[3]">
                                                                        </div>
                                                                    </div>
                                                                    <button class="overlay-button primary"
                                                                            @click="shiftChart(CHURN_RATE)"
                                                                            v-if="chartShiftPercent[3] !== 0"
                                                                            tabindex="-1">اعمال
                                                                    </button>
                                                                    <button class="overlay-button primary"
                                                                            style="opacity: 0.7"
                                                                            v-else-if="applyingChartShift[3] === true"
                                                                            tabindex="-1">اعمال شد
                                                                    </button>
                                                                    <button class="overlay-button primary"
                                                                            v-else
                                                                            tabindex="-1">اعمال
                                                                    </button>
                                                                    <!--&lt;!&ndash;TODO implement applied effect&ndash;&gt;-->

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="financial-year-chart-container" id="churn-rate-chart">
                                                            <highcharts class="chart"
                                                                        :options="getChartOptions(currentRevenue.churnRatePerPeriod, CHURN_RATE)"
                                                                        :updateArgs="chartUpdateArgs" :highcharts="hc"></highcharts>
                                                        </div>
                                                        <div class="financial-year-input-container">
                                                            <ul class="labels faNum">
                                                                <li>
                                                                    <p>1398</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                                   type="number" disabled readOnly
                                                                                   :value="getChartCurrentYearValue(CHURN_RATE)">
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
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[0]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[1]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[2]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[3]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[4]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[5]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[6]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[7]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[8]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[9]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[10]"
                                                                            >
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
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[11]"
                                                                            >
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
                                                                                   type="number"
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[12]"
                                                                            >
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
                                                                                   type="number"
                                                                                   v-model.number="currentRevenue.churnRatePerPeriod[13]"
                                                                            >
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
                                    </div>


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
                                                                <p>تغییرات</p>
                                                                <div>
                                                                    <div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl"
                                                                         style="width: 87px;">
                                                                        <span aria-hidden="true"
                                                                              class="percent">%</span>
                                                                        <input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number"
                                                                               v-model.number="chartShiftPercent[3]">
                                                                    </div>
                                                                </div>
                                                                <button class="overlay-button primary"
                                                                        @click="shiftChart(REVENUE_STREAM)"
                                                                        v-if="chartShiftPercent[3] !== 0"
                                                                        tabindex="-1">اعمال
                                                                </button>
                                                                <button class="overlay-button primary"
                                                                        style="opacity: 0.7"
                                                                        v-else-if="applyingChartShift[3] === true"
                                                                        tabindex="-1">اعمال شد
                                                                </button>
                                                                <button class="overlay-button primary"
                                                                        v-else
                                                                        tabindex="-1">اعمال
                                                                </button>
                                                                <!--&lt;!&ndash;TODO implement applied effect&ndash;&gt;-->

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="financial-year-chart-container" id="revenue-stream-chart">
                                                        <highcharts class="chart"
                                                                    :options="getChartOptions(currentRevenue.revenueStreamPerPeriod, REVENUE_STREAM)"
                                                                    :updateArgs="chartUpdateArgs" :highcharts="hc"></highcharts>
                                                    </div>
                                                    <div class="financial-year-input-container">
                                                        <ul class="labels faNum">
                                                            <li>
                                                                <p>1398</p>
                                                                <div class="valid">
                                                                    <div>
                                                                        <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                               type="number" disabled readOnly
                                                                               :value="getChartCurrentYearValue(REVENUE_STREAM)">
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
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[0]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[1]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[2]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[3]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[4]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[5]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[6]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[7]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[8]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[9]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[10]"
                                                                        >
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
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[11]"
                                                                        >
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
                                                                               type="number"
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[12]"
                                                                        >
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
                                                                               type="number"
                                                                               v-model.number="currentRevenue.revenueStreamPerPeriod[13]"
                                                                        >
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
                                </div>


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
                <button class="modal-button enabled" tabindex="0" @click="saveAdd()">ذخیره و افزودن مورد دیگر</button>
            </div>
            <div class="modal-footer-controls-container left" v-if="currentTab===1">
                <button :class="['modal-button','primary']" tabindex="0" v-if="!$v.currentRevenue.type.$invalid" @click="handleTabChange(2)">بعدی</button>
                <button class="modal-button enabled" tabindex="0" @click="saveAdd()">ذخیره و افزودن مورد دیگر</button>
            </div>
            <div class="modal-footer-controls-container left" v-if="currentTab===2 && currentRevenue.type !== REVENUE_TYPE_REVENUE_ONLY">
                <button :class="['modal-button','primary']" tabindex="0" @click="handleTabChange(3)">بعدی</button>
                <button class="modal-button enabled" tabindex="0" @click="saveAdd()">ذخیره و افزودن مورد دیگر</button>
            </div>
            <div class="modal-footer-controls-container left" v-if="currentTab===2 && currentRevenue.type === REVENUE_TYPE_REVENUE_ONLY">
                <button :class="['modal-button','primary']" tabindex="0" @click="finalSave()">ذخیره</button>
                <button class="modal-button enabled" tabindex="0" @click="saveAdd()">ذخیره و افزودن مورد دیگر</button>
            </div>
            <div class="modal-footer-controls-container left" v-if="currentTab===3 && currentRevenue.type === REVENUE_TYPE_RECURRING_CHANGES">
                <button :class="['modal-button','primary']" tabindex="0" @click="handleTabChange(4)">بعدی</button>
                <button class="modal-button enabled" tabindex="0" @click="saveAdd()">ذخیره و افزودن مورد دیگر</button>
            </div>
            <div class="modal-footer-controls-container left" v-else-if="(currentTab===3 && currentRevenue.type !== REVENUE_TYPE_RECURRING_CHANGES) || (currentTab===4 && currentRevenue.type === REVENUE_TYPE_RECURRING_CHANGES)">
                <button :class="['modal-button','primary']" tabindex="0" @click="finalSave()">ذخیره</button>
                <button class="modal-button enabled" tabindex="0" @click="saveAdd()">ذخیره و افزودن مورد دیگر</button>
            </div>

        </template>
    </base-modal>
</template>

<script>

    const NOT_SELECTED = -1;const REVENUE_TYPE_UNIT_SALES = 0;const REVENUE_TYPE_BILLABLE_HOURS = 1;const REVENUE_TYPE_RECURRING_CHANGES = 2;
    const REVENUE_TYPE_REVENUE_ONLY = 3;const MEASURE_TYPE_FREE = 0;const MEASURE_TYPE_CONSTANT = 1;const MEASURE_TYPE_VARIABLE = 2;
    const LENGTH_MONTH = 0;const LENGTH_YEAR = 1;const FAR_1398 = 'f';const ORD_1398 = 'o';const KHO_1398 = 'k';const TIR_1398 = 't';
    const MOR_1398 = 'mo';const SHAH_1398 = 'sh';const MEHR_1398 = 'me';const ABA_1398 = 'ab'; const AZAR_1398 = 'az'; const DEY_1398 = 'd';const BAH_1398 = 'b';
    const ESF_1398 = 'es'; const _1399 = 'p1'; const _1400 = 'p2'; const UNIT_COUNT= 0;const UNIT_PRICE= 1;const UP_FEE= 2;const CHURN_RATE= 3; const REVENUE_STREAM = 4;
    const MODAL_WIDTH_WIDE = true; const MODAL_WIDTH_NARROW = false;

    import BaseModal from './../components/BaseModal';
    import { required, integer, between, maxLength, numeric, minValue, requiredIf } from 'vuelidate/lib/validators';
    import { EventBus } from "@/js/event-bus.js";
    import Highcharts from 'highcharts';

    export default {
        name: "ModalRevenueCrud",
        data: function(){
            return {
                hc: Highcharts,
                nameCounterVisible: false,
                NOT_SELECTED : -1, REVENUE_TYPE_UNIT_SALES : 0, REVENUE_TYPE_BILLABLE_HOURS : 1, REVENUE_TYPE_RECURRING_CHANGES : 2, 
                REVENUE_TYPE_REVENUE_ONLY : 3, MEASURE_TYPE_FREE : 0, MEASURE_TYPE_CONSTANT : 1, MEASURE_TYPE_VARIABLE : 2,
                LENGTH_MONTH : 0, LENGTH_YEAR : 1, FAR_1398 : 0, ORD_1398 : 1, KHO_1398 : 2, TIR_1398 : 3,
                MOR_1398 : 4, SHAH_1398 : 5, MEHR_1398 : 6, ABA_1398 : 7, AZAR_1398 : 8, DEY_1398 : 9, BAH_1398 : 10,
                ESF_1398 : 11, _1399 : 12, _1400 : 13, UNIT_COUNT: 0, UNIT_PRICE: 1, UP_FEE: 2, CHURN_RATE: 3, REVENUE_STREAM: 4,

                isDeleting: false,
                currentTab: 0,
                typeTabs: [
                    [2,3], [2,3], [2,3,4], [2]
                ],
                periodsOptions: [
                    {title: 'ماه', code: LENGTH_MONTH},
                    {title: 'سال', code: LENGTH_YEAR},
                ],
                startOptions :[
                    {title: 'فروردین 1398', code: FAR_1398}, {title: 'اردیبهشت 1398', code: ORD_1398}, {title: 'خرداد 1398', code: KHO_1398}, {title: 'تیر 1398', code: TIR_1398},
                    {title: 'مرداد 1398', code: MOR_1398}, {title: 'شهریور 1398', code: SHAH_1398}, {title: 'مهر 1398', code: MEHR_1398}, {title: 'آبان 1398', code: ABA_1398},
                    {title: 'آذر 1398', code: AZAR_1398}, {title: 'دی 1398', code: DEY_1398}, {title: 'بهمن 1398', code: BAH_1398}, {title: 'اسفند 1398', code: ESF_1398},
                    {title: '1399', code: _1399}, {title: '1400', code: _1400},
                ],
                recurringChargeMonthFrequencyOptions: [{title: '1', code: 1}, {title: '2', code: 2}, {title: '3', code: 3},
                    {title: '4', code: 4}, {title: '5', code: 5}, {title: '6', code: 6}, {title: '7', code: 7}, {title: '8', code: 8},
                    {title: '9', code: 9}, {title: '10', code: 10}, {title: '11', code: 11}, {title: '12', code: 12}
                ],
                chartUpdateArgs: [true, true, {duration: 1000}],
                chartShiftPercent: [0, 0, 0, 0],
                applyingChartShift: [false, false, false, false],
                visitedTabs : [],
                headerName : "",
                currentRevenue:{
                    start: FAR_1398,
                    name: '',
                    headerName: '',
                    type: NOT_SELECTED,
                    unitSalesCountType: MEASURE_TYPE_CONSTANT,
                    constantUnitSalesPeriod: LENGTH_MONTH,
                    constantUnitSales: '',
                    unitSalesPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0]
                    //     {
                    //     FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '' ,
                    //     MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    //     _1399: '', _1400: ''
                    // }
                    ,
                    unitPriceMeasureType: MEASURE_TYPE_CONSTANT,
                    constantUnitPrice: '',
                    unitPricePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0],

                    billableHoursCountType: MEASURE_TYPE_CONSTANT,
                    constantBillableHoursPeriod: LENGTH_MONTH,
                    constantBillableHours: '',
                    billableHoursPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0],
                    hourPriceMeasureType: MEASURE_TYPE_CONSTANT,
                    constantHourPrice: '',
                    hourPricePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0],

                    customerCountType: MEASURE_TYPE_CONSTANT,
                    constantCustomerCount: '',
                    customerCountPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0],
                    constantCustomerCountPeriod: LENGTH_MONTH,

                    upFrontFeeMeasureType: MEASURE_TYPE_FREE,
                    constantUpFrontFee: '',
                    upFrontFeePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0],
                    recurringChargeMeasureType: MEASURE_TYPE_CONSTANT,
                    constantRecurringCharge: '',
                    recurringChargePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0],
                    recurringChargeMonthFrequency: 1,

                    // type 2 - tab 4
                    churnRateMeasureType: MEASURE_TYPE_CONSTANT,
                    constantChurnRate: '',
                    churnRatePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0],
                    revenueStreamType: MEASURE_TYPE_CONSTANT,
                    constantRevenueStream: '',
                    constantRevenueStreamPeriod: LENGTH_MONTH,
                    revenueStreamPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0],

                    // add isComplete flag to backend for tamp. saved ravenues
                },
            }
        },
        methods: {
            // setCurrentTab: function (tab) {
            //     this.currentTab = tab;
            // },
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
            resetTypes(){
                this.$v.$reset();
                this.chartShiftPercent = [0, 0, 0, 0];
                this.visitedTabs = [];
            },
            handleTabChange(to){
                let $this = this;
                let hasError = false;
                if(to > this.currentTab){
                    if(this.currentTabValidators.length){
                        this.currentTabValidators.forEach(function (validator, i) {
                            validator.$touch();
                            if(validator.$error){
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
                let $this = this;
                // console.log(window.document.getElementById('unit-sales-chart').self);

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

                                    $this.updateRevenueFromChart(ref, x, y);


                                },
                            },
                        },

                        series: [{
                            name: 'unit-sales',
                            data:
                                data.slice(0,12),

                                 // TODO solve totally null chart problem



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
                                point:{
                                    events:{
                                        'drop': function (e) {
                                            let x = e.target.x;
                                            let y = e.newPoint.y;
                                            $this.updateRevenueFromChart(ref, x, y);
                                        }
                                    }
                                }
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
                            softMin: -1000,
                            softMax: 1000,
                            // tickInterval: 100,
                            title: {
                                text: null
                            },
                            allowDecimals: false,
                            // minPadding: 2,
                            // maxPadding: 10,
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
                                series = this.currentRevenue.hourPricePerPeriod;
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
                for(let i = 0 ; i <= 11; i++){
                    if(!series[i] && series[i]!==0){}
                    else{
                        sum = sum + series[i];
                    }
                }
                return sum;
            }, //ok

            shiftChart: function(ref){

                let $this = this;
                switch(this.currentRevenue.type){
                    case REVENUE_TYPE_UNIT_SALES:{
                        switch (ref) {
                            case UNIT_COUNT:{
                                console.log('32321');
                                for(let i = 0 ; i<=13 ; i++){
                                    console.log(isNaN(this.currentRevenue.unitSalesPerPeriod[i]));
                                    if(!isNaN(this.currentRevenue.unitSalesPerPeriod[i])){
                                        this.$set(this.currentRevenue.unitSalesPerPeriod, i, Math.round(this.currentRevenue.unitSalesPerPeriod[i]*(1+(this.chartShiftPercent[0])/100)));

                                    }
                                }
                                this.$set(this.chartShiftPercent, 0, 0);
                                this.$set(this.applyingChartShift, 0, true);
                                setTimeout(function () {
                                    $this.$set($this.applyingChartShift, 0, false);
                                }, 1000);
                                break;
                            }
                            case UNIT_PRICE:{
                                for(let i = 0 ; i<=13 ; i++){
                                    if(!isNaN(this.currentRevenue.unitPricePerPeriod[i])){
                                        this.$set(this.currentRevenue.unitPricePerPeriod, i, Math.round(this.currentRevenue.unitPricePerPeriod[i]*(1+(this.chartShiftPercent[1])/100)));
                                    }
                                }
                                this.$set(this.chartShiftPercent, 1, 0);
                                this.$set(this.applyingChartShift, 1, true);
                                setTimeout(function () {
                                    $this.$set($this.applyingChartShift, 1, false);
                                }, 1000);
                                break;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_BILLABLE_HOURS:{
                        switch (ref) {
                            case UNIT_COUNT:{
                                for(let i = 0 ; i<=13 ; i++){
                                    if(!isNaN(this.currentRevenue.billableHoursPerPeriod[i])){
                                        this.$set(this.currentRevenue.billableHoursPerPeriod, i, Math.round(this.currentRevenue.billableHoursPerPeriod[i]*(1+(this.chartShiftPercent[0])/100)));
                                    }
                                }
                                this.$set(this.chartShiftPercent, 0, 0);
                                this.$set(this.applyingChartShift, 0, true);
                                setTimeout(function () {
                                    $this.$set($this.applyingChartShift, 0, false);
                                }, 1000);
                                break;
                            }
                            case UNIT_PRICE:{
                                for(let i = 0 ; i<=13 ; i++){
                                    if(!isNaN(this.currentRevenue.hourPricePerPeriod[i])){
                                        this.$set(this.currentRevenue.hourPricePerPeriod, i, Math.round(this.currentRevenue.hourPricePerPeriod[i]*(1+(this.chartShiftPercent[1])/100)));
                                    }
                                }
                                this.$set(this.chartShiftPercent, 1, 0);
                                this.$set(this.applyingChartShift, 1, true);
                                setTimeout(function () {
                                    $this.$set($this.applyingChartShift, 1, false);
                                }, 1000);
                                break;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_RECURRING_CHANGES:{
                        switch (ref) {
                            case UNIT_COUNT:{
                                for(let i = 0 ; i<=13 ; i++){
                                    if(!isNaN(this.currentRevenue.customerCountPerPeriod[i])){
                                        this.$set(this.currentRevenue.customerCountPerPeriod, i, Math.round(this.currentRevenue.customerCountPerPeriod[i]*(1+(this.chartShiftPercent[0])/100)));
                                    }
                                }
                                this.$set(this.chartShiftPercent, 0, 0);
                                this.$set(this.applyingChartShift, 0, true);
                                setTimeout(function () {
                                    $this.$set($this.applyingChartShift, 0, false);
                                }, 1000);
                                break;
                            }
                            case UP_FEE:{
                                for(let i = 0 ; i<=13 ; i++){
                                    if(!isNaN(this.currentRevenue.upFrontFeePerPeriod[i])){
                                        this.$set(this.currentRevenue.upFrontFeePerPeriod, i, Math.round(this.currentRevenue.upFrontFeePerPeriod[i]*(1+(this.chartShiftPercent[1])/100)));
                                    }
                                }
                                this.$set(this.chartShiftPercent, 1, 0);
                                this.$set(this.applyingChartShift, 1, true);
                                setTimeout(function () {
                                    $this.$set($this.applyingChartShift, 1, false);
                                }, 1000);
                                break;
                            }
                            case UNIT_PRICE:{
                                for(let i = 0 ; i<=13 ; i++){
                                    if(!isNaN(this.currentRevenue.recurringChargePerPeriod[i])){
                                        this.$set(this.currentRevenue.recurringChargePerPeriod, i, Math.round(this.currentRevenue.recurringChargePerPeriod[i]*(1+(this.chartShiftPercent[2])/100)));
                                    }
                                }
                                this.$set(this.chartShiftPercent, 2, 0);
                                this.$set(this.applyingChartShift, 2, true);
                                setTimeout(function () {
                                    $this.$set($this.applyingChartShift, 2, false);
                                }, 1000);
                                break;
                            }
                            case CHURN_RATE:{
                                for(let i = 0 ; i<=13 ; i++){
                                    if(!isNaN(this.currentRevenue.churnRatePerPeriod[i])){
                                        this.$set(this.currentRevenue.churnRatePerPeriod, i, Math.round(this.currentRevenue.churnRatePerPeriod[i]*(1+(this.chartShiftPercent[3])/100)));
                                    }
                                }
                                this.$set(this.chartShiftPercent, 3, 0);
                                this.$set(this.applyingChartShift, 3, true);
                                setTimeout(function () {
                                    $this.$set($this.applyingChartShift, 3, false);
                                }, 1000);
                                break;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_REVENUE_ONLY:{
                        for(let i = 0 ; i<=13 ; i++){
                            if(!isNaN(this.currentRevenue.revenueStreamPerPeriod[i])){
                                this.$set(this.currentRevenue.revenueStreamPerPeriod, i, Math.round(this.currentRevenue.revenueStreamPerPeriod[i]*(1+(this.chartShiftPercent[0])/100)));
                            }

                        }
                        this.$set(this.chartShiftPercent, 0, 0);
                        this.$set(this.applyingChartShift, 0, true);
                        setTimeout(function () {
                            $this.$set($this.applyingChartShift, 0, false);
                        }, 1000);
                        break;
                    }
                }


            },
            updateRevenueFromChart: function (ref, x, y) {
                switch(this.currentRevenue.type){
                    case REVENUE_TYPE_UNIT_SALES: {
                        switch (ref) {
                            case UNIT_COUNT:{
                                this.$set(this.currentRevenue.unitSalesPerPeriod,x, Math.round(y));
                                break;
                            }
                            case UNIT_PRICE:{
                                this.$set(this.currentRevenue.unitPricePerPeriod,x, Math.round(y));
                                break;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_BILLABLE_HOURS: {
                        switch (ref) {
                            case UNIT_COUNT:{
                                this.$set(this.currentRevenue.billableHoursPerPeriod,x, Math.round(y));
                                break;
                            }
                            case UNIT_PRICE:{
                                this.$set(this.currentRevenue.hourPricePerPeriod,x, Math.round(y));
                                break;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_RECURRING_CHANGES:{
                        switch (ref) {
                            case UNIT_COUNT:{
                                this.$set(this.currentRevenue.customerCountPerPeriod,x, Math.round(y));

                                break;
                            }
                            case UNIT_PRICE:{

                                this.$set(this.currentRevenue.recurringChargePerPeriod,x, Math.round(y));
                                break;
                            }
                            case UP_FEE:{
                                this.$set(this.currentRevenue.upFrontFeePerPeriod,x, Math.round(y));
                                break;
                            }
                            case CHURN_RATE:{
                                this.$set(this.currentRevenue.churnRatePerPeriod,x, Math.round(y));
                                break;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_REVENUE_ONLY:{
                        switch (ref) {
                            case REVENUE_STREAM:{
                                this.$set(this.currentRevenue.revenueStreamPerPeriod,x, Math.round(y));
                                break;
                            }
                        }
                        break;
                    }

                }

            },

            validateCurrentTab: function(){
                let hasError = false;
                if(this.currentTabValidators.length){
                    this.currentTabValidators.forEach(function (validator, i) {
                        validator.$touch();
                        if(validator.$error){
                            hasError = true;
                        }
                    });
                    return !hasError;

                }
                else{
                    return true;
                }
            },
            validateRevenueType: function(){
                let $this = this;
                let done = false;
                let tabToGo = false;
                this.typeTabs[this.currentRevenue.type].forEach(function (tab){
                    if(!tabToGo){
                        if($this.visitedTabs.length !== ($this.typeTabs[$this.currentRevenue.type]).length){
                            if(!$this.tabIsVisited(tab)){
                                $this.currentTab = tab;
                                $this.validateCurrentTab();
                                tabToGo = true;
                            }
                        }
                        else{
                            done = true;
                        }
                    }
                });
                if(done){
                    return true;
                }
            },
            tabIsVisited: function(tab){
                return this.visitedTabs.includes(tab);
            },
            finalSave: function () {
                // let $this = this;
                // let hasTabError = false;
                // if(this.currentTabValidators.length){
                //     this.currentTabValidators.forEach(function (validator, i) {
                //         validator.$touch();
                //         if(validator.$error){
                //             hasTabError = true;
                //             console.log('error');
                //         }
                //     });
                //     if(!hasTabError){
                //         console.log(this.$v);
                //         // this.$emit('save', this.currentRevenue)
                //     }
                // }
                // else{
                //     this.$emit('save', this.currentRevenue);
                // }
                if(this.validateCurrentTab()){
                    if(this.validateRevenueType()){
                        this.$emit('save', this.currentRevenue);
                    }
                }

                else{

                }
            },
            saveAdd: function(){
                if(this.$v.currentRevenue.name.$invalid){ // TODO transfer validation to a new method
                    this.$v.currentRevenue.name.$touch();
                    this.currentTab = 0;
                }
                else{
                    this.$emit('temp-save', this.currentRevenue);
                    // TODO resetModal()
                }
            },


        },

        validations(){
            return{
                currentRevenue:{
                    start: {
                        required,
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
                        required: requiredIf(function () {
                            return this.currentRevenue.unitSalesCountType===MEASURE_TYPE_CONSTANT;
                        }),
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
                    constantCustomerCount: {
                        required: requiredIf(function () {
                            return this.currentRevenue.customerCountType===MEASURE_TYPE_CONSTANT;
                        }),
                        numeric,
                        minValue: minValue(1)
                    },
                    customerCountPerPeriod: {
                        filled: function (array) {
                            if(this.currentRevenue.customerCountType===MEASURE_TYPE_VARIABLE){
                                //TODO implement logic
                                return true;
                            }
                            else{
                                return true;
                            }
                        }
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
                        between: between(LENGTH_MONTH, LENGTH_YEAR)
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
                                    this.$v.currentRevenue.customerCountPerPeriod,
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
            modalWidth: function () {
                switch (this.currentRevenue.type){
                    case REVENUE_TYPE_UNIT_SALES:{
                        switch (this.currentTab) {

                            case 2:{
                                if(this.currentRevenue.unitSalesCountType===MEASURE_TYPE_VARIABLE){
                                    return MODAL_WIDTH_WIDE;
                                }
                                else{
                                    return MODAL_WIDTH_NARROW;
                                }

                            }
                            case 3:{
                                if(this.currentRevenue.unitPriceMeasureType===MEASURE_TYPE_VARIABLE){
                                    return MODAL_WIDTH_WIDE;
                                }
                                else{
                                    return MODAL_WIDTH_NARROW;
                                }
                            }
                            default:{
                                return MODAL_WIDTH_NARROW;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_BILLABLE_HOURS:{
                        switch (this.currentTab) {

                            case 2:{
                                if(this.currentRevenue.billableHoursCountType===MEASURE_TYPE_VARIABLE){
                                    return MODAL_WIDTH_WIDE;
                                }
                                else{
                                    return MODAL_WIDTH_NARROW;
                                }

                            }
                            case 3:{
                                if(this.currentRevenue.hourPriceMeasureType===MEASURE_TYPE_VARIABLE){
                                    return MODAL_WIDTH_WIDE;
                                }
                                else{
                                    return MODAL_WIDTH_NARROW;
                                }
                            }
                            default:{
                                return MODAL_WIDTH_NARROW;
                            }
                        }

                        break;
                    }
                    case REVENUE_TYPE_RECURRING_CHANGES:{
                        switch (this.currentTab) {

                            case 2:{
                                if(this.currentRevenue.customerCountType===MEASURE_TYPE_VARIABLE){
                                    return MODAL_WIDTH_WIDE;
                                }
                                else{
                                    return MODAL_WIDTH_NARROW;
                                }

                            }
                            case 3:{
                                if(this.currentRevenue.upFrontFeeMeasureType===MEASURE_TYPE_VARIABLE
                                    || this.currentRevenue.recurringChargeMeasureType===MEASURE_TYPE_VARIABLE){
                                    return MODAL_WIDTH_WIDE;
                                }
                                else{
                                    return MODAL_WIDTH_NARROW;
                                }
                            }
                            case 4:{
                                if(this.currentRevenue.churnRateMeasureType===MEASURE_TYPE_VARIABLE){
                                    return MODAL_WIDTH_WIDE;
                                }
                                else{
                                    return MODAL_WIDTH_NARROW;
                                }
                            }
                            default:{
                                return MODAL_WIDTH_NARROW;
                            }
                        }
                        break;
                    }
                    case REVENUE_TYPE_REVENUE_ONLY:{
                        if(this.currentTab===2 && this.currentRevenue.revenueStreamType === MEASURE_TYPE_VARIABLE){
                            return MODAL_WIDTH_WIDE;
                        }
                        else{
                            return MODAL_WIDTH_NARROW;
                        }
                        break;
                    }
                    default:{
                        return MODAL_WIDTH_NARROW;
                    }
                }
            }

        },
        mounted(){


        },
        props: {
            revenue: {
                type: Object,
            }
        },
        components:{
            BaseModal,
        },
        watch:{
            currentTab: function () {
                if(this.currentTab !== 0 && this.currentTab !== 1){
                    if(!this.tabIsVisited(this.currentTab)){
                        this.visitedTabs.push(this.currentTab);
                    }
                }

            }
        }
    }
</script>

<style scoped>

</style>