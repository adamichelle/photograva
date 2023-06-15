import { Client, Databases } from "appwrite"

export default function () {
    const client = new Client()
    const databases = new Databases(client, import.meta.env.VITE_APP_APP_WRITE_DATABASE_ID)
    client
        .setEndpoint(import.meta.env.VITE_APP_APP_WRITE_ENDPOINT)
        .setProject(import.meta.env.VITE_APP_APP_WRITE_PROJECT_ID)

    return {
        client,
        databases
    }
}