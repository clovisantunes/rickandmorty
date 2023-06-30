
import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import Navbar from './components/Header'
import hungryMorty from '../assets/mortyHungry.png';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
const wubba = "wubba lubba dub dub";



export default function Home() {


  const [characters, setCharacters ] = useState<any[]>([])
  const { getCharacters } = useContext(AuthContext);

  useEffect(() => {
    async function fetchCharacters(){
      try{
        const response = await getCharacters({
          id: 0,
          name: "",
          status: "",
          species: "",
          type: "",
          gender: "",
          origin:{ name: "", url: "" },
          location: {name: "", url: ""},
          image: ""
        });
        setCharacters(response)
        console.log(response)
      } catch(err){
        console.log("Erro na requisição ",err)
      }
    }
    fetchCharacters();
  }, []);


  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <main>
        <Navbar />
        <div className={styles.containerMain}>
          <div className={styles.portal}/>
          <h1>{wubba}</h1>
          <h2>{wubba}</h2>
          <h3>{wubba}</h3>
          <div className={styles.containerCharacters}>
              <Image src={hungryMorty} alt='Morty'/>

          </div>

        </div>
      </main>
    </>
  )
}
