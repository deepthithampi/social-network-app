import {Request,Response} from 'express';
import { Thought, User } from '../models/index'

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

  export const createThought = async ()