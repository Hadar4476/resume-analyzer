import { Button, TextField, Typography, Stack } from "@mui/material";

import { useLogin } from "./useLogin";

const Login = () => {
  const { formik, isPending, error } = useLogin();

  return (
    <Stack className="max-w-sm w-full gap-4 p-4 shadow-lg rounded-lg">
      <Typography variant="h3" className="text-center">
        Login
      </Typography>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          type="email"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Stack>
  );
};

export default Login;
