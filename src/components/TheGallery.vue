<script setup>
defineProps({
    photoBookName: {
        type: String,
        required: true
    },
    photos: {
        type: Array,
        default: () => ([])
    }
})
</script>
<template>
    <h1>{{ photoBookName }}</h1>
    
    <div class="flex flex-wrap width-full">
    </div>
</template>