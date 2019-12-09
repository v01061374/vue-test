<template>
    <base-modal show-modal="true" @close="close">
        <template v-slot:header-text>
            <p v-if="revenue">
                درباره"{{revenue.title}}"
            </p>
            <p v-else>
                درباره این درآمد بگویید
            </p>
        </template>
        <template v-slot:footer>
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
            <!--<div class="modal-footer-controls-container left">-->
                <!--<button :class="['modal-button','primary', ($v.tempRevenueName.$error || !tempRevenueName.length)? 'disabled' : '']" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===20 && currentModalTab===2">-->
                <!--<button :class="['modal-button','primary','disabled', (!tempRevenueName.length)? 'disabled' : '']" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===20 && currentModalTab===3">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===21 && currentModalTab===2">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->

            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===21 && currentModalTab===3">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===22 && currentModalTab===2">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===21 && currentModalTab===2">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===22 && currentModalTab===3">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===22 && currentModalTab===4">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
            <!--<div class="modal-footer-controls-container left" v-if="getModalState(1)===23 && currentModalTab===2">-->
                <!--<button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>-->
                <!--<button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>-->
            <!--</div>-->
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
    export default {
        name: "ModalRevenueCrud",
        data: function(){
            return {
                isDeleting: false,
                currentModalTab: 0,
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