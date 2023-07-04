import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import pickleRick from "../../assets/pickleRick2.png";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.items}>
        <div className={styles.text}>
          <span>
            Copyright © 2023 <span className={styles.name}>Clovis Antunes</span>{" "}
            Todos os direitos reservados.
          </span>
          <Image src={pickleRick} alt="Pickle Rick" width={65} height={65} />
        </div>
            <Image src={logo} alt="Logo RickandMorty" width={200} height={65} />
      </div>
    </footer>
  );
}
