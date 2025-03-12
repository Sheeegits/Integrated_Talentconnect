const validateCollege = (req, res, next) => {
  console.log("Received Body:", req.body);
  console.log("Received Files:", req.files);

  // ✅ Normalize keys to lowercase
  const body = Object.keys(req.body).reduce((acc, key) => {
    acc[key.toLowerCase()] = req.body[key]; // Convert all keys to lowercase
    return acc;
  }, {});

  const name = body.name;
  const city = body.city;        // ✅ Now correctly mapped
  const state = body.state;
  const ranking = body.ranking;
  const collegeInfo = body.collegeinfo || body.collegeInfo;  // ✅ Handle both cases

  // ✅ Extract file paths correctly
  const image = req.files?.image ? req.files.image[0].path : null;
  const brochure = req.files?.brochure ? req.files.brochure[0].path : null;

  let missingFields = [];

  if (!name) missingFields.push("name");
  if (!city) missingFields.push("city");
  if (!state) missingFields.push("state");
  if (!ranking) missingFields.push("ranking");
  if (!collegeInfo) missingFields.push("collegeInfo");
  if (!image) missingFields.push("image");
  if (!brochure) missingFields.push("brochure");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `The following required fields are missing: ${missingFields.join(", ")}`,
    });
  }

  next();
};

export default validateCollege;
