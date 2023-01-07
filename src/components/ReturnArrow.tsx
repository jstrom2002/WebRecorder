import {
  ActionIcon,
  Button,
  Flex,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { IconArrowLeft } from "@tabler/icons";

const ReturnArrow = (props: any) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <>
      <Button
        variant="subtle"
        leftIcon={<IconArrowLeft />}
        style={{ color: "#000000" }}
        onClick={() =>
          props.loggedIn
            ? props.currentPageHandler("MainPage")
            : props.currentPageHandler("LoginPage")
        }
      >
        Back
      </Button>
      <br />
    </>
  );
};

export default ReturnArrow;
