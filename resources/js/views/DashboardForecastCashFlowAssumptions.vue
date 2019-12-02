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
                            <div class="slider-tooltip" :style="{ right: (398/(sliderRange[0].max-sliderRange[0].min))*sliderValue[0] + 'px' }">{{sliderValue[0]}}%</div>
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
                                    <a @click="toggleTipVisibility(1)"></a>
                                    <div class="tip-arrow-box" v-if="isTipVisibile(1)">
                                        <p>
                                            فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتنفلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن
                                        </p>
                                    </div>
                                </div>
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
                                    <a @click="toggleTipVisibility(4)"></a>
                                    <div class="tip-arrow-box" v-if="isTipVisibile(4)">
                                        <p>
                                            فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتنفلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن فلان فلان بلا بلا بشتسیبکمنش تسبکنش ر ترشسمنی ربشکسمتن
                                        </p>
                                    </div>
                                </div>
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
                    100,
                    100,
                    100,
                    100
                ],
                sliderRange: [
                    {
                        'min': 0,
                        'max': 100

                    },
                    {
                        'min': 0,
                        'max': 100
                    },
                    {
                        'min': 0,
                        'max': 100
                    },
                    {
                        'min': 0,
                        'max': 100
                    },
                    {
                        'min': 0,
                        'max': 100
                    },
                    {
                        'min': 0,
                        'max': 100
                    },
                ]
            }
        },
        computed: {
          sliderValue: function () {
              let arr = [];
              for (let i = 0 ; i <= 5 ; i++){
                  arr[i] = this.sliderRange[i].max - this.sliderValueOffset[i];
              }
              return arr;
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