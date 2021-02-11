import Head from 'next/head'
import styles from '../styles/Home.module.css'

const { NEXT_PUBLIC_FACEBOOK_APP_ID } = process.env;

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Colmena factory</h1>
    </div>
  )
}
