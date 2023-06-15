<script setup>
import BannerItem from './BannerItem.vue'
import BabyShowersIcon from './icons/BabyShowersIcon.vue'
import BridalShowersIcon from './icons/BridalShowersIcon.vue'
import GraduationPartiesIcon from './icons/GraduationPartiesIcon.vue'
import WeddingsIcon from './icons/WeddingsIcon.vue'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 lg:px-10 lg:pt-5 w-full md:w-11/12 lg:w-9/12 mx-auto">
    <BannerItem class="bg-yellow-600 rounded-md">
      <template #icon>
        <BridalShowersIcon />
      </template>
      <template #default>
        Bridal Showers
      </template>
    </BannerItem>
    <BannerItem class="bg-orange-600 rounded-md">
      <template #icon>
        <WeddingsIcon />
      </template>
      <template #default>
        Weddings
      </template>
    </BannerItem>

    <BannerItem class="custom-bg-lilac rounded-md">
      <template #icon>
        <GraduationPartiesIcon />
      </template>
      <template #default>
        Graduation Parties
      </template>
    </BannerItem>
    <BannerItem class="custom-bg-yellow rounded-md">
      <template #icon>
        <BabyShowersIcon />
      </template>
      <template #default>
        Baby Showers
      </template>
    </BannerItem>
  </div>
  <div class="px-5 lg:px-10 md:pt-5 lg:pt-5 w-full md:w-11/12 lg:w-9/12 mx-auto"><p class="text-lg md:text-2xl lg:text-3xl banner-text">...and many more</p></div>
  
</template>

<style scoped>
.custom-bg-lilac {
  background-color: #D6E8F7;
}

.custom-bg-yellow {
  background-color: #F1DFB6;
}

.banner-text {
  font-family: 'Playfair Display', serif;
}
</style>