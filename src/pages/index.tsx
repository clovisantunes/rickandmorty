import { useRef } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Navbar from "./components/Header";
import hungryMorty from "../assets/mortyHungry.png";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "./components/UI/Button/index";
import { FaCircle } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Api } from "@/services/api";

const wubba = "wubba lubba dub dub";

export default function Home() {
  const [characters, setCharacters] = useState<any[]>([]);
  const { getCharacters } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const api = Api();
  const [page, setPage] = useState<number>(1);

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

  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <main>
        <Navbar />
        <div className={styles.containerMain}>
          <div className={styles.portal} />
          <h1>{wubba}</h1>
          <h2>{wubba}</h2>
          <h3>{wubba}</h3>
            <Image
              src={hungryMorty}
              alt="Morty"
              className={styles.mortyHunger}
            />
          <div className={styles.containerCharacters}>
            <div className={styles.characterGrid}>
              <div className={styles.pages}>
                {page > 1 && <FaArrowLeft onClick={handlePrevPage} />}
                <FaArrowRight onClick={handleNextPage} />
              </div>
              {characters.slice(0, 6).map((character) => (
                <Button key={character.id}>
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
                        <span className={styles.local}>
                          Última localização:
                        </span>
                        <span className={styles.localItem}>
                          <a href={character.location.url}>
                            {character.location.name}
                          </a>
                        </span>
                      </div>
                      <div className={styles.local}>
                        <span className={styles.local}>
                          Primeira localização:
                        </span>
                        <span className={styles.localItem}>
                          <a href={character.origin.url}>
                            {character.origin.name}
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
