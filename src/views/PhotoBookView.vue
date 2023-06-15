<script setup>
import { computed, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import QRCodeSection from '../components/QRCodeSection.vue'
import EmptyGalleryIcon from '../components/icons/EmptyGalleryIcon.vue'
import UploadIcon from '../components/icons/UploadIcon.vue'
import useAppWrite from '@/composables/useAppWrite.js'
import useAppWriteStorageCreate from '@/composables/useAppWriteStorageCreate.js'
import useAppWriteStorageGet from '@/composables/useAppWriteStorageGet.js'


const {
    VITE_APP_APP_WRITE_DATABASE_ID: databaseId,
    VITE_APP_APP_WRITE_PHOTO_BOOKS_COLLECTION_ID: collectionId
} = import.meta.env

const router = useRouter()
const { databases } = useAppWrite()
const { createFiles } = useAppWriteStorageCreate()
const { getFileView } = useAppWriteStorageGet()

const props = defineProps({
    id: {
        type: String,
        required: true
    }, 
    query: {
        type: Object,
        required: false
    }
})

const { id: documentId, query } = toRefs(props)

const qrCodeUrl = computed(() => {
    let url = window.location.origin

    const routeLocation = router.resolve({
        name: 'PhotoBook',
        params: {
            id: props.id
        }
    })
    url += routeLocation.href
    return url
})

const maxFileSize = ref(5)
const validFileExtensions = ref('.png,.jpg,.jpeg')
const isLoading = ref(false)
const isFileUploading = ref(false)
const photoBookName = ref('')
const photoBookOwner = ref('')
const photos = ref([])
const photoInputRef = ref()
const photoBookError = ref(false)
const photoUploadErrors = ref([])
const showSuccessAlert = ref(false)

const getPhotoBookDocumentPromise = databases.getDocument(databaseId, collectionId, documentId.value)

getPhotoBookDocumentPromise.then((response) => {
    isFileUploading.value = true
    photoBookName.value = response.name
    photoBookOwner.value = response.owner
    photos.value = response.photos
    isFileUploading.value = false
}, (error) => {
    photoBookError.value = true
    console.error(error)
})

const getSource = (photoId) => {
    const fileResourceUrl = getFileView(photoId)
    return fileResourceUrl
}

const triggerPhotoUpload = () => {
    isFileUploading.value = true
    photoInputRef.value.click()
}

const handlePhotosUpload = (e) => {
    const selectedFiles = [...e.target.files]
    if(selectedFiles.length > 0) {
        validateSelectedFiles(selectedFiles)

        if(photoUploadErrors.value.length === 0) {
            const promises = createFiles(selectedFiles)
            Promise.allSettled(promises).then((values) => {
                if(values.some((result) => result.status === 'rejected' && result.reason)) {
                    photoUploadErrors.value = values.map((result) => {
                        let uploadError = {
                            alertOpen: true
                        }
                        
                        uploadError.reason = result.reason

                        return uploadError
                    })
                    
                    isFileUploading.value = false
                } else {
                    updatePhotoBook(values)
                }

                isFileUploading.value = false
            }) 
        }
    }
}

const validateSelectedFiles = (files) => {
    files.forEach((file) => {
        const isWithinMaxSize = Math.round((file.size / 1024 / 1024) * 100) / 100 <= maxFileSize.value
        const fileExtension = '.' + file.name.split(".").pop()
        const isValidImage = validFileExtensions.value.split(',').includes(fileExtension)

        !isWithinMaxSize && photoUploadErrors.value.push({
            alertOpen: true,
            reason: `Unable to upload ${ file.name } because its file size is greater than ${ maxFileSize.value }MB`
        })

        !isValidImage && photoUploadErrors.value.push({
            alertOpen: true,
            reason: `Unable to upload ${ file.name } because it is not a valid photo. Please upload a file with one of the following extensions: ${ validFileExtensions.value }`
        })
    })
}

const updatePhotoBook = (successPromisesResults) => {
    successPromisesResults.forEach((result) => {
        photos.value.push(result.value.$id)
    })

    const updatePhotoBookPromise = databases.updateDocument(databaseId, collectionId, documentId.value, {
        photos: photos.value
    })

    updatePhotoBookPromise.then((response) => {
        console.log(response)
        showSuccessAlert.value = true
        isFileUploading.value = false
    }, (error) => {
        photoUploadErrors.value.push({
            alertOpen: true,
            reason: 'Unable to update photo book with image'
        })
        console.error(error)
    })
}

const dismissAlert = (errorIndex) => {
    photoUploadErrors.value[errorIndex].alertOpen = false
    photoUploadErrors.value.splice(errorIndex, 1)
}

const dismissSuccessAlert = () => {
    showSuccessAlert.value = false
}
</script>
<template>
    <main class="min-h-screen px-5 py-2 border-t border-solid border-stone-200 w-full">
        <div v-if="photoBookError" class="mt-5 text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
            An error occured while retrieving the photo book.
        </div>
        <div v-else>
            <div class="flex flex-nowrap items-center justify-between pt-5 px-3">
                <div>
                    <h1 class="text-2xl md:text-4xl">{{ photoBookName }}</h1>
                    <p v-if="photoBookOwner && photoBookOwner.length > 0">by {{ photoBookOwner }}</p>
                </div>
                <button
                    v-if="photos.length > 0 && query?.access !== 'owner'"
                    class="inline-flex flex-nowrap gap-1 p-2 md:p-3 rounded-lg bg-orange-600 text-white" @click="triggerPhotoUpload"> <UploadIcon /> Upload <span class="hidden md:inline">Photo</span></button>
            </div>

            <QRCodeSection v-if="query?.access === 'owner'" :qr-code-url="qrCodeUrl" :photo-book-name="photoBookName"></QRCodeSection>
            <div class="photo-book">
                <div v-if="photoUploadErrors.length > 0 && photoUploadErrors.some((error) => error.alertOpen === true)">
                    <div v-for="(uploadError, index) in photoUploadErrors" :key="`photo-upload-error-${ index }`" class="mt-5 text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                        <span class="inline-block align-middle mr-8">{{ uploadError.reason }}</span>
                        <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" @click="dismissAlert(index)">
                            <span>×</span>
                        </button>
                    </div>
                </div>
                <div v-if="photoUploadErrors.length === 0 && showSuccessAlert" class="mt-5 text-white px-6 py-4 border-0 rounded relative mb-4 bg-green-400 w-full">
                    Photo(s) uploaded successfully
                    <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" @click="dismissSuccessAlert">
                        <span>×</span>
                    </button>
                </div>
                
                <input ref="photoInputRef" type="file" name="photo" id="photo" :accept="validFileExtensions" multiple hidden @change="handlePhotosUpload">
                <div v-if="!isLoading && photos.length === 0 && query?.access !== 'owner'" class="mt-0 md:mt-10 pt-5 md:pt-10 text-center basis-full">
                    <EmptyGalleryIcon />
                    <h2 class="text-xl">Oops! Nothing to show yet.</h2>
                    <p>Upload a photo and it will show up here.</p>
                    <button class="mt-6 p-3 rounded-lg bg-orange-600 text-white" :disabled="isFileUploading" @click="triggerPhotoUpload">Start Uploading!</button>
                </div>
                <div v-if="!isLoading && photos.length > 0 && query?.access !== 'owner'" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3 lg:gap-3.5 pt-10">
                    <img v-for="(photoId, index) in photos" :key="photoBookName+`-${ index+ 1}`" :src="getSource(photoId)" alt="" />
                </div>
            </div>
        </div>
    </main>
</template>