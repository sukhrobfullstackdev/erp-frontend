import React, { useState } from "react";
import { FilterStyled } from "./filterStyles";
import Button from "../button";
import Icon from "../icon";
import OptionsOfSelect from "./optionsOfSelect";
import { isArray } from "lodash";

const options = [
  {
    where: "where",
    option: "Filter 1",
    is: { value: "is", values: ["is", "is not"] },
    name: { value: "noname", values: ["Aslamjon", "Ulug'bek"] },
    and: false,
    mutliSelect: false,
    date: false,
  },
  {
    where: "",
    option: "Filter 2",
    is: { value: "is", values: ["is", "is not"] },
    name: { value: "", values: ["Aslamjon", "Ulug'bek"] },
    and: { value: "And", values: ["Or", "And"] },
    mutliSelect: {
      value: ["Developer", "Designer"],
      values: ["Developer", "Designer", "Flutter", "Frontend", "Android"],
    },
    date: false,
  },
  {
    where: "where",
    option: "Filter 3",
    is: { value: "is", values: ["is", "is not"] },
    name: { value: "", values: ["Aslamjon", "Ulug'bek"] },
    and: false,
    mutliSelect: false,
    date: false,
  },
  {
    where: "where",
    option: "Filter 4",
    is: { value: "is", values: ["is", "is not"] },
    name: { value: "", values: ["Aslamjon", "Ulug'bek"] },
    and: false,
    mutliSelect: false,
    date: {
      value: "",
      values: ["Today", "Yesterday", "Tomorrow", "Next week", "Last 7 days"],
    },
  },
];

export default function Filter({ ...props }) {
  const [isActiveAddFilter, setIsActiveAddFilter] = useState(false);
  const [isActiveTemplate, setIsActiveTemplate] = useState(false);
  const [filters, setFilters] = useState([]);

  const optionsClick = (val) => {
    let f = filters.filter((v) => v.option == val.option);
    if (!f.length) {
      filters.push(val);
      setFilters(filters);
    }
  };
  return (
    <FilterStyled {...props} className="filter">
      <div className="filter__body">
        <div className="filter__body__title">Active Filters</div>
        <div className="filter__body__body">
          {isArray(filters) &&
            filters &&
            filters.map((value, index) => (
              <div className="filter__body__body__filterContainer" key={`${index + new Date().getTime()}`}>
                {value.where && <span className="filter__body__body__filterContainer__where">{value.where}</span>}
                {value.option && <div className="filter__body__body__filterContainer__option">{value.option}</div>}
                {value.is && value.is.value && <div className="filter__body__body__filterContainer__is">{value.is.value}</div>}
                {value.name && value.name.value && (
                  <div className="filter__body__body__filterContainer__name">{value.name.value}</div>
                )}
                {value.and && value.and.value && (
                  <div className="filter__body__body__filterContainer__and">{value.and.value}</div>
                )}
                {value.date && value.date.value && (
                  <div className="filter__body__body__filterContainer__date">{value.date.value}</div>
                )}
                {value.mutliSelect && value.mutliSelect.value && (
                  <div className="filter__body__body__filterContainer__mutliSelect">{value.mutliSelect.value}</div>
                )}
              </div>
            ))}
        </div>
        <div className="filter__body__footer">
          <Button success="a" onClick={() => setIsActiveAddFilter((isActive) => !isActive)}>
            + Add Filter
          </Button>
          <button
            className={`filter__body__footer__template ${isActiveTemplate && "active"}`}
            onClick={() => setIsActiveTemplate((isActive) => !isActive)}
          >
            <Icon icon="icon-file" />
            Templates
          </button>
        </div>
      </div>
      <OptionsOfSelect
        className={`filter__optionsOfAddFilter ${isActiveAddFilter && "active"}`}
        onClick={optionsClick}
        options={options}
      />
    </FilterStyled>
  );
}
