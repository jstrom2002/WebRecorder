import { Text, Title } from "@mantine/core";
import { useEffect } from "react";

export default function Error404Page(props: any) {
  useEffect(() => {
    props.setLoggedIn(false);
  });
  return (
    <>
      <Title order={1} size="h1">
        404 ERROR
      </Title>
      <Text>Page Not Found</Text>
    </>
  );
}
