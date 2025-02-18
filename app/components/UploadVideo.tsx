import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { apiClient } from "@/lib/api-client";

interface VideoData {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
}
const UploadVideo = () => {
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState("");
    const [videoData, setVideoData] = useState<VideoData>({
        title: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setVideoData({ ...videoData, [name]: value });
        setError("");
    }

    const createReel = async () => {
        if (!videoData.title || !videoData.description) {
            setError("Please fill all the fields");
            return
        } else if (!videoData.videoUrl || !videoData.thumbnailUrl) {
            setError("Please upload video");
            return
        }
        setLoading(true);
        setError("");
        try {
            apiClient.createVideo(videoData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleUploadSuccess = (response: IKUploadResponse) => {
        setVideoData((prev) => ({ ...prev, videoUrl: response.filePath, thumbnailUrl: response.thumbnailUrl || response.filePath }));
        setError("");
    };

    const handleUploadProgress = (progress: number) => {
        setError("");
        setUploadProgress(progress);
    };


    return (
        <div className="space-y-4 w-[600px] mx-auto border p-6 rounded-xl mt-20">
            <div className="w-full">
                <label className="form-control w-full">Enter Title  ?</label>
                <input value={videoData.title} onChange={handleChange} name="title" type="text" placeholder="Type here" className="input input-bordered w-full" />
            </div>
            <div className="w-full">
                <label className="form-control w-full">Enter Description</label>
                <textarea name="description" value={videoData.description} onChange={handleChange} className="textarea  w-full" placeholder="Bio"></textarea>
            </div>
            <div>
                <label className="form-control w-full">Upload Video</label>
                <FileUpload onSuccess={handleUploadSuccess} onProgress={handleUploadProgress} fileType="video" />
                {uploadProgress > 0 && (
                    <div className="w-full bg-indigo-200 rounded-full h-2.5 mt-2">
                        <div
                            className="bg-primary h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                )}
                {
                    error && (
                        <div role="alert" className="alert alert-warning mt-4 text-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>Warning: {error}</span>
                        </div>
                    )
                }
            </div>
            <div className="flex justify-center">
                <button onClick={createReel} className="btn btn-outline btn-primary">Create Reel</button>
            </div>
        </div>
    )
}

export default UploadVideo