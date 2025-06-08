import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

const AuthLayout = () => {
  return (
    <Stack className="min-h-screen w-full">
      {/* Content */}
      <main className="flex-grow flex flex-col justify-center items-center">
        <Outlet />
      </main>
    </Stack>
  );
};

export default AuthLayout;
