const Cloth = require('../models/clothModel');
const mongoose = require('mongoose');

exports.updateClothImage = async (req, res) => {
  try {
    const imageName = req.file.filename;
    const cloth = await Cloth.findById(
      mongoose.Types.ObjectId(req.params.clothId)
    );
    cloth.image = imageName;
    await cloth.save();
    return res.status(200).json({
      status: 'success',
      cloth,
      message: 'Image updated successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.addNewCloth = async (req, res) => {
  try {
    console.log(req.user);
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        status: 'fail',
        message:
          'You are not an admin. Please login as an admin to add new cloth',
      });
    }
    const newCloth = await Cloth.create(req.body);
    res.status(201).json({
      status: 'success',
      cloth: newCloth,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllClothes = async (req, res) => {
  try {
    const clothes = await Cloth.find();
    if (!clothes) {
      return res.status(200).json({
        status: 'success',
        message: 'Currently no clothes available',
      });
    }
    return res.status(200).json({
      status: 'success',
      clothes,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getClothById = async (req, res) => {
  try {
    const cloth = await Cloth.findById(
      mongoose.Types.ObjectId(req.params.clothId)
    );
    if (!cloth) {
      return res.status(400).json({
        status: 'fail',
        message: 'No cloth exists with the entered cloth id',
      });
    }
    return res.status(200).json({
      status: 'success',
      cloth,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateClothById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        status: 'fail',
        message:
          'You are not an admin. Please login as an admin to add new cloth',
      });
    }
    const cloth = await Cloth.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.clothId),
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (!cloth) {
      return res.status(400).json({
        status: 'fail',
        message: 'NO cloth found with the given cloth ID',
      });
    }
    return res.status(200).json({
      status: 'success',
      updatedCloth: cloth,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteClothById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        status: 'fail',
        message:
          'You are not an admin. Please login as an admin to add new cloth',
      });
    }
    const cloth = await Cloth.findByIdAndDelete(
      mongoose.Types.ObjectId(req.params.clothId)
    );
    if (!cloth) {
      return res.status(400).json({
        status: 'fail',
        message: 'No cloth found with the given cloth ID',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Cloth deleted successfully',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
