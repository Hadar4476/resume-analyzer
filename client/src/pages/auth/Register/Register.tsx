import { Button, TextField, Typography, Stack } from "@mui/material";

import { useRegister } from "./useRegister";

const Register = () => {
  const { formik, isPending, error } = useRegister();

  return (
    <Stack className="max-w-sm w-full gap-4 p-4 shadow-lg rounded-lg">
      <Typography variant="h3" className="text-center">
        Register
      </Typography>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
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
          {isPending ? "Registering in progress..." : "Register"}
        </Button>
      </form>
    </Stack>
  );
};

export default Register;
