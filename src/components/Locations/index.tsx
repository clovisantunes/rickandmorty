import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./styles.module.scss";
import { Api } from "@/services/api";
import { Button } from "../UI/Button";
import Image from "next/image";
import jerry from "../../assets/jerry.png";

type getLocationProps = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
};

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

export default function Locations() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const api = Api();
  const [locations, setLocations] = useState<getLocationProps[]>([]);
  const [residents, setResidents] = useState<getCharacterProps[]>([]);

  async function fetchLocationPage(page: number) {
    try {
      const response = await api.get("/location", {
        params: {
          page,
        },
      });
      const data = response.data.results;
      return data;
    } catch (err) {
      console.log("Error", err);
      throw err;
    }
  }

  async function fetchCurrentPage() {
    try {
      const response = await fetchLocationPage(currentPage);
      setLocations(response);
    } catch (err) {
      console.log("Error", err);
    }
  }

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
    fetchCurrentPage();
  }, [currentPage]);

  useEffect(() => {
    const residentUrls = locations.reduce<string[]>(
      (acc, location) => [...acc, ...location.residents],
      []
    );
    fetchCharacters(residentUrls);
  }, [locations]);

  function handleNextPage() {
    if (currentPage < 7) setCurrentPage((prevPage) => prevPage + 1);
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  return (
    <>
      <div className={styles.location}>
        <Image className={styles.jerry} src={jerry} alt="Jerry" />
        <div className={styles.containerLocation}>
          <div className={styles.locationGrid}>
            <div className={styles.pages}>
              {currentPage > 1 && <FaArrowLeft onClick={handlePrevPage} />}
              {currentPage < 7 && <FaArrowRight onClick={handleNextPage} />}
            </div>
            {locations && locations.length > 0 ? (
              locations.map((location) => (
                <Button type="button" key={location.id}>
                  <div className={styles.buttonContainer}>
                    <div className={styles.textTypes}>
                      <h1>Local: {location.name}</h1>
                      <span className={styles.spanType}>
                        Tipo:{" "}
                        <span className={styles.spanTypeItem}>
                          {location.type}
                        </span>
                      </span>
                      <span className={styles.dimension}>
                        Dimensão: {location.dimension}
                      </span>
                    </div>
                    <div className={styles.characters}>
                      {location.residents.length > 0 ? (
                        residents
                          .filter((resident) =>
                            location.residents.includes(resident.url)
                          )
                          .slice(0, 10)
                          .map((resident) => (
                            <div key={resident.id}>
                              <Image
                                src={resident.image}
                                alt={resident.name}
                                width={55}
                                height={55}
                              />
                              <span>{resident.name}</span>
                            </div>
                          ))
                      ) : (
                        <p>Vazio...</p>
                      )}
                    </div>
                  </div>
                </Button>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
