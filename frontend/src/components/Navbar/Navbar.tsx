import { useState } from "react";
import styles from "./Navbar.module.css";
import { BsSearchHeart } from "react-icons/bs";
import { TbMovie } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

import Search from "../Search/Search";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.navHead}>
          <Link to={"/project2/"} className={styles.logo}>
            <TbMovie className={styles.logoIcon} />
            MovieBase
          </Link>

          <div className={styles.rightNav}>
            <Link to={"/project2/filter"} className={styles.viewAll}>
              View all films
            </Link>
            <Link
              data-testid="my-page-button"
              to={"/project2/myPage"}
              className={styles.myPageLink}
            >
              My Page
            </Link>
            <button
              id="searchButton"
              data-testid="search-icon"
              className={styles.searchButton}
              onClick={() => setOpenSearch(!openSearch)}
            >
              {!openSearch ? <BsSearchHeart /> : <IoClose />}
            </button>
          </div>
        </div>

        {openSearch && <Search setOpen={setOpenSearch} />}
      </nav>
    </>
  );
};

export default Navbar;
