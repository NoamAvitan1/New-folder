import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./SearchBox.module.css";
import { CgArrowsV } from "react-icons/cg";
import { GrSearch } from "react-icons/gr";
import { HiArrowPath } from "react-icons/hi2";
import { FaSort } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useForm, useWatch } from "react-hook-form";

export type Option =
  | { label?: string; value?: string; [key: string]: any }
  | string
  | number;

type Props<T extends Option> = {
  options: T[];
  onChange?: (option: T) => void;
  value?: T | string | number;
  placeholder?: string;
  searchBy?: keyof T;
  handleClick: Function;
  setSearch?: Function;
  searchValue?: string;
};

export const SearchBox = <T extends Option>({
  options,
  onChange,
  value,
  placeholder = "select",
  searchBy,
  handleClick,
  setSearch,
  searchValue,
}: Props<T>) => {
  const [selectedValue, setSelectedValue] = useState<
    T | string | number | null
  >(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isValidValue, setIsValidValue] = useState<boolean>(true);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (dataForm: any) => console.log(dataForm);

  useEffect(() => {
    console.log(dropDownRef);
    const handleScroll = () => {
      console.log("currentValue");
    };

    const dropdownElement = dropDownRef.current;

    if (dropdownElement) {
      dropdownElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (dropdownElement) {
        dropdownElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isDropdownOpen]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // setSearchTerm(e.target.value.toLowerCase().trim());
    setSearch?.(e.target.value.toLowerCase().trim());
  };

  const filteredOptions = options;

  // const filteredOptions = options.filter((option) => {
  //   if (typeof option === "object") {
  //     if ("label" in option && option.label)
  //       return option.label.toLowerCase().includes(searchTerm);
  //     if (searchBy && searchBy in option) {
  //       return (option[searchBy] as unknown as string)
  //         .toLowerCase()
  //         .includes(searchTerm);
  //     }
  //   }
  //   return option.toString().toLowerCase().includes(searchTerm);
  // });

  const finalValue = value ?? selectedValue;

  useEffect(() => {
    if (finalValue === null) return;
    if (typeof finalValue === "object" && "label" in finalValue) {
      const foundOption = options.find(
        (option) =>
          typeof option === "object" &&
          "label" in option &&
          option.label === finalValue.label
      );
      if (!foundOption) {
        setIsValidValue(false);
        return;
      }
    } else if (
      typeof finalValue === "object" &&
      searchBy !== undefined &&
      searchBy in finalValue
    ) {
      const foundOption = options.find(
        (option: T) =>
          typeof option === "object" &&
          searchBy in option &&
          option[searchBy] === finalValue[searchBy]
      );
      if (!foundOption) {
        setIsValidValue(false);
        return;
      }
    }
    //  else if (!data.find((option:T) => option === finalValue)) {
    //   setIsValidValue(false);
    //   return;
    // }
  }, [selectedValue, value]);

  if (!isValidValue) return null;

  return (
    <div className={styles.searchBoxContainer}>
      <div className={styles.searchBoxWrapper}>
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={styles.buttonWrapper}
        >
          <p className={styles.selectedValue}>
            {(() => {
              if (finalValue === null) return placeholder;
              if (typeof finalValue === "object") {
                if ("label" in finalValue && finalValue.label)
                  return finalValue.label;
                if (searchBy !== undefined && searchBy in finalValue) {
                  return finalValue[searchBy] as unknown as string;
                }
              }
              return finalValue.toString();
            })()}
          </p>
          <CgArrowsV />
        </div>
        {isDropdownOpen && (
          <div className={styles.dropDown}>
            <div className={styles.searchInputContainer}>
              <GrSearch
                style={{ position: "absolute", left: "15px", top: "16px" }}
              />
              <input
                value={searchValue}
                onChange={handleSearch}
                className={styles.searchInput}
                placeholder="search"
                type="text"
              />
              <HiArrowPath
                onClick={() => handleClick()}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "16px",
                  cursor: "pointer",
                }}
              />
              <FaSort
                // onClick={() => setSort(!sort)}
                style={{
                  position: "absolute",
                  right: "35px",
                  top: "16px",
                  cursor: "pointer",
                }}
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div ref={dropDownRef} className={styles.options}>
                {filteredOptions?.map((option: T, i: number) => (
                  <div
                    {...register("options")}
                    key={i}
                    className={styles.containOptions}
                    onClick={() => {
                      setSelectedValue(option);
                      setIsDropdownOpen(false);
                      setSearch?.("");
                      onChange?.(option);
                    }}
                  >
                    <p className={styles.chooseOption}>
                      {typeof option === "object" && "label" in option
                        ? option.label
                        : typeof option === "object" &&
                          searchBy !== undefined &&
                          searchBy in option
                        ? (option[searchBy] as unknown as string)
                        : option.toString()}
                    </p>
                    <IoIosAddCircle
                      style={{ cursor: "pointer" }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                ))}
              </div>
              <button
                style={{
                  position: "absolute",
                  right: "50%",
                  marginTop: "15px",
                  padding: "10px",
                }}
              >
                save
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
