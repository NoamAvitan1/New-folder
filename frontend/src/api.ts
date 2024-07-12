import { IPerson } from "./interfaces/personInterface";

const api = "http://localhost:3000";

export const fetchPerson = async (
  page: number = 1,
  perpage: number = 10,
  reverse: string = "false",
  firstName: string = ""
) => {
  const res = await fetch(`${api}/person?reverse=${reverse}&page=${page}&perpage=${perpage}&firstName=${firstName}`);
  const data = await res.json();
  return data as IPerson[];
};

export const fetchApi = async ( url: string ) => {
  const res = await fetch(`${api}/${url}`);
  const data = await res.json();
  return data as IPerson[];
}
