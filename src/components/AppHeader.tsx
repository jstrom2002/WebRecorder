import { Button, Flex, Header, Text, Menu } from "@mantine/core";

const AppHeader = (props: any) => {
  return (
    <Header
      style={{ background: "#495553" }}
      height={{ base: 50, md: 70 }}
      p="md"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Menu shadow="md" width={200}>
          <Flex direction="row" style={{ textAlign: "left" }}>
            {props.loggedIn ? (
              <Text
                fw="700"
                style={{
                  color: "#a3c2c2",
                  alignSelf: "left",
                  width: "90vw",
                }}
              >
                Web Recorder App
              </Text>
            ) : (
              <Text
                fw="700"
                style={{
                  color: "#a3c2c2",
                  alignSelf: "left",
                  width: "97vw",
                }}
              >
                Web Recorder App
              </Text>
            )}

            {props.loggedIn ? (
              <Menu.Target>
                <Button
                  style={{
                    textAlign: "center",
                    color: "#545B5A",
                    background: "#a3c2c2",
                  }}
                  onClick={() => props.loginCallback(false)}
                >
                  Log Out
                </Button>
              </Menu.Target>
            ) : null}
          </Flex>
        </Menu>
      </div>
    </Header>
  );
};

export default AppHeader;
