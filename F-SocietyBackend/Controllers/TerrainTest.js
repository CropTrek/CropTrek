import Terrain from "../Models/Terrain.js";

const createTerrain = async (req, res) => {
  const { name, coordinates } = req.body;
  console.log("haha"+coordinates);

  try {
    const terrains = new Terrain({ name, coordinates });
    await terrains.save();

    res.status(201).json({ message: 'Terrain created successfully', terrains });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
async function getAllTerrainCoordinates(req, res) {
    try {
      const terrains = await Terrain.find({}, 'name coordinates').lean(); // only retrieve the name and coordinates fields
  
      const terrainData = terrains.map(terrain => {
        const { name, coordinates } = terrain;
        return { name, coordinates };
      });
  
      res.json(terrainData);
    } catch (error) {
      console.error('Error retrieving terrain data:', error);
      res.status(500).json({ message: 'Error retrieving terrain data' });
    }
  }

export{createTerrain,getAllTerrainCoordinates}