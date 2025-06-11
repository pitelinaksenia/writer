import {S3Client} from "@aws-sdk/client-s3";


console.log('VITE_AWS_ACCESS_KEY_ID:', import.meta.env.VITE_AWS_ACCESS_KEY_ID);
console.log('VITE_AWS_SECRET_ACCESS_KEY:', import.meta.env.VITE_AWS_SECRET_ACCESS_KEY);
console.log('VITE_AWS_REGION:', import.meta.env.VITE_AWS_REGION);
console.log('VITE_AWS_ENDPOINT:', import.meta.env.VITE_AWS_ENDPOINT);

const s3 = new S3Client({
	credentials: {
		accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
		secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
	},
	region: import.meta.env.VITE_AWS_REGION,
	endpoint: import.meta.env.VITE_AWS_ENDPOINT,
	forcePathStyle: false, // Для S3-совместимых хранилищ, таких как Cloud.ru
});

const coverBucket = import.meta.env.VITE_AWS_COVER_BUCKET;
const bookBucket = import.meta.env.VITE_AWS_BOOK_BUCKET;

export {s3, coverBucket, bookBucket};

