import { useEffect } from "react";
import { styled } from "@mui/material";
import { useFormik } from "formik";
import {
  CONFIG_TYPE,
  CustomIconButton,
  RecursiveContainer,
} from "src/components";
import SendIcon from "@mui/icons-material/Send";
import { useSocket } from "src/hooks";

const ChatFormContainer = styled("div")`
  border: 1px solid red;
  padding: 5px;
  form {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 50px;
    gap: 10px;
  }
`;

export const ChatForm: React.FC = () => {
  const { sendPrivateMessage, receivePrivateMessage } = useSocket();

  useEffect(() => {
    receivePrivateMessage();
  }, []);

  const handleSubmit = (data) => {
    console.log("sending", { _id: "test", ...data });
    sendPrivateMessage({ _id: "test", ...data });
  };

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: handleSubmit,
  });

  const config: CONFIG_TYPE = [
    {
      name: "message",
      placeholder: "Type your message",
      size: "small",
      sx: {
        margin: 0,
      },
    },
  ];

  return (
    <ChatFormContainer>
      <form onSubmit={formik.handleSubmit}>
        <RecursiveContainer formik={formik} config={config} />
        <CustomIconButton type="submit">
          <SendIcon />
        </CustomIconButton>
      </form>
    </ChatFormContainer>
  );
};