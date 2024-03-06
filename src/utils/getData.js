import axios from "axios";

const PRAYER_TIME_API_URL = "https://api.myquran.com/v2/sholat/jadwal/0313/";

export const getData = async ({ year, month }) => {
  try {
    const dataURL = `${PRAYER_TIME_API_URL}${year}/${month}`;

    const res = await axios.get(dataURL);

    if (res.status === 200) {
      const resData = {
        ...res.data.data,
      };
      return resData;
    }
  } catch (error) {
    alert("Tidak Dapat Menemukan data", error);
  }
};
