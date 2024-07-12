import { useState } from "react";
import { fetchPerson } from "./api";
import { IPerson } from "./interfaces/personInterface";
import { FetchData } from "./FetchData";
type Props = {};

export const PersonData = ({}: Props) => {
  const [persons, setPersons] = useState<IPerson | null>(null);
  const [page,setPage] = useState<number>(0);
  return (
    <div>
      <FetchData<IPerson>
        url={'person'}
        queryKeyName={"person"}
        placeholderName={"choose name"}
        searchByName={"firstName"}
        setState={setPersons}
        state={persons}
      />
    </div>
  );
};
