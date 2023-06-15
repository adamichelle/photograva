<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="headline">
    <h1 class="text-3xl md:text-4xl lg:text-7xl font-bold my-4">Explore the inner photographer in your guests.</h1>
    <h2 class="text-lg md:text-2xl mb-5 lg:mb-9">
      Collective picture-perfect memories made possible.
    </h2>

    <div class="flex lg:flex-nowrap gap-x-2.5 pt-4 lg:pt-8">
      <RouterLink to="/create-photo-book" class="p-3 rounded-lg bg-orange-600 text-white">Try it out!</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.headline {
  font-family: 'Playfair Display', serif;
}
</style>
