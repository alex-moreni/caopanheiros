import { Link } from "react-router-dom"

import styles from "./Navbar.module.css"

import Logo from "../../assets/images/logo.png"

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Logo Cãopanheiros" />
        <h2><Link to="/">Cãopanheiros</Link></h2>
      </div>
      <ul>
        <li><Link to="/login">Entrar</Link></li>
        <li><Link to="/register">Cadastrar</Link></li>
      </ul>
    </nav>
  )
}