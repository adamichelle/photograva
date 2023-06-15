import { Storage } from 'appwrite'
import useAppWrite from './useAppWrite'

export default function () {
    const { client } = useAppWrite()
    const storage = new Storage(client)

    const getFileView = (fileId) => {
        const fileResourceUrl = storage.getFileView(
            import.meta.env.VITE_APP_APP_WRITE_PHOTOS_BUCKET_ID,
            fileId
        )
        return fileResourceUrl
    }

    return {
        getFileView
    }
}