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
                        <button class="button-type-one toggle-button video" @click="triggerModalVisibility(0)">
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
                            <a class="buttonColor" name="revenue-add-revenue-button" @click="triggerModalVisibility(1)">
                                افزودن منبع درآمد
                            </a>
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
                    <div class="subfooter-note rtl"><!--class=yITkwemeo_LVbV4h0jdUK-->
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


        <video-modal v-if="isModalVisible(0)" @close-modal="triggerModalVisibility(0)" :showModal="isModalVisible(0)">

                <v-playback :url="'https://as10.cdn.asset.aparat.com/aparat-video/2131bb93e50b506157ef09e9a57870d017847243-144p__43354.mp4'" ></v-playback>

        </video-modal>
        <!--TODO scroll jump after closing (why)-->
        <base-modal v-if="isModalVisible(1)" @close-modal="triggerModalVisibility(1)" :showModal="isModalVisible(1)">
            <template v-slot:header-text>
                <p>هدر</p>
            </template>
            <template v-slot:content>
                <ul class="navigation-stripe">
                    <li class="step-link active" tabindex="0" aria-selected="true">
                        <span class="circle" >
                            1
                        </span>
                        نام
                    </li>
                    <li class="step-link hover" tabindex="0">
                        <span class="circle" aria-label="step 2:">
                            2
                        </span>
                        نوع
                    </li>
                </ul>
                <div>
                    <div>
                        <div class="section" style="display: none">
                            <!--<div class="title-top">-->
                                <!--نام آن چیست؟-->
                            <!--</div>-->
                            <!--<div class="error">-->
                                <!--<div class="max-length-input-container">-->
                                    <!--<input type="text"-->
                                       <!--class="input-box description error"-->
                                       <!--value="" placeholder="لورم لورم"-->
                                       <!--aria-label=" (255 characters remaining)"-->
                                       <!--aria-describedby="910483b6-20d6-9972-78e5-e58c5e6cd27b"-->
                                       <!--aria-invalid="true">-->
                                    <!--<span class="count-down-wrapper">-->
                                        <!--255-->
                                    <!--</span>-->
                                <!--</div>-->
                                <!--<div class="feedback-line" aria-live="assertive" aria-atomic="true">-->
                                    <!--<p>-->
                                        <!--مقداری را وارد کنید.-->
                                    <!--</p>-->
                                <!--</div>-->
                            <!--</div>-->

                        </div><!--TODO revenue tab 1 (delete this todo)-->
                        <div class="section"  style="display: none">

                            <!--<div class="title-top">نوع درآمد؟</div>-->
                            <!--<div class="radio-buttons-list rtl" tabindex="0" role="radiogroup">-->
                                <!--<p class="radio-right">-->
                                    <!--<input type="radio" name="revenueType" id="emp0" class="radio-style" value="on">-->
                                    <!--<label for="emp0">لورم 1</label>-->
                                <!--</p>-->
                                <!--<p  class="description">-->
                                    <!--Best for products that are sold in individual units or set quantities-->
                                <!--</p>-->
                                <!--<p class="radio-right"><input type="radio" name="revenueType" id="emp1" class="radio-style" value="on">-->
                                    <!--<label for="emp1">-->
                                        <!--Billable hours-->
                                    <!--</label>-->
                                <!--</p>-->
                                <!--<p  class="description">-->
                                    <!--Best for services that are priced on a per-hour basis-->
                                <!--</p>-->
                                <!--<p class="radio-right">-->
                                    <!--<input type="radio" name="revenueType" id="emp2" class="radio-style" value="on">-->
                                    <!--<label for="emp2">-->
                                        <!--Recurring charges-->
                                    <!--</label>-->
                                <!--</p>-->
                                <!--<p  class="description">-->
                                    <!--Best for subscriptions, memberships, rentals, web apps, or other offerings with monthly or periodic-->
                                <!--</p>-->
                                <!--<p class="radio-right"><input type="radio" name="revenueType" id="emp3" class="radio-style" value="on">-->
                                    <!--<label for="emp3">-->
                                        <!--Revenue only-->
                                    <!--</label>-->
                                <!--</p>-->
                                <!--<p  class="description">-->
                                    <!--If none of the models above are applicable, or you already have a detailed forecast in Excel or elsewhere, choose this option to just enter overall revenue values without any detail-->
                                <!--</p>-->
                            <!--</div>-->
                        <!--</div>-->
                    </div><!--TODO revenue tab 2 (delete this todo)-->
                        <div class="forecast-item-editor">
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
                                <div><!--TODO variable amount selected (delete this todo-->
                                    <!--<div class="financial-year-box" role="grid">-->
                                        <!--<div class="_33jTwP74Ar_CSHuwZZTN2Q _2nVxIfwHGXUhK0hfTZ81R7">-->
                                            <!--<div class="qv55CvV2j37ME4406V_kt _1W41zR4aGAe6ywyaRnU9q_" style="height: 340px;">-->
                                                <!--<div>-->
                                                    <!--<div class="ChgIxvnoZz8qBJQqoqtHN">-->
                                                        <!--<p class="_2MpZt94QK8uSoTo_sCypAp">-->
                                                            <!--<strong>2019</strong>-->
                                                            <!--&lt;!&ndash; react-text: 988 &ndash;&gt;Click on the chart or enter values below to set the amounts you want.&lt;!&ndash; /react-text &ndash;&gt;&lt;!&ndash; react-text: 989 &ndash;&gt; &lt;!&ndash; /react-text &ndash;&gt;-->
                                                            <!--<a href="http://helpcenter.liveplan.com/articles/preparing-a-forecast/helpful-forecast-features/using-an-interactive-chart-to-enter-varying-amounts" target="_blank">-->
                                                                <!--Learn more-->
                                                            <!--</a>-->
                                                        <!--</p>-->
                                                        <!--<div>-->
                                                            <!--<div class="_2i5-lgSd5MKasfbgvD6x4k">-->
                                                                <!--<p>Change</p>-->
                                                                <!--<div>-->
                                                                    <!--<div class="input-box-wrapper _2fhqByVVd1xIFl73q95wYl" style="width: 87px;">-->
                                                                        <!--<span aria-hidden="true" class="percent">-->
                                                                            <!--%-->
                                                                        <!--</span>-->
                                                                        <!--<input type="text" class="input-box _1v965moXRbti5zqLRSk3wE smallPercentage _3nXdR_fo3j0MwFs8AZWYc5" value="0">-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                                <!--<button class="overlay-button primary disabled" tabindex="-1">-->
                                                                    <!--Apply-->
                                                                <!--</button>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</div>-->
                                                    <!--<div>-->
                                                        <!--<div>-->
                                                            <!--<div data-highcharts-chart="7">-->
                                                                <!--<div class="highcharts-container" id="highcharts-21" style="position: relative; overflow: hidden; width: 964px; height: 260px; text-align: left; line-height: normal; z-index: 0; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: &quot;Open Sans&quot;, sans-serif;"><svg version="1.1" style="font-family:&quot;Open Sans&quot;, sans-serif;font-size:12px;" xmlns="http://www.w3.org/2000/svg" width="964" height="260"><desc>Created with Highcharts 4.1.5-modified</desc><defs><clipPath id="highcharts-22"><rect x="0" y="0" width="882" height="235"></rect></clipPath></defs><rect x="0" y="0" width="964" height="260" strokeWidth="0" fill="transparent" class=" highcharts-background"></rect><g class="highcharts-grid" zIndex="1"></g><g class="highcharts-grid" zIndex="1"><path fill="none" d="M 0 245.5 L 882 245.5" stroke="#D8D8D8" stroke-width="1" zIndex="1" opacity="1"></path><path fill="none" d="M 0 167.5 L 882 167.5" stroke="#D8D8D8" stroke-width="1" zIndex="1" opacity="1"></path><path fill="none" d="M 0 88.5 L 882 88.5" stroke="#D8D8D8" stroke-width="1" zIndex="1" opacity="1"></path><path fill="none" d="M 0 9.5 L 882 9.5" stroke="#D8D8D8" stroke-width="1" zIndex="1" opacity="1"></path></g><g class="highcharts-axis" zIndex="2"></g><g class="highcharts-axis" zIndex="2"></g><path fill="none" d="M 0 245.5 L 882 245.5" stroke="#7D8F94" stroke-width="1" zIndex="2"></path><g class="highcharts-series-group" zIndex="3"><g class="highcharts-series" visibility="visible" zIndex="0.1" transform="translate(0,10) scale(1 1)" clip-path="url(#highcharts-22)"><path fill="none" d="M 26.75 78.33333333333334 L 46.75 78.33333333333334" stroke-linejoin="round" visibility="visible" stroke="rgba(192,192,192,0.0001)" stroke-width="23" zIndex="2" class=" highcharts-tracker" style=""></path></g><g class="highcharts-markers highcharts-tracker" visibility="visible" zIndex="0.1" transform="translate(0,10) scale(1 1)" style="" clip-path="none"><path fill="white" d="M 36 74.33333333333334 C 41.328 74.33333333333334 41.328 82.33333333333334 36 82.33333333333334 C 30.672 82.33333333333334 30.672 74.33333333333334 36 74.33333333333334 Z" stroke="#4C9BEE" stroke-width="3"></path><path fill="#4C9BEE" d="M 0 0" stroke="#4C9BEE" stroke-width="3" visibility="hidden"></path></g></g><g class="highcharts-axis-labels highcharts-xaxis-labels" zIndex="7"></g><g class="highcharts-axis-labels highcharts-yaxis-labels" zIndex="7"><text x="897" style="color:#606060;cursor:default;font-size:11px;fill:#606060;width:308px;text-overflow:clip;" text-anchor="start" transform="translate(0,0)" y="248" opacity="1">0</text><text x="897" style="color:#606060;cursor:default;font-size:11px;fill:#606060;width:308px;text-overflow:clip;" text-anchor="start" transform="translate(0,0)" y="170" opacity="1">2</text><text x="897" style="color:#606060;cursor:default;font-size:11px;fill:#606060;width:308px;text-overflow:clip;" text-anchor="start" transform="translate(0,0)" y="92" opacity="1">4</text><text x="897" style="color:#606060;cursor:default;font-size:11px;fill:#606060;width:308px;text-overflow:clip;" text-anchor="start" transform="translate(0,0)" y="13" opacity="1">6</text></g></svg></div>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</div>-->
                                                <!--</div>-->
                                            <!--</div>-->
                                            <!--<div class="_2WSAZbyrXEXzi9kQFZeNMC monthly-row" role="rowgroup">-->
                                                <!--<ul class="labels">-->
                                                    <!--<li>Jan '19</li><li>Feb '19</li><li>Mar '19</li><li>Apr '19</li><li>May '19</li><li>June '19</li><li>July '19</li><li>Aug '19</li><li>Sept '19</li><li>Oct '19</li><li>Nov '19</li><li>Dec '19</li><li>2019</li></ul>-->
                                                <!--<ul class="fields" role="row">-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div class="valid">-->
                                                            <!--<div>-->
                                                                <!--<input type="text" class="input-box _3nXdR_fo3j0MwFs8AZWYc5" value="4" aria-label="Jan '19">-->
                                                                <!--<div class="fillRightDots" aria-hidden="true">&nbsp;</div>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div class="valid"><div><input type="text" class="input-box _3nXdR_fo3j0MwFs8AZWYc5" value="" aria-label="Feb '19">-->
                                                            <!--<div class="fillRightDots" aria-hidden="true">&nbsp;</div>-->
                                                        <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div class="valid">-->
                                                            <!--<div><input type="text"-->
                                                                        <!--class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                        <!--value="" aria-label="Mar '19">-->
                                                                <!--<div class="fillRightDots" aria-hidden="true">&nbsp;-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div class="valid">-->
                                                            <!--<div><input type="text"-->
                                                                        <!--class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                        <!--value="" aria-label="Apr '19">-->
                                                                <!--<div class="fillRightDots" aria-hidden="true">&nbsp;-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div class="valid">-->
                                                            <!--<div><input type="text"-->
                                                                        <!--class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                        <!--value="" aria-label="May '19">-->
                                                                <!--<div class="fillRightDots" aria-hidden="true">&nbsp;-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div class="valid">-->
                                                            <!--<div><input type="text"-->
                                                                        <!--class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                        <!--value="" aria-label="June '19">-->
                                                                <!--<div class="fillRightDots" aria-hidden="true">&nbsp;-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div class="valid">-->
                                                            <!--<div><input type="text"-->
                                                                        <!--class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                        <!--value="" aria-label="July '19">-->
                                                                <!--<div class="fillRightDots" aria-hidden="true">&nbsp;-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div class="valid">-->
                                                            <!--<div><input type="text"-->
                                                                        <!--class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                        <!--value="" aria-label="Aug '19">-->
                                                                <!--<div class="fillRightDots" aria-hidden="true">&nbsp;-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div class="valid">-->
                                                            <!--<div><input type="text"-->
                                                                        <!--class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                        <!--value="" aria-label="Sept '19">-->
                                                                <!--<div class="fillRightDots" aria-hidden="true">&nbsp;-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div class="valid">-->
                                                            <!--<div><input type="text"-->
                                                                        <!--class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                        <!--value="" aria-label="Oct '19">-->
                                                                <!--<div class="fillRightDots" aria-hidden="true">&nbsp;-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div class="valid">-->
                                                            <!--<div><input type="text"-->
                                                                        <!--class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                        <!--value="" aria-label="Nov '19">-->
                                                                <!--<div class="fillRightDots" aria-hidden="true">&nbsp;-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div class="valid">-->
                                                            <!--<div><input type="text"-->
                                                                        <!--class="input-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                        <!--value="" aria-label="Dec '19">-->
                                                                <!--<div class="fillRightDots" aria-hidden="true">&nbsp;-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                    <!--<li role="gridcell">-->
                                                        <!--<div><input type="text"-->
                                                                    <!--class="input-box total-box _3nXdR_fo3j0MwFs8AZWYc5"-->
                                                                    <!--value="4" readonly="" disabled="" tabindex="-1"-->
                                                                    <!--aria-label="2019">-->
                                                            <!--<div class="fillRightDots">&nbsp;</div>-->
                                                        <!--</div>-->
                                                    <!--</li>-->
                                                <!--</ul>-->
                                            <!--</div>-->
                                        <!--</div>-->
                                        <!--<div class="_2WSAZbyrXEXzi9kQFZeNMC last-row" role="rowgroup">-->
                                            <!--<ul class="labels">-->
                                                <!--<li>2020</li>-->
                                                <!--<li>2021</li>-->
                                            <!--</ul>-->
                                            <!--<ul class="fields" role="row">-->
                                                <!--<li role="gridcell">-->
                                                    <!--<div class="valid">-->
                                                        <!--<div><input type="text"-->
                                                                    <!--class="input-box _3nXdR_fo3j0MwFs8AZWYc5" value=""-->
                                                                    <!--aria-label="2020">-->
                                                            <!--<div class="fillRightDots" aria-hidden="true">&nbsp;</div>-->
                                                        <!--</div>-->
                                                    <!--</div>-->
                                                <!--</li>-->
                                                <!--<li role="gridcell">-->
                                                    <!--<div class="valid">-->
                                                        <!--<div><input type="text"-->
                                                                    <!--class="input-box _3nXdR_fo3j0MwFs8AZWYc5" value=""-->
                                                                    <!--aria-label="2021">-->
                                                            <!--<div class="fillRightDots" aria-hidden="true">&nbsp;</div>-->
                                                        <!--</div>-->
                                                    <!--</div>-->
                                                <!--</li>-->
                                            <!--</ul>-->
                                        <!--</div>&lt;!&ndash; react-empty: 1097 &ndash;&gt;&lt;!&ndash; react-empty: 1098 &ndash;&gt;-->
                                        <!--&lt;!&ndash; react-empty: 1099 &ndash;&gt;</div>-->
                                </div> <!--TODO variable amount selected (delete this todo-->

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
                        <div class="trash-delete">
                            <a href="#" class="trashcan" role="button" aria-label="Delete">
                                <span class="trash-text">
                                    حذف
                                </span>
                            </a>
                        </div>
                        <div id="trash-confirm" aria-live="assertive">
                            <div class="trashcan-confirm">
                                <span class="trash-text-confirm">
                                    <p>آیا اطمینان دارید?</p>
                                    <a href="#close" role="button" tabindex="1">تایید</a>
                                    <span>
                                        یا
                                    </span>
                                    <a href="#" role="button" tabindex="2">
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
    import TreeTable from 'vue-tree-table-component';
    import VideoModal from "../components/VideoModal";
    import BaseModal from "../components/BaseModal";

    export default {
        name: "DashboardForecastRevenue",
        components: {
            VideoModal,
            TreeTable,
            BaseModal
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

                instructionVisibility:false,
                moreInstructionVisibility: false,
                modalVisibility: [],
                // TODO change format of show... names



            }
        },
        methods:{
            toggleInstruction(){
                this.instructionVisibility = !this.instructionVisibility;
                this.moreInstructionVisibility = false;
            },
            triggerModalVisibility: function (i) {
                let state = (typeof this.modalVisibility[i] !== 'undefined')? this.modalVisibility[i] : false;
                this.$set(this.modalVisibility, i, !state);
            },
            isModalVisible: function (i) {
                return this.modalVisibility[i];
            }
        }
    }
</script>

<style scoped>
    /*TODO make styles scoped*/
</style>