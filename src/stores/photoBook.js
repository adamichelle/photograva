import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePhotoBookStore = defineStore('photoBook', () => {
  const photoBook = ref({
    name: '',
    owner: '',
    id: ''
  })

  return { photoBook }
})
