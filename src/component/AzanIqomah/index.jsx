import styles from "../AzanIqomah/AzanIqomah.module.css";

const AzanIqomah = ({ title, onTime, iqomahTimer }) => {
  return (
    <div className="container h-100 w-75 d-flex flex-column gap-3 align-items-center justify-content-center" id={styles.azanIqomahContent}>
      <h1 className="m-0" id={styles.azanIqomahTitle}>
        {title}
      </h1>
      <h1 className="m-0" id={styles.azanIqomahTime}>
        {title == "A D Z A N" ? onTime : iqomahTimer}
      </h1>
    </div>
  );
};

export default AzanIqomah;
