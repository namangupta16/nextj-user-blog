import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Users from './Users'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Blog App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to My Blog App
        </h1>

        <Users />
      </main>

      <footer className={styles.footer}>
        Powered by Next.js
      </footer>
    </div>
  )
}
