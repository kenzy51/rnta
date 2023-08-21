import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { AutoComplete, Form, Input } from "antd";
import { usersStore } from "src/shared/store/users/service/usersStore";
import { UserType } from "src/shared/store/users/types";

export const FindEmployee = observer(({ setSelectedSpecialist }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults]: any = useState([]);
  //

  useEffect(() => {
    usersStore.fetchUsers();
  }, []);
  //

  const handleSearch = _.debounce((value) => {
    setSearchQuery(value);
    const results = usersStore.users.filter(
      (user: UserType) => user.first_name + user.last_name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  }, 50);
  //
  const handleChange = (value: string) => {
    setSearchQuery(value);
    handleSearch(value);
  };

  const options = searchResults.map((result: UserType) => ({
    value: result.first_name + " " + result.last_name + `(Специальность-${result.role})`,
    label: result.first_name + " " + result.last_name + `(Специальность-${result.role})`,
    key: result.id,
  }));
  //
  interface OptionType {
    key: React.Key;
    label: string;
  }
  const onSelect = (value: string, option: OptionType) => {
    const { key, label } = option;
    setSelectedSpecialist(key);
    setSearchQuery(label);
  };
  //
  const props = {
    options: options,
    value: searchQuery,
    onChange: handleChange,
    onSelect: onSelect,
    placeholder: "Найти...",
  };
  // 
  return (
    <Form.Item label="Выберите специалиста" rules={[{ required: true, message: "Данное поле обязательно" }]}>
      <AutoComplete {...props}>
        <Input.Search />
      </AutoComplete>
    </Form.Item>
  );
});
