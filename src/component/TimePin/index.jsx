import styles from "../../component/TimePin/TimePin.module.css";

const TimePin = ({ next, prayerTimes }) => {
  return (
    <div className="row px-5 d-flex justify-content-evenly column-gap-5 row-gap-5">
      {prayerTimes.map((prayerTime, index) => {
        let title = String(Object.keys(prayerTime));
        return (
          <div className="col-auto p-0" key={index}>
            <div className={`d-flex rounded-circle ${title == next ? styles.next : ""}`} id={styles.timePin}>
              <div className="align-self-center text-center mx-auto">
                <h2 className="mb-2" id={styles.title}>
                  {title == "terbit" ? title.replace("terbit", "syuruq") : title}
                </h2>
                <h1 className="m-0" id={styles.schedule}>
                  {prayerTime[title]}
                </h1>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimePin;
