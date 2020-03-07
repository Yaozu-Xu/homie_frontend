<template>
    <b-container fluid class="m-0 p-0 main">
        <leftSideBar></leftSideBar>
    </b-container>
</template>

<style lang="scss" scoped>

.main{
    background: #f8fafb;
}

</style>


<script>
import leftSideBar from '@/components/admin/left_side_bar'

export default {
    components:{
        leftSideBar
    }
}
</script>