import React from "react";
import { Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/actions/filter";

const filterIndex = {
  all: 0,
  active: 1,
  completed: 2,
};

function Filter() {
  const dispatch = useDispatch();
  const filterBy = useSelector((state) => state.filter.filterBy);

  const handleSetFilter = (_, newIndex) => {
    const status = Object.keys(filterIndex)[newIndex];
    dispatch(setFilter(status));
  };

  return (
    <Tabs onChange={handleSetFilter} value={filterIndex[filterBy]}>
      <Tab label="Все" />
      <Tab label="Активные" />
      <Tab label="Завершённые" />
    </Tabs>
  );
}

export default Filter;
