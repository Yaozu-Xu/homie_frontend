<template>
    <b-container fluid style="padding: 0; margin: 0">
        <IndexHeader></IndexHeader>
        <Editor></Editor>
    </b-container>
</template>

<script>

import Editor from "@/components/publish/publish"
import IndexHeader from "@/components/index/header"

export default {
    components:{
        Editor,
        IndexHeader,
    }
}
</script>