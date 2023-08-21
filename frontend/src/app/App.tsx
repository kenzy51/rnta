import { AppRouter } from "./providers/Router/ui/Router";
import { authStore } from "src/shared/store";
import { Layout } from "antd";
import { Content} from "antd/es/layout/layout";
import { observer } from "mobx-react-lite";
import { Sidebar } from "src/widgets/SideBar";
import cls from "src/widgets/MainComponent/ui/Main.module.scss";

const App = observer(() => {
  const { isAuth } = authStore;

  if (!isAuth) {
    return <AppRouter />;
  }

  return (
    <div className={cls.wrapper}>
      <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
        <Sidebar />
        <Layout>
          <Content style={{ margin: "0 16px", maxHeight: "90vh " }}>
            <AppRouter />
          </Content>
          {/* <Footer style={{ textAlign: "center", height: "10%" }}>Runita</Footer> */}
        </Layout>
      </Layout>
    </div>
  );
});

export default App;
