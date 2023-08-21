import { Button } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #f2f2f2;
`;

const Message = styled.h1`
  text-align: center;
  color: #333;
`;

const Image = styled.img`
  width: 300px;
  height: auto;
`;

export const NotFoundPage = () => {
  return (
    <Container>
      <Message>Страница была не найдена</Message>
      <Image src="https://cdn-icons-png.flaticon.com/512/755/755014.png" alt="Error" />
      <Button style={{ background: "linear-gradient(to right, #F67D37, #FF007E)" }}>
        {" "}
        <Link to={"/"}>Перейти на главную</Link>
      </Button>
    </Container>
  );
};

export default NotFoundPage;
