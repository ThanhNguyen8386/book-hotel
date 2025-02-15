import React from 'react';
import { DashboardLayout } from "../dashboard-layout";
import ShowForPermission from '../Private/showForPermission';

type AdminShowForPermissionLayoutProps = {
  children: JSX.Element
};

const AdminShowForPermissionLayout = ({ children }: AdminShowForPermissionLayoutProps) => {
  return (
    <DashboardLayout>
      <ShowForPermission
        message={<p className='p-3'>Tài khoản của bạn không có quyền truy cập!</p>}
      >
        {children}
      </ShowForPermission>
    </DashboardLayout>
  )
}

export default AdminShowForPermissionLayout