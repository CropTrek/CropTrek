import mongoose from "mongoose";
const terrainSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    coordinates: {
      type: [[[Number]]],
      required: true
    }
  }, {
    timestamps: true
  });


const Terrain=mongoose.model("Terrain",terrainSchema);
export default Terrain;
