import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons";

const ReturnArrow = (props: any) => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="subtle"
        leftIcon={<IconArrowLeft />}
        style={{ color: "#000000" }}
        onClick={() => navigate("/")}
      >
        Back
      </Button>
      <br />
    </>
  );
};

export default ReturnArrow;
