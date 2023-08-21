import { Dispatch,SetStateAction, useEffect, useState } from "react";
import { AutoComplete, Form, Input } from "antd";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { projectAgentStore } from "src/shared/store/projectAgent/service/projectAgentStore";
import { ProjectAgentType } from "src/shared/store/projectAgent/types";

interface FindClientProps {
    setSelectedAgentId: Dispatch<SetStateAction<string>>
}

export const FindAgent:React.FC<FindClientProps> = observer(({ setSelectedAgentId }) => {
 
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  // 
  useEffect(() => {
    projectAgentStore.fetchProjectAgent();
  }, []);
  // 
  const handleSearch = _.debounce((value) => {
    setSearchQuery(value);
    const results = projectAgentStore.ProjectAgent.filter((agent: ProjectAgentType) =>
      agent.full_name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  }, 50);
  // 
  const handleChange = (value: string) => {
    setSearchQuery(value);
    handleSearch(value);
  };
  // 
  const options = searchResults.map((result: Partial<ProjectAgentType>) => ({
    value: result.full_name,
    label: result.full_name,
    key: result.id,
  }));
  // 
  interface OptionType{
    key: any,
    label:SetStateAction<string> | any
  }
  const onSelect = (value: string, option:OptionType ) => {
    const { key, label } = option;
    setSelectedAgentId(key);
    setSearchQuery(label);
  };
  // 
  const props  = {
    options: options,
    value: searchQuery,
    onChange: handleChange,
    onSelect: onSelect,
    placeholder: "Найти...",
  };

  return (
    <Form.Item label="Агент" rules={[{ required: true, message: "Проект обязателен" }]}>
      <AutoComplete
      {...props}
      >
        <Input.Search />
      </AutoComplete>
    </Form.Item>
  );
});