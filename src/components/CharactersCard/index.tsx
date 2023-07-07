import { useRef } from "react";
import hungryMorty from "../../assets/mortyHungry.png";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Button } from "../UI/Button";
import { FaCircle } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Api } from "@/services/api";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import ModalCharacters from "../UI/ModalCharacters";

export default function Characters() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const api = Api();
  const [page, setPage] = useState<number>(1);
  const wubba = "wubba lubba dub dub";
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  
  function getStatusColor(status: string) {
    if (status === "Alive") {
      return "green";
    } else if (status === "Dead") {
      return "red";
    } else {
      return "grey";
    }
  }

  type getCharactersProps = {
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
  };

  type LocationProps = {
    name: string;
    url: string;
  };

  type OriginProps = {
    name: string;
    url: string;
  };

  async function getCharactersPage(
    credentials: getCharactersProps
  ): Promise<getCharactersProps[]> {
    try {
      const response = await api.get(`/character/?page=${page}`, {
        params: {
          id: credentials.id,
          name: credentials.name,
          status: credentials.status,
          species: credentials.species,
          type: credentials.type,
          gender: credentials.gender,
          origin: credentials.origin,
          location: credentials.location,
          image: credentials.image,
          episode:credentials.episode,
        },
      });
      const characters: getCharactersProps[] = response.data.results;
      return characters;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function fetchCharactersPage() {
    try {
      const response = await getCharactersPage({
        id: 0,
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
        origin: { name: "", url: "" },
        location: { name: "", url: "" },
        image: "",
        episode:"",
      });
      setCharacters(response);
    } catch (err) {
      console.log("Erro na requisição ", err);
    }
  }

  useEffect(() => {
    fetchCharactersPage();
  }, [page]);

  function handleNextPage() {
    setPage((prevPage) => prevPage + 1);
  }
  function handlePrevPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  const handleOpenModalView = (index: number) => {
    setSelectedIndex(characters[index]);
    setModalVisible(true);
  };

  Modal.setAppElement("#__next");

  return (
    <>
      <div className={styles.containerMain}>
        <div className={styles.portal} />
        <h3>{wubba}</h3>
        <h2>{wubba}</h2>
        <h1>{wubba}</h1>
        <Image src={hungryMorty} alt="Morty" className={styles.mortyHunger} />
        <div className={styles.containerCharacters}>
          <div className={styles.characterGrid}>
            <div className={styles.pages}>
              {page > 1 && <FaArrowLeft onClick={handlePrevPage} />}
              <FaArrowRight onClick={handleNextPage} />
            </div>
            {characters.slice(0, 6).map((character) => (
              <Button key={character.id} onClick={() => {
                handleOpenModalView(characters.indexOf(character));
              }}>
                <div className={styles.characterItem}>
                  <Image
                    src={character.image}
                    alt="Imagem Personagem"
                    width={200}
                    height={300}
                    className={styles.characterImage}
                  />
                  <div className={styles.characterInformation}>
                    <div className={styles.nameStatus}>
                      <span className={styles.name}>{character.name}</span>
                      <span>
                        <FaCircle color={getStatusColor(character.status)} />
                        {character.status} - {character.species}
                      </span>
                    </div>
                    <div className={styles.local}>
                      <span className={styles.local}>Última localização:</span>
                      <span className={styles.localItem}>
                        {character.location.name}
                      </span>
                    </div>
                    <div className={styles.local}>
                      <span className={styles.local}>
                        Primeira localização:
                      </span>
                      <span className={styles.localItem}>
                        {character.origin.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
      {modalVisible && (
       <ModalCharacters
       isOpen={modalVisible}
       onRequestClose={() => setModalVisible(false)}
       selectedIndex={selectedIndex}
     />
      )}
    </>
  );
}
