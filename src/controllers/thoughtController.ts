import {Request,Response} from 'express';
import { Thought, User } from '../models/index.js'

/**
 * GET All Thoughts /thoughts
 * @returns an array of Thought objects
 */
export const getAllThoughts = async(_req: Request,res: Response) => {

    try{
        const thougts = await Thought.find()
        res.json(thougts);
    }catch(e : any){
        res.status(500).json({
            message: e.message
        });
    }
}

/**
 * GET Thought based on id /thoughts/:id
 * @param string id
 * @returns a single Thought object
 */
export const getThoughtById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const thought = await Thought.findById(id);
      if (thought) {
        res.json(thought);
      } else {
        res.status(404).json({ message: 'Thought not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  /**
   * POST Thought/thoughts
   * @param object thoughText, username, userId
   * @returns the created Thought object
   */

  export const createThought = async (req:Request, res: Response) =>{
    const {thoughText, username, userId} = req.body;
    try{

        const newThought = await Thought.create({ thoughText,username});
        await User.findByIdAndUpdate(userId,{$push:{thoughts: newThought._id}})
        res.status(201).json(newThought);
    }catch(e : any){
        res.status(400).json({ message: e.message });
    }
  }

  /**
 * PUT Thought based on id /thoughts/:id
 * @param string id
 * @param object updated data
 * @returns the updated Thought object
 */
export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      } else {
        res.json(thought);
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  /**
 * DELETE Thought based on id /thoughts/:id
 * @param string id
 * @returns string
 */
export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });
  
      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      } else {
        await User.updateMany({ thoughts: thought._id }, { $pull: { thoughts: thought._id } });
        res.json({ message: 'Thought deleted!' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  

/**
 * POST Reaction to Thought /thoughts/:thoughtId/reactions
 * @param string thoughtId
 * @param object reaction
 * @returns the updated Thought object
 */
export const addReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
  
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  /**
 * DELETE Reaction from Thought /thoughts/:thoughtId/reactions/:reactionId
 * @param string thoughtId, reactionId
 * @returns the updated Thought object
 */
export const removeReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
  
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };