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
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(() => selectedFile);
    }
  };

  const handleUploadFile = async () => {
    setIsPending(true);

    if (file) {
      const formData = new FormData();

      formData.append("file", file);

      try {
        const response = await uploadResume(formData);

        console.log({ response });
      } catch (error) {
        console.log(error);
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <Stack className="flex-1 gap-4 items-center justify-center">
      <Box className="flex items-center justify-center gap-4">
        <Button
          component="label"
          loading={isPending}
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          {file ? "Change file" : "Upload file"}
          <VisuallyHiddenInput
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
