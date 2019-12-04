<template>
    <div v-if="showModal">

            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="base-modal-body">
                            <div class="base-modal-header-wrapper">
                                <div class="base-modal-header">
                                    <slot name="header-text"></slot>
                                    <!--<button tabindex="0" role="button" aria-label="close" class="base-modal-header-close-button" @click="close()">-->
                                        <!---->
                                    <!--</button>-->
                                    <a href="#" class="modal-close-button" @click.prevent="close"></a>
                                </div>
                            </div>
                            <div role="group">
                                <div class="modal-content-container" >
                                    <slot name="content"></slot>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <slot name="footer"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>

</template>

<script>
    export default {
        name: 'BaseModal',
        props: {
            showModal: {
                required: true,
                default: false
            }
        },
        methods: {
            close() {
                this.$emit('close-modal');
            }
        },

        // ready: function() {
        //     window.addEventListener('keyup', function(event) {
        //
        //         if (event.key  === 27) {
        //             this.close();
        //         }
        //     });
        // }
        // TODO listen to esc key
        mounted() {
            let body = window.document.getElementsByTagName('body')[0];
            body.setAttribute("style", "overflow: hidden");
        },
        destroyed() {
            let body = window.document.getElementsByTagName('body')[0];
            body.setAttribute("style", "overflow: auto");
        }

    };
</script>



<style lang="css" scoped>
    .modal-mask {
        z-index: 11010;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: auto;
        background-color: rgba(44, 46, 47, 0.99);
    }

    .modal-wrapper {
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        top: 0;
        margin-top: 50px;
        border-radius: 3px;
    }

    .modal-container {
        width: 500px;
        margin: 0 auto;
        /* padding: 20px 30px; */
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .base-modal-body {
        margin: 20px 0;
        position: relative;
    }
    .base-modal-body .modal-close-button, .base-modal-body .modal-close-text {
        position: absolute;
        cursor: pointer;
    }
    .base-modal-body .modal-close-button{
        top: 18px;
        width: 20px;
        height: 20px;
        right: 18px;
    }
    
    .base-modal-body .modal-close-button:before, .base-modal-body .modal-close-button:after {
        position: absolute;
        content: ' ';
        height: 20px;
        width: 2px;
        background-color: #fff;
    }



    .base-modal-body .modal-close-button:before {
        transform: rotate(45deg);
    }
    .base-modal-body .modal-close-button:after {
        transform: rotate(-45deg);
    }
    .modal-default-button {
        float: right;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .base-modal-header-wrapper {
        background-color: #72C152;
        height: 55px;
        border-radius: 3px 3px 0 0;
    }
    .base-modal-header-wrapper .base-modal-header{
        direction: rtl;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 55px;
        margin-left: 55px;
        margin-right: 30px;
        font-size: 18px;
        color: #FFFFFF;
        font-family: IRANSans, Tahoma;
    }
    /*TODO correct margins*/
    .modal-content-container{
        padding-top: 30px;
        padding-left: 30px;
        padding-right: 30px;
        font-family: IRANSans, Tahoma;
        direction: rtl;
        text-align: right;
        /*TODO add class for font and direction*/
    }
    .modal-footer{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row-reverse;
        flex-direction: row-reverse;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-radius: 0 0 3px 3px;
        height: 70px;
        background-color: #D5DBE1;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 30px;
        font-family: IRANSans, Tahoma;
    }
</style>








