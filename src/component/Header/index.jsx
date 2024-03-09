import mosqueDark from "../../assets/pic/mosque.png";
import Clock from "../Clock";
import styles from "../Header/Header.module.css";

const Header = () => {
  return (
    <article className="container-fluid px-5 py-0 m-0">
      <div className="row px-5 py-0">
        <div className="col-auto p-0 flex-grow-1 d-flex gap-2 align-items-center text-white">
          <img src={mosqueDark} className="img-fluid p-1" style={{ width: 65 }} alt="Mosque" />
          <div>
            <p className="fw-bold m-0 " id={styles.mosqueName}>
              INTERACTIVE PRAYER TIME DISPLAY
            </p>
            <p className="fw-semibold m-0 " id={styles.mosqueAddress}>
              Bukittinggi
            </p>
          </div>
        </div>
        {/* DISPLAY REAL TIME CLOCK */}
        <div className="col-3 p-0 text-center align-self-center">
          <p className="fw-bold p-0 m-0" id={styles.time}>
            <Clock />
          </p>
        </div>
        <div className="col-auto p-0 text-center align-self-center" id={styles.timeArea}>
          <p className="m-0 fw-medium" id={styles.local}>
            {" "}
            WIB
          </p>
        </div>
      </div>
    </article>
  );
};

export default Header;
