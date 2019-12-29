<template>
    <base-modal show-modal="true" @close="close">
        <template #header>
            <p>
                این مورد را کپی کنید
            </p>
        </template>
        <template #content>
            <div>
                <div>
                    <!--TODO resolve extra height caused by extra 30px paddings-->
                    <!--TODO reset data on type change-->
                    <div class="section">

                        <div class="title-top">
                            نام آن چیست؟
                        </div>
                        <div class="error">
                            <div class="max-length-input-container">
                                <input type="text"
                                       :class="['input-box', 'description' , $v.name.$error ? 'error' : '']"
                                       placeholder="لورم لورم"
                                       v-model.trim="$v.name.$model" :maxlength="255"
                                       @focusin="nameCounterVisible=true" @focusout="nameCounterVisible=false" >
                                <span class="count-down-wrapper" v-show="nameCounterVisible">
                                    {{(255 - name.length >= 0)? 255 - name.length : 0}}
                                </span>
                                <div class="feedback-line">
                                    <p v-if="$v.name.$error && !$v.name.required">
                                        مقداری را وارد کنید
                                    </p>
                                    <p v-if="$v.name.$error && !$v.name.maxLength">
                                        حداکثر طول 255 کاراکتر است.
                                    </p>
                                    <p v-if="$v.name.$error && $v.name.required && !$v.name.test">
                                        ارور چک با دیتابیس
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div> <!--name tab-->
                </div>
            </div>
        </template>
        <template #footer>
            <div class="modal-footer-controls-container left">
                <button :class="['modal-button','primary']" tabindex="0" @click="save()">کپی کردن</button>
                <button class="modal-button enabled" tabindex="0" @click="close()">انصراف</button>
            </div>
        </template>
    </base-modal>
</template>

<script>

    import BaseModal from './../components/BaseModal';
    import { required, maxLength} from 'vuelidate/lib/validators';

    export default {
        name: "ModalRevenueDuplicate",
        data: function(){
            return {
                name:  'کپی ' + this.inputName,
                nameCounterVisible: false,

            }
        },
        methods: {
            // setCurrentTab: function (tab) {
            //     this.currentTab = tab;
            // },
            close() {
                this.$emit('close-modal');
            },
            validateCurrentTab: function(){
                this.$v.name.$touch();
                return !this.$v.name.$error;
            },

            save: function () {
                if(this.validateCurrentTab()){
                    this.$emit('duplicate', this.name)
                }
            },


        },

        validations(){
            return {
                name: {
                    required,
                    maxLength: maxLength(255),
                    // tab: 2,
                    // TODO use this for validation before save attempt
                }
            }
        },

        props: {
            inputName: {
                type: String,
            }
        },
        components:{
            BaseModal,
        },
        mounted(){

        },
    }
</script>

<style scoped>

</style>