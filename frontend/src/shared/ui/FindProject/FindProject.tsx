import { projectStore } from "src/shared/store/project/service/projectStore";
import { Form, Input, AutoComplete } from "antd";
import { useEffect, useState } from "react";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { ProjectType } from "src/shared/store/project/types";
import cls from "src/widgets/CreateSummary/ui/CreateSummary.module.scss";

export const FindProject = observer(({ setSelectedProjectId, setSelectedProjectName }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults]: any = useState([]);

  useEffect(() => {
    projectStore.fetchProject();
  }, []);

  const handleSearch = _.debounce((value) => {
    setSearchQuery(value);

    const results = projectStore.projects.filter((project: ProjectType) =>
      project.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(results);
  }, 50);

  const handleChange = (value: string) => {
    setSearchQuery(value);
    handleSearch(value);
  };

  const options = searchResults.map((result: Partial<ProjectType>) => ({
    value: result.name,
    label: result.name,
    key: result.id,
  }));

  const onSelect = (value: string, option: any) => {
    const { key, label } = option;
    setSelectedProjectId(key);
    if (setSelectedProjectName) {
      setSelectedProjectName(label);
    }
    setSearchQuery(label);
  };

  const props = {
    options: options,
    value: searchQuery,
    onChange: handleChange,
    onSelect: onSelect,
    placeholder: "Найти...",
  };

  return (
    <Form.Item label="Проект" rules={[{ required: true, message: "Проект обязателен" }]}>
      <AutoComplete {...props}>
        <Input.Search className={cls.input} />
      </AutoComplete>
    </Form.Item>
  );
});