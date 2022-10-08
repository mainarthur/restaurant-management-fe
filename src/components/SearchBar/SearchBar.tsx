import { SearchOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Input, Space } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { DEFAULT_PAGE_SIZE } from "../../constants";
import { useEvent } from "../../hooks/useEvent";
import { searchActionAsync } from "../../redux/actions/restaurants";
import { createAsyncAction } from "../../redux/helpers.js";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleInputUpdate: React.ChangeEventHandler<HTMLInputElement> =
    useEvent((event) => {
      setSearchTerm(event.target.value);
    });

  const handleSearch = useEvent(() => {
    createAsyncAction(
      dispatch,
      searchActionAsync({ searchTerm, page: 0, pageSize: DEFAULT_PAGE_SIZE }),
    );
  });

  return (
    <Space>
      <SearchInput onChange={handleInputUpdate} placeholder="Search" />
      <SearchButton onClick={handleSearch} type="primary">
        <SearchOutlined />
      </SearchButton>
    </Space>
  );
};

const SearchInput = styled(Input)`
  width: 653pt;
  height: 44pt;
  font-size: 16pt;
  margin-right: 5pt;
`;

const SearchButton = styled(Button)`
  width: 88pt;
  height: 44pt;
  font-size: 16pt;
  margin-left: 5pt;
`;
