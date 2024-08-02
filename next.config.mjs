/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['headless.mapztour.de'],
    },
    env: {
        VITE_STRAPI_API_URL: 'http://localhost:1337',
        VITE_STRAPI_API_KEY: 'e7507a1e52eee31759033b3a3b9e6c51a6be94d5dc2bfe208b27f1c2100cf475c4f534fdad57ae4ecc60a9feae9ed49a4d12a8309cf56a5ba59d1b4c39540425f89d4cb3ce7302cc4994179163ae37dfb8e2a6279a8341203901bc63536e972f8e2a53dad756e71e7b11b442568df756bce8a53da3a22b1602df0909d96c117a',
    },
};

export default nextConfig;
