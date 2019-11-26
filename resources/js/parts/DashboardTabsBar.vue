<template>
    <div :class="{'upper-tabs-container': isPrimary, 'lower-tabs-container': !isPrimary}">
        <ul role="menu">
            <tab v-for="tab in tabs" :key="tab.key" :link="tab.url" :text="tab.text" :type="tab.type"></tab>
        </ul>
    </div>
</template>

<script>
    import Tab from './../components/DashboardTabsBarItem';
    export default {
        name: "DashboardTabsContainer",
        components:{
            Tab
        },
        props:{
            tabs:{
                type: Object,
                required: true
            },
            isPrimary:{
                type: Boolean,
                required: true,
                default: false
            }
        }
    }
</script>

<style scoped>

</style>