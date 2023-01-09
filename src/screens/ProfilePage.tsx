import { ActionIcon, Flex, Text, TextInput, Title } from "@mantine/core";
import ReturnArrow from "../components/ReturnArrow";

const ProfilePage = (props: any) => {
  return (
    <>
      <ReturnArrow />
      <Flex direction="column" style={{ alignItems: "center" }}>
        <Title size="h3">Profile</Title>
        <TextInput style={{ width: "50%" }} label="Username" />
        <TextInput style={{ width: "50%" }} label="Email" />
      </Flex>
    </>
  );
};

export default ProfilePage;
