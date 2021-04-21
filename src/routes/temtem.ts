import express, { Request, Response } from 'express';
import Temtem from '../models/temtem';

const router = express.Router();

router.get('/api/temtem', [], async (req: Request, res: Response) => {
	try {
		const temtems = await Temtem.find({});
		return res.status(200).send(temtems);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.post('/api/temtem', async (req: Request, res: Response) => {
	try {
		const reqBody = req.body;
		const temtem = Temtem.build(reqBody);
		await temtem.save();
		return res.status(201).send(temtem);
	} catch (error) {
		return res.status(500).send(error);
	}
});

export default router;
