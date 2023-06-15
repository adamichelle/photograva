import { ID, Storage } from 'appwrite'
import useAppWrite from './useAppWrite'

export default function () {
    const { client } = useAppWrite()
    const storage = new Storage(client)

    const createFiles = (files) => {
        return files.map((file) => {
            return storage.createFile(
                import.meta.env.VITE_APP_APP_WRITE_PHOTOS_BUCKET_ID,
                ID.unique(),
                file
            )
        })
    }

    const createFile = (file) => {
        return storage.createFile(
            import.meta.env.VITE_APP_APP_WRITE_PHOTOS_BUCKET_ID,
            ID.unique(),
            file
        )
    }
    
    return {
        createFiles,
        createFile
    }
}