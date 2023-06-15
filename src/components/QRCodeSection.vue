<script setup>
import { ref } from 'vue'
const props = defineProps({
    qrCodeUrl: {
        type: String,
        required: true
    },
    photoBookName: {
        type: String,
        required: true,
        default: ''
    }
})

const qrCodeSectionRef = ref(null)
const printQRCode = () => {
    const url = ""
    const win = window.open(url, "_blank", ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"], true)
    let stylesHtml = '';
    for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
        stylesHtml += node.outerHTML;
    }
    win.document.write(`
        <html>
            <head>
                ${stylesHtml}
                <title>${window.document.title}</title>
            </head>
            <body>
                <h1 class="text-4xl text-center">${ props.photoBookName }</h1>
                ${ qrCodeSectionRef.value.innerHTML }
            </body>
        </html>
    `)

    setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
    }, 1000);
}
</script>

<template>
    <div ref="qrCodeSectionRef" class="text-center w-full">
        <vue-qrcode tag="svg" :value="qrCodeUrl" class="mx-auto max-w-xs"></vue-qrcode>
        <p>Photo book URL: <span class="text-bold text-orange-600">{{ qrCodeUrl }}</span></p>
        <p class="text-center"><button @click="printQRCode">Print</button> and share this QRCode to have people start uploading their photos</p>
    </div>
</template>