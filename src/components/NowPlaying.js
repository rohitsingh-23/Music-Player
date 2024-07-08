import React, { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaBackward,
  FaForward,
  FaUser,
} from "react-icons/fa";
import { IoIosRepeat, IoIosShuffle } from "react-icons/io";
import data from "../data.json";
import "./NowPlaying.css";

const NowPlaying = ({ nowPlaying, setNowPlaying, handlePrev, handleNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    setIsPlaying(false);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      setIsPlaying(false);
    };
  }, [nowPlaying]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current.currentTime == audioRef.current.duration) {
      setIsPlaying(false);
    }
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds}`;
  };

  const getCurrentTimeBackgroundSize = () => {
    return {
      background: `linear-gradient(to right, #d60017 ${
        (currentTime / duration) * 100
      }%, #ddd ${(currentTime / duration) * 100}%)`,
    };
  };

  const getBackgroundSize = () => {
    return {
      background: `linear-gradient(to right, #333 ${volume * 100}%, #ddd ${
        volume * 100
      }%)`,
    };
  };

  return (
    <div className="flex flex-col justify-end play-now-container">
      <div className="bg-[#6b0000] text-white p-4 rounded-lg  w-[55%] m-[10px] shadow-lg play-now-card">
        <h2 className="text-[14px] mb-2 text-center">Now Playing</h2>
        <img
          src={`/images/${nowPlaying.img}`}
          alt="Now Playing"
          className="w-70 object-cover rounded mb-4 aspect-video"
        />
        <div className="text-center">
          <h3 className="text-l font-medium">{nowPlaying.title}</h3>
          <p className="text-[#ccc] text-[12px]">{nowPlaying.artist}</p>
        </div>
        <div className="flex justify-between  align-middle mt-1">
          <span className="w-10 text-[12px]">{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleTimeChange}
            className="player slider"
          />
          <span className="w-10 text-[12px]"> {formatTime(duration)}</span>
        </div>
        <div className="flex justify-between items-center mt-1 text-2xl">
          <IoIosShuffle className="shuffle control-icon text-[13px]" />
          <FaBackward
            onClick={handlePrev}
            className="previous control-icon  text-[14px] cursor-pointer"
          />
          {isPlaying ? (
            <FaPause
              className="pause control-icon text-[16px] cursor-pointer"
              onClick={togglePlayPause}
            />
          ) : (
            <FaPlay
              className="play control-icon text-[16px] cursor-pointer"
              onClick={togglePlayPause}
            />
          )}
          <FaForward
            onClick={handleNext}
            className="next control-icon  text-[15px] cursor-pointer"
          />
          <IoIosRepeat className="repeat control-icon  text-[13px]" />
        </div>
        <audio ref={audioRef} src={`/songs/${nowPlaying.song}`}></audio>
      </div>
    </div>
  );
};

export default NowPlaying;
