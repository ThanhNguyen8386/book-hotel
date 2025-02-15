import SiteLayout from ".";
import { RECEPTIONIST_ROLE, USER_ROLE } from "../../constants";
import PrivateRouter from "../Private/privateRouter";

type ProfileLayoutProps = {
  children: JSX.Element;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <SiteLayout>
      <PrivateRouter acceptRole={[USER_ROLE, RECEPTIONIST_ROLE]}>
        {children}
      </PrivateRouter>
    </SiteLayout>
  );
}

export default ProfileLayout