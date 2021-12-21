import { useContext } from "react";
import { Menu, MenuButton, MenuList, Button } from "@chakra-ui/react";

import NewTask from "../../pages/Tasks/NewTask";
import { AuthContext } from "../../util/context/auth-context";

import styles from "./MainHeader.module.css";

function MainHeader() {
  const authCTX = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        {/* <h1>{authCTX.userState.userName}'s list </h1> */}
        <h1>
          <div className={styles.action}>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    bg="inherit"
                    fontSize="20px"
                    paddingLeft="0"
                  >
                    {`${authCTX.userState.userName}'s list`}
                  </MenuButton>
                  <MenuList>
                    <Button
                      focus="none"
                      width="100%"
                      justifyContent="flex-start"
                      onClick={authCTX.logout}
                    >
                      Logout
                    </Button>
                  </MenuList>
                </>
              )}
            </Menu>
          </div>{" "}
        </h1>
        <p>A goal without a plan is just a wish!</p>
      </div>
      <div className={styles.action}>
        <NewTask />
      </div>
    </header>
  );
}

export default MainHeader;
