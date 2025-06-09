import { Box, Button, Stack, styled, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useState } from "react";
import { uploadResume } from "@/services/resumes";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ResumeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(() => null);

    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(() => selectedFile);
    }
  };

  const handleUploadFile = async () => {
    if (file) {
      const formData = new FormData();

      formData.append("file", file);

      try {
        const response = await uploadResume(formData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Stack className="flex-1 gap-4 items-center justify-center">
      <Box className="flex items-center justify-center gap-4">
        <Button component="label" tabIndex={-1} startIcon={<CloudUploadIcon />}>
          {file ? "Change file" : "Upload file"}
          <VisuallyHiddenInput
            type="file"
            onChange={handleChange}
            multiple={false}
          />
        </Button>
        {file && <Button onClick={handleUploadFile}>Confirm</Button>}
      </Box>
      {file && <Typography>{file.name}</Typography>}
    </Stack>
  );
};

export default ResumeUpload;
