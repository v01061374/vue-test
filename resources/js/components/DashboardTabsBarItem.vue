<template>
    <fragment>
        <li v-if="type==='link'" :class="['tabs-menu-item', {'active': isCurrentPage(link)}]">
            <router-link v-if="!isCurrentPage(link)"
                         class="tabs-menu-item-link-container"
                         :to="link"
            >
                {{text}}
            </router-link>
            <div v-else class="tabs-menu-item-link-container">
                {{text}}
            </div>
        </li>
        <li v-if="type==='action'" aria-hidden="true" class="blank-horizontal-divider"></li>
        <li v-if="type==='action'" class="tabs-menu-item">
            <router-link
                    class="tabs-menu-item-link-container"
                    :to="link"
            >
                {{text}}
            </router-link>
        </li>
    </fragment>
</template>


<script>
    import { Fragment } from 'vue-fragment'
    export default {
        name: "DashboardTabsBarItem",
        components:{
            Fragment
        },
        props:{
            link:{
                type: String,
                required: true,
            },
            text:{
                type: String,
                required: true
            },
            type:{
                type: String,
                required: true
            }
        },
        computed:{
            currentPage(){
                return this.$route.path;
            }
        },
        methods:{
            isCurrentPage(link){
                return this.currentPage.includes(link);
            }
        }
    }
</script>

<style scoped>

</style>