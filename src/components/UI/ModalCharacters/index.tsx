import React from "react";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import Image from "next/image";

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

  if (!selectedIndex) {
    return null;
  }

  const { id, name, status, species, type, origin, gender, location, image } =
    selectedIndex;
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className={styles.containerModal}>

        <div className={styles.containerCharacters}>
          <div className={styles.imgToken}>
            <Image
              src={image}
              alt="Imagem do personagem"
              width={300}
              height={250}
            />
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
          <div className={styles.eps}>
            {}
          </div>
        </div>
      </div>
    </Modal>
  );
}
