import useAxiosPrivate from "@hooks/useAxiosPrivate";
import { Occupancy } from "types";

const OccupancyService = () => {
  // const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate();

  const getOccupancies = async (
    search: string,
    dateFrom?: Date,
    dateTo?: Date,
  ) => {
    return await new Promise<Occupancy[]>((resolve, reject) => {
      const filter =
        dateFrom && dateTo
          ? `search=${search}&date_from=${dateFrom}$date_to=${dateTo}`
          : `search=${search}`;
      axios
        .get(`occupancies?${filter}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.error("Error: ", err);
          reject([]);
        });
    });
  };
  return {
    getOccupancies,
  };
};

export default OccupancyService;
