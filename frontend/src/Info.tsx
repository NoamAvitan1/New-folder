import { useEffect, useState } from "react";
import { IAlbum } from "./interfaces/albumInterface";
import { IPhotos } from "./interfaces/photosInterface";

type Props = {};

export const Info = (props: Props) => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [photos, setPhotos] = useState<IPhotos[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number>();
  const [displayingImage, setDisplayingImage] = useState<number>(0);

  const getPhotos = async (albumId: number) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    );
    const data = await res.json();
    setPhotos(data);
    setSelectedAlbumId(albumId);
    setDisplayingImage(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (selectedAlbumId !== undefined) {
      interval = setInterval(() => {
        setDisplayingImage((prev) => {
          if (prev + 1 >= photos.length) return 0;
          return prev + 1;
        });
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [selectedAlbumId, photos.length]);

  useEffect(() => {
    const getAlbums = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/albums");
      const data = await res.json();
      setAlbums(data);
    };
    getAlbums();
  }, []);
  
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "10px",
      }}
    >
      {albums.map((album, i) => (
        <div
          style={{
            width: "100%",
            aspectRatio: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid gray",
            position: "relative",
          }}
          key={i}
        >
          <button onClick={() => getPhotos(album.id)}>{album.id}</button>
          {selectedAlbumId === album.id && (
            <img
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: "0px",
                right: "0px",
                top: "0px",
                bottom: "0px",
              }}
              src={photos[displayingImage].url}
              alt=""
            />
          )}
        </div>
      ))}
    </div>
  );
};
