import "./App.css";
import Header from "./component/Header";
import Content from "./component/Content";

import { FinishContext, NextContext } from "./utils/getContext";
import { useEffect, useState } from "react";
import { getData } from "./utils/getData";
import Container from "./component/Container";
import DateTime from "./component/DateTime";

function App() {
  const [prayerTimeList, setPrayerTimeList] = useState([]);
  const [next, setNext] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  let date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() - 1;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData({ year, month });
      if (!res) {
        console.log("Data Tidak Ditemukan");
      }

      setPrayerTimeList(res.jadwal[day]);
    };

    fetchData();
  }, [day]);

  return (
    <>
      <Header />
      <NextContext.Provider value={{ next, setNext }}>
        <FinishContext.Provider value={{ isFinished, setIsFinished }}>
          {Object.keys(prayerTimeList).length > 0 && <Content date={date} prayerTimeList={prayerTimeList} />}
          <Container>
            <DateTime date={date} />
          </Container>
        </FinishContext.Provider>
      </NextContext.Provider>
    </>
  );
}

export default App;
