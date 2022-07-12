import styles from "../../styles/Header.module.css";
import { Navbar } from "react-bootstrap";
import LoginSession from "../LoginSession";

const logo = "/cz2030_logo.png";

const AdminHeader = () => {
  return (
    <header className="header">
      <Navbar className={styles.navbar} bg="white" expand="xxl" fixed="top">
        <div className="container-lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand style={{ width: "250px" }}>
            <img
              className={styles.img}
              src={logo}
              srcSet={logo}
              alt="Zero Carbon 2030 logo"
            />
          </Navbar.Brand>
          <LoginSession />
        </div>
      </Navbar>
    </header>
  );
};

export default AdminHeader;
