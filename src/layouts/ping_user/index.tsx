import { navigationLinks } from "src/routes";
import { Header } from "./header";
import { styled } from "@mui/material";
import { CustomButton, FlexRow } from "src/components";
import { layoutSettings } from "./layout-settings";
import { useAuth } from "src/hooks";
import { useState } from "react";
import { authConfig } from "src/config";
import { isActiveRoute } from "src/utils";
import { useLocation } from "react-router-dom";

const MainContentWrapper = styled("div")`
  width: 100vw;
  max-width: 100vw;
  overflow: auto;
  height: calc(100vh - ${layoutSettings.header.height});
  max-height: 100vh;
`;

export const PingUserLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (err) {
      /* ignore error */
    }
    setLoading(false);
  };

  const actions = <FlexRow style={{gap: 10}}>
    <CustomButton href='/ping_user/users'>Users</CustomButton>
    <CustomButton href='/ping_user/friend'>Friends</CustomButton>
    {/* display only if its not the signup page */}
    {!isActiveRoute({ path: pathname, route: authConfig.signupPage }) && (
      <CustomButton loading={loading} onClick={handleLogout}>
        Logout
      </CustomButton>
    )}
  </FlexRow>;

  return (
    <>
      <Header navigationLinks={navigationLinks.adminLayout} actions={actions} />
      <MainContentWrapper>{children}</MainContentWrapper>
    </>
  );
};
