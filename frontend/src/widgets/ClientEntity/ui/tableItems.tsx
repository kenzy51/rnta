export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Юр.Лицо",
    dataIndex: "legal_entity",
    key: "legal_entity",
  },
  {
    title: "Веб-сайт",
    dataIndex: "site",
    key: "site",
    render: (text: string) => {
      let url = text;
      if (text.includes('http://') || text.includes('https://')){
        url = text;
      }
      else{
        url = `https://${text}`;
      }
      return <a href={url} target="_blank" rel="noopener noreferrer">{text}</a>
    },
  },
 
];