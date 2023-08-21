import { authStore } from "src/shared/store";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import { FormValues } from "./types";
import styled from "styled-components";

import cls from "./SignIn.module.scss";
import { useState } from "react";

export const SignIn = observer(() => {
  const [form] = Form.useForm();
  const { signIn } = authStore;
  const [error, setError] = useState("");

  const handleSubmit = async (values: FormValues) => {
    try {
      await signIn(values);
    } catch (error) {
      console.error(error);
      setError('Неверный пароль')
    }
  };

  const usernameFormItem = (
    <Form.Item
      name="username"
      label="Имя пользователя"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ width: "27vw" }}
    >
      <Input />
    </Form.Item>
  );

  const passwordFormItem = (
    <Form.Item name="password" label="Пароль" labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      validateStatus={error ? "error" : ""}
      help={error}>
      <Input.Password />
    </Form.Item>
  );

  const submitButtonFormItem = (
    <Form.Item>
      <Button
        className={cls.button}
        type="primary"
        htmlType="submit"
        style={{ background: "linear-gradient(to right, #F67D37, #FF007E)" }}
      >
        Войти
      </Button>
    </Form.Item>
  );

  return (
    <FormBlock>
      <h3 style={{ display: "flex", alignItems: "center", margin: "0 auto" }}>Войти</h3>
      <Form
        form={form}
        name="signIn"
        onFinish={handleSubmit}
        initialValues={{
          remember: true,
        }}
        scrollToFirstError
      >
        {usernameFormItem}
        {passwordFormItem}
        {submitButtonFormItem}
      </Form>
      <img src="https://www.runita.ru/assets/template/img/logo.png" alt="" height={20} />
    </FormBlock>
  );
});

const FormBlock = styled.div`
  width: 30%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  background-color: #f0f2f5;
  margin-top: 200px;
`;