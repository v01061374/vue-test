<template>
    <div class="info-container clearfix vertical-scroller-fullscreen" style="height: auto">
        <div class="details-container">
            <div class="forecast-layout two-column-boxes">
                <div class="two-column column-right">
                    <div class="box-half naked">
                        <div class="box-half-title rtl">
                            بشسیب بببیس سششش
                        </div>
                    </div>
                    <div class="box-half">
                        <div class="box-half-header rtl">
                            <p>بشیب بشیسب </p>
                            <div class="box-half-tip-wrapper">
                                <div class="tip-container">
                                    <a @click="toggleTipVisibility(0)"></a>
                                    <div class="tip-arrow-box" v-if="isTipVisibile(0)">
                                        <p>
                                            فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتنفلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="slider-component">
                            <slider v-model="sliderValueOffset[0]" :min="sliderRange[0].min" :max="sliderRange[0].max"/>
                            <div class="slider-tooltip" :style="{ right: (100/(sliderRange[0].max-sliderRange[0].min))*(sliderValue[0]- sliderRange[0].min) + '%' }">{{sliderValue[0]}}%</div>
                            <div class="slider-ticks-container">
                                <span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span>
                            </div>
                            <div class="invisible">
                                <slider v-model="sliderValueOffset[0]" :min="sliderRange[0].min" :max="sliderRange[0].max"/>
                            </div>
                            <div class="slider-levels-container">
                                <span class="slider-level faNum" style="left: -10px;">100%</span>
                                <span class="slider-level faNum" style="right:189px;">50%</span>
                                <span class="slider-level faNum" style="right:-7px;">0%</span>
                            </div>
                        </div>

                    </div>
                    <div class="box-half naked">
                        <div class="box-half-title rtl">
                            بشسیب بببیس سششش
                        </div>
                    </div>
                    <div class="box-half">
                        <div class="box-half-header rtl">
                            <p>بشیب بشیسب </p>
                            <div class="box-half-tip-wrapper">
                                <div class="tip-container">
                                    <a @click="toggleTipVisibility(0)"></a>
                                    <div class="tip-arrow-box" v-if="isTipVisibile(0)">
                                        <p>
                                            فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتنفلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="slider-component">
                            <slider v-model="sliderValueOffset[1]" :min="sliderRange[1].min" :max="sliderRange[1].max"/>
                            <div class="slider-tooltip" :style="{ right: (100/(sliderRange[1].max-sliderRange[1].min))*(sliderValue[1]- sliderRange[1].min) + '%' }">{{sliderValue[1]}}%</div>
                            <div class="slider-ticks-container">
                                <span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span><span class="slider-tick tick-percent"></span><span
                                    class="slider-tick tick-percent"></span>
                            </div>
                            <div class="invisible">
                                <slider v-model="sliderValueOffset[1]" :min="sliderRange[0].min" :max="sliderRange[1].max"/>
                            </div>
                            <div class="slider-levels-container">
                                <span class="slider-level faNum" style="left: -10px;">100%</span>
                                <span class="slider-level faNum" style="right:189px;">50%</span>
                                <span class="slider-level faNum" style="right:-7px;">0%</span>
                            </div>
                        </div>

                    </div>
                    <div class="box-half naked">
                        <div class="box-half-title rtl">
                            بشسیب بببیس سششش
                        </div>
                    </div>
                    <div class="box-half">
                        <div class="box-half-header rtl">
                            <p>بشیب بشیسب </p>
                            <div class="box-half-tip-wrapper">
                                <div class="tip-container">
                                    <a @click="toggleTipVisibility(2)"></a>
                                    <div class="tip-arrow-box" v-if="isTipVisibile(2)">
                                        <p>
                                            فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتنفلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="slider-component">
                            <slider v-model="sliderValueOffset[2]" :min="sliderRange[2].min" :max="sliderRange[2].max"/>
                            <div class="slider-tooltip" :style="{ right: ((100/(sliderRange[2].max-sliderRange[2].min))*(sliderValue[2]- sliderRange[2].min))  + '%' }">{{sliderValue[2]}}</div>
                            <div class="slider-ticks-container">
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                                <span class="slider-tick tick-18"></span>
                            </div>
                            <div class="invisible">
                                <slider v-model="sliderValueOffset[2]" :min="sliderRange[2].min" :max="sliderRange[2].max"/>
                            </div>
                            <div class="slider-levels-container">
                                <span class="slider-level faNum" style="left: -2px">18</span>
                                <span class="slider-level faNum" style="left: calc(5.88235% - 2px);">17</span>
                                <span class="slider-level faNum" style="left: calc(11.7647% - 2px);">16</span>
                                <span class="slider-level faNum" style="left: calc(17.6471% - 2px);">15</span>
                                <span class="slider-level faNum" style="left: calc(23.5294% - 2px);">14</span>
                                <span class="slider-level faNum" style="left: calc(29.4118% - 2px);">13</span>
                                <span class="slider-level faNum" style="left: calc(35.2941% - 2px);">12</span>
                                <span class="slider-level faNum" style="left: calc(41.1765% - 2px);">11</span>
                                <span class="slider-level faNum" style="left: calc(47.0588% - 2px);">10</span>
                                <span class="slider-level faNum" style="left: calc(52.9412% - 2px);">9</span>
                                <span class="slider-level faNum" style="left: calc(58.8235% - 2px);">8</span>
                                <span class="slider-level faNum" style="left: calc(64.7059% - 2px);">7</span>
                                <span class="slider-level faNum" style="left: calc(70.5882% - 2px);">6</span>
                                <span class="slider-level faNum" style="left: calc(76.4706% - 2px);">5</span>
                                <span class="slider-level faNum" style="left: calc(82.3529% - 2px)">4</span>
                                <span class="slider-level faNum" style="left: calc(88.2353% - 2px)">3</span>
                                <span class="slider-level faNum" style="left: calc(94.1176% - 2px)">2</span>
                                <span class="slider-level faNum" style="left: calc(100% - 2px);">1</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="two-column column-left">
                    <div class="box-half naked">
                        <div class="box-half-title rtl">
                            بشسیب بببیس سششش
                        </div>
                    </div>
                    <div class="box-half">
                        <div class="box-half-header rtl">
                            <p>بشیب بشیسب </p>
                            <div class="box-half-tip-wrapper">
                                <div class="tip-container">
                                    <a @click="toggleTipVisibility(3)"></a>
                                    <div class="tip-arrow-box" v-if="isTipVisibile(3)">
                                        <p>
                                            فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتنفلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="slider-component">
                            <slider v-model="sliderValueOffset[3]" :min="sliderRange[3].min" :max="sliderRange[3].max" :step="15"/>
                            <div class="slider-tooltip" :style="{ right: ((100/(sliderRange[3].max-sliderRange[3].min))*(sliderValue[3]- sliderRange[3].min))  + '%' }">{{daysToGetPaidSliderValue}}</div>
                            <div class="slider-ticks-container">
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                            </div>
                            <div class="invisible">
                                <slider v-model="sliderValueOffset[3]" :min="sliderRange[3].min" :max="sliderRange[3].max" />
                            </div>
                            <div class="slider-levels-container">
                                <span class="slider-level faNum" style="left: -2px;">180</span>
                                <span class="slider-level faNum" style="left: calc(12.5% - 2px);">150</span>
                                <span class="slider-level faNum" style="left: calc(25% - 2px);">120</span>
                                <span class="slider-level faNum" style="left: calc(37.5% - 2px);">90</span>
                                <span class="slider-level faNum" style="left: calc(50% - 2px);">60</span>
                                <span class="slider-level faNum" style="left: calc(62.5% - 2px)">45</span>
                                <span class="slider-level faNum" style="left: calc(75% - 2px)">30</span>
                                <span class="slider-level faNum" style="left: calc(87.5% - 2px)">15</span>
                                <span class="slider-level faNum" style="left: calc(100% - 2px);">0</span>

                            </div>
                        </div>

                    </div>
                    <div class="box-half naked">
                        <div class="box-half-title rtl">
                            بشسیب بببیس سششش
                        </div>
                    </div>
                    <div class="box-half">
                        <div class="box-half-header rtl">
                            <p>بشیب بشیسب </p>
                            <div class="box-half-tip-wrapper">
                                <div class="tip-container">
                                    <a @click="toggleTipVisibility(3)"></a>
                                    <div class="tip-arrow-box" v-if="isTipVisibile(3)">
                                        <p>
                                            فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتنفلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="slider-component">
                            <slider v-model="sliderValueOffset[4]" :min="sliderRange[4].min" :max="sliderRange[4].max" :step="15"/>
                            <div class="slider-tooltip" :style="{ right: ((100/(sliderRange[4].max-sliderRange[4].min))*(sliderValue[4]- sliderRange[4].min))  + '%' }">{{daysToPaySliderValue}}</div>
                            <div class="slider-ticks-container">
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                                <span class="slider-tick tick-9"></span>
                            </div>
                            <div class="invisible">
                                <slider v-model="sliderValueOffset[4]" :min="sliderRange[4].min" :max="sliderRange[4].max" />
                            </div>
                            <div class="slider-levels-container">
                                <span class="slider-level faNum" style="left: -2px;">180</span>
                                <span class="slider-level faNum" style="left: calc(12.5% - 2px);">150</span>
                                <span class="slider-level faNum" style="left: calc(25% - 2px);">120</span>
                                <span class="slider-level faNum" style="left: calc(37.5% - 2px);">90</span>
                                <span class="slider-level faNum" style="left: calc(50% - 2px);">60</span>
                                <span class="slider-level faNum" style="left: calc(62.5% - 2px)">45</span>
                                <span class="slider-level faNum" style="left: calc(75% - 2px)">30</span>
                                <span class="slider-level faNum" style="left: calc(87.5% - 2px)">15</span>
                                <span class="slider-level faNum" style="left: calc(100% - 2px);">0</span>

                            </div>
                        </div>

                    </div>
                    <div class="box-half naked">
                        <div class="box-half-title rtl">
                            بشسیب بببیس سششش
                        </div>
                    </div>
                    <div class="box-half">
                        <div class="box-half-header rtl">
                            <p>بشیب بشیسب </p>
                            <div class="box-half-tip-wrapper">
                                <div class="tip-container">
                                    <a @click="toggleTipVisibility(5)"></a>
                                    <div class="tip-arrow-box" v-if="isTipVisibile(5)">
                                        <p>
                                            فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتنفلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="input-box-wrapper " style="width: 140px; ">

                            <input class="faNum input-box input-box-with-currency _36slfUixQ4wAFF1EUIGq5f mediumCash _3nXdR_fo3j0MwFs8AZWYc5" type="text">
                            <span aria-hidden="true" class="currency">ریال</span>


                        </div>
                        <button class="buttonColor">
                            اعمال
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import slider from 'primevue/slider';
    export default {
        name: "DashboardForecastCashflowAssumptions",
        data: function(){
            return {
                tipVisibility: [false, false, false, false, false, false],
                sliderValueOffset: [ //actually: the offset from max (because of rtl vs ltr)
                    100,
                    100,
                    17,
                    8,
                    8,
                    100
                ],
                sliderRange: [{'min': 0, 'max': 100},{'min': 0, 'max': 100},{'min': 1, 'max': 18},{'min': 0, 'max': 8},{'min': 0, 'max': 8},{'min': 0, 'max': 100}]
            }
        },
        computed: {
          sliderValue: function () {
              let arr = [];
              for (let i = 0 ; i <= 5 ; i++){
                  arr[i] = this.sliderRange[i].max - this.sliderValueOffset[i] + this.sliderRange[i].min;
              }
              return arr;
          },
          daysToGetPaidSliderValue: function () { // for days to get paid slide i == 3
              let out = this.sliderValueOffset[3];

              switch (out) {
                  case 8 : {out = 0; break;}
                  case 7 : {out = 15; break;}
                  case 6 : {out = 30; break;}
                  case 5 : {out = 45; break;}
                  case 4 : {out = 60; break;}
                  case 3 : {out = 90; break;}
                  case 2 : {out = 120; break;}
                  case 1 : {out = 150; break;}
                  case 0 : {out = 180; break;}
                  default: {}
              }
              return out;
          },
           daysToPaySliderValue: function () { // for days to pay slide i == 4
                let out = this.sliderValueOffset[4];
                switch (out) {
                    case 8 : {out = 0; break;}
                    case 7 : {out = 15; break;}
                    case 6 : {out = 30; break;}
                    case 5 : {out = 45; break;}
                    case 4 : {out = 60; break;}
                    case 3 : {out = 90; break;}
                    case 2 : {out = 120; break;}
                    case 1 : {out = 150; break;}
                    case 0 : {out = 180; break;}
                    default: {}
                }
                return out;
            }
        },
        methods:{
            toggleTipVisibility(tipID){
                console.log('toggleTipVisibility');
                this.$set(this.tipVisibility, tipID, !this.tipVisibility[tipID]);
            },
            isTipVisibile(tipID){
                return this.tipVisibility[tipID];
            }
        },
        components: {
            slider
        }
    }

</script>

<style scoped>

</style>