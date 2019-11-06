<template>
    <div>
        <button class="btn" @click="openModal">Open Modal</button>
        <modal v-model="modalOpen"></modal>
    </div>
</template>

<script>
    import modal from "@/js/components/Modal.vue";
    export default {
        components: {
            modal
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