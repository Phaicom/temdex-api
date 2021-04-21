import express, { Request, Response } from 'express';
import Temtem from '../models/temtem';

const router = express.Router();

router.get('/', [], async (req: Request, res: Response) => {
	try {
		const { name = '', types } = req.query;

		let typeSearch = {};
		if (types) {
			const typesArr = types.toString().split(',');
			typeSearch = { $all: typesArr };
		} else {
			typeSearch = { $regex: '', $options: 'i' };
		}

		const temtems = await Temtem.find({
			name: { $regex: name.toString(), $options: 'i' },
			types: typeSearch,
		});
		return res.status(200).send(temtems);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.post('/', async (req: Request, res: Response) => {
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
