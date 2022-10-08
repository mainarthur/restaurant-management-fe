import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { RestaurantsList } from "./components/RestaurantsList/RestaurantsList.js";
import { SearchBar } from "./components/SearchBar/SearchBar.js";
import { DEFAULT_PAGE_SIZE } from "./constants.js";
import { searchActionAsync } from "./redux/actions/restaurants.js";
import { createAsyncAction } from "./redux/helpers.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    createAsyncAction(
      dispatch,
      searchActionAsync({
        searchTerm: "",
        page: 0,
        pageSize: DEFAULT_PAGE_SIZE,
      }),
    );
  }, []);

  return (
    <AppContainer>
      <SearchBar />
      <RestaurantsList />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15pt;
  margin-left: 218pt;
  margin-right: 218pt;
`;

export default App;
