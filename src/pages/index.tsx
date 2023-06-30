import { useRef } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Navbar from "./components/Header";
import hungryMorty from "../assets/mortyHungry.png";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "./components/UI/Button/index,";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const wubba = "wubba lubba dub dub";

export default function Home() {
  const [characters, setCharacters] = useState<any[]>([]);
  const { getCharacters } = useContext(AuthContext);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await getCharacters({
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
        console.log("personagens", characters);
      } catch (err) {
        console.log("Erro na requisição ", err);
      }
    }
    fetchCharacters();
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };

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
          <div className={styles.containerCharacters} ref={containerRef}>
            <Image
              src={hungryMorty}
              alt="Morty"
              className={styles.mortyHunger}
            />
            {characters.map((character) => (
              <Button key={character.id}>
                <Image
                  src={character.image}
                  alt="Imagem Personagem"
                  width={200}
                  height={300}
                  className={styles.characterImage}
                />
              </Button>
            ))}
          </div>
          <button
            className={`${styles.scrollButton} ${styles.scrollButtonLeft}`}
            onClick={scrollLeft}
          >
            <FaArrowLeft />
          </button>
          <button
            className={`${styles.scrollButton} ${styles.scrollButtonRight}`}
            onClick={scrollRight}
          >
            <FaArrowRight />
          </button>
        </div>
      </main>
    </>
  );
}
