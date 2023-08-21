import { Button } from "antd";
import { styled } from "styled-components";
export const ErrorPlug = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <Wrapper>
      <h3>Произошла непредвиденная ошибка </h3>
      <h4>Нажмите на кнопку, чтобы перезагрузить</h4>
      <Button onClick={reloadPage}>Обновить страницу</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;
