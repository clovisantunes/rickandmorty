import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./styles.module.scss";
import { Api } from "@/services/api";
import { Button } from "../UI/Button";

type getLocationProps = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string;
  url: string;
  created: string;
};

export default function Locations() {
  const [currentLocation, setCurrentLocation] = useState<number[]>([1, 2, 3]);
  const api = Api();
  const [location, setLocation] = useState<getLocationProps[]>([]);

  async function getLocationPage(
    credentials: getLocationProps
  ): Promise<getLocationProps[]> {
    try {
      const response = await api.get(`/location/${currentLocation}`, {
        params: {
          id: credentials.id,
          name: credentials.name,
          type: credentials.type,
          dimension: credentials.dimension,
          residents: credentials.residents,
          url: credentials.url,
          created: credentials.created,
        },
      });
      const data = response.data;
      return data;
    } catch (err) {
      console.log("Erro", err);
      throw err;
    }
  }

  async function fetchLocationPage() {
    try {
      const response = await getLocationPage({
        id: 0,
        name: "",
        type: "",
        dimension: "",
        residents: "",
        url: "",
        created: "",
      });
      setLocation(response);
    } catch (err) {
      console.log("Erro", err);
    }
  }

  useEffect(() => {
    fetchLocationPage();
  }, []);

  return (
    <>
      <div className={styles.containerLocation}>
        <div className={styles.locationGrid}>
          {location && location.length > 0 ? (
            location.map((location) => (
                <Button type="button">
                       <h1>{location.name}</h1>
                </Button>

            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
