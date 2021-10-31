<template>
    <MainHeader></MainHeader>
    <InternalMenu></InternalMenu>
    <div>
        residencia
    </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import InternalMenu from "@/components/InternalMenu.vue"

export default {
    name: "Residencia",
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