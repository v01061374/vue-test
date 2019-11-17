<template>
    <div v-if="showModal">
        <transition name="modal">
            <div class="modal-mask">
                <div @keyup.esc="close" class="modal-wrapper">
                    <div class="modal-container">
                        <div class="video-modal-body">
                            <slot>
                            </slot>
                            <a href="#" class="modal-close-button" @click="close">
                        </a>
                            <a  href="#" class="modal-close-text" @click="close">بستن</a>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
    export default {
        name: 'VideoModal',
        props: {
            showModal: {
                required: true
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

    };
</script>



<style lang="css" scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 500px;
        margin: 0px auto;
        /* padding: 20px 30px; */
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .video-modal-body {
        margin: 20px 0;
        position: relative;
    }
    .video-modal-body .modal-close-button, .video-modal-body .modal-close-text {
        position: absolute;



        cursor: pointer;
    }
    .video-modal-body .modal-close-button{
        bottom: -28px;
        width: 20px;
        height: 20px;
        right: 4px;
    }
    .video-modal-body .modal-close-text{
        bottom: -23px;
        right: 18px;
        font-family: IRANSans, Tahoma;
        font-size: 12px;
    }
    
    .video-modal-body .modal-close-button:before, .video-modal-body .modal-close-button:after {
        position: absolute;
        left: 15px;
        content: ' ';
        height: 10px;
        width: 2px;
        background-color: #333;
    }
    .video-modal-body .modal-close-button:before {
        transform: rotate(45deg);
    }
    .video-modal-body .modal-close-button:after {
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
</style>








