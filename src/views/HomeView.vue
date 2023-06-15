<script setup>
import BannerItem from '../components/BannerItem.vue'
import TheBanner from '../components/TheBanner.vue'
import TheHeadline from '../components/TheHeadline.vue'
import CreateEventIcon from '../components/icons/CreateEventIcon.vue'
import QRCodeIcon from '../components/icons/QRCodeIcon.vue'
import ShareIcon from '../components/icons/ShareIcon.vue'
</script>

<template>
  <main class="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-x-5 lg:gap-x-8 bg-amber-100 min-h-screen my-auto">
    <section class="px-10 pt-10 pb-5 basis-1/1 lg:basis-1/2 col-span-2 md:col-span-1"><TheHeadline /></section>
    <section class="px-10 pt-10 pb-5 basis-1/1 lg:basis-1/2 col-span-2 md:col-span-1"><TheBanner /></section>
    <section class="bg-white col-span-2 p-10 grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8">
      <BannerItem class="custom-bg-lilac rounded-full w-80 h-80 mx-auto grid grid-cols-1 more lg:mt-10">
        <template #icon>
          <CreateEventIcon />
        </template>
        <template #default>
          <p class="text-lg md:text-xl">Create a photo book</p>
        </template>
      </BannerItem>
      <BannerItem class="bg-slate-300 rounded-full w-80 h-80 mx-auto grid grid-cols-1 more lg:mt-10">
        <template #icon>
          <QRCodeIcon />
        </template>
        <template #default>
          <p class="text-lg md:text-xl">Get a QR code</p>
        </template>
      </BannerItem>
      <BannerItem class="custom-bg-lilac rounded-full w-80 h-80 mx-auto grid grid-cols-1 more lg:mt-10">
        <template #icon>
          <ShareIcon />
        </template>
        <template #default>
          <p class="text-lg lg:text-xl">Share with your guests to start uploading!</p>
        </template>
      </BannerItem>
    </section>
  </main>
</template>

<style>
.item.more .icon {
  justify-self: center;
  align-self: flex-end;
}

.custom-bg-lilac {
  background-color: #D6E8F7;
}
</style>
