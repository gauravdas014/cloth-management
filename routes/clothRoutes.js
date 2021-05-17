const express = require('express');
const { upload } = require('../utils/uploadImage');
const clothController = require('../controllers/clothController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(clothController.getAllClothes)
  .post(authController.isAuthenticated, clothController.addNewCloth);

router
  .route('/image/:clothId')
  .post(
    authController.isAuthenticated,
    upload.single('image'),
    clothController.updateClothImage
  );

router
  .route('/:clothId')
  .get(clothController.getClothById)
  .patch(authController.isAuthenticated, clothController.updateClothById)
  .delete(authController.isAuthenticated, clothController.deleteClothById);

module.exports = router;
