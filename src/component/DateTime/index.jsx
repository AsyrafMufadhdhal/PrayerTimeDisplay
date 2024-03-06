import { formatDate } from "../../utils/DateTime";
import { useContext } from "react";
import { FinishContext, NextContext } from "../../utils/getContext";

import styles from "../DateTime/DateTime.module.css";
import Countdown from "../Countdown";

const DateTime = ({ date }) => {
  const { next, setNext } = useContext(NextContext);
  const { isFinished, setIsFinished } = useContext(FinishContext);

  let now = String(Object.keys(next));

  return (
    <div className="row px-5">
      <div className="col-auto fs-5 flex-grow-1 align-self-center fw-semibold text-start text-white">{formatDate(date)}</div>

      <div className={`col-auto rounded-start-pill px-4 d-flex align-items-center ${isFinished && "d-none"} `} id={styles.nextName}>
        <p className="fw-semibold m-0 rounded-pill ">
          Menuju Waktu <span id={styles.nextTitle}> {now == "terbit" ? (now = "syuruq") : now}</span>
        </p>
      </div>
      <div className={`col-3 text-center p-0 rounded-end-pill ${isFinished && "d-none"}`} id={styles.nextTime}>
        <p className="fw-bold m-0 rounded-pill" id={styles.nextTimeContent}>
          <Countdown />
        </p>
      </div>
    </div>
  );
};

export default DateTime;
