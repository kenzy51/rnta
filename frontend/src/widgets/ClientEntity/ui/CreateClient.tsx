import { Modal, Form, Input, Button } from "antd";
import { clientStore } from "src/shared/store/client/service/clientStore";
import { ClientType } from "src/shared/store/client/clientTypes";
import { observer } from "mobx-react-lite";

interface ModalProps {
  visible:boolean;
  setVisible:(a:boolean)=> void;
}
export const CreateClient = observer(({ visible, setVisible }:ModalProps ) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    try {
      form.validateFields().then((values) => {
        setVisible(false);
        createNewClient(values);
      });
    } catch (error) {
      setVisible(true);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const createNewClient = async (values: ClientType) => {
    try {
      await clientStore.createClient(values);
    } catch (error) {}
  };

  return (
    <div>
      <Modal
        title="Создать клиента"
        open={visible}
        onCancel={()=> setVisible(false)}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Отмена
          </Button>,
          <Button key="create" type="primary" onClick={handleOk}>
            Создать
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Имя" rules={[{ required: true, message: "Введите имя клиента" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="legal_entity"
            label="Юридическое лицо"
            rules={[{ required: true, message: "Введите юридическое лицо" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="site" label="Сайт" rules={[{ required: true, message: "Введите веб-сайт" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
