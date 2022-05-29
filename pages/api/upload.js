import { storage } from "../../helpers/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


//single image file upload
export const postImage = async(image=null) => { 
    let uploadResult = '';

    if(image){
        const storageRef = ref(storage);
        const ext = image.name.split('.').pop();
        const hashName = Math.random().toString(36).slice(-8);
        const fullPath = '/images/' + hashName + '.' + ext;
        const uploadRef = ref(storageRef, fullPath);

        // 'file' comes from the Blob or File API
        await uploadBytes(uploadRef, image).then(async function(result) {
            console.log(result);
            console.log('Uploaded a blob or file!');

            await getDownloadURL(uploadRef).then(function(url){
                uploadResult = url;
            });
        });
    }
    return uploadResult;
}

//multi image files upload
export const postImages = async(images=null) => {
    let uploadResult = '';
    let imageUrlList = [];

    if(images.length!=0){
        for (let index = 0; index < images.length; index++) {   
            const image = images[index];
            const file = image.image;
            console.log('image', image);
            console.log('file', file);
            console.log('file.name',file.name);

            if(file.name){
                const storageRef = ref(storage);
                const ext = file.name.split('.').pop();
                const hashName = Math.random().toString(36).slice(-8);
                const fullPath = '/images/' + hashName + '.' + ext;
                const uploadRef = ref(storageRef, fullPath);
        
                // 'file' comes from the Blob or File API
                await uploadBytes(uploadRef, file).then(async function(result) {
                    console.log(result);
                    console.log('Uploaded a image file!');
        
                    await getDownloadURL(uploadRef).then(function(url){
                        uploadResult = url;
                        console.log(uploadResult);
                        imageUrlList.push(uploadResult);
                    });
                });
            }
        }
    }
    return imageUrlList;
}


//single audio file upload
export const postAudio = async(audio='') => {
    let uploadAudioResult = '';

    if(audio.name){
        const storageRef = ref(storage);
        const ext = audio.name.split('.').pop();
        const hashName = Math.random().toString(36).slice(-8);
        const fullPath = '/audios/' + hashName + '.' + ext;
        const uploadRef = ref(storageRef, fullPath);

        // 'file' comes from the Blob or File API
        await uploadBytes(uploadRef, audio).then(async function(result) {
            console.log(result);
            console.log('Uploaded a blob or file!');

            await getDownloadURL(uploadRef).then(function(url){
                uploadAudioResult = url;
            });
        });
    }
    return uploadAudioResult;
}