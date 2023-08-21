import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AutoComplete, Form, Input } from "antd";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { serviceStore } from "src/shared/store/service/service/serviceStore";
import { ServiceType } from "src/shared/store/service/types";

interface FindServiceProps {
  setSelectedServiceId: Dispatch<SetStateAction<string>>;
}

export const FindService: React.FC<FindServiceProps> = observer(({ setSelectedServiceId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults]: any = useState([]);

  useEffect(() => {
    serviceStore.fetchService();
  }, []);

  const handleSearch = _.debounce((value) => {
    setSearchQuery(value);

    const results = serviceStore.Service.filter((project: ServiceType) =>
      project.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(results);
  }, 50);

  const handleChange = (value: string) => {
    setSearchQuery(value);
    handleSearch(value);
  };

  const options = searchResults.map((result: Partial<ServiceType>) => ({
    value: result.name,
    label: result.name,
    key: result.id,
  }));

  const onSelect = (value: string, option: any) => {
    const { key, label } = option;
    setSelectedServiceId(key);
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
    <Form.Item label="Услуга" rules={[{ required: true, message: "Услуга обязательна" }]}>
      <AutoComplete {...props}>
        <Input.Search />
      </AutoComplete>
    </Form.Item>
  );
});
