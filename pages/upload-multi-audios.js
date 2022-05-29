import { useState } from "react";
import Layout from "../components/Layout";
import { postAudios } from "./api/upload";
import ReactAudioPlayer from "react-audio-player";

export default function UploadMultiAudioCheck() {
  const [audios, setAudio] = useState([]);
  const [createObjectURL, setCreateObjectURL] = useState([]);

  const uploadToClient = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];

      const list = [...audios];
      list.push({ audio: file });

      setAudio(list);
      console.log(list);

      const urlList = [...createObjectURL];
      urlList.push({ url: URL.createObjectURL(file) });

      setCreateObjectURL(urlList);
      console.log(urlList);
    }
  };

  const uploadToServer = async () => {

    const result = await postAudios(audios);
    console.log(result);
  };

  return (
    <Layout title="upload image check">
      <div>this is upload audio check screen</div>
      {createObjectURL.map((item, i) => {
          return (
            <div key={i} className="mb-5">
            <ReactAudioPlayer
                src={item.url}
                // autoPlay
                controls
            />
            </div>
          )
      })}
      {/* <audio className="flex justify-center items-center" type="audio/mp3" src={createObjectURL} /> */}
      <label
        htmlFor="file-input"
        className="bg-primary-900 text-white-900 dark:bg-dark-900 flex justify-center items-center px-4 py-2 rounded mb-6 w-full"
      >
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
      <button className="btn btn-primary" type="submit" onClick={uploadToServer} >
        Send to server
      </button>
    </Layout>
  );
}
