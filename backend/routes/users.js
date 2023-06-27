const router = require('express').Router();
const { validatePatchProfile, validatePatchAvatar, validateParamsUser } = require('../middlewares/validate');
const {
  getCurrentInfo, getUserInfo, getAllUsers, patchProfile, patchAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/me', getCurrentInfo);

router.get('/:userId', validateParamsUser, getUserInfo);

router.patch('/me', validatePatchProfile, patchProfile);

router.patch('/me/avatar', validatePatchAvatar, patchAvatar);

module.exports = router;
