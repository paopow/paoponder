import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>

      <Image
          src="/paoponder.com/pao-laptop.png"
          alt="Pao with a laptop"
          width={200}
          height={200}
        />
      </div>
      <div>Paoponder is coming soon...</div>

    </main>
  );
}
