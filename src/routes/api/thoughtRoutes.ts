import { Router } from "express";
import {
getAllThoughts,
getThoughtById,
createThought,
deleteThought,
addReaction,
removeReaction,
updateThought,
}from '../../controllers/thoughtController' ;

const router = Router();

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought) ;

// /api/thoughts/:toughtId
router.route('/:thoughtId').get(getAllThoughts).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

export {router as thoughtRouter}

