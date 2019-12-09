<template>
    <base-modal show-modal="true" @close="close">
        <template #header-text>
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
            <div class="modal-footer-controls-container left">
                <!--<button :class="['modal-button','primary', ($v.tempRevenueName.$error || !tempRevenueName.length)? 'disabled' : '']" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===20 && currentTab===2">-->
                <!--<button :class="['modal-button','primary','disabled', (!tempRevenueName.length)? 'disabled' : '']" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
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
            </div>
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
    import { required, minLength, between, maxLength } from 'vuelidate/lib/validators';

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
                serviceCountType: MEASURE_TYPE_CONSTANT,
                constantServicePeriod: LENGTH_MONTH, // for type 2 = LENGTH_MONTH
                // constantServiceCount: '',
                serviceCountPerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                // type 0 - tab 3 && type 1 - tab 3
                unitPriceType: MEASURE_TYPE_CONSTANT,
                // constantUnitPrice: '',
                unitPricePerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                // type 2 - tab 3
                upFrontFeeType: MEASURE_TYPE_FREE,
                // constantUpFrontFee: '',
                upFrontFeePerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                recurringChargeType: MEASURE_TYPE_FREE,
                // constantRecurringCharge: '',
                recurringChargePerPeriod: {
                    FAR_1398: '', ORD_1398: '', KHO_1398: '', TIR_1398: '', MOR_1398: '', SHAH_1398: '',
                    MEHR_1398: '', ABA_1398: '', AZAR_1398: '', DEY_1398: '', BAH_1398: '', ESF_1398: '',
                    _1399: '', _1400: ''
                },
                recurringChargeMonthFrequency: 1,
                recurringChargeMonthFrequencyOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                // type 2 - tab 4
                churnRateType: MEASURE_TYPE_CONSTANT,
                // constantChurnRate: '',
                churnRatePerPeriod: {
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