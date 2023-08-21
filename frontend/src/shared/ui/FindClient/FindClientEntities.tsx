import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AutoComplete, Form, Input } from "antd";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { clientStore } from "src/shared/store/client/service/clientStore";
import { ClientType } from "src/shared/store/client/clientTypes";

interface FindClientProps {
  setSelectedClientId: Dispatch<SetStateAction<string>>;
}

export const FindClient: React.FC<FindClientProps> = observer(({ setSelectedClientId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults]: any = useState([]);
  //
  useEffect(() => {
    clientStore.fetchClients();
  }, []);
  //
  const handleSearch = _.debounce((value) => {
    setSearchQuery(value);
    const results = clientStore.clients.filter((project: ClientType) =>
      project.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  }, 50);
  //
  const handleChange = (value: string) => {
    setSearchQuery(value);
    handleSearch(value);
  };
  //
  const options = searchResults.map((result: Partial<ClientType>) => ({
    value: result.name,
    label: result.name,
    key: result.id,
  }));
  //
  const onSelect = (value: string, option: any) => {
    const { key, label } = option;
    setSelectedClientId(key);
    setSearchQuery(label);
  };

  const props = {
    options: options,
    value: searchQuery,
    onChange: handleChange,
    onSelect: onSelect,
    placeholder: "Найти...",
  };
  //
  return (
    <Form.Item label="Клиент" rules={[{ required: true, message: "Проект обязателен" }]}>
      <AutoComplete
       {...props}
      >
        <Input.Search />
      </AutoComplete>
    </Form.Item>
  );
});
