<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="info-container clearfix vertical-scroller-fullscreen" style="height: auto"><!--class=_2Y41tlPLjIMtrtrd5XegmG clearfix vertical-scroller-fullscreen-->
            <div class="info-heading">
                <div class="info-title">ریونیو</div>
                <div class="forecast-header-buttons">
                    <div class="forecast-header-buttons">
                        <button id="show-instruction" :class="['button-type-one','toggle-button','instructions', {'visible': instructionVisibility, 'hidden': !instructionVisibility}]" @click="toggleInstruction()">
                            <!--TODO show if no data has been added-->
                            <span v-if="!instructionVisibility">
                                نمایش راهنما
                            </span>
                            <span v-if="instructionVisibility">
                                عدم نمایش راهنما
                            </span>
                        </button>
                        <button class="button-type-one toggle-button video" @click="toggleModalVisibility(0)">
                            <span>
                                مشاهده ویدئو
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="subheader instructions" v-if="instructionVisibility">
                <div class="back-right-border">
                    <!--class=NLy90I6Ihpo4Y0Ysu4GRO-->
                </div>
                <div class="subheader-content-container">
                    <span class="rtl">
                        <h4>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از</h4>
                        <p>
                           لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید
                            <a href="#"
                               v-if="!moreInstructionVisibility"
                               @click="moreInstructionVisibility = true"
                               class="link read-more-link rtl"> بیشتر...</a>
                        </p>
                        <p class="readMore"
                           v-if="moreInstructionVisibility">
                            تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته
                        </p>
                    </span>
                </div>
            </div>
            <div class="subheader charts"><!--class=_2LlroOWbTj0dda2J-9RZtK charts-->
                <div class="back-right-border"><!--class=NLy90I6Ihpo4Y0Ysu4GRO</div>-->

                </div>
                <div class="subheader-content-container">

                            <span>
                                <div class="double-column">
                                    <div class="right-chart">
                                        <highcharts class="chart" :options="chartByMonth" :updateArgs="chartUpdateArgs"></highcharts>
                                    </div>
                                    <div class="left-chart">
                                        <highcharts class="chart" :options="chartByYear" :updateArgs="chartUpdateArgs"></highcharts>
                                    </div>
                                </div>
                            </span>

                </div>
            </div>
            <div class="details-container">
                <div class="table-container faNum"><!--class=_itvKHRBWKjJt7IYI2Cy8-->

                    <tree-table :value="revenues.details"  @node-expand="monthlyTableNodeExpandHandler" @node-collapse="monthlyTableNodeCollapseHandler"  v-if="!tableMonthlyDetailsActive" :expandedKeys="monthlyTableExpandedKeys">
                        <column field="name" header="درآمد" :expander="true" headerStyle="width: 20%">
                            <template #footer>
                                <p>
                                    جمع
                                </p>
                            </template>
                            <template #body="slotProps">
                                <span v-if="slotProps.node.level === 1">
                                    {{slotProps.node.data.name}}
                                </span>
                                <span v-if="slotProps.node.level === 2">
                                    {{slotProps.node.data.name}}
                                </span>
                                <div v-if="slotProps.node.level === 3" class="editable-cell-wrapper">
                                    <a @click="toggleModalVisibility(1)">
                                        {{slotProps.node.data.name}}

                                    </a>
                                    <span class="row-edit-edit row-edit-control" title="Edit" @click="editRevenue(slotProps.node.data.id)"></span>
                                    <span class="row-edit-copy  row-edit-control" title="Copy"></span>
                                    <span class="row-edit-move-up  row-edit-control" title="Move"></span>



                                </div>
                                <!--in revenue page: all rows are from this type-->

                            </template>
                        </column>
                        <column field="1398" header="1398" headerStyle="width: 10%">
                            <!--TODO get years from moment-jalali-->
                            <template #body="slotProps">
                                <p>{{slotProps.node.data.revenuePerPeriod[12]}}</p>
                            </template>
                            <template #footer>
                                <span>
                                    {{revenues.totals[12]}}
                                </span>
                            </template>
                        </column>
                        <column field="1399" header="1399" headerStyle="width: 10%">
                            <template #body="slotProps">
                                <p>{{slotProps.node.data.revenuePerPeriod[13]}}</p>
                            </template>
                            <template #footer>
                                <span>
                                    {{revenues.totals[13]}}
                                </span>
                            </template>
                        </column>
                        <column field="1400" header="1400" headerStyle="width: 10%">
                            <template #body="slotProps">
                                <p>{{slotProps.node.data.revenuePerPeriod[14]}}</p>
                            </template>
                            <template #footer>
                                <span>
                                    {{revenues.totals[14]}}
                                </span>
                            </template>
                        </column>
                    </tree-table>
                    <div class="table-names-container"  v-if="tableMonthlyDetailsActive">
                        <tree-table :value="revenues.details" @node-expand="monthlyTableNodeExpandHandler" @node-collapse="monthlyTableNodeCollapseHandler" :expandedKeys="monthlyTableExpandedKeys">
                            <column field="name" header="درآمد" :expander="true" >
                                <template #footer>
                                    <p>
                                        جمع
                                    </p>
                                </template>
                                <template #body="slotProps">
                                <span v-if="slotProps.node.level === 1">
                                    {{slotProps.node.data.name}}
                                </span>
                                    <span v-if="slotProps.node.level === 2">
                                    {{slotProps.node.data.name}}
                                </span>
                                    <div v-if="slotProps.node.level === 3" class="editable-cell-wrapper">
                                        <a @click="toggleModalVisibility(1)">
                                            {{slotProps.node.data.name}}

                                        </a>
                                        <span class="row-edit-edit row-edit-control" title="Edit" @click="toggleModalVisibility(1)"></span>
                                        <span class="row-edit-copy  row-edit-control" title="Copy"></span>
                                        <span class="row-edit-move-up  row-edit-control" title="Move"></span>



                                    </div>
                                    <!--in revenue page: all rows are from this type-->

                                </template>
                            </column>
                        </tree-table>
                    </div>

                    <div class="border-corrector" v-if="tableMonthlyDetailsActive"></div>
                    <div class="table-details-container"  v-if="tableMonthlyDetailsActive">
                        <tree-table :value="revenues.details" :expandedKeys="monthlyTableExpandedKeys">
                            <column field="far" header="فروردین" headerStyle="width: 10%" >
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[0]}}</p>
                                </template>
                                <template #footer>
                                <span>
                                    {{revenues.totals[0]}}
                                </span>
                                </template>
                            </column>
                            <column field="ord" header="اردیبهشت" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[1]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[1]}}
                                    </span>
                                </template>
                            </column>
                            <column field="khor" header="خرداد" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[2]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[2]}}
                                    </span>
                                </template>
                            </column>
                            <column field="tir" header="تیر" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[3]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[3]}}
                                    </span>
                                </template>
                            </column>
                            <column field="mor" header="مرداد" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[4]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[4]}}
                                    </span>
                                </template>
                            </column>
                            <column field="shah" header="شهریور" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[5]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[5]}}
                                    </span>
                                </template>
                            </column>
                            <column field="mehr" header="مهر" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[6]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[6]}}
                                    </span>
                                </template>
                            </column>
                            <column field="aban" header="آبان" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[7]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[7]}}
                                    </span>
                                </template>
                            </column>
                            <column field="azar" header="آذر" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[8]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[8]}}
                                    </span>
                                </template>
                            </column>
                            <column field="dey" header="دی" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[9]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[9]}}
                                    </span>
                                </template>
                            </column>
                            <column field="bah" header="بهمن" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[10]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[10]}}
                                    </span>
                                </template>
                            </column>
                            <column field="esf" header="اسفند" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[11]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[11]}}
                                    </span>
                                </template>
                            </column>
                            <column field="1398" header="1398" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[12]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[12]}}
                                    </span>
                                </template>
                            </column>
                            <column field="1399" header="1399" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[13]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[13]}}
                                    </span>
                                </template>
                            </column>
                            <column field="1400" header="1400" headerStyle="width: 10%">
                                <template #body="slotProps">
                                    <p>{{slotProps.node.data.revenuePerPeriod[14]}}</p>
                                </template>
                                <template #footer>
                                    <span>
                                        {{revenues.totals[14]}}
                                    </span>
                                </template>
                            </column>
                        </tree-table>
                    </div>
                    <br class="clear">
                </div>
                <div>
                    <div class="controls-container clearfix">
                        <div class="buttonContainer marginTop">
                            <a class="buttonColor" name="revenue-add-revenue-button" @click="toggleModalVisibility(1)">
                                افزودن منبع درآمد
                            </a>
                            <a class="buttonGray" name="dc-add-direct-labor-button"
                               href="/company/UJLhd/CSUx/forecast/direct-costs/add/direct-labor">لورم لورم</a>
                            <div class="buttonContainerRight">
                                <div>
                                    <p class="_1PFaf3kvIFNzBQIUYZzo9V">
                                        <label>

                                            نمایش آمار ماهیانه
                                            <input
                                                    type="checkbox"
                                                    value="on"
                                                    v-model="tableMonthlyDetailsActive"
                                            >
                                        </label>
                                    </p>
                                </div>
                                <a class="buttonGray">نمای تمام صفحه</a>
                            </div>
                        </div>

                    </div>
                    <div class="subfooter-note rtl"><!--class=yITkwemeo_LVbV4h0jdUK-->
                        لورم ایپسوم فلان فلان؟
                        <a>
                            لورم ایپسوم فلان فلان
                        </a>

                    </div>
                    <div class="controlsLeft">
                        <button class="button-type-one sub-footer-navigation">
                            <router-link
                                    class="tabs-menu-item-link-container"
                                    :to='"/dashboard/forecast/financial-tables/direct-costs"'
                            >
                                « بعدی: فلان فلان
                            </router-link>
                        </button>
                        <button class="button-type-one sub-footer-navigation" >
                            قبلی: فلان فلان »
                        </button>
                    </div>
                </div>
            </div>


        <video-modal v-if="isModalVisible(0)" @close-modal="toggleModalVisibility(0)" :showModal="isModalVisible(0)">

                <v-playback :auto-play="false" :url="'https://as10.cdn.asset.aparat.com/aparat-video/2131bb93e50b506157ef09e9a57870d017847243-144p__43354.mp4'" ></v-playback>

        </video-modal>
        <modal-revenue-crud v-if="isModalVisible(1)" @close-modal="toggleModalVisibility(1)" @save="saveRevenue" @temp-save="saveAddRevenue" @refresh-modal="renewRevenueModal" @delete="deleteRevenue" :key="revenueModalKey" :revenue="JSON.stringify(modalRevenue)"></modal-revenue-crud>


    </div>
</template>

<script>

    import VideoModal from "@/js/components/VideoModal";
    import ModalRevenueCrud from "./../modals/ModalRevenueCrud";
    import { EventBus } from "@/js/event-bus.js"
    import { required, minLength, between, maxLength } from 'vuelidate/lib/validators';

    const NOT_SELECTED = -1;const REVENUE_TYPE_UNIT_SALES = 0;const REVENUE_TYPE_BILLABLE_HOURS = 1;const REVENUE_TYPE_RECURRING_CHANGES = 2;
    const REVENUE_TYPE_REVENUE_ONLY = 3;const MEASURE_TYPE_FREE = 0;const MEASURE_TYPE_CONSTANT = 1;const MEASURE_TYPE_VARIABLE = 2;
    const LENGTH_MONTH = 0;const LENGTH_YEAR = 1;const FAR_1398 = 0;const ORD_1398 = 1;const KHO_1398 = 2;const TIR_1398 = 3;
    const MOR_1398 = 4;const SHAH_1398 = 5;const MEHR_1398 = 6;const ABA_1398 = 7; const AZAR_1398 = 8; const DEY_1398 = 9;const BAH_1398 = 10;
    const ESF_1398 = 11; const _1399 = 12; const _1400 = 13; const UNIT_COUNT= 0;const UNIT_PRICE= 1;const UP_FEE= 2;const CHURN_RATE= 3; const REVENUE_STREAM = 4;
    const MODAL_WIDTH_WIDE = true; const MODAL_WIDTH_NARROW = false;

    export default {
        name: "DashboardForecastRevenue",
        components: {
            VideoModal,
            ModalRevenueCrud,
        },
        data: function(){
            return {
                revenueModalKey: 0,
                modalRevenue:{},
                revenueBeingEditedIndex: '',
                revenues : {
                    //keys are the ids
                    "details" : [
                        {
                        "key": "123654",
                        "data": {
                            start: FAR_1398,
                            name: 'asdfasdf',
                            id: '123654',
                            dbID: '123654',
                            headerName: '',
                            type: NOT_SELECTED,
                            unitSalesCountType: MEASURE_TYPE_CONSTANT,
                            constantUnitSalesPeriod: LENGTH_MONTH,
                            constantUnitSales: '',
                            unitSalesPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                            //     {
                            //     FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '' ,
                            //     MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                            //     _1399: '', _1400: ''
                            // }
                            ,
                            unitPriceMeasureType: MEASURE_TYPE_CONSTANT,
                            constantUnitPrice: '',
                            unitPricePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                            billableHoursCountType: MEASURE_TYPE_CONSTANT,
                            constantBillableHoursPeriod: LENGTH_MONTH,
                            constantBillableHours: '',
                            billableHoursPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            hourPriceMeasureType: MEASURE_TYPE_CONSTANT,
                            constantHourPrice: '',
                            hourPricePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                            customerCountType: MEASURE_TYPE_CONSTANT,
                            constantCustomerCount: '',
                            customerCountPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            constantCustomerCountPeriod: LENGTH_MONTH,

                            upFrontFeeMeasureType: MEASURE_TYPE_FREE,
                            constantUpFrontFee: '',
                            upFrontFeePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            recurringChargeMeasureType: MEASURE_TYPE_CONSTANT,
                            constantRecurringCharge: '',
                            recurringChargePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            recurringChargeMonthFrequency: 1,

                            // type 2 - tab 4
                            churnRateMeasureType: MEASURE_TYPE_CONSTANT,
                            constantChurnRate: '',
                            churnRatePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            revenueStreamType: MEASURE_TYPE_CONSTANT,
                            constantRevenueStream: '',
                            constantRevenueStreamPeriod: LENGTH_MONTH,
                            revenueStreamPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                            revenuePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

                            // add isComplete flag to backend for tamp. saved ravenues
                        },
                        "children": [
                            {
                                "key": "1234",
                                "data": {
                                    start: FAR_1398,
                                    name: 'asfdds',
                                    id: '1234',
                                    headerName: '',
                                    type: NOT_SELECTED,
                                    unitSalesCountType: MEASURE_TYPE_CONSTANT,
                                    constantUnitSalesPeriod: LENGTH_MONTH,
                                    constantUnitSales: '',
                                    unitSalesPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                                    //     {
                                    //     FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '' ,
                                    //     MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                                    //     _1399: '', _1400: ''
                                    // }
                                    ,
                                    unitPriceMeasureType: MEASURE_TYPE_CONSTANT,
                                    constantUnitPrice: '',
                                    unitPricePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                                    billableHoursCountType: MEASURE_TYPE_CONSTANT,
                                    constantBillableHoursPeriod: LENGTH_MONTH,
                                    constantBillableHours: '',
                                    billableHoursPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    hourPriceMeasureType: MEASURE_TYPE_CONSTANT,
                                    constantHourPrice: '',
                                    hourPricePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                                    customerCountType: MEASURE_TYPE_CONSTANT,
                                    constantCustomerCount: '',
                                    customerCountPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    constantCustomerCountPeriod: LENGTH_MONTH,

                                    upFrontFeeMeasureType: MEASURE_TYPE_FREE,
                                    constantUpFrontFee: '',
                                    upFrontFeePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    recurringChargeMeasureType: MEASURE_TYPE_CONSTANT,
                                    constantRecurringCharge: '',
                                    recurringChargePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    recurringChargeMonthFrequency: 1,

                                    // type 2 - tab 4
                                    churnRateMeasureType: MEASURE_TYPE_CONSTANT,
                                    constantChurnRate: '',
                                    churnRatePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    revenueStreamType: MEASURE_TYPE_CONSTANT,
                                    constantRevenueStream: '',
                                    constantRevenueStreamPeriod: LENGTH_MONTH,
                                    revenueStreamPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                                    revenuePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

                                    // add isComplete flag to backend for tamp. saved ravenues
                                },
                                "level": 2,
                                "totals": {},//total of children per period
                            }
                        ],
                        "level": 1,
                        "totals": {},//total of children per period for other pages
                    },
                        { //all revenue entries are level 3
                            "key": "14",
                            "data": {
                                start: FAR_1398,
                                name: 'asfdds',
                                id: '14',
                                dbID: '14', //TODO after fetching from db => id = dbID
                                headerName: '',
                                type: REVENUE_TYPE_UNIT_SALES,
                                unitSalesCountType: MEASURE_TYPE_CONSTANT,
                                constantUnitSalesPeriod: LENGTH_MONTH,
                                constantUnitSales: 1,
                                unitSalesPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                                //     {
                                //     FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '' ,
                                //     MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                                //     _1399: '', _1400: ''
                                // }
                                ,
                                unitPriceMeasureType: MEASURE_TYPE_CONSTANT,
                                constantUnitPrice: 1,
                                unitPricePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                                billableHoursCountType: MEASURE_TYPE_CONSTANT,
                                constantBillableHoursPeriod: LENGTH_MONTH,
                                constantBillableHours: '',
                                billableHoursPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                hourPriceMeasureType: MEASURE_TYPE_CONSTANT,
                                constantHourPrice: '',
                                hourPricePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                                customerCountType: MEASURE_TYPE_CONSTANT,
                                constantCustomerCount: '',
                                customerCountPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                constantCustomerCountPeriod: LENGTH_MONTH,

                                upFrontFeeMeasureType: MEASURE_TYPE_FREE,
                                constantUpFrontFee: '',
                                upFrontFeePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                recurringChargeMeasureType: MEASURE_TYPE_CONSTANT,
                                constantRecurringCharge: '',
                                recurringChargePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                recurringChargeMonthFrequency: 1,

                                // type 2 - tab 4
                                churnRateMeasureType: MEASURE_TYPE_CONSTANT,
                                constantChurnRate: '',
                                churnRatePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                revenueStreamType: MEASURE_TYPE_CONSTANT,
                                constantRevenueStream: '',
                                constantRevenueStreamPeriod: LENGTH_MONTH,
                                revenueStreamPerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                                revenuePerPeriod: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

                                // add isComplete flag to backend for tamp. saved ravenues
                            },
                            "children": [],
                            "level": 3,
                            "totals": {},//total of children per period for other pages
                        }],
                    "totals" : [111,22,3,444,5,6,7,8,9,10,11,12,98,99,1400],
                },

                tableMonthlyDetailsActive: false,
                monthlyTableExpandedKeys:[],

                annualChartOptions: {
                    chart: {
                        type: 'column',
                        height: 200,
                        title: '',
                    },
                    title: {
                        text: ''
                    },
                    series: [{
                        data: [10, -10, 8],
                        color: '#4c9aee',
                        negativeColor: '#d83405',
                        name: 'سری 1',

                    }],

                    xAxis:{
                        reversed: true,
                        className: 'faNum',
                        categories: [
                            1398,
                            1399,
                            1400
                        ],
                        title:{
                            text: '  '
                        },
                        labels:{
                            rotation: 60,
                            align: 'left',

                        }



                    },
                    legend: {
                        // rtl: true,
                        // useHTML:true,
                        // itemStyle:{
                        //     fontFamily: 'IRANSansFaNum',
                        //     direction: 'rtl',
                        //     textAlign: 'right'
                        // },
                        enabled: false


                    },
                    yAxis:{
                        opposite: true,
                        className: 'rtl-faNum',

                        title: '',
                        // TODO align charts zero gridlines
                        // gridLineColor: '#197F07',
                        // gridLineWidth: 0,
                        // lineWidth:1,
                        // plotLines: [{
                        //     color: '#FF0000',
                        //     width: 1,
                        //     value: 0
                        // }],

                        labels:{
                            useHTML: true,
                            formatter: function() {
                                if (this.value >= 0){
                                    return '<span class="faNum ltr"> '+this.value + ' ریال</span> ';
                                }
                                else{
                                    this.value = -1*this.value;
                                    return '<span class="faNum ltr"> ('+this.value + ' ریال</span>)';
                                }


                            }


                        }


                    },
                    tooltip: {
                        valueSuffix: ' ریال',
                        useHTML:true,
                        style:{
                            fontFamily: 'IRANSansFaNum',
                            direction: 'rtl',
                            textAlign: 'right',
                            // TODO make tooltip black
                        },
                        formatter: function() {
                            if(this.y >=0){
                                return '<b>' + this.y +  ' ریال</b>';
                            }
                            else{
                                this.y = -1*this.y;

                                return '<b>(' + this.y +  '  ریال)</b>';
                            }

                        }
                    },
                },
                monthlyChartOptions: {
                    chart: {
                        type: 'column',
                        height: 200,
                    },
                    title: {
                        text: ''
                    },
                    series: [{
                        data: [-150, -10, 8, '', -10, 8, 10, -10, 8, 10, -150, 8 ],
                        color: '#4c9aee',
                        negativeColor: '#d83405',
                        name: 'سری 1',

                    }],

                    xAxis:{
                        reversed: true,
                        className: 'faNum',
                        categories: ['فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'اسفند 98'],
                        labels: {
                            align: 'left',

                            rotation: 60
                        }
                    },
                    legend: {
                        // rtl: true,
                        // useHTML:true,
                        // itemStyle:{
                        //     fontFamily: 'IRANSansFaNum',
                        //     direction: 'rtl',
                        //     textAlign: 'right'
                        // },
                        enabled: false


                    },
                    yAxis:{
                        opposite: true,
                        className: 'rtl-faNum',

                        title: '',

                        gridLineWidth: 1,

                        labels:{
                            useHTML: true,
                            formatter: function() {
                                if (this.value >= 0){
                                    return '<span class="faNum ltr"> '+this.value + ' ریال</span> ';
                                }
                                else{
                                    this.value = -1*this.value;
                                    return '<span class="faNum ltr"> ('+this.value + ' ریال</span>)';
                                }


                            }


                        }


                    },
                    tooltip: {
                        valueSuffix: ' تومان',
                        useHTML:true,
                        style:{
                            fontFamily: 'IRANSansFaNum',
                            direction: 'rtl',
                            textAlign: 'right',
                            // TODO make tooltip black
                        },
                        formatter: function() {
                            if(this.y >=0){
                                return '<b>' + this.y +  ' ریال</b>';
                            }
                            else{
                                this.y = -1*this.y;

                                return '<b>(' + this.y +  '  ریال)</b>';
                            }

                        }
                    },
                },

                chartUpdateArgs: [true, true, {duration: 1000}],

                instructionVisibility:true,
                moreInstructionVisibility: false,

                modalVisibility: [false,false],




            }
        },
        validations:{

        },
        destroyed(){
        },
        methods:{
            toggleInstruction(){
                this.instructionVisibility = !this.instructionVisibility;
                this.moreInstructionVisibility = false;
            },
            toggleModalVisibility: function (modalID) {
                let visible = (typeof this.modalVisibility[modalID] !== 'undefined')? this.modalVisibility[modalID] : false;
                if(visible === true){
                    this.$set(this.modalVisibility, modalID, !visible);
                    this.clearModalRevenue();
                }
                else{
                    this.$set(this.modalVisibility, modalID, !visible);
                }
            },
            isModalVisible: function (i) {
                return this.modalVisibility[i];
            },
            monthlyTableNodeExpandHandler(node){
                let k = node.key;
                this.$set(this.monthlyTableExpandedKeys, k, true);
            },
            monthlyTableNodeCollapseHandler(node){
                let k = node.key;
                this.$set(this.monthlyTableExpandedKeys, k, false);
            },
            editRevenue: function(id){
                let r = (this.revenues.details.find(revenue => revenue.data.id === id));
               this.modalRevenue = r.data;
               this.revenueBeingEditedIndex = this.revenues.details.indexOf(r);
               this.toggleModalVisibility(1);
            },
            saveRevenue(revenue){


                if(revenue.id){
                    console.log('edited revenue', revenue);


                    this.revenues.details[this.revenueBeingEditedIndex].data = revenue;

                    // this.revenues.details[this.revenues.details.indexOf(this.revenues.details.find(revenue => revenue.data.id === revenue.id))].data = revenue;
                }
                else{
                    revenue.id = this.getTempId();
                    this.revenues.details.push({
                        "key": revenue.id,
                        "data": revenue,
                        "children": [],
                        "level": 3,
                        "totals": {},//total of children per period for other pages
                    });
                    // TODO implement server save via dbID
                    console.log('new revenue', revenue);

                }
                this.toggleModalVisibility(1);
            },
            saveAddRevenue(revenue){
                // TODO isTemp = true aka. just to be shown in table (??, should be checked)
                // console.log(revenue);
                this.renewRevenueModal();
                console.log('preveious modal data:', revenue);
            },
            deleteRevenue: function(revenueId){
                this.toggleModalVisibility(1);
                console.log(revenueId);
            },
            renewRevenueModal(){
                this.clearModalRevenue();
                this.revenueModalKey++;
            },
            clearModalRevenue: function(){
                this.modalRevenue = {};
                this.revenueBeingEditedIndex = '';
            },
            getTempId: function(){
                return ""+Date.now();
            }
        },
        mounted(){

        },
        computed:{
            // tableData: function(){
            //     if(!this.tableMonthlyDetailsActive){
            //         return this.annualTableData;
            //     }
            //     else{
            //         return this.monthlyTableData;
            //     }
            // },
            chartByMonth: function () {
                return {
                    chart: {
                        type: 'column',
                        height: 200,
                    },
                    title: {
                        text: ''
                    },
                    series: [{
                        data:[this.revenues.totals[0], this.revenues.totals[1],
                            this.revenues.totals[2], this.revenues.totals[3],
                            this.revenues.totals[4], this.revenues.totals[5],
                            this.revenues.totals[6], this.revenues.totals[7],
                            this.revenues.totals[8], this.revenues.totals[9],
                            this.revenues.totals[10], this.revenues.totals[11]],
                        color: '#4c9aee',
                        negativeColor: '#d83405',
                        name: 'سری 1',

                    }],

                    xAxis:{
                        reversed: true,
                        className: 'faNum',
                        categories: ['فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'فروردین 98', 'اسفند 98'],
                        labels: {
                            align: 'left',
                            rotation: 60
                        }
                    },
                    legend: {
                        // rtl: true,
                        // useHTML:true,
                        // itemStyle:{
                        //     fontFamily: 'IRANSansFaNum',
                        //     direction: 'rtl',
                        //     textAlign: 'right'
                        // },
                        enabled: false


                    },
                    yAxis:{
                        opposite: true,
                        className: 'rtl-faNum',

                        title: '',

                        gridLineWidth: 1,

                        labels:{
                            useHTML: true,
                            formatter: function() {
                                if (this.value >= 0){
                                    return '<span class="faNum ltr"> '+this.value + ' ریال</span> ';
                                }
                                else{
                                    this.value = -1*this.value;
                                    return '<span class="faNum ltr"> ('+this.value + ' ریال</span>)';
                                }


                            }


                        }


                    },
                    tooltip: {
                        valueSuffix: ' ریال',
                        useHTML:true,
                        style:{
                            fontFamily: 'IRANSansFaNum',
                            direction: 'rtl',
                            textAlign: 'right',
                            // TODO make tooltip black
                        },
                        formatter: function() {
                            if(this.y >=0){
                                return '<b>' + this.y +  ' ریال</b>';
                            }
                            else{
                                this.y = -1*this.y;

                                return '<b>(' + this.y +  '  ریال)</b>';
                            }

                        }
                    },
                }
            },
            chartByYear: function () {
                return {
                    chart: {
                        type: 'column',
                        height: 200,
                        title: '',
                    },
                    title: {
                        text: ''
                    },
                    series: [{
                        data: [this.revenues.totals[12], this.revenues.totals[13], this.revenues.totals[14]],
                        color: '#4c9aee',
                        negativeColor: '#d83405',
                        name: 'سری 1',

                    }],

                    xAxis:{
                        reversed: true,
                        className: 'faNum',
                        categories: [
                            1398,
                            1399,
                            1400
                        ],
                        title:{
                            text: '  '
                        },
                        labels:{
                            rotation: 60,
                            align: 'left',

                        }



                    },
                    legend: {
                        // rtl: true,
                        // useHTML:true,
                        // itemStyle:{
                        //     fontFamily: 'IRANSansFaNum',
                        //     direction: 'rtl',
                        //     textAlign: 'right'
                        // },
                        enabled: false


                    },
                    yAxis:{
                        opposite: true,
                        className: 'rtl-faNum',

                        title: '',
                        // TODO align charts zero gridlines
                        // gridLineColor: '#197F07',
                        // gridLineWidth: 0,
                        // lineWidth:1,
                        // plotLines: [{
                        //     color: '#FF0000',
                        //     width: 1,
                        //     value: 0
                        // }],

                        labels:{
                            useHTML: true,
                            formatter: function() {
                                if (this.value >= 0){
                                    return '<span class="faNum ltr"> '+this.value + ' ریال</span> ';
                                }
                                else{
                                    this.value = -1*this.value;
                                    return '<span class="faNum ltr"> ('+this.value + ' ریال</span>)';
                                }


                            }


                        }


                    },
                    tooltip: {
                        valueSuffix: ' ریال',
                        useHTML:true,
                        style:{
                            fontFamily: 'IRANSansFaNum',
                            direction: 'rtl',
                            textAlign: 'right',
                            // TODO make tooltip black
                        },
                        formatter: function() {
                            if(this.y >=0){
                                return '<b>' + this.y +  ' ریال</b>';
                            }
                            else{
                                this.y = -1*this.y;

                                return '<b>(' + this.y +  '  ریال)</b>';
                            }

                        }
                    },
                }
            }
        },
        watch:{

        }
    }
</script>

<style scoped>
    /*TODO make styles scoped*/
</style>