import College from "../models/College.js";

// ✅ Filter Colleges by State and City
export const filterColleges = async (req, res) => {
  try {
    const { state, city } = req.query;

    // ✅ Ensure `state` is provided
    if (!state) {
      return res.status(400).json({ message: "State is required for filtering" });
    }

    // ✅ Build dynamic query object
    let query = { state };

    // ✅ If `city` is provided, add it to the query
    if (city) {
      query.city = city;
    }

    // ✅ Fetch colleges based on filter
    const colleges = await College.find(query);

    if (colleges.length === 0) {
      return res.status(404).json({ message: "No colleges found for the given filters" });
    }

    res.status(200).json(colleges);

  } catch (error) {
    console.error("Error filtering colleges:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

