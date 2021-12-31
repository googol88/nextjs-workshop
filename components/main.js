import styles from '../styles/Main.module.css'

export default function Main({url, title}) {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Mars Rover Cam
        </h1>
        <p className={styles.description}>
          Pictures from the Perseverance Rover
        </p>
        {/*data.map((image, id) => (
          <img key={id} src={image.img_src} alt={image.camera.full_name} />
        ))*/}
        <img src={url} alt={title} />
      </main>

      <footer className={styles.footer}>
        {new Date().toLocaleDateString()}
      </footer>
    </div>
  )
}