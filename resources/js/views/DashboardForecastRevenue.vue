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
                                        <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
                                    </div>
                                    <div class="left-chart">
                                        <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
                                    </div>
                                </div>
                            </span>

                </div>
            </div>
            <div class="details-container">

                <div class="table-container faNum"><!--class=_itvKHRBWKjJt7IYI2Cy8-->

                        <tree-table :value="tableData">
                            <column headerStyle="background-color: #F9F9F9;" bodyStyle="background-color: #F9F9F9;" field="name" header="Name" :expander="true"></column>
                            <column field="size" header="Size"></column>
                            <column field="type" header="Type" >
                            </column>
                            <!--<column headerStyle="width: 8em" bodyStyle="text-align: center">-->
                            <!--&lt;!&ndash;<template #header>&ndash;&gt;-->
                            <!--&lt;!&ndash;<Button type="button" icon="pi pi-cog"></Button>&ndash;&gt;-->
                            <!--&lt;!&ndash;</template>&ndash;&gt;-->
                            <!---->
                            <!--</column>-->
                            <template #footer>
                                <div style="text-align:left">
                                    <button icon="pi pi-refresh"/>
                                </div>
                            </template>
                        </tree-table>

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

        <base-modal v-if="isModalVisible(1)" @close-modal="toggleModalVisibility(1)" :showModal="isModalVisible(1)">
            <template v-slot:header-text>
                <p>هدر</p>
            </template>
            <template v-slot:content>
                <ul class="navigation-stripe">
                    <li :class="['step-link', {'active': currentModalTab === 0 }]" tabindex="0" aria-selected="true" @click="setModalTab(0)">
                        <span class="circle" aria-label="step 1:">
                            1
                        </span>
                        نام
                    </li>
                    <li :class="['step-link', {'active': currentModalTab === 1 }]" tabindex="1" @click="setModalTab(1)">
                        <span class="circle" aria-label="step 2:">
                            2
                        </span>
                        نوع
                    </li>

                    <li v-if="getModalState(1)===20" :class="['step-link', {'active': currentModalTab === 2 }]" tabindex="2" @click="setModalTab(2)">
                        <span class="circle" aria-label="step 3:">
                            3
                        </span>
                        تعداد فروش
                    </li>
                    <li  v-if="getModalState(1)===20" :class="['step-link', {'active': currentModalTab === 3 }]" tabindex="3" @click="setModalTab(3)">
                        <span class="circle" aria-label="step 4:">
                            4
                        </span>
                        قیمت واحد
                    </li>


                    <li v-if="getModalState(1)===21" :class="['step-link', {'active': currentModalTab === 2 }]" tabindex="2" @click="setModalTab(2)">
                        <span class="circle" aria-label="step 3:">
                            3
                        </span>
                        پرداخت ساعتی
                    </li>
                    <li v-if="getModalState(1)===21" :class="['step-link', {'active': currentModalTab === 3 }]" tabindex="3" @click="setModalTab(3)">
                        <span class="circle" aria-label="step 4:">
                            4
                        </span>
                        نرخ پرداخت ساعتی
                    </li>


                    <li v-if="getModalState(1)===22" :class="['step-link', {'active': currentModalTab === 2 }]" tabindex="2" @click="setModalTab(2)">
                        <span class="circle" aria-label="step 3:">
                            3
                        </span>
                        ثبت نام ها
                    </li>
                    <li v-if="getModalState(1)===22" :class="['step-link', {'active': currentModalTab === 3 }]" tabindex="3" @click="setModalTab(3)">
                        <span class="circle" aria-label="step 4:">
                            4
                        </span>
                        شارژ دوره ای
                    </li>
                    <li v-if="getModalState(1)===22" :class="['step-link', {'active': currentModalTab === 4 }]" tabindex="4" @click="setModalTab(4)">
                        <span class="circle" aria-label="step 4:">
                            5
                        </span>
                        churn rate
                    </li>
                    <!--TODO IMPORTANT: get translations-->


                    <li v-if="getModalState(1)===23" :class="['step-link', {'active': currentModalTab === 2 }]" tabindex="2" @click="setModalTab(2)">
                        <span class="circle" aria-label="step 3:">
                            3
                        </span>
                        منبع مالی
                    </li>


                </ul>
                <div>
                    <div>
                        <!--TODO resolve extra height caused by extra 30px paddings-->
                        <div class="section" v-if="currentModalTab===0">
                            <!--TODO add state condition-->
                            <div class="title-top">
                                نام آن چیست؟
                            </div>
                            <div class="error">
                                <div class="max-length-input-container">
                                        <input type="text"
                                               class="input-box description error"
                                               placeholder="لورم لورم"
                                               v-model="newRevenueName">
                                        <span class="count-down-wrapper">
                                            {{255 - newRevenueName.length}}
                                        </span>
                                        <div class="feedback-line">
                                            <p v-for="(err, i) in errors.name">
                                                {{err}}
                                            </p>
                                        </div>

                                </div>

                            </div>

                        </div>
                        <div class="section"   v-if="currentModalTab===1">
                            <!--TODO add state condition-->
                            <div class="title-top">نوع درآمد؟</div>
                            <div class="radio-buttons-list rtl" tabindex="0" role="radiogroup">
                                <p class="radio-right">
                                    <input :checked="getModalState(1)===20" @click="setModalState(1, 20)" type="radio" name="revenueType" id="emp0" class="radio-style" value="on">
                                    <label for="emp0">تعداد فروش</label>
                                </p>
                                <p  class="description">
                                    Best for products that are sold in individual units or set quantities
                                </p>
                                <p class="radio-right">
                                    <input :checked="getModalState(1)===21" @click="setModalState(1, 21)" type="radio" name="revenueType" id="emp1" class="radio-style" value="on">
                                    <label for="emp1">
                                        Billable hours
                                    </label>
                                </p>
                                <p  class="description">
                                    Best for services that are priced on a per-hour basis
                                </p>
                                <p class="radio-right">
                                    <input :checked="getModalState(1)===22" @click="setModalState(1, 22)" type="radio" name="revenueType" id="emp2" class="radio-style" value="on">
                                    <label for="emp2">
                                        Recurring charges
                                    </label>
                                </p>
                                <p  class="description">
                                    Best for subscriptions, memberships, rentals, web apps, or other offerings with monthly or periodic
                                </p>
                                <p class="radio-right">
                                    <input :checked="getModalState(1)===23" @click="setModalState(1, 23)" type="radio" name="revenueType" id="emp3" class="radio-style" value="on">
                                    <label for="emp3">
                                        Revenue only
                                    </label>
                                </p>
                                <p  class="description">
                                    If none of the models above are applicable, or you already have a detailed forecast in Excel or elsewhere, choose this option to just enter overall revenue values without any detail
                                </p>
                            </div>
                        </div>

                        <div class="forecast-item-editor" v-if="getModalState(1)===20 && currentModalTab===2">
                            <div>
                                <div class="section" style="margin-bottom: 30px">
                                    <div class="title-top">
                                        How many units will you sell?
                                    </div>
                                    <p class="title-content">
                                        How best to define a 'unit' depends on what you sell. If you offer widgets, just enter the quantity of those widgets (shirts or computers or whatever) you think you'll sell. For other offerings, you might want to use units to mean consulting engagements or fixed-price contracts or pallets of low-value materials. Do what makes sense for your business.
                                    </p>
                                    <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1" aria-orientation="horizontal">
                                        <ul>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-type" value="1" v-model="unitSalesTypeIsConstant">
                                                    <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="sales-unit-type" value="0" v-model="unitSalesTypeIsConstant">
                                                    <!-- react-text: 135 -->Varying amounts over time<!-- /react-text -->
                                                </label>
                                            </li>
                                        </ul>
                                        <div class="clear"></div>

                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->
                                    <div v-if="unitSalesTypeIsConstant==='1'">
                                        <div class="input-with-dropdown length-selection">
                                            <input type="text" class="faNum input-box _36slfUixQ4wAFF1EUIGq5f error medium-cash" value="" aria-describedby="value-control-2" aria-invalid="true">
                                            <div>
                                                <span class="per">به ازای  </span>
                                                <drop-down v-model="selectedLength" :options="lengthOptions" optionLabel="title" optionValue="code" scrollHeight="100px"/>
                                            </div>
                                            <div class="clear"></div>
                                        </div><!-- react-empty: 148 -->
                                    </div>
                                    <div  v-if="unitSalesTypeIsConstant==='0'">

                                        variable
                                        <div class="financial-year-box" role="grid">
                                            <div class="financial-year-box-container">
                                                <div class="financial-year-box-wrapper" style="height: 400px; width: 964px">
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
                                                                        <div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl" style="width: 87px;">
                                                                            <span aria-hidden="true" class="percent">%</span>
                                                                            <input class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5" type="text" value="0">
                                                                        </div>
                                                                    </div>
                                                                    <button class="overlay-button primary" tabindex="-1">اعمال</button>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="financial-year-chart-container">
                                                            <highcharts class="chart" :options="annualUnitSalesChartOptions" :updateArgs="updateArgs" @redraw="consolelog()"></highcharts>
                                                        </div>
                                                        <div class="financial-year-input-container">
                                                            <ul class="labels faNum">
                                                                <li>
                                                                    <p>1398</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" disabled :value="currentYearAnnualUnitSales">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>فروردین</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" v-model.number="annualSalesUnitPeriodsData[0]" @input = "updateAnnualSalesUnitChart($event.target.value , 0)">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>اردیبهشت</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" v-model.number="annualSalesUnitPeriodsData[1]" @input = "updateAnnualSalesUnitChart($event.target.value, 1)">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>خرداد</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" v-model.number="annualSalesUnitPeriodsData[2]" @input = "updateAnnualSalesUnitChart($event.target.value, 2)">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>فروردین</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" v-model.number="annualSalesUnitPeriodsData[3]" @input = "updateAnnualSalesUnitChart($event.target.value, 3)">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>فروردین</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" v-model.number="annualSalesUnitPeriodsData[4]" @input = "updateAnnualSalesUnitChart($event.target.value, 4)">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>فروردین</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" v-model.number="annualSalesUnitPeriodsData[5]" @input = "updateAnnualSalesUnitChart($event.target.value,5)">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>فروردین</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" v-model.number="annualSalesUnitPeriodsData[6]" @input = "updateAnnualSalesUnitChart($event.target.value, 6)">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>فروردین</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" v-model.number="annualSalesUnitPeriodsData[7]" @input = "updateAnnualSalesUnitChart($event.target.value, 7)">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>فروردین</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" v-model.number="annualSalesUnitPeriodsData[8]" @input = "updateAnnualSalesUnitChart($event.target.value, 8)">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>فروردین</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" v-model.number="annualSalesUnitPeriodsData[9]" @input = "updateAnnualSalesUnitChart($event.target.value, 9)">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>فروردین</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" v-model.number="annualSalesUnitPeriodsData[10]" @input = "updateAnnualSalesUnitChart($event.target.value, 10)">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>اسفند</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="number" v-model.number="annualSalesUnitPeriodsData[11]" @input = "updateAnnualSalesUnitChart($event.target.value, 11)">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>1399</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="text" value="">
                                                                            <div class="fillRightDots" aria-hidden="true">
                                                                                &nbsp;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <p>1340</p>
                                                                    <div class="valid">
                                                                        <div>
                                                                            <input class="input-box _3nXdR_fo3j0MwFs8AZWYc5" type="text" value="">
                                                                            <div class="fillRightDots" aria-hidden="true">
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
                                <div class="section" style="margin-bottom: 30px" v-if="unitSalesTypeIsConstant==='1'">
                                    <div class="title-top">
                                        When will this revenue start?
                                    </div>
                                    <div class="select-box period-selection">
                                        <div class="valid">
                                            <drop-down v-model="selectedPeriod" :options="periodOptions" optionLabel="title" optionValue="code" scrollHeight="150px"/>
                                        </div>
                                    </div>
                                </div>
                                <!--TODO constant amount selected (delete this todo-->

                            </div>
                        </div>
                        <div class="forecast-item-editor" v-if="getModalState(1)===20 && currentModalTab===3">
                            <div>
                                <div class="section" style="margin-bottom: 30px">
                                    <div class="title-top">
                                        What price will you charge for each unit?
                                    </div>
                                    <p class="title-content">
                                        Enter your average selling price (excluding sales tax) for each unit of this product or service. You can vary prices over time, if necessary, to reflect seasonal changes in demand, planned increases, or scheduled discount promotions.                                    </p>
                                    <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1" aria-orientation="horizontal">
                                        <ul>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
                                                    لورم
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
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

                                                <input class="faNum input-box input-box-with-currency _36slfUixQ4wAFF1EUIGq5f mediumCash _3nXdR_fo3j0MwFs8AZWYc5" type="text">
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
                                        How best to define a 'unit' depends on what you sell. If you offer widgets, just enter the quantity of those widgets (shirts or computers or whatever) you think you'll sell. For other offerings, you might want to use units to mean consulting engagements or fixed-price contracts or pallets of low-value materials. Do what makes sense for your business.
                                    </p>
                                    <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1" aria-orientation="horizontal">
                                        <ul>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
                                                    <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
                                                    <!-- react-text: 135 -->Varying amounts over time<!-- /react-text -->
                                                </label>
                                            </li>
                                        </ul>
                                        <div class="clear"></div>
                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->
                                    <div>
                                        <div class="input-with-dropdown">
                                            <input type="text" class="input-box _36slfUixQ4wAFF1EUIGq5f error medium-cash" value="" aria-describedby="value-control-2" aria-invalid="true">
                                            <div>
                                                <span class="per">به ازای  </span>
                                                <div class="select-box" style="max-width: 999999px; width: 89px;">
                                                    <div class="selected-option" tabindex="0" role="button">
                                                        <!-- react-text: 144 -->لورم<!-- /react-text -->
                                                        <div class="arrow"></div>
                                                    </div>
                                                    <div style="width: 88px;" tabindex="-1" class="options right" role="listbox">
                                                        <div role="option" tabindex="-1" class="option-div">
                                                            Month
                                                        </div>
                                                        <div role="option" tabindex="-1" class="selected option-div hovered">
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
                                            <div  style="width: 88px;" tabindex="-1" class="options right" role="listbox">
                                                <div role="option" tabindex="-1" class="option-div">
                                                    Month
                                                </div>
                                                <div role="option" tabindex="-1" class="selected option-div hovered">
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
                                        Enter your average selling price (excluding sales tax) for each unit of this product or service. You can vary prices over time, if necessary, to reflect seasonal changes in demand, planned increases, or scheduled discount promotions.                                    </p>
                                    <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1" aria-orientation="horizontal">
                                        <ul>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
                                                    لورم
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
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

                                                <input class="faNum input-box input-box-with-currency _36slfUixQ4wAFF1EUIGq5f mediumCash _3nXdR_fo3j0MwFs8AZWYc5" type="text">
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
                                            <div  style="width: 88px;" tabindex="-1" class="options right" role="listbox">
                                                <div role="option" tabindex="-1" class="option-div">
                                                    Month
                                                </div>
                                                <div role="option" tabindex="-1" class="selected option-div hovered">
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
                                        How best to define a 'unit' depends on what you sell. If you offer widgets, just enter the quantity of those widgets (shirts or computers or whatever) you think you'll sell. For other offerings, you might want to use units to mean consulting engagements or fixed-price contracts or pallets of low-value materials. Do what makes sense for your business.
                                    </p>
                                    <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1" aria-orientation="horizontal">
                                        <ul>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
                                                    <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
                                                    <!-- react-text: 135 -->Varying amounts over time<!-- /react-text -->
                                                </label>
                                            </li>
                                        </ul>
                                        <div class="clear"></div>
                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->
                                    <div>
                                        <div class="input-with-dropdown">
                                            <input type="text" class="input-box _36slfUixQ4wAFF1EUIGq5f error medium-cash" value="" aria-describedby="value-control-2" aria-invalid="true">
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
                                            Enter your average selling price (excluding sales tax) for each unit of this product or service. You can vary prices over time, if necessary, to reflect seasonal changes in demand, planned increases, or scheduled discount promotions.                                    </p>
                                        <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1" aria-orientation="horizontal">
                                            <ul>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
                                                        لورم
                                                    </label>
                                                </li>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
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

                                                    <input class="faNum input-box input-box-with-currency _36slfUixQ4wAFF1EUIGq5f mediumCash _3nXdR_fo3j0MwFs8AZWYc5" type="text">
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
                                            Enter your average selling price (excluding sales tax) for each unit of this product or service. You can vary prices over time, if necessary, to reflect seasonal changes in demand, planned increases, or scheduled discount promotions.                                    </p>
                                        <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1" aria-orientation="horizontal">
                                            <ul>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
                                                        لورم
                                                    </label>
                                                </li>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
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

                                                    <input class="faNum input-box input-box-with-currency _36slfUixQ4wAFF1EUIGq5f mediumCash _3nXdR_fo3j0MwFs8AZWYc5" type="text">
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
                                                <div  style="width: 88px;" tabindex="-1" class="options right" role="listbox">
                                                    <div role="option" tabindex="-1" class="option-div">
                                                        Month
                                                    </div>
                                                    <div role="option" tabindex="-1" class="selected option-div hovered">
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
                                            Enter your average selling price (excluding sales tax) for each unit of this product or service. You can vary prices over time, if necessary, to reflect seasonal changes in demand, planned increases, or scheduled discount promotions.                                    </p>
                                        <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1" aria-orientation="horizontal">
                                            <ul>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
                                                        لورم
                                                    </label>
                                                </li>
                                                <li class="horizontal">
                                                    <label>
                                                        <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
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

                                                    <input class="faNum input-box input-box-with-currency _36slfUixQ4wAFF1EUIGq5f mediumCash _3nXdR_fo3j0MwFs8AZWYc5" type="text">
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
                                        How best to define a 'unit' depends on what you sell. If you offer widgets, just enter the quantity of those widgets (shirts or computers or whatever) you think you'll sell. For other offerings, you might want to use units to mean consulting engagements or fixed-price contracts or pallets of low-value materials. Do what makes sense for your business.
                                    </p>
                                    <div class="radio-box CONSTANT" role="radiogroup" tabindex="-1" aria-orientation="horizontal">
                                        <ul>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
                                                    <!-- react-text: 131 -->لورم<!-- /react-text -->
                                                </label>
                                            </li>
                                            <li class="horizontal">
                                                <label>
                                                    <input type="radio" name="0acbd865-1c1d-83e1-d4e1-72abbb104878" value="on">
                                                    <!-- react-text: 135 -->Varying amounts over time<!-- /react-text -->
                                                </label>
                                            </li>
                                        </ul>
                                        <div class="clear"></div>
                                    </div>
                                    <!--TODO constant amount selected (delete this todo-->
                                    <div>
                                        <div class="input-with-dropdown">
                                            <input type="text" class="input-box _36slfUixQ4wAFF1EUIGq5f error medium-cash" value="" aria-describedby="value-control-2" aria-invalid="true">
                                            <div>
                                                <span class="per">به ازای  </span>
                                                <div class="select-box" style="max-width: 999999px; width: 89px;">
                                                    <div class="selected-option" tabindex="0" role="button">
                                                        <!-- react-text: 144 -->لورم<!-- /react-text -->
                                                        <div class="arrow"></div>
                                                    </div>
                                                    <div style="width: 88px;" tabindex="-1" class="options right" role="listbox">
                                                        <div role="option" tabindex="-1" class="option-div">
                                                            Month
                                                        </div>
                                                        <div role="option" tabindex="-1" class="selected option-div hovered">
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
                                            <div  style="width: 88px;" tabindex="-1" class="options right" role="listbox">
                                                <div role="option" tabindex="-1" class="option-div">
                                                    Month
                                                </div>
                                                <div role="option" tabindex="-1" class="selected option-div hovered">
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
            <template v-slot:footer>
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
                                    <a @click="toggleModalIsDeleting(1)" href="#" role="button" tabindex="2" >
                                        لغو
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer-controls-container left">
                    <button class="modal-button primary disabled" tabindex="0">بعدی</button>
                    <button class="modal-button enabled" tabindex="0">ذخیره و افزودن مورد دیگر</button>
                </div>
            </template>
        </base-modal>
    </div>



</template>

<script>
    import VideoModal from "@/js/components/VideoModal";
    import BaseModal from "@/js/components/BaseModal";
    import { EventBus } from "@/js/event-bus.js"

    export default {
        name: "DashboardForecastRevenue",
        components: {
            VideoModal,
            BaseModal,
        },
        data: function(){
            return {

                annualTableData: [
                    {
                        "key": "0",
                        "data":{
                            "name":"Applications",
                            "size":"100kb",
                            "type":"<a href=\"adsjfapsdfakf\">asfasdfasfd</a>"
                        },

                    },
                    {
                        "key": "1",
                        "data":{
                            "name":"Cloud",
                            "size":"20kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "1-0",
                                "data":{
                                    "name":"backup-1.zip",
                                    "size":"10kb",
                                    "type":"Zip"
                                }
                            },
                            {
                                "key": "1-1",
                                "data":{
                                    "name":"backup-2.zip",
                                    "size":"10kb",
                                    "type":"Zip"
                                }
                            }
                        ]
                    },
                    {
                        "key": "2",
                        "data": {
                            "name":"Desktop",
                            "size":"150kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "2-0",
                                "data":{
                                    "name":"note-meeting.txt",
                                    "size":"50kb",
                                    "type":"Text"
                                }
                            },
                            {
                                "key": "2-1",
                                "data":{
                                    "name":"note-todo.txt",
                                    "size":"100kb",
                                    "type":"Text"
                                }
                            }
                        ]
                    },
                    {
                        "key": "3",
                        "data":{
                            "name":"Documents",
                            "size":"75kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "3-0",
                                "data":{
                                    "name":"Work",
                                    "size":"55kb",
                                    "type":"Folder"
                                },
                                "children":[
                                    {
                                        "key": "3-0-0",
                                        "data":{
                                            "name":"Expenses.doc",
                                            "size":"30kb",
                                            "type":"Document"
                                        }
                                    },
                                    {
                                        "key": "3-0-1",
                                        "data":{
                                            "name":"Resume.doc",
                                            "size":"25kb",
                                            "type":"Resume"
                                        }
                                    }
                                ]
                            },
                            {
                                "key": "3-1",
                                "data":{
                                    "name":"Home",
                                    "size":"20kb",
                                    "type":"Folder"
                                },
                                "children":[
                                    {
                                        "key": "3-1-0",
                                        "data":{
                                            "name":"Invoices",
                                            "size":"20kb",
                                            "type":"Text"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "key": "4",
                        "data": {
                            "name":"Downloads",
                            "size":"25kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "4-0",
                                "data": {
                                    "name":"Spanish",
                                    "size":"10kb",
                                    "type":"Folder"
                                },
                                "children":[
                                    {
                                        "key": "4-0-0",
                                        "data":{
                                            "name":"tutorial-a1.txt",
                                            "size":"5kb",
                                            "type":"Text"
                                        }
                                    },
                                    {
                                        "key": "4-0-1",
                                        "data":{
                                            "name":"tutorial-a2.txt",
                                            "size":"5kb",
                                            "type":"Text"
                                        }
                                    }
                                ]
                            },
                            {
                                "key": "4-1",
                                "data":{
                                    "name":"Travel",
                                    "size":"15kb",
                                    "type":"Text"
                                },
                                "children":[
                                    {
                                        "key": "4-1-0",
                                        "data":{
                                            "name":"Hotel.pdf",
                                            "size":"10kb",
                                            "type":"PDF"
                                        }
                                    },
                                    {
                                        "key": "4-1-1",
                                        "data":{
                                            "name":"Flight.pdf",
                                            "size":"5kb",
                                            "type":"PDF"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "key": "5",
                        "data": {
                            "name":"Main",
                            "size":"50kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "5-0",
                                "data":{
                                    "name":"bin",
                                    "size":"50kb",
                                    "type":"Link"
                                }
                            },
                            {
                                "key": "5-1",
                                "data":{
                                    "name":"etc",
                                    "size":"100kb",
                                    "type":"Link"
                                }
                            },
                            {
                                "key": "5-2",
                                "data":{
                                    "name":"var",
                                    "size":"100kb",
                                    "type":"Link"
                                }
                            }
                        ]
                    },
                    {
                        "key": "6",
                        "data":{
                            "name":"Other",
                            "size":"5kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "6-0",
                                "data":{
                                    "name":"todo.txt",
                                    "size":"3kb",
                                    "type":"Text"
                                }
                            },
                            {
                                "key": "6-1",
                                "data":{
                                    "name":"logo.png",
                                    "size":"2kb",
                                    "type":"Picture"
                                }
                            }
                        ]
                    },
                    {
                        "key": "7",
                        "data":{
                            "name":"Pictures",
                            "size":"150kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "7-0",
                                "data":{
                                    "name":"barcelona.jpg",
                                    "size":"90kb",
                                    "type":"Picture"
                                }
                            },
                            {
                                "key": "7-1",
                                "data":{
                                    "name":"primeng.png",
                                    "size":"30kb",
                                    "type":"Picture"
                                }
                            },
                            {
                                "key": "7-2",
                                "data":{
                                    "name":"prime.jpg",
                                    "size":"30kb",
                                    "type":"Picture"
                                }
                            }
                        ]
                    },
                    {
                        "key": "8",
                        "data":{
                            "name":"Videos",
                            "size":"1500kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "8-0",
                                "data":{
                                    "name":"primefaces.mkv",
                                    "size":"1000kb",
                                    "type":"Video"
                                }
                            },
                            {
                                "key": "8-1",
                                "data":{
                                    "name":"intro.avi",
                                    "size":"500kb",
                                    "type":"Video"
                                }
                            }
                        ]
                    }
                ],

                monthlyTableData:[
                    {
                        "key": "0",
                        "data":{
                            "name":"Applications",
                            "size":"100kb",
                            "type":"<a href=\"adsjfapsdfakf\">asfasdfasfd</a>"
                        },
                        "children":[
                            {
                                "key": "0-0",
                                "data":{
                                    "name":"Vue",
                                    "size":"25kb",
                                    "type":"Folder"
                                },
                                "children":[
                                    {
                                        "key": "0-0-0",
                                        "data":{
                                            "name":"Vue.app",
                                            "size":"10kb",
                                            "type":"Application"
                                        }
                                    },
                                    {
                                        "key": "0-0-1",
                                        "data":{
                                            "name":"native.app",
                                            "size":"10kb",
                                            "type":"Application"
                                        }
                                    },
                                    {
                                        "key": "0-0-2",
                                        "data":{
                                            "name":"mobile.app",
                                            "size":"5kb",
                                            "type":"Application"
                                        }
                                    }
                                ]
                            },
                            {
                                "key": "0-1",
                                "data":{
                                    "name":"editor.app",
                                    "size":"25kb",
                                    "type":"Application"
                                }
                            },
                            {
                                "key": "0-2",
                                "data":{
                                    "name":"settings.app",
                                    "size":"50kb",
                                    "type":"Application"
                                }
                            }
                        ]
                    },
                    {
                        "key": "1",
                        "data":{
                            "name":"Cloud",
                            "size":"20kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "1-0",
                                "data":{
                                    "name":"backup-1.zip",
                                    "size":"10kb",
                                    "type":"Zip"
                                }
                            },
                            {
                                "key": "1-1",
                                "data":{
                                    "name":"backup-2.zip",
                                    "size":"10kb",
                                    "type":"Zip"
                                }
                            }
                        ]
                    },
                    {
                        "key": "2",
                        "data": {
                            "name":"Desktop",
                            "size":"150kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "2-0",
                                "data":{
                                    "name":"note-meeting.txt",
                                    "size":"50kb",
                                    "type":"Text"
                                }
                            },
                            {
                                "key": "2-1",
                                "data":{
                                    "name":"note-todo.txt",
                                    "size":"100kb",
                                    "type":"Text"
                                }
                            }
                        ]
                    },
                    {
                        "key": "3",
                        "data":{
                            "name":"Documents",
                            "size":"75kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "3-0",
                                "data":{
                                    "name":"Work",
                                    "size":"55kb",
                                    "type":"Folder"
                                },
                                "children":[
                                    {
                                        "key": "3-0-0",
                                        "data":{
                                            "name":"Expenses.doc",
                                            "size":"30kb",
                                            "type":"Document"
                                        }
                                    },
                                    {
                                        "key": "3-0-1",
                                        "data":{
                                            "name":"Resume.doc",
                                            "size":"25kb",
                                            "type":"Resume"
                                        }
                                    }
                                ]
                            },
                            {
                                "key": "3-1",
                                "data":{
                                    "name":"Home",
                                    "size":"20kb",
                                    "type":"Folder"
                                },
                                "children":[
                                    {
                                        "key": "3-1-0",
                                        "data":{
                                            "name":"Invoices",
                                            "size":"20kb",
                                            "type":"Text"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "key": "4",
                        "data": {
                            "name":"Downloads",
                            "size":"25kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "4-0",
                                "data": {
                                    "name":"Spanish",
                                    "size":"10kb",
                                    "type":"Folder"
                                },
                                "children":[
                                    {
                                        "key": "4-0-0",
                                        "data":{
                                            "name":"tutorial-a1.txt",
                                            "size":"5kb",
                                            "type":"Text"
                                        }
                                    },
                                    {
                                        "key": "4-0-1",
                                        "data":{
                                            "name":"tutorial-a2.txt",
                                            "size":"5kb",
                                            "type":"Text"
                                        }
                                    }
                                ]
                            },
                            {
                                "key": "4-1",
                                "data":{
                                    "name":"Travel",
                                    "size":"15kb",
                                    "type":"Text"
                                },
                                "children":[
                                    {
                                        "key": "4-1-0",
                                        "data":{
                                            "name":"Hotel.pdf",
                                            "size":"10kb",
                                            "type":"PDF"
                                        }
                                    },
                                    {
                                        "key": "4-1-1",
                                        "data":{
                                            "name":"Flight.pdf",
                                            "size":"5kb",
                                            "type":"PDF"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "key": "5",
                        "data": {
                            "name":"Main",
                            "size":"50kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "5-0",
                                "data":{
                                    "name":"bin",
                                    "size":"50kb",
                                    "type":"Link"
                                }
                            },
                            {
                                "key": "5-1",
                                "data":{
                                    "name":"etc",
                                    "size":"100kb",
                                    "type":"Link"
                                }
                            },
                            {
                                "key": "5-2",
                                "data":{
                                    "name":"var",
                                    "size":"100kb",
                                    "type":"Link"
                                }
                            }
                        ]
                    },
                    {
                        "key": "6",
                        "data":{
                            "name":"Other",
                            "size":"5kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "6-0",
                                "data":{
                                    "name":"todo.txt",
                                    "size":"3kb",
                                    "type":"Text"
                                }
                            },
                            {
                                "key": "6-1",
                                "data":{
                                    "name":"logo.png",
                                    "size":"2kb",
                                    "type":"Picture"
                                }
                            }
                        ]
                    },
                    {
                        "key": "7",
                        "data":{
                            "name":"Pictures",
                            "size":"150kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "7-0",
                                "data":{
                                    "name":"barcelona.jpg",
                                    "size":"90kb",
                                    "type":"Picture"
                                }
                            },
                            {
                                "key": "7-1",
                                "data":{
                                    "name":"primeng.png",
                                    "size":"30kb",
                                    "type":"Picture"
                                }
                            },
                            {
                                "key": "7-2",
                                "data":{
                                    "name":"prime.jpg",
                                    "size":"30kb",
                                    "type":"Picture"
                                }
                            }
                        ]
                    },
                    {
                        "key": "8",
                        "data":{
                            "name":"Videos",
                            "size":"1500kb",
                            "type":"Folder"
                        },
                        "children":[
                            {
                                "key": "8-0",
                                "data":{
                                    "name":"primefaces.mkv",
                                    "size":"1000kb",
                                    "type":"Video"
                                }
                            },
                            {
                                "key": "8-1",
                                "data":{
                                    "name":"intro.avi",
                                    "size":"500kb",
                                    "type":"Video"
                                }
                            }
                        ]
                    }
                ],


                columns: [{label: 'Name', id: 'name'}, {label: 'Surname', id: 'surname'}],
                updateArgs: [true, true, {duration: 1000}],
                chartOptions: {
                    chart: {
                        type: 'column',
                        height: 200,
                    },
                    title: {
                        text: 'Sin chart'
                    },
                    series: [{
                        data: [10, 0, 8],
                        color: '#6fcd98',
                        name: 'سری 1'
                    }],

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
                },
                instructionVisibility:true,
                moreInstructionVisibility: false,

                modalVisibility: [false,true],
                currentModalTab: 2,
                modals: { //list of modals (except video modal)
                    // TODO resolve state change scroll bug
                    1:{
                        state: 20,
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
                newRevenueName: '',
                tableMonthlyDetailsActive: false,


                // modals data
                errors: {
                    'name': []
                },
                selectedLength: 'm',
                selectedPeriod: '1',
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
                        // categories: [
                        //     'فروردین',
                        //     'اردیبهشت',
                        //     'فروردین',
                        //     'فروردین',
                        //     'فروردین',
                        //     'فروردین',
                        //     'فروردین',
                        //     'فروردین',
                        //     'فروردین',
                        //     'فروردین',
                        //     'فروردین',
                        //     'فروردین'
                        // ]
                    },
                    yAxis:{
                        opposite: true,
                        className: 'faNum',
                        softMin: -100,
                        softMax: 100,
                        title: {
                            text: null
                        },
                        allowDecimals: false
                    // TODO handle automatic y-axis
                    },
                    legend: {
                        enabled: false

                    },
                    tooltip: {
                        enabled: false
                    },
                },

                annualSalesUnitPeriodsData: [135, 152, 165, 135, 152, 165, 135, 152, 165, 135, 152, 165]
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
            toggleInstruction(){
                this.instructionVisibility = !this.instructionVisibility;
                this.moreInstructionVisibility = false;
            },
            toggleModalVisibility: function (modalID) {
                let visible = (typeof this.modalVisibility[modalID] !== 'undefined')? this.modalVisibility[modalID] : false;
                if(visible === true){
                    this.$set(this.modalVisibility, modalID, !visible);
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
            updateAnnualSalesUnitChart(value, index){
                if(!value){
                    this.annualSalesUnitPeriodsData[index] = 0;
                    // TODO let the input be null
                }
                this.annualUnitSalesChartOptions.series[0].data = this.annualSalesUnitPeriodsData;
            },

            // TODO optional: make a new component from modal contents

            checkName(serverSide = false){
                console.log('validation');
                if (this.newRevenueName.length < 1){
                    this.errors['name'].push('نام را وارد کنید');
                    return false;
                }
                else{

                    if(serverSide){
                        //TODO implement server side validation logic
                    }
                }
                this.errors.name = [];
                return true;

            },
        },
        computed:{
            tableData: function(){
                if(this.tableMonthlyDetailsActive){
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
            newRevenueName: function(){
                this.checkName(false);
            },
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