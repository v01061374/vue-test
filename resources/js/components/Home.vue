<template>
    <div>
        <button class="btn" @click="openModal">Open Modal</button>
        <video-modal :showModal="modalOpen"></video-modal>
    </div>
</template>

<script>

    import VideoModal from "@/js/components/VideoModal";
    // TODO change addressing formats
    export default {
        components: {
            VideoModal,
        },
        data() {
            return {
                modalOpen: false
            }
        },
        methods: {
            openModal() {
                this.modalOpen = !this.modalOpen;
            }
        }
    };
</script>