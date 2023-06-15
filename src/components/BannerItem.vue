<template>
  <div class="p-3 lg:p-5 text-center item">
    <i class="inline-block w-8 lg:w-20 icon">
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
</style>
