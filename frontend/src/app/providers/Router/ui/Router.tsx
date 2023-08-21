import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { authStore } from 'src/shared/store/auth/auth.store'
import styled from "styled-components";
import { routeConfigPrivate, routeConfigPublic } from "../routerConfig";
import { LoadingOutlined } from "@ant-design/icons";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const AppRouter = observer(() => {
  const { isAuth } = authStore;
  const routes = isAuth ? routeConfigPrivate : routeConfigPublic;

  console.log(isAuth);
  
  return (
    <Routes>
      {Object.values(routes).map(({ element, path }, index) => (
        <Route
          key={index}
          path={path}
          element={
            <Suspense fallback={<LoadingOutlined color="primary" />}>
              <StyledWrapper className="page-wrapper">{element}</StyledWrapper>
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
});