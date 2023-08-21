import { projectAgentStore } from "src/shared/store/projectAgent/service/projectAgentStore";
import { ProjectAgentType } from "src/shared/store/projectAgent/types";
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { rules } from "./tableColumns";
import { layoutProps } from "src/shared/consts/uiConsts";

//
interface CreateAgentModalProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}
//
export const CreateAgentModal: React.FC<CreateAgentModalProps> = ({ isVisible, setIsVisible }) => {
    const [form] = useForm();
    const onFinish = async (values: ProjectAgentType) => {
        try {
            await projectAgentStore.createProjectExpense(values);
            form.resetFields();
            setIsVisible(false);
        } catch (error) {
            alert(error);
        }
    };
    return (
        <Modal open={isVisible} title="Создать агента" onCancel={() => setIsVisible(false)} footer={null}>
            <Form onFinish={onFinish} form={form}>
                <Form.Item label="ФИО" name="full_name" rules={rules.nameRule} {...layoutProps}>
                    <Input />
                </Form.Item>
                <Form.Item label="Номер телефона" name="phone" rules={rules.phoneNumber} {...layoutProps}>
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={rules.emailRule} {...layoutProps}>
                    <Input />
                </Form.Item>
                <Button key="create" type="primary" htmlType="submit">
                    Создать
                </Button>
            </Form>
        </Modal>
    );
};
