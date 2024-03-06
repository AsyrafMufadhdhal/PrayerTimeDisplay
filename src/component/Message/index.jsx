import styles from "./Info.module.css";

const Message = () => {
  return (
    <div className="container-fluid d-flex flex-column gap-3 align-items-center justify-content-center" id={styles.infoContent}>
      <p className="m-0" id={styles.infoTitle}>
        LURUS DAN RAPATKAN SHAF
      </p>
      <p className="m-0" id={styles.infoDesc}>
        <em>PENUHKAN SHAF YANG DI DEPAN TERLEBIH DAHULU</em>
      </p>
      <br />
      <p className="m-0" id={styles.infoTitle}>
        TELEPON GENGGAM HARAP DINONAKTIFKAN / MODE HENING
      </p>
      <p className="m-0" id={styles.infoDesc}>
        <em>DEMI KEKHUSUKAN SHOLAT BERJAMAAH</em>
      </p>
    </div>
  );
};

export default Message;
