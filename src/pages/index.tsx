import Characters from "@/components/CharactersCard";
import Navbar from "@/components/Header";
import Locations from "@/components/Locations";
import Head from "next/head";


export default function Home() {
  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <main>
        <Navbar />
        <Characters />
        <Locations />
      </main>
    </>
  );
}
