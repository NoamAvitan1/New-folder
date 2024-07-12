import { useEffect, useState } from "react";

type Props = {};

interface ICountry {
  common: string;
  img: string;
  population: string;
  region: string;
}

export const Countries = ({}: Props) => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase().trim());
  };

  const filterdCountries = countries.filter((country) => {
    return country.common.toLowerCase().includes(searchTerm);
  });
  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      const array: any = [];
      data.forEach((country: any) => {
        array.push({
          common: country.name.common,
          img: country.flags.png,
          population: country.population,
          region: country.region,
        });
      });
      setCountries(array);
    };
    getCountries();
  }, []);

  return (
    <div>
      <input onChange={(e) => handleChange(e)} type="text" />
      {filterdCountries.map((country, i) => (
        <div key={i}>
          {country.common}
          <img src={country.img} alt="" />
        </div>
      ))}
    </div>
  );
};
