"use client"

import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
import FileUpload from "./components/FileUpload";
import Header from "./components/Header";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const onSuccess=(res:IKUploadResponse)=>{
    console.log("Image uploaded successfully", res)
  }
  const onProgress=(progress:number)=>{
    console.log("image is uploading",progress)
  }

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data: any = await apiClient.getVideos();
        console.log("data", data)
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos", error)
      }
    }

    fetchVideos();
  }, [])
  return (

    <div>
      <Header />
      <div>
        <FileUpload onSuccess={onSuccess} onProgress={onProgress} fileType="video"/>
      </div>
    </div >
  );
}
