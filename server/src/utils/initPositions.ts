import Position from "../models/position";

import positionsMock from "../mocks/positions.json";

const initPositions = async () => {
  try {
    const positionsAmount = await Position.countDocuments();

    if (!positionsAmount) {
      await Position.insertMany(positionsMock);
    }
  } catch (err) {
    console.log(err);
  }
};

export default initPositions;
