import PositionItem from "@/components/positions/PositionItem";
import { useAppSelector } from "@/store";
import { positionsSelector } from "@/store/reducers/positions";
import { Stack } from "@mui/material";

const Positions = () => {
  const { positions } = useAppSelector(positionsSelector);

  const positionsList = positions.map((position) => {
    return <PositionItem key={position._id} {...position} />;
  });

  return <Stack className="gap-4 items-center">{positionsList}</Stack>;
};

export default Positions;
