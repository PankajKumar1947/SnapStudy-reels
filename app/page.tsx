"use client"

import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

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
      <h1>SnapStudy</h1>
    </div>
  );
}
