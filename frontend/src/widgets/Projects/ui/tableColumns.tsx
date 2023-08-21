export const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Название", dataIndex: "name", key: "name" },
    {
        title: "Тип Бюджета",
        dataIndex: "budget_type",
        key: "budget_type",
        render: (text: string) => {
            if (text === "variable") {
                return "Переменный";
            } else if (text === "fixed") {
                return "Фиксированный";
            }
            return text;
        },
    },
    { title: "Сумма", dataIndex: "budget_amount", key: "budget_amount" },
    { title: "Кол-во затрат", dataIndex: "expenses_amount", key: "expenses_amount" },
    {
        title: "Тип комисси агента",
        dataIndex: "agent_commission_type",
        key: "agent_commission_type",
        render: (text: string) => {
            if (text === "percentage") {
                return "Процент";
            } else if (text === "fixed") {
                return "Фиксированный";
            }
            return text;
        },
    },
    { title: "Комиссия агента", dataIndex: "agent_commission", key: "agent_commission" },
    { title: "Выручка", dataIndex: "revenue", key: "revenue" },
    { title: "Профит", dataIndex: "profit", key: "profit" },
    {
        title: "Клиент", dataIndex: "client", key: "client", render: (client: any) => {
            let url = client.site;
            if(client.site.includes('http://') || client.site.includes('https://')){
                url = client.site
            }
            else{
                url = `https://${client.site}`
            }
            return (
               <div >
                <p>{client.name}</p>
                <a target="_blank" href={url} rel="noreferrer">Перейти на страницу</a>
               </div>
                
            )
        }
    },
    {
        title: "Юр.лицо клиента", dataIndex: "client", key: "client", render: (client: any) => {
            return (
                client.legal_entity
            )
        }
    },
    { title: "Услуга", dataIndex: "service", key: "service" },
    { title: "Агент", dataIndex: "agent", key: "agent" },
    
];