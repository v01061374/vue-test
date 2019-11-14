<template>
    <div class="info-container clearfix vertical-scroller-fullscreen" style="height: auto"><!--class=_2Y41tlPLjIMtrtrd5XegmG clearfix vertical-scroller-fullscreen-->

            <div class="info-heading">
                <div class="info-title">ریونیو</div>
                <div class="forecast-header-buttons">
                    <div class="forecast-header-buttons">
                        <button id="show-instruction" :class="['button-type-one','toggle-button','instructions', {'visible': showInstruction, 'hidden': !showInstruction}]" @click="toggleInstruction()">
                            <!--TODO show if no data has been added-->
                            <span v-if="!showInstruction">
                                نمایش راهنما
                            </span>
                            <span v-if="showInstruction">
                                عدم نمایش راهنما
                            </span>
                        </button>
                        <button class="button-type-one toggle-button video" @click="showVideoModal = true">
                            <span>
                                مشاهده ویدئو
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="subheader instructions" v-if="showInstruction">
                <div class="back-right-border">
                    <!--class=NLy90I6Ihpo4Y0Ysu4GRO-->
                </div>
                <div class="subheader-content-container">
                    <span class="rtl">
                        <h4>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از</h4>
                        <p>
                           لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید
                            <a href="#"
                               v-if="!showMoreInstruction"
                               @click="showMoreInstruction = true"
                               class="link read-more-link rtl"> بیشتر...</a>
                        </p>
                        <p class="readMore"
                           v-if="showMoreInstruction">
                            تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته
                        </p>
                    </span>
                </div>
            </div>
            <div class="subheader charts">
                <!--class=_2LlroOWbTj0dda2J-9RZtK charts-->
                <div class="back-right-border">
                    <!--class=NLy90I6Ihpo4Y0Ysu4GRO</div>-->

                </div>
                <div class="subheader-content-container">
                        <span>
                            <!--<img src="../../img/chart-SC.jpg"-->
                                 <!--style="width: 100%; height: 185.22px;"-->
                                 <!--alt="">-->
                            <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
                        </span>
                </div>
            </div>
            <div class="details-container">

                <div class="table-container faNum"><!--class=_itvKHRBWKjJt7IYI2Cy8-->
                    <template>
                        <tree-table
                                class="table"
                                :columns="columns"
                                :table-data="tableData" />
                    </template>
                </div>
                <div>
                    <div class="controls-container clearfix">
                        <div class="buttonContainer marginTop">
                            <a class="buttonColor" name="revenue-add-revenue-button">
                                افزودن منبع درآمد
                            </a>


                            <!--<modal v-if="showModal" @close="showModal = false">-->
                            <!--&lt;!&ndash;-->
                            <!--you can use custom content here to overwrite-->
                            <!--default content-->
                            <!--&ndash;&gt;-->
                            <!--<h3 slot="header">custom header</h3>-->
                            <!--</modal>-->
                            <a class="buttonGray" name="dc-add-direct-labor-button"
                               href="/company/UJLhd/CSUx/forecast/direct-costs/add/direct-labor">لورم لورم</a>
                            <div class="buttonContainerRight">
                                <div>
                                    <p class="_1PFaf3kvIFNzBQIUYZzo9V">
                                        <label>
                                            <input
                                                    type="checkbox"
                                                    value="on"
                                                    >
                                            نمایش آمار ماهیانه
                                        </label>
                                    </p>
                                </div>
                                <a class="buttonGray">نمای تمام صفحه</a>
                            </div>
                        </div>

                    </div>
                    <div class="subfooter-note rtl">
                        <!--class=yITkwemeo_LVbV4h0jdUK-->
                        لورم ایپسوم فلان فلان؟
                        <a>
                            لورم ایپسوم فلان فلان
                        </a>

                    </div>
                    <div class="controlsLeft">
                        <button class="button-type-one ">
                            « بعدی: فلان فلان
                        </button>
                        <button class="button-type-one ">
                            قبلی: فلان فلان »
                        </button>
                    </div>
                </div>
            </div>


        <modal @close-modal="showVideoModal=false" :showModal="showVideoModal" slot="body">
            <v-playback :url="'https://as10.cdn.asset.aparat.com/aparat-video/2131bb93e50b506157ef09e9a57870d017847243-144p__43354.mp4'" ></v-playback>
        </modal>
    </div>

</template>

<script>
    import TreeTable from 'vue-tree-table-component';
    import Modal from "@/js/components/Modal.vue";
    export default {
        name: "DashboardForecastRevenue",
        components: {
            TreeTable,
            Modal
        },
        data: function(){
            return {
                tableData: [
                    {name: 'Ziuta', surname: 'Kozak', children: [
                            {name: 'Czerwony Kapturek', surname: 'Kozak'}
                        ]},
                    {name: 'Koziolek', surname: 'Matolek', children: [
                            { name: 'Timon', surname: 'Matolek', children: [ {name: 'Timon Junior', surname: 'Matolek'} ]}
                        ]},
                    {name: 'Pumba', surname: 'unknown'}
                ],
                columns: [{label: 'Name', id: 'name'}, {label: 'Surname', id: 'surname'}],

                showInstruction:false,
                showMoreInstruction: false,
                showVideoModal: false,


                updateArgs: [true, true, {duration: 1000}],
                chartOptions: {
                    chart: {
                        type: 'spline',
                    },
                    title: {
                        text: 'Sin chart'
                    },
                    series: [{
                        data: [10, 0, 8, 2, 6, 4, 5, 5],
                        color: '#6fcd98',
                        name: 'سری 1'
                    }],
                    height: 200,
                    xAxis:{
                        reversed: true,
                        className: 'rtl-faNum'
                    },
                    legend: {
                        rtl: true,
                        useHTML:true,
                        itemStyle:{
                            fontFamily: 'IRANSansFaNum',
                            direction: 'rtl',
                            textAlign: 'right'
                        }


                    },
                    yAxis:{
                        opposite: true,
                        className: 'rtl-faNum'

                    },
                    tooltip: {
                        valueSuffix: ' تومان',
                        useHTML:true,
                        style:{
                            fontFamily: 'IRANSansFaNum',
                            direction: 'rtl',
                            textAlign: 'right'
                        }
                    },
                }

            }
        },
        methods:{
            toggleInstruction(){
                this.showInstruction = !this.showInstruction;
                this.showMoreInstruction = false;
            },

        }
    }
</script>

<style scoped>

</style>