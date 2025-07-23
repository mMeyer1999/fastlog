import { Router } from 'express';
import { getEntries, addEntry, updateEntry, deleteEntry } from '../controllers/entries.controllers.js';

export const entriesRouter = Router();

entriesRouter.get('/', getEntries);
entriesRouter.post('/', addEntry);
entriesRouter.put('/:id', updateEntry);
entriesRouter.delete('/:id', deleteEntry);
