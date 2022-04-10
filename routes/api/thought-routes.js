const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controllers");

router.route("/").get(getAllThoughts);

router.route("/:userId").post(addThought);

router
  .route("/:userId/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .post(addReaction)
  .delete(removeThought);

router.route("/:userId/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
