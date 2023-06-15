<script setup>
import { Client, Databases, ID } from 'appwrite'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const client = new Client()
const databases = new Databases(client, import.meta.env.VITE_APP_APP_WRITE_DATABASE_ID)
client
    .setEndpoint(import.meta.env.VITE_APP_APP_WRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APP_APP_WRITE_PROJECT_ID)

const formDetail = ref({
    name: '',
    owner: '',
    passPhrase: ''
})

const errorOccured = ref(false)
const error = ref('Sorry an error occured.')

const createPhotoBook = () => {
    const photoBook = {
        name: formDetail.value.name,
        owner: formDetail.value.owner,
        'pass-phrase': formDetail.value.passPhrase
    }
    const promise = databases.createDocument(import.meta.env.VITE_APP_APP_WRITE_DATABASE_ID, import.meta.env.VITE_APP_APP_WRITE_PHOTO_BOOKS_COLLECTION_ID, ID.unique(), photoBook)
    promise.then(function (response) {
        localStorage.setItem('photo-book', JSON.stringify(response.$id))
        router.push({ name:'PhotoBook', params: { id: response.$id }, query: { access: 'owner'} })
    }, function (error) {
        errorOccured.value = true
        console.log(error)
    })
}

</script>

<template>
    <div class="px-5">
        <h1 class="text-4xl font-bold my-4">Create a guest photo book</h1>
        <hr />
        <div v-if="errorOccured" class="text-red">
            {{ error }}
        </div>
        <form class="my-4" @submit.prevent="createPhotoBook">
            <div class="form-field py-5">
                <label for="name" class="block text-lg font-medium text-gray-900 mb-2">Event Name <span class="text-red-600">*</span></label>
                <input type="text" id="name" name="name" v-model="formDetail.name" class="block w-full rounded-md border-0 py-4 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm" required />
            </div>
            <div class="form-field py-5">
                <label for="owner" class="block text-lg font-medium text-gray-900 mb-2">Owner</label>
                <input type="text" id="owner" name="owner" v-model="formDetail.owner" class="block w-full rounded-md border-0 py-4 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm" />
            </div>
            <div class="form-field py-5 mb-5">
                <label for="passPhrase" class="block text-lg font-medium text-gray-900 mb-2">Pass Phrase <span class="text-red-600">*</span><span class="text-yellow-600"><b>#</b></span></label>
                <input type="text" id="passPhrase" name="passPhrase" v-model="formDetail.passPhrase" class="block w-full rounded-md border-0 py-4 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm" required />
            </div>
            <button type="submit" class="p-3 rounded-lg bg-orange-600 text-white">Create</button>
        </form>

        <div>
            <p><span class="text-red-600">*</span> Field is required</p>
            <p><span class="text-yellow-600">#</span> <b>Pass phrase is needed for deletion of a photo book</b></p>
        </div>
    </div>
</template>

<style scoped>
h1 {
  font-family: 'Playfair Display', serif;
}
</style>