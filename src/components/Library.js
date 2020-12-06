import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ libraryStatus, setSongs, setCurrentSong, songs }) => {
  return (
    <div className={`library ${libraryStatus ? "library-active" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <LibrarySong
              setCurrentSong={setCurrentSong}
              key={song.id}
              id={song.id}
              song={song}
              songs={songs}
              setSongs={setSongs}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Library;
