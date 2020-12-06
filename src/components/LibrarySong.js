import React from "react";

const LibrarySong = ({ setSongs, songs, setCurrentSong, song }) => {
  const songSelectHandler = () => {
    const newSongsArr = songs.map((s) => {
      if (song.id !== s.id) {
        return { ...s, active: false };
      } else {
        return { ...song, active: true };
      }
    });
    setSongs(newSongsArr);
    setCurrentSong(song);
  };
  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
