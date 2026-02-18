const Tirth = require('../models/Tirth');

// @desc    Get all Tirths (Public)
// @route   GET /api/tirths
// @access  Public (with Filtering & Pagination)
exports.getTirths = async (req, res) => {
  try {
    // 1. Advanced Filtering (e.g., ?city=Palitana)
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((param) => delete queryObj[param]);

    let query = Tirth.find(queryObj);

    // 2. Pagination Logic
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const total = await Tirth.countDocuments(queryObj);

    query = query.skip(startIndex).limit(limit);

    // Execute query
    const tirths = await query;

    res.status(200).json({
      success: true,
      count: tirths.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
      data: tirths,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get single Tirth
// @route   GET /api/tirths/:id
// @access  Public
exports.getTirth = async (req, res) => {
  try {
    const tirth = await Tirth.findById(req.params.id);
    if (!tirth) {
      return res.status(404).json({ success: false, message: 'Tirth not found' });
    }
    res.status(200).json({ success: true, data: tirth });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Create new Tirth
// @route   POST /api/tirths
// @access  Private/Admin
exports.createTirth = async (req, res) => {
  try {
    // Add user to req.body so we know who created it
    req.body.createdBy = req.user.id;

    const tirth = await Tirth.create(req.body);
    res.status(201).json({ success: true, data: tirth });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update Tirth
// @route   PUT /api/tirths/:id
// @access  Private/Admin
exports.updateTirth = async (req, res) => {
  try {
    let tirth = await Tirth.findById(req.params.id);

    if (!tirth) {
      return res.status(404).json({ success: false, message: 'Tirth not found' });
    }

    tirth = await Tirth.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: tirth });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete Tirth
// @route   DELETE /api/tirths/:id
// @access  Private/Admin
exports.deleteTirth = async (req, res) => {
  try {
    const tirth = await Tirth.findById(req.params.id);

    if (!tirth) {
      return res.status(404).json({ success: false, message: 'Tirth not found' });
    }

    await tirth.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};