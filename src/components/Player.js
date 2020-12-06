import { React, useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  setCurrentSong,
  songs,
  currentSong,
  isPlaying,
  setIsPlaying,
  setSongs,
}) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying && audioRef.current.paused) {
      audioRef.current.play();
    }
  }, [isPlaying, currentSong]);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  useEffect(() => {
    const newSongsArr = songs.map((s) => {
      if (currentSong.id !== s.id) {
        return { ...s, active: false };
      } else {
        return { ...currentSong, active: true };
      }
    });
    setSongs(newSongsArr);
    // eslint-disable-next-line
  }, [currentSong]);

  // Events
  const skipTrackHandler = (direction) => {
    const currSongIndex = songs.findIndex((s) => {
      return s.id === currentSong.id;
    });
    let n = songs.length;
    if (direction === "skip-back") {
      setCurrentSong(songs[(((currSongIndex - 1) % n) + n) % n]);
    } else {
      setCurrentSong(songs[(((currSongIndex + 1) % n) + n) % n]);
    }
  };

  const timeUpdateHandler = (e) => {
    setSongInfo({
      ...songInfo,
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    });
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  // Calculate animation for track bar
  const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          ></input>
          <div
            className="animate-track"
            style={{ transform: `translateX(${animationPercentage}%)` }}
          ></div>
        </div>
        <p>{getTime(songInfo.duration || 0.0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={() => skipTrackHandler("skip-forward")}
      ></audio>
    </div>
  );
};

export default Player;
