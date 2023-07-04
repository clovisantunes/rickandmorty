import Characters from "@/components/CharactersCard";
import Footer from "@/components/Footer";
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

        <Footer />
      </main>
    </>
  );
}
