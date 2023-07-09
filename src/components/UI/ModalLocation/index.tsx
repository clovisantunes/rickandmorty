import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import { Api } from "@/services/api";
import { create } from "domain";
import ModalCharacters from "../ModalCharacters";

interface ModalLocationProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedIndex: {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
  } | null;
}
type getCharacterProps = {
  id: number;
  name: string;
  species: string;
  gender: string;
  status: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export default function ModalLocation({
  isOpen,
  onRequestClose,
  selectedIndex,
}: ModalLocationProps) {
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
  const api = Api();
  const { id, name, type, dimension } = selectedIndex;
  const [residents, setResidents] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);




  async function fetchCharacters(residentUrls: string[]) {
    try {
      const charactersData = await Promise.all(
        residentUrls.map((url) =>
          api.get(url).then((response) => response.data)
        )
      );
      setResidents(charactersData);
    } catch (err) {
      console.log("Error", err);
    }
  }

  useEffect(() => {
    if (selectedIndex) {
      const residentUrls = selectedIndex.residents;
      fetchCharacters(residentUrls);
    }
  }, [selectedIndex]);


  const handleOpenModalView = (index: number) => {
    setSelectedCharacter(residents[index]);
    setModalVisible(true);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className={styles.containerModal}>
        <FiX onClick={onRequestClose} />
        <div className={styles.containerLocation}>
          <h1>{name}</h1>
          <span>
            {type}-{dimension}
          </span>
          <div className={styles.charactersContainer}>
            {residents.length > 0 ? (
              residents.map((characters) => (
                <div key={characters.id}>
                  <Image
                    src={characters.image}
                    alt={characters.name}
                    width={100}
                    height={100}
                    onClick={() => {
                      handleOpenModalView(residents.indexOf(characters));
                    }}
                  />
                  <span>{characters.name}</span>
                </div>
              ))
            ) : (
              <p>Vazio...</p>
            )}
          </div>
        </div>
      </div>
      {modalVisible && (
        <ModalCharacters
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        selectedCharacter={selectedCharacter}
      />
       )}
    </Modal>

  );
}
