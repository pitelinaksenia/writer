import {S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";


console.log('VITE_AWS_ACCESS_KEY_ID:', import.meta.env.VITE_AWS_ACCESS_KEY_ID);
console.log('VITE_AWS_SECRET_ACCESS_KEY:', import.meta.env.VITE_AWS_SECRET_ACCESS_KEY);
console.log('VITE_AWS_REGION:', import.meta.env.VITE_AWS_REGION);
console.log('VITE_AWS_ENDPOINT:', import.meta.env.VITE_AWS_ENDPOINT);

const s3: S3Client = new S3Client({
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
    region: import.meta.env.VITE_AWS_REGION,
    endpoint: import.meta.env.VITE_AWS_ENDPOINT,
    forcePathStyle: false, // Для S3-совместимых хранилищ, таких как Cloud.ru
});

const coverBucket: string = import.meta.env.VITE_AWS_COVER_BUCKET;
const bookBucket: string = import.meta.env.VITE_AWS_BOOK_BUCKET;

export async function addFileToStorage(file: File | null, bucketName: string, filePath: string) {

    if (!file || !(file instanceof File)) {
        return false;
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: filePath,
        Body: uint8Array,
        ContentType: file.type
    });

    try {
        await s3.send(command);
        console.log('Файл успешно загружен');
        return true;
    } catch (error) {
        console.error('Ошибка загрузки файла:', error);
        return false;
    }
}


export async function getFileURL(imageKey: string, bucketName: string): Promise<string> {
    if (!imageKey) return '';
    const params = {
        Bucket: bucketName,
        Key: imageKey,
    };

    try {
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3, command, {expiresIn: 36000});
        console.log(url)// URL действителен 1 час
        return url;
    } catch (err) {
        console.error("Ошибка получения URL:", err);
        return '';
    }
}

export async function deleteFileFromStorage(bucketName: string, filePath: string) {
    if (!filePath) {
        console.log('Delete file with filePath: null ignored');
        return false;
    }

    try {
        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: filePath
        });
        await s3.send(command);
        console.log(`Файл ${filePath} удален из бакета ${bucketName}`);
        return true;
    } catch (error) {
        console.error(`Ошибка удаления файла ${filePath}:`, error);
        return false;
    }
}

export {s3, coverBucket, bookBucket};



