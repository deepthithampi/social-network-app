import { Router } from "express";
import {
getAllThoughts,
getThoughtById,
createThought,
deleteThought,
addReaction,
removeReaction,
}from '../../controllers/thoughtController' ;

const router = Router();