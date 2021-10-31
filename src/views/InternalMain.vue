<template>
    <MainHeader></MainHeader>
    <InternalMenu></InternalMenu>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import InternalMenu from "@/components/InternalMenu.vue"

export default {
    name: "InternalMain",
    components: {
        MainHeader,
        InternalMenu
    },
    data() {
        return {
            
        }

    },
}
</script>