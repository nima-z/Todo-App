import { useContext, useState, useEffect } from "react";
import { Menu, MenuButton, MenuList, Button, Avatar } from "@chakra-ui/react";

import NewTask from "../Actions/NewTask";
import AvatarForm from "../Avatar/AvatarForm";
import { AuthContext } from "../../util/context/auth-context";
import { svg } from "../Avatar/svg";

import styles from "./MainHeader.module.css";

function MainHeader() {
  const [avatar, setAvatar] = useState(null);
  const authCTX = useContext(AuthContext);

  useEffect(() => {
    const masalan = svg(authCTX.userState.avatar);
    setAvatar(masalan);
  }, [authCTX.userState.avatar]);

  return (
    <header className={styles.header}>
      <div className={styles.action}>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                bg="inherit"
                minWidth="56px"
                minHeight="60px"
                fontSize="20px"
                padding="0"
                _hover={{ bg: "none" }}
                _active={{ bg: "none" }}
                _focus={{ boxShadow: "none" }}
              >
                <Avatar
                  name={authCTX.userState.userName}
                  src={avatar}
                  size="lg"
                />
              </MenuButton>
              <MenuList>
                <AvatarForm />
                <Button
                  focus="none"
                  width="100%"
                  justifyContent="flex-start"
                  onClick={authCTX.logout}
                  _active={{ bg: "none" }}
                  _focus={{ boxShadow: "none" }}
                  bg="inherit"
                  borderRadius="0"
                >
                  Logout
                </Button>
              </MenuList>
            </>
          )}
        </Menu>
        <div className={styles.newTask}>
          <NewTask />
        </div>
      </div>
      <div className={styles.title}>
        <h1>{`${authCTX.userState.userName}'s list`}</h1>
        <p>A goal without a plan is just a wish!</p>
      </div>
    </header>
  );
}

export default MainHeader;
