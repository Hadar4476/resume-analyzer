import dayjs from "dayjs";

import { IPosition } from "@/types";

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

const PositionItem = ({
  title,
  department,
  description,
  requiredSkills,
  preferredExperience,
  score,
  createdAt,
}: IPosition) => {
  return (
    <Card
      className="w-[600px] shadow-md border border-gray-200 rounded-xl"
      variant="outlined"
    >
      <CardContent className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <Typography variant="h6" className="!font-semibold">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {department}
            </Typography>
          </div>
          <Chip label={`Score: ${score}`} color="primary" />
        </div>

        <Divider />

        <Typography variant="body1" className="text-gray-700">
          {description}
        </Typography>

        <div>
          <Typography variant="subtitle2" className="mb-1 text-gray-600">
            Required Skills:
          </Typography>
          <Stack direction="row" spacing={1} className="flex-wrap">
            {requiredSkills.map((skill) => (
              <Chip key={skill} label={skill} size="small" className="mb-1" />
            ))}
          </Stack>
        </div>

        <div>
          <Typography variant="subtitle2" className="text-gray-600">
            Preferred Experience:
          </Typography>
          <Typography variant="body2">{preferredExperience}</Typography>
        </div>

        <Divider />

        <Typography variant="caption" color="text.secondary">
          Posted on {dayjs(createdAt).format("MMMM D, YYYY")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PositionItem;
