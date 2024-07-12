import { useQuery, QueryFunction } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SearchBox } from "./SearchBox";
import { fetchApi } from "./api";

type Props<T> = {
  url: string;
  queryKeyName: string;
  placeholderName: string;
  searchByName: keyof T;
  setState: Function;
  state: T | string | any;
};

export const FetchData = <T extends string | number | object>({
  url,
  queryKeyName,
  placeholderName,
  searchByName,
  setState,
  state,
}: Props<T>) => {
  const [page, setPage] = useState<number>(1);
  const [reverse, setReverse] = useState<"true" | "false">("false");
  const [perpage, setPerpage] = useState<number>(10);
  const [firstName, setFirstName] = useState<string>("");
  const { data, error, isLoading, refetch }: any = useQuery({
    queryKey: [queryKeyName],
    queryFn: () =>
      fetchApi(
        `${url}?reverse=${reverse}&page=${page}&perpage=${perpage}&firstName=${firstName}`
      ),
  });
  useEffect(() => {
    refetch();
  }, [firstName]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  const handleClick = () => {
    refetch();
  };
  const optionsData = data ?? [];

  return (
    <div>
      {state && state[searchByName]}
      <SearchBox<T>
        options={optionsData}
        value={state ?? undefined}
        onChange={(option) => setState(option)}
        searchBy={searchByName}
        placeholder={placeholderName}
        handleClick={handleClick}
        setSearch={setFirstName}
        searchValue={firstName}
      />
    </div>
  );
};
