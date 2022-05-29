import { useState } from "react";
import Layout from '../components/Layout';
import { postAudio } from "./api/upload";
import ReactAudioPlayer from "react-audio-player";


export default function UploadAudioCheck() {
    const [audio, setAudio] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];

        setAudio(i);
        setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const uploadToServer = async () => {

        const result = await postAudio(audio);
        console.log(result);
    };

    return (
        <Layout title="upload image check">
            <div className="mb-4">this is upload audio screen</div>
            {createObjectURL !== null  &&
                <ReactAudioPlayer
                    src={createObjectURL}
                    // autoPlay
                    controls
                />
            }
            {/* {createObjectURL !== null  &&
                <audio className="flex justify-center items-center" type="audio/*" src={createObjectURL} controls />
            } */}
            <label htmlFor="file-input" className="bg-primary-900 text-white-900 dark:bg-dark-900 flex justify-center items-center px-4 py-2 rounded mb-6 w-full" >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 hover:cursor-pointer hover:bg-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
            </svg>
            </label>
            <input id="file-input" className="hidden" type="file" accept="audio/*" name="myAudio" onChange={uploadToClient} />
            <button className="btn btn-primary" type="submit" onClick={uploadToServer}>
                Send to server
            </button>
        </Layout>
    );

}