import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home({ data }) {
  const [image, setImage] = useState(data["latest_photos"][0]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Mars Rover Cam</title>
        <meta name="description" content="Pictures from the Perseverance Rover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Mars Rover Cam
        </h1>
        <p className={styles.description}>
          Pictures from the Perseverance Rover
        </p>
        <img src={image["img_src"]} alt="Navcam" />
      </main>

      <footer className={styles.footer}>
        {new Date().toLocaleDateString()}
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  let data = await fetch(
	`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=${process.env.KEY}&camera=navcam_left`
  ).then((r) => r.json());
  return { props: { data }, revalidate: 30 };
}