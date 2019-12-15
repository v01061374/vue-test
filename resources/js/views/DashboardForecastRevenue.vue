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
                                        <highcharts class="chart" :options="monthlyChartOptions" :updateArgs="updateArgs"></highcharts>
                                    </div>
                                    <div class="left-chart">
                                        <highcharts class="chart" :options="annualChartOptions" :updateArgs="updateArgs"></highcharts>
                                    </div>
                                </div>
                            </span>

                </div>
            </div>
            <div class="details-container">



                <div class="table-container faNum"><!--class=_itvKHRBWKjJt7IYI2Cy8-->

                    <tree-table :value="tableData.details" v-if="!tableMonthlyDetailsActive">
                        <column field="name" header="درآمد" :expander="true" headerStyle="width: 20%">
                            <template #footer>
                                <p>
                                    {{tableData.totals['title']}}
                                </p>
                            </template>
                            <template #body="slotProps">
                                <span v-if="slotProps.node.data.level === 1">
                                    {{slotProps.node.data.name}}
                                </span>
                                <span v-if="slotProps.node.data.level === 2">
                                    {{slotProps.node.data.name}}
                                </span>
                                <div v-if="slotProps.node.data.level === 3" class="editable-cell-wrapper">
                                    <a @click="toggleModalVisibility(1)">
                                        {{slotProps.node.data.name}}

                                    </a>
                                    <span class="row-edit-edit row-edit-control" title="Edit" @click="toggleModalVisibility(1)"></span>
                                    <span class="row-edit-copy  row-edit-control" title="Copy"></span>
                                    <span class="row-edit-move-up  row-edit-control" title="Move"></span>



                                </div>

                            </template>
                        </column>
                        <column field="1398" header="1398" headerStyle="width: 10%">
                            <template #footer>
                                <span>
                                    {{tableData.totals['1398']}}
                                </span>
                            </template>
                        </column>
                        <column field="1399" header="1399" headerStyle="width: 10%">
                            <template #footer>
                                <span>
                                    {{tableData.totals['1399']}}
                                </span>
                            </template>
                        </column>
                        <column field="1400" header="1400" headerStyle="width: 10%">
                            <template #footer>
                                <span>
                                    {{tableData.totals['1400']}}
                                </span>
                            </template>
                        </column>
                    </tree-table>

                    <div class="table-names-container"  v-if="tableMonthlyDetailsActive">
                        <tree-table :value="tableData.details" @node-expand="monthlyTableNodeExpandHandler" @node-collapse="monthlyTableNodeCollapseHandler">
                            <column field="name" header="درآمد" :expander="true" headerStyle="width: 35%" >

                                <template #footer>
                                    <p>
                                        {{tableData.totals['title']}}
                                    </p>
                                </template>
                                <template #body="slotProps">
                                <span v-if="slotProps.node.data.level === 1">
                                    {{slotProps.node.data.name}}
                                </span>
                                    <span v-if="slotProps.node.data.level === 2">
                                    {{slotProps.node.data.name}}
                                </span>
                                    <div v-if="slotProps.node.data.level === 3" class="editable-cell-wrapper">
                                        <a @click="toggleModalVisibility(1)">
                                            {{slotProps.node.data.name}}
                                        </a>
                                        <span class="row-edit-edit row-edit-control" title="Edit" @click="toggleModalVisibility(1)"></span>
                                        <span class="row-edit-copy  row-edit-control" title="Copy"></span>
                                        <span class="row-edit-move-up  row-edit-control" title="Move"></span>
                                    </div>
                                </template>
                            </column>
                        </tree-table>
                    </div>
                    <div class="border-corrector" v-if="tableMonthlyDetailsActive"></div>
                    <div class="table-details-container"  v-if="tableMonthlyDetailsActive">
                        <tree-table :value="tableData.details"  :expandedKeys="monthlyTableExpandedKeys">
                            <column field="far" header="فروردین" headerStyle="width: 10%" >
                                <template #footer>
                            <span>
                                {{tableData.totals['far']}}
                            </span>
                                </template>
                            </column>
                            <column field="ord" header="اردیبهشت" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['ord']}}
                            </span>
                                </template>
                            </column>
                            <column field="khor" header="خرداد" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['khor']}}
                            </span>
                                </template>
                            </column>
                            <column field="tir" header="تیر" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['tir']}}
                            </span>
                                </template>
                            </column>
                            <column field="mor" header="مرداد" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['mor']}}
                            </span>
                                </template>
                            </column>
                            <column field="shah" header="شهریور" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['shah']}}
                            </span>
                                </template>
                            </column>
                            <column field="mehr" header="مهر" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['mehr']}}
                            </span>
                                </template>
                            </column>
                            <column field="aban" header="آبان" headerStyle="width: 10%">
                                <template #footer>
                                <span>
                                    {{tableData.totals['aban']}}
                                </span>
                                </template>
                            </column>
                            <column field="azar" header="آذر" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['azar']}}
                            </span>
                                </template>
                            </column>
                            <column field="dey" header="دی" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['dey']}}
                            </span>
                                </template>
                            </column>
                            <column field="bah" header="بهمن" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['bah']}}
                            </span>
                                </template>
                            </column>
                            <column field="esf" header="اسفند" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['esf']}}
                            </span>
                                </template>
                            </column>
                            <column field="1398" header="1398" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['1398']}}
                            </span>
                                </template>
                            </column>
                            <column field="1399" header="1399" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['1399']}}
                            </span>
                                </template>
                            </column>
                            <column field="1400" header="1400" headerStyle="width: 10%">
                                <template #footer>
                            <span>
                                {{tableData.totals['1400']}}
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


        <div v-if="1===2">
                <template>

                    <div>
                        <div>

                            <div class="forecast-item-editor" v-if="getModalState(1)===20 && currentModalTab===2">
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
                                                        <input type="radio" name="sales-unit-type" value="1"
                                                               v-model="unitSalesTypeIsConstant">
                                                        <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                    </label>
                                                </li>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="sales-unit-type" value="0"
                                                               v-model="unitSalesTypeIsConstant">
                                                        <!-- react-text: 135 -->Varying amounts over time
                                                        <!-- /react-text -->
                                                    </label>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>

                                        </div>
                                        <!--TODO constant amount selected (delete this todo-->
                                        <div v-if="unitSalesTypeIsConstant==='1'">
                                            <div class="input-with-dropdown length-selection">
                                                <input type="text"
                                                       class="faNum input-box _36slfUixQ4wAFF1EUIGq5f error medium-cash"
                                                       value="" aria-describedby="value-control-2" aria-invalid="true">
                                                <div>
                                                    <span class="per">به ازای  </span>
                                                    <drop-down v-model="selectedLength" :options="lengthOptions"
                                                               optionLabel="title" optionValue="code"
                                                               scrollHeight="100px"/>
                                                </div>
                                                <div class="clear"></div>
                                            </div><!-- react-empty: 148 -->
                                        </div>
                                        <div v-if="unitSalesTypeIsConstant==='0'">

                                            variable
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
                                                                                       v-model="annualSalesUnitShiftPercent">
                                                                            </div>
                                                                        </div>
                                                                        <button class="overlay-button primary"
                                                                                @click="shiftAnnualSalesUnitChart()"
                                                                                tabindex="-1">اعمال
                                                                        </button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="financial-year-chart-container">
                                                                <highcharts class="chart"
                                                                            :options="annualUnitSalesChartOptions"
                                                                            :updateArgs="updateArgs"
                                                                            @redraw="consolelog()"></highcharts>
                                                            </div>
                                                            <div class="financial-year-input-container">
                                                                <ul class="labels faNum">
                                                                    <li>
                                                                        <p>1398</p>
                                                                        <div class="valid">
                                                                            <div>
                                                                                <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5"
                                                                                       type="number" disabled readOnly
                                                                                       :value="currentYearAnnualUnitSales">
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
                                                                                       v-model.number="annualSalesUnitPeriodsData[0]"
                                                                                       @input="updateAnnualSalesUnitChart($event.target.value , 0)">
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
                                                                                       v-model.number="annualSalesUnitPeriodsData[1]"
                                                                                       @input="updateAnnualSalesUnitChart($event.target.value, 1)">
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
                                                                                       v-model.number="annualSalesUnitPeriodsData[2]"
                                                                                       @input="updateAnnualSalesUnitChart($event.target.value, 2)">
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
                                                                                       v-model.number="annualSalesUnitPeriodsData[3]"
                                                                                       @input="updateAnnualSalesUnitChart($event.target.value, 3)">
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
                                                                                       v-model.number="annualSalesUnitPeriodsData[4]"
                                                                                       @input="updateAnnualSalesUnitChart($event.target.value, 4)">
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
                                                                                       v-model.number="annualSalesUnitPeriodsData[5]"
                                                                                       @input="updateAnnualSalesUnitChart($event.target.value,5)">
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
                                                                                       v-model.number="annualSalesUnitPeriodsData[6]"
                                                                                       @input="updateAnnualSalesUnitChart($event.target.value, 6)">
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
                                                                                       v-model.number="annualSalesUnitPeriodsData[7]"
                                                                                       @input="updateAnnualSalesUnitChart($event.target.value, 7)">
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
                                                                                       v-model.number="annualSalesUnitPeriodsData[8]"
                                                                                       @input="updateAnnualSalesUnitChart($event.target.value, 8)">
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
                                                                                       v-model.number="annualSalesUnitPeriodsData[9]"
                                                                                       @input="updateAnnualSalesUnitChart($event.target.value, 9)">
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
                                                                                       v-model.number="annualSalesUnitPeriodsData[10]"
                                                                                       @input="updateAnnualSalesUnitChart($event.target.value, 10)">
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
                                                                                       v-model.number="annualSalesUnitPeriodsData[11]"
                                                                                       @input="updateAnnualSalesUnitChart($event.target.value, 11)">
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
                                         v-if="unitSalesTypeIsConstant==='1'">
                                        <div class="title-top">
                                            When will this revenue start?
                                        </div>
                                        <div class="select-box period-selection">
                                            <div class="valid">
                                                <drop-down v-model="selectedPeriod" :options="periodOptions"
                                                           optionLabel="title" optionValue="code" scrollHeight="150px"/>
                                            </div>
                                        </div>
                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->

                                </div>
                            </div>
                            <!--TODO sths not tranfered yet-->




                            <div class="forecast-item-editor" v-if="getModalState(1)===20 && currentModalTab===3">
                                <div>
                                    <div class="section" style="margin-bottom: 30px">
                                        <div class="title-top">
                                            What price will you charge for each unit?
                                        </div>
                                        <p class="title-content">
                                            Enter your average selling price (excluding sales tax) for each unit of this
                                            product or service. You can vary prices over time, if necessary, to reflect
                                            seasonal changes in demand, planned increases, or scheduled discount
                                            promotions. </p>
                                        <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                             aria-orientation="horizontal">
                                            <ul>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                               value="on">
                                                        لورم
                                                    </label>
                                                </li>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                               value="on">
                                                        Varying amounts over time
                                                    </label>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                        <!--TODO constant amount selected (delete this todo-->
                                        <div>
                                            <div class="input-with-dropdown">
                                                <div class="input-box-wrapper " style="width: 140px;">

                                                    <input class="faNum input-box input-box-with-currency _36slfUixQ4wAFF1EUIGq5f mediumCash _3nXdR_fo3j0MwFs8AZWYc5"
                                                           type="text">
                                                    <span aria-hidden="true" class="currency">ریال</span>
                                                </div>
                                                <span></span>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                        <!--TODO constant amount selected (delete this todo-->

                                    </div>

                                </div>
                            </div>

                            <div class="forecast-item-editor" v-if="getModalState(1)===21 && currentModalTab===2">
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
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                               value="on">
                                                        <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                    </label>
                                                </li>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                               value="on">
                                                        <!-- react-text: 135 -->Varying amounts over time
                                                        <!-- /react-text -->
                                                    </label>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                        <!--TODO constant amount selected (delete this todo-->
                                        <div>
                                            <div class="input-with-dropdown">
                                                <input type="text"
                                                       class="input-box _36slfUixQ4wAFF1EUIGq5f error medium-cash"
                                                       value="" aria-describedby="value-control-2" aria-invalid="true">
                                                <div>
                                                    <span class="per">به ازای  </span>
                                                    <div class="select-box" style="max-width: 999999px; width: 89px;">
                                                        <div class="selected-option" tabindex="0" role="button">
                                                            <!-- react-text: 144 -->لورم<!-- /react-text -->
                                                            <div class="arrow"></div>
                                                        </div>
                                                        <div style="width: 88px;" tabindex="-1" class="options right"
                                                             role="listbox">
                                                            <div role="option" tabindex="-1" class="option-div">
                                                                Month
                                                            </div>
                                                            <div role="option" tabindex="-1"
                                                                 class="selected option-div hovered">
                                                                Year
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="clear"></div>
                                            </div><!-- react-empty: 148 -->
                                        </div>
                                        <!--TODO constant amount selected (delete this todo-->

                                    </div>


                                    <!--TODO constant amount selected (delete this todo-->
                                    <div class="section" style="margin-bottom: 30px">
                                        <div class="title-top">
                                            When will this revenue start?
                                        </div>
                                        <div class="select-box">
                                            <div class="valid">
                                                <div class="selected-option" tabindex="0" role="button">
                                                    <!-- react-text: 293 -->Jan 2019<!-- /react-text -->
                                                    <div class="arrow"></div>
                                                </div>
                                                <div style="width: 88px;" tabindex="-1" class="options right"
                                                     role="listbox">
                                                    <div role="option" tabindex="-1" class="option-div">
                                                        Month
                                                    </div>
                                                    <div role="option" tabindex="-1"
                                                         class="selected option-div hovered">
                                                        Year
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->

                                </div>
                            </div>
                            <div class="forecast-item-editor" v-if="getModalState(1)===21 && currentModalTab===3">
                                <div>
                                    <div class="section" style="margin-bottom: 30px">
                                        <div class="title-top">
                                            What price will you charge for each unit?
                                        </div>
                                        <p class="title-content">
                                            Enter your average selling price (excluding sales tax) for each unit of this
                                            product or service. You can vary prices over time, if necessary, to reflect
                                            seasonal changes in demand, planned increases, or scheduled discount
                                            promotions. </p>
                                        <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                             aria-orientation="horizontal">
                                            <ul>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                               value="on">
                                                        لورم
                                                    </label>
                                                </li>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                               value="on">
                                                        Varying amounts over time
                                                    </label>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                        <!--TODO constant amount selected (delete this todo-->
                                        <div>
                                            <div class="input-with-dropdown">
                                                <div class="input-box-wrapper " style="width: 140px;">

                                                    <input class="faNum input-box input-box-with-currency _36slfUixQ4wAFF1EUIGq5f mediumCash _3nXdR_fo3j0MwFs8AZWYc5"
                                                           type="text">
                                                    <span aria-hidden="true" class="currency">ریال</span>
                                                </div>
                                                <span></span>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                        <!--TODO constant amount selected (delete this todo-->

                                    </div>

                                </div>
                            </div>

                            <div class="forecast-item-editor" v-if="getModalState(1)===22 && currentModalTab===2">
                                <div>
                                    <div class="section" style="margin-bottom: 30px">
                                        <div class="title-top">
                                            When will this revenue start?
                                        </div>
                                        <div class="select-box">
                                            <div class="valid">
                                                <div class="selected-option" tabindex="0" role="button">
                                                    <!-- react-text: 293 -->Jan 2019<!-- /react-text -->
                                                    <div class="arrow"></div>
                                                </div>
                                                <div style="width: 88px;" tabindex="-1" class="options right"
                                                     role="listbox">
                                                    <div role="option" tabindex="-1" class="option-div">
                                                        Month
                                                    </div>
                                                    <div role="option" tabindex="-1"
                                                         class="selected option-div hovered">
                                                        Year
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

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
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                               value="on">
                                                        <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                    </label>
                                                </li>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                               value="on">
                                                        <!-- react-text: 135 -->Varying amounts over time
                                                        <!-- /react-text -->
                                                    </label>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                        <!--TODO constant amount selected (delete this todo-->
                                        <div>
                                            <div class="input-with-dropdown">
                                                <input type="text"
                                                       class="input-box _36slfUixQ4wAFF1EUIGq5f error medium-cash"
                                                       value="" aria-describedby="value-control-2" aria-invalid="true">
                                                <div>
                                                    <span class="per"> در ماه</span>
                                                </div>
                                                <div class="clear"></div>
                                            </div><!-- react-empty: 148 -->
                                        </div>
                                        <!--TODO constant amount selected (delete this todo-->

                                    </div>


                                </div>
                            </div>
                            <div v-if="getModalState(1)===22 && currentModalTab===3">
                                <div class="forecast-item-editor">
                                    <div>
                                        <div class="section" style="margin-bottom: 30px">
                                            <div class="title-top">
                                                What price will you charge for each unit?
                                            </div>
                                            <p class="title-content">
                                                Enter your average selling price (excluding sales tax) for each unit of
                                                this product or service. You can vary prices over time, if necessary, to
                                                reflect seasonal changes in demand, planned increases, or scheduled
                                                discount promotions. </p>
                                            <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                                 aria-orientation="horizontal">
                                                <ul>
                                                    <li class="horizontal">
                                                        <label>
                                                            <input type="radio"
                                                                   name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                                   value="on">
                                                            لورم
                                                        </label>
                                                    </li>
                                                    <li class="horizontal">
                                                        <label>
                                                            <input type="radio"
                                                                   name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                                   value="on">
                                                            Varying amounts over time
                                                        </label>
                                                    </li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                            <!--TODO constant amount selected (delete this todo-->
                                            <div>
                                                <div class="input-with-dropdown">
                                                    <div class="input-box-wrapper " style="width: 140px;">

                                                        <input class="faNum input-box input-box-with-currency _36slfUixQ4wAFF1EUIGq5f mediumCash _3nXdR_fo3j0MwFs8AZWYc5"
                                                               type="text">
                                                        <span aria-hidden="true" class="currency">ریال</span>
                                                    </div>
                                                    <span></span>
                                                    <div class="clear"></div>
                                                </div>
                                            </div>
                                            <!--TODO constant amount selected (delete this todo-->

                                        </div>
                                    </div>
                                </div>
                                <div class="forecast-item-editor">
                                    <div>
                                        <div class="section" style="margin-bottom: 30px">
                                            <div class="title-top">
                                                What price will you charge for each unit?
                                            </div>
                                            <p class="title-content">
                                                Enter your average selling price (excluding sales tax) for each unit of
                                                this product or service. You can vary prices over time, if necessary, to
                                                reflect seasonal changes in demand, planned increases, or scheduled
                                                discount promotions. </p>
                                            <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                                 aria-orientation="horizontal">
                                                <ul>
                                                    <li class="horizontal">
                                                        <label>
                                                            <input type="radio"
                                                                   name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                                   value="on">
                                                            لورم
                                                        </label>
                                                    </li>
                                                    <li class="horizontal">
                                                        <label>
                                                            <input type="radio"
                                                                   name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                                   value="on">
                                                            Varying amounts over time
                                                        </label>
                                                    </li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                            <!--TODO constant amount selected (delete this todo-->
                                            <div>
                                                <div class="input-with-dropdown">
                                                    <div class="input-box-wrapper " style="width: 140px;">

                                                        <input class="faNum input-box input-box-with-currency _36slfUixQ4wAFF1EUIGq5f mediumCash _3nXdR_fo3j0MwFs8AZWYc5"
                                                               type="text">
                                                        <span aria-hidden="true" class="currency">ریال</span>
                                                    </div>
                                                    <span></span>
                                                    <div class="clear"></div>
                                                </div>
                                            </div>
                                            <!--TODO constant amount selected (delete this todo-->

                                        </div>
                                    </div>
                                </div>
                                <div class="forecast-item-editor">
                                    <div>
                                        <div class="section" style="margin-bottom: 30px">
                                            <div class="title-top">
                                                How often is this charge assessed?
                                            </div>
                                            <div class="select-box">
                                                <div class="valid">
                                                    <div class="selected-option" tabindex="0" role="button">
                                                        <!-- react-text: 293 -->Jan 2019<!-- /react-text -->
                                                        <div class="arrow"></div>
                                                    </div>
                                                    <div style="width: 88px;" tabindex="-1" class="options right"
                                                         role="listbox">
                                                        <div role="option" tabindex="-1" class="option-div">
                                                            Month
                                                        </div>
                                                        <div role="option" tabindex="-1"
                                                             class="selected option-div hovered">
                                                            Year
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div v-if="getModalState(1)===22 && currentModalTab===4">
                                <div class="forecast-item-editor">
                                    <div>
                                        <div class="section" style="margin-bottom: 30px">
                                            <div class="title-top">
                                                What price will you charge for each unit?
                                            </div>
                                            <p class="title-content">
                                                Enter your average selling price (excluding sales tax) for each unit of
                                                this product or service. You can vary prices over time, if necessary, to
                                                reflect seasonal changes in demand, planned increases, or scheduled
                                                discount promotions. </p>
                                            <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1"
                                                 aria-orientation="horizontal">
                                                <ul>
                                                    <li class="horizontal">
                                                        <label>
                                                            <input type="radio"
                                                                   name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                                   value="on">
                                                            لورم
                                                        </label>
                                                    </li>
                                                    <li class="horizontal">
                                                        <label>
                                                            <input type="radio"
                                                                   name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                                   value="on">
                                                            Varying amounts over time
                                                        </label>
                                                    </li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                            <!--TODO constant amount selected (delete this todo-->
                                            <div>
                                                <div class="input-with-dropdown">
                                                    <div class="input-box-wrapper " style="width: 140px;">

                                                        <input class="faNum input-box input-box-with-currency _36slfUixQ4wAFF1EUIGq5f mediumCash _3nXdR_fo3j0MwFs8AZWYc5"
                                                               type="text">
                                                        <span aria-hidden="true" class="currency">ریال</span>
                                                    </div>
                                                    <span></span>
                                                    <div class="clear"></div>
                                                </div>
                                            </div>
                                            <!--TODO constant amount selected (delete this todo-->

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="forecast-item-editor" v-if="getModalState(1)===23 && currentModalTab===2">
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
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                               value="on">
                                                        <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                    </label>
                                                </li>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878"
                                                               value="on">
                                                        <!-- react-text: 135 -->Varying amounts over time
                                                        <!-- /react-text -->
                                                    </label>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                        <!--TODO constant amount selected (delete this todo-->
                                        <div>
                                            <div class="input-with-dropdown">
                                                <input type="text"
                                                       class="input-box _36slfUixQ4wAFF1EUIGq5f error medium-cash"
                                                       value="" aria-describedby="value-control-2" aria-invalid="true">
                                                <div>
                                                    <span class="per">به ازای  </span>
                                                    <div class="select-box" style="max-width: 999999px; width: 89px;">
                                                        <div class="selected-option" tabindex="0" role="button">
                                                            <!-- react-text: 144 -->لورم<!-- /react-text -->
                                                            <div class="arrow"></div>
                                                        </div>
                                                        <div style="width: 88px;" tabindex="-1" class="options right"
                                                             role="listbox">
                                                            <div role="option" tabindex="-1" class="option-div">
                                                                Month
                                                            </div>
                                                            <div role="option" tabindex="-1"
                                                                 class="selected option-div hovered">
                                                                Year
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="clear"></div>
                                            </div><!-- react-empty: 148 -->
                                        </div>
                                        <!--TODO constant amount selected (delete this todo-->

                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->
                                    <div class="section" style="margin-bottom: 30px">
                                        <div class="title-top">
                                            When will this revenue start?
                                        </div>
                                        <div class="select-box">
                                            <div class="valid">
                                                <div class="selected-option" tabindex="0" role="button">
                                                    <!-- react-text: 293 -->Jan 2019<!-- /react-text -->
                                                    <div class="arrow"></div>
                                                </div>
                                                <div style="width: 88px;" tabindex="-1" class="options right"
                                                     role="listbox">
                                                    <div role="option" tabindex="-1" class="option-div">
                                                        Month
                                                    </div>
                                                    <div role="option" tabindex="-1"
                                                         class="selected option-div hovered">
                                                        Year
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
                </template>
                <template>
                    <div class="modal-footer-control-container right">
                        <div>
                            <div v-if="modals[1].isDeleting === false" class="trash-delete">
                                <a href="#" class="trashcan" role="button" aria-label="Delete">
            <span class="trash-text" @click="toggleModalIsDeleting(1)">
            حذف
            </span>
                                </a>
                            </div>
                            <div v-if="modals[1].isDeleting === true" id="trash-confirm" aria-live="assertive">
                                <div class="trashcan-confirm">
            <span class="trash-text-confirm">
            <p>آیا اطمینان دارید?</p>
            <a @click="deleteEntry(1)" href="#close" role="button" tabindex="1">تایید</a>
            <span>
            یا
            </span>
            <a @click="toggleModalIsDeleting(1)" href="#" role="button" tabindex="2">
            لغو
            </a>
            </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer-controls-container left"
                         v-if="getModalState(1)===20 && currentModalTab===2">
                        <button :class="['modal-button','primary','disabled', (!tempRevenueName.length)? 'disabled' : '']"
                                tabindex="0">بعدی
                        </button>
                        <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
                    </div>
                    <div class="modal-footer-controls-container left"
                         v-if="getModalState(1)===20 && currentModalTab===3">
                        <button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>
                        <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
                    </div>
                    <div class="modal-footer-controls-container left"
                         v-if="getModalState(1)===21 && currentModalTab===2">
                        <button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>
                        <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>

                    </div>
                    <div class="modal-footer-controls-container left"
                         v-if="getModalState(1)===21 && currentModalTab===3">
                        <button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>
                        <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
                    </div>
                    <div class="modal-footer-controls-container left"
                         v-if="getModalState(1)===22 && currentModalTab===2">
                        <button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>
                        <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
                    </div>
                    <div class="modal-footer-controls-container left"
                         v-if="getModalState(1)===21 && currentModalTab===2">
                        <button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>
                        <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
                    </div>
                    <div class="modal-footer-controls-container left"
                         v-if="getModalState(1)===22 && currentModalTab===3">
                        <button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>
                        <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
                    </div>
                    <div class="modal-footer-controls-container left"
                         v-if="getModalState(1)===22 && currentModalTab===4">
                        <button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>
                        <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
                    </div>
                    <div class="modal-footer-controls-container left"
                         v-if="getModalState(1)===23 && currentModalTab===2">
                        <button :class="['modal-button','primary','disabled', ]" tabindex="0">بعدی</button>
                        <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
                    </div>
                </template>

        </div>
        <modal-revenue-crud v-if="isModalVisible(1)" @close-modal="toggleModalVisibility(1)"></modal-revenue-crud>


    </div>
</template>

<script>
    import VideoModal from "@/js/components/VideoModal";
    import ModalRevenueCrud from "./../modals/ModalRevenueCrud";
    import { EventBus } from "@/js/event-bus.js"


    import { required, minLength, between, maxLength } from 'vuelidate/lib/validators';


    export default {
        name: "DashboardForecastRevenue",
        components: {
            VideoModal,
            ModalRevenueCrud,
        },
        data: function(){
            return {
                annualTableData: {
                    details: [
                        {
                        "key"
                            :
                            "0",
                        "data"
                            :
                            {
                                "name"
                                    :
                                    "زرد",
                                "1398"
                                    :
                                    "11000000ریال",
                                "1399"
                                    :
                                    "11000000ریال",
                                "1400"
                                    :
                                    "11000000ریال",
                                "level":
                                    1
                            }
                        ,

                        }
                        ,
                        {
                            "key"
                                :
                                "1",
                            "data"
                                :
                                {
                                    "name"
                                        :
                                        "استودیو فلان",
                                    "1398"
                                        :
                                        "1500ریال",
                                    "1399"
                                        :
                                        "1700ریال",
                                    "1400"
                                        :
                                        "1600ریال",
                                    "level":
                                        1
                                        }
                            ,
                            "children"
                                :
                                [
                                    {
                                        "key": "1-0",
                                        "data": {
                                            "name": "استودیو فلان",
                                            "1398": "1500ریال",
                                            "1399": "1700ریال",
                                            "1400": "1600ریال",
                                            "level":
                                                2
                                        },
                                        "children"
                                            :
                                            [
                                                {
                                                    "key": "1-0-0",
                                                    "data": {
                                                        "name": "استودیو فلان",
                                                        "1398": "1500ریال",
                                                        "1399": "1700ریال",
                                                        "1400": "1600ریال",
                                                        "level":
                                                            3
                                                    }
                                                },
                                                {
                                                    "key": "1-0-1",
                                                    "data": {
                                                        "name": "استودیو فلان",
                                                        "1398": "1500ریال",
                                                        "1399": "1700ریال",
                                                        "1400": "1600ریال",
                                                        "level":
                                                            3
                                                    }
                                                }
                                            ]
                                    },
                                    {
                                        "key": "1-1",
                                        "data": {
                                            "name": "استودیو فلان",
                                            "1398": "1500ریال",
                                            "1399": "1700ریال",
                                            "1400": "1600ریال",
                                            "level":
                                                2
                                        }
                                    }
                                ]
                        }
                        ,
                        {
                            "key"
                                :
                                "2",
                            "data"
                                :
                                {
                                    "name"
                                        :
                                        "استودیو بهمان",
                                    "1398"
                                        :
                                        "1500ریال",
                                    "1399"
                                        :
                                        "1700ریال",
                                    "1400"
                                        :
                                        "1600ریال",
                                    "level":
                                        1
                                }
                            ,
                        }
                        ],
                    totals: {
                        'title': 'جمع',
                        '1398': '2500 ریال',
                        '1399': '2500 ریال',
                        '1400': '2500 ریال',
                    }
                },
                monthlyTableData:{
                    details: [
                        {
                            "key"
                                :
                                "0",
                            "data"
                                :
                                {
                                    "name"
                                        :
                                        "زرد",
                                    'far': '2500 ریال', 'ord': '2500 ریال', 'khor': '2500 ریال', 'tir': '2500 ریال',
                                    'mor': '2500 ریال', 'shah': '2500 ریال', 'mehr': '2500 ریال', 'aban': '2500 ریال',
                                    'azar': '2500 ریال', 'dey': '2500 ریال', 'bah': '2500 ریال', 'esf': '2500 ریال',
                                    "1398"
                                        :
                                        "11000000ریال",
                                    "1399"
                                        :
                                        "11000000ریال",
                                    "1400"
                                        :
                                        "11000000ریال",
                                    "level":
                                        1
                                }
                            ,

                        }
                        ,
                        {
                            "key"
                                :
                                "1",
                            "data"
                                :
                                {
                                    "name"
                                        :
                                        "استودیو فلان",
                                    'far': '2500 ریال', 'ord': '2500 ریال', 'khor': '2500 ریال', 'tir': '2500 ریال',
                                    'mor': '2500 ریال', 'shah': '2500 ریال', 'mehr': '2500 ریال', 'aban': '2500 ریال',
                                    'azar': '2500 ریال', 'dey': '2500 ریال', 'bah': '2500 ریال', 'esf': '2500 ریال',
                                    "1398"
                                        :
                                        "1500ریال",
                                    "1399"
                                        :
                                        "1700ریال",
                                    "1400"
                                        :
                                        "1600ریال",
                                    "level":
                                        1
                                }
                            ,
                            "children"
                                :
                                [
                                    {
                                        "key": "1-0",
                                        "data": {
                                            "name": "استودیو فلان",
                                            'far': '2500 ریال', 'ord': '2500 ریال', 'khor': '2500 ریال', 'tir': '2500 ریال',
                                            'mor': '2500 ریال', 'shah': '2500 ریال', 'mehr': '2500 ریال', 'aban': '2500 ریال',
                                            'azar': '2500 ریال', 'dey': '2500 ریال', 'bah': '2500 ریال', 'esf': '2500 ریال',
                                            "1398": "1500ریال",
                                            "1399": "1700ریال",
                                            "1400": "1600ریال",
                                            "level":
                                                2
                                        },
                                        "children"
                                            :
                                            [
                                                {
                                                    "key": "1-0-0",
                                                    "data": {
                                                        "name": "استودیو فلان",
                                                        'far': '2500 ریال', 'ord': '2500 ریال', 'khor': '2500 ریال', 'tir': '2500 ریال',
                                                        'mor': '2500 ریال', 'shah': '2500 ریال', 'mehr': '2500 ریال', 'aban': '2500 ریال',
                                                        'azar': '2500 ریال', 'dey': '2500 ریال', 'bah': '2500 ریال', 'esf': '2500 ریال',
                                                        "1398": "1500ریال",
                                                        "1399": "1700ریال",
                                                        "1400": "1600ریال",
                                                        "level":
                                                            3
                                                    }
                                                },
                                                {
                                                    "key": "1-0-1",
                                                    "data": {
                                                        "name": "استودیو فلان",
                                                        'far': '2500 ریال', 'ord': '2500 ریال', 'khor': '2500 ریال', 'tir': '2500 ریال',
                                                        'mor': '2500 ریال', 'shah': '2500 ریال', 'mehr': '2500 ریال', 'aban': '2500 ریال',
                                                        'azar': '2500 ریال', 'dey': '2500 ریال', 'bah': '2500 ریال', 'esf': '2500 ریال',
                                                        "1398": "1500ریال",
                                                        "1399": "1700ریال",
                                                        "1400": "1600ریال",
                                                        "level":
                                                            3
                                                    }
                                                }
                                            ]
                                    },
                                    {
                                        "key": "1-1",
                                        "data": {
                                            "name": "استودیو فلان",
                                            'far': '2500 ریال', 'ord': '2500 ریال', 'khor': '2500 ریال', 'tir': '2500 ریال',
                                            'mor': '2500 ریال', 'shah': '2500 ریال', 'mehr': '2500 ریال', 'aban': '2500 ریال',
                                            'azar': '2500 ریال', 'dey': '2500 ریال', 'bah': '2500 ریال', 'esf': '2500 ریال',
                                            "1398": "1500ریال",
                                            "1399": "1700ریال",
                                            "1400": "1600ریال",
                                            "level":
                                                2
                                        }
                                    }
                                ]
                        }
                        ,
                        {
                            "key"
                                :
                                "2",
                            "data"
                                :
                                {
                                    "name"
                                        :
                                        "استودیو بهمان",
                                    'far': '2500 ریال', 'ord': '2500 ریال', 'khor': '2500 ریال', 'tir': '2500 ریال',
                                    'mor': '2500 ریال', 'shah': '2500 ریال', 'mehr': '2500 ریال', 'aban': '2500 ریال',
                                    'azar': '2500 ریال', 'dey': '2500 ریال', 'bah': '2500 ریال', 'esf': '2500 ریال',
                                    "1398"
                                        :
                                        "1500ریال",
                                    "1399"
                                        :
                                        "1700ریال",
                                    "1400"
                                        :
                                        "1600ریال",
                                    "level":
                                        1
                                }
                            ,
                        }
                    ],
                    totals: {
                        'title': 'جمع',
                        'far': '2500 ریال', 'ord': '2500 ریال', 'khor': '2500 ریال', 'tir': '2500 ریال',
                        'mor': '2500 ریال', 'shah': '2500 ریال', 'mehr': '2500 ریال', 'aban': '2500 ریال',
                        'azar': '2500 ریال', 'dey': '2500 ریال', 'bah': '2500 ریال', 'esf': '2500 ریال',
                        '1398': '2500 ریال',
                        '1399': '2500 ریال',
                        '1400': '2500 ریال',
                    }
                },
                tableMonthlyDetailsActive: false,
                monthlyTableExpandedKeys: {},
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
                            1399,
                            1400,
                            1401
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
                updateArgs: [true, true, {duration: 1000}],

                instructionVisibility:true,
                moreInstructionVisibility: false,
                modals: { //list of modals (except video modal)
                    // TODO resolve state change scroll bug
                    1:{
                        state: 0,
                        previousState: 0,
                        // cases:{
                        //     0: new entry,
                        //     1: tab1: entry title added,
                        //     2: ... -> tab2: non-selected {
                        //                 option 1 selected: 21
                        //                 option 2 selected: 22
                        //                 option 3 selected: 23
                        //                 option 4 selected: 24
                        //                      }
                        //
                        //
                        //     3: ... -> TODO add next cases
                        //
                        //
                        //
                        // }
                        isDeleting: false
                    },// revenue addition modal
                },
                modalVisibility: [false,false],
                currentModalTab: 0,
                currentModalData: {},
                selectedLength: 'm',
                selectedPeriod: '1', //TODO will be transferred into currentModalData
                lengthOptions: [
                    {title: 'ماه', code: 'm'},
                    {title: 'سال', code: 'y'},
                ],
                periodOptions: [
                    {title: 'فروردین 1398', code: '1'},
                    {title: 'اردیبهشت 1398', code: '2'},
                    {title: 'خرداد 1398', code: '3'},
                    {title: 'تیر 1398', code: '4'},
                    {title: 'مرداد 1398', code: '5'},
                ],
                unitSalesTypeIsConstant: '1',
                annualUnitSalesChartOptions:{
                    chart: {
                        type: 'line',
                        height: 260,
                        animation: false,
                        backgroundColor: null,
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
                                let output = [];
                                for (let i = 0; i< 12 ; i++ ){
                                    output[i] = Math.round(this.series[0].data[i].y);
                                }
                                EventBus.$emit('modal-chart-redraw', output);
                            }
                        },
                    },

                    series: [{
                        name: 'unit-sales',
                        data: [0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0],

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

                },
                annualSalesUnitPeriodsData: [135, 152, 165, 135, 152, 165, 135, 152, 165, 135, 152, 165],
                annualSalesUnitShiftPercent: 0,


                tempRevenueName: '',

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
        mounted(){
            EventBus.$on('modal-chart-redraw', data => {
                this.annualSalesUnitPeriodsData = data
            });
        },
        destroyed(){
        },
        methods:{
            log(data){
                console.log(data)
            },
            toggleInstruction(){
                this.instructionVisibility = !this.instructionVisibility;
                this.moreInstructionVisibility = false;
            },
            toggleModalVisibility: function (modalID) {
                let visible = (typeof this.modalVisibility[modalID] !== 'undefined')? this.modalVisibility[modalID] : false;
                if(visible === true){
                    this.$set(this.modalVisibility, modalID, !visible);
                    this.shiftPercent = 0;
                    this.setModalTab(0);
                    this.setModalIsDeleting(modalID, false);
                    this.handleModalState(modalID);
                }
                else{
                    this.handleModalState(modalID);
                    this.$set(this.modalVisibility, modalID, !visible);
                }
            },
            isModalVisible: function (i) {
                return this.modalVisibility[i];
            },
            setModalTab: function (tab) {
                this.currentModalTab = tab;
            },
            // TODO implement getModalTab
            setModalState: function (modalID, stateIndex) {
                // this.$set(this.modals[modalID], 'state', stateIndex)
                this.modals[modalID].previousState = this.modals[modalID].state ;
                this.modals[modalID].state = stateIndex;
            },
            getModalState: function(modalID){
                return this.modals[modalID].state;
            },
            toggleModalIsDeleting: function(modalID){
                this.modals[modalID].isDeleting = !this.modals[modalID].isDeleting;
            },
            setModalIsDeleting: function(modalID, isDeleting){
                this.modals[modalID].isDeleting = false;
            },
            deleteEntry: function (modalID) {
                // TODO implement delete logic
                this.toggleModalVisibility(modalID);
            },
            handleModalState: function (modalID) {
                // TODO set state according to data
                this.setModalState(1, 0);
                // default
            },
            monthlyTableNodeExpandHandler(node){
                console.log(node);
                let k = node.key;
                this.$set(this.monthlyTableExpandedKeys, k, true);
            },
            monthlyTableNodeCollapseHandler(node){
                console.log(node);
                let k = node.key;

                this.$set(this.monthlyTableExpandedKeys, k, false);

            },
            updateAnnualSalesUnitChart(value, index){
                if(!value){
                    this.annualSalesUnitPeriodsData[index] = 0;
                }
                this.annualUnitSalesChartOptions.series[0].data = this.annualSalesUnitPeriodsData;
            },
            shiftAnnualSalesUnitChart(){
                console.log('shifted');
                for(let i = 0 ; i<=11 ; i++){
                    this.$set(this.annualSalesUnitPeriodsData, i, this.annualSalesUnitPeriodsData[i]*(1+(this.annualSalesUnitShiftPercent)/100));
                }
                this.annualUnitSalesChartOptions.series[0].data = this.annualSalesUnitPeriodsData;
                // console.log(this.annualUnitSalesChartOptions.series[0].data);

            },

            // TODO optional: make a new component from modal contents

            // checkName(serverSide = false){
            //     console.log('validation');
            //     if (this.tempRevenueName.length < 1){
            //         this.errors['name'].push('نام را وارد کنید');
            //         return false;
            //     }
            //     else{
            //
            //         if(serverSide){
            //             //TODO implement server side validation logic
            //         }
            //     }
            //     this.errors.name = [];
            //     return true;
            //
            // },
        },
        computed:{
            tableData: function(){
                if(!this.tableMonthlyDetailsActive){
                    return this.annualTableData;
                }
                else{
                    return this.monthlyTableData;
                }
            },
            currentYearAnnualUnitSales(){
                let sum = 0;
                this.annualSalesUnitPeriodsData.forEach(function e(item, index){
                    if(!item && item!==0){}
                    else{
                        sum = sum + item;
                    }
                });
                return sum;

            }

        },
        watch:{
            unitSalesTypeIsConstant: function () {

                let modalContainer = window.document.getElementsByClassName('modal-container')[0];

                if(this.unitSalesTypeIsConstant==='0'){
                    modalContainer.setAttribute("style", "width: 1024px");
                    this.annualUnitSalesChartOptions.series[0].data = this.annualSalesUnitPeriodsData;
                }
                else{
                    modalContainer.setAttribute("style", "width: 500px");
                }
            }
        }
    }
</script>

<style scoped>
    /*TODO make styles scoped*/
</style>