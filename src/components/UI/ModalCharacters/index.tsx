import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import meseeks from '../../../assets/messeks.png';
import axios, { AxiosError } from 'axios';
import Rick from '../../../assets/rick.png';


interface ModalCharactersProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedIndex: {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: OriginProps;
    location: LocationProps;
    image: string;
    episode: string;
  } | null;
}
type LocationProps = {
  name: string;
  url: string;
};

type OriginProps = {
  name: string;
  url: string;
};

export default function ModalCharacters({
  isOpen,
  onRequestClose,
  selectedIndex,
}: ModalCharactersProps) {
  const customStyles = {
    content: {
      top: "15%",
      bottom: "auto",
      left: "15%",
      right: "auto",
      padding: "30px",
      backgroundColor: "#151515",
      width: "70%",
      zIndex: "11",
      height: "80%",
    },
  };
  const [selectedEpisode, setSelectedEpisode] = useState<any[]>([]);
  


  if (!selectedIndex) {
    return null;
  }

  const { id, name, status, species, type, origin, gender, location, image, episode } =
    selectedIndex;



  interface EpisodeProps {
    id: number;
    name: string;
    air_date: string;
    episode: string;
  }
  async function getEpisode(credentials: EpisodeProps): Promise<EpisodeProps[]> {
    if (!selectedIndex || !selectedIndex.episode) {
      return [];
    }
    const episodeList = Array.isArray(selectedIndex.episode) ? selectedIndex.episode : [selectedIndex.episode];
    const episodePromises = episodeList.map(async (episodeUrl: string) => {
      try {
        const response = await axios.get(episodeUrl);
        const episodeData: EpisodeProps = {
          id: response.data.id,
          name: response.data.name,
          air_date: response.data.air_date,
          episode: response.data.episode
        };
        return episodeData;
      } catch (err) {
        console.log(err);
        throw err;
      }
    });

    try {
      const episodeResults = await Promise.all(episodePromises);
      return episodeResults;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }



  async function fetchEpisode() {
    try {
      const response = await getEpisode({
        id: 0,
        name: "",
        air_date: "",
        episode: ""
      });
      setSelectedEpisode(response)

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchEpisode();
  }, [])


  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className={styles.containerModal}>
        <FiX onClick={onRequestClose} />
        <div>
        <div className={styles.containerCharacters}>
          <div className={styles.imgToken}>
            <Image
              src={image}
              alt="Imagem do personagem"
              width={300}
              height={250}
            />
            <Image src={Rick} alt="Rick" width={200} height={150} className={styles.rick} />
          </div>
          <div className={styles.token}>
            <span>
              Nome:
              <h2>{name}</h2>
            </span>
            <span>
              Genero:
              <h2>{gender}</h2>{" "}
            </span>
            <span>
              Estado: <h2> {status}</h2>{" "}
            </span>
            <span>
              Espécie: <h2> {species}</h2>{" "}
            </span>
            <span>
              Local de origem: <h2> {origin.name}</h2>{" "}
            </span>
            <span>
              Ultima localização: <h2> {location.name}</h2>{" "}
            </span>
          </div>
          <div className={styles.meseeks}>
            <Image src={meseeks} alt="Mrs'Meseeks" />
          </div>
        </div>
        <div className={styles.eps}>
          <span>Selecione um episodio para ver as informações:</span>
          <select>
            {selectedEpisode.map((episode) => (
              <option key={episode.id}>{episode.episode} {episode.name} {episode.air_date} </option>
            ))}
          </select>
        </div>
      </div>
      </div>
    </Modal>
  );
}
