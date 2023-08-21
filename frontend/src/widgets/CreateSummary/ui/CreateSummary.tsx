import { useState } from "react";
import { Form } from "antd";
import { observer } from "mobx-react-lite";
import { paymentStore } from "src/shared/store/summary/service/summaryStore";
import { PaymentType } from "src/shared/store/summary/summaryTypes";
import { FindProject } from "src/shared/ui/FindProject";
import { Amount, BillingDate, Comment, InvoiceNumber, LegalPerson, PaymentDate, PaymentPurpose, SubmitButton } from "./FormEntities";
import moment from "moment";

export const CreateSummary = observer(() => {
  const [selectedProjectId, setSelectedProjectId]: any = useState(null);

  const onFinish = (values: PaymentType) => {
    const payload = {
      ...values,
      is_paid: false,
      project: selectedProjectId,
      payment_date: moment(values.payment_date).format("YYYY-MM-DD"),
      billing_date: moment(values.payment_date).format("YYYY-MM-DD"),
    };
    paymentStore.createPayment(payload);
  };

  return (
    <Form onFinish={onFinish}>
      <InvoiceNumber />
      <FindProject setSelectedProjectId={setSelectedProjectId} />
      <LegalPerson />
      <PaymentPurpose />
      <Amount />
      <PaymentDate />
      <BillingDate/>
      <Comment />
      <SubmitButton>Создать счет</SubmitButton>
    </Form>
  );
});
