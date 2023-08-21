import { Rule } from "antd/es/form";

export const columns = [
    {
        title: "ФИО",
        dataIndex: "full_name",
        key: "full_name",
    },
    {
        title: "Номер телефона",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
];

export const rules: { [key: string]: Rule[] } = {
    nameRule: [{ required: true, message: "Введите имя" }],
    lastNameRule: [{ required: true, message: "Введите фамилию" }],
    middleNameRule: [{ required: true, message: "Введите отчество" }],
    phoneNumber: [{ required: true, message: "Введите номер телефона" }],
    emailRule: [
        { required: true, message: "Введите email" },
        { type: "email", message: "Введите валидный email" },
    ],
};