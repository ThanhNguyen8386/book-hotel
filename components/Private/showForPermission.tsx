import { useEffect, useState } from 'react'
import { ADMIN_ROLE } from '../../constants';
import { UserType } from '../../types/user';

type ShowForPermissionProps = {
  children: JSX.Element;
  acceptRole?: number[];
  message?: any;
};

const ShowForPermission = ({ acceptRole, message, children }: ShowForPermissionProps) => {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user") as string || "{}") as UserType;

    // hiển thị element với user có role là admin hoặc thuộc accept role.
    const isAllowed = getUser.role === ADMIN_ROLE || acceptRole?.includes(getUser.role);
    setIsAllowed(isAllowed!);
  }, [acceptRole]);
  
  return isAllowed ? children : <>{message}</>;
}

export default ShowForPermission