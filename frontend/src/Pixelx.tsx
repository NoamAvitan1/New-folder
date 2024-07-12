import { useEffect, useState } from "react";
import { IAlbum } from "./interfaces/albumInterface";
import { IPhotos } from "./interfaces/photosInterface";

type Props = {};

export const Pixelx = (props: Props) => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [photos, setPhoto] = useState<IPhotos[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number>();
  const [currentPhoto, setCurrentPhoto] = useState<number>(0);

  const getPhotos = async (albumId: number) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    );
    const data = await res.json();
    setPhoto(data);
    setSelectedAlbumId(albumId);
    setCurrentPhoto(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      setCurrentPhoto((prev) => {
        if (prev + 1 < photos.length) return prev + 1;
        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedAlbumId,photos.length]);

  useEffect(() => {
    const getAlbums = async () => {
      const res = await fetch(" https://jsonplaceholder.typicode.com/albums");
      const data = await res.json();
      setAlbums(data);
    };
    getAlbums();
  }, []);
  return (
    <div>
      {albums?.map((album, i) => (
        <div onClick={() => getPhotos(album.id)} key={i}>
          {album.title}
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
              src={photos[currentPhoto].url}
              alt=""
            />
          )}
        </div>
      ))}
    </div>
  );
};
// https://jsonplaceholder.typicode.com/albums

// https://jsonplaceholder.typicode.com/photos?albumId=${albumId}
