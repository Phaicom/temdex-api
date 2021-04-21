import mongoose from 'mongoose';
import IStats from './stats';

interface ITemtem {
	no: string;
	name: string;
	image: string;
	types: string[];
	stats: IStats;
}

interface TemtemDoc extends mongoose.Document {
	no: string;
	name: string;
	image: string;
	types: string[];
	stats: IStats;
}

interface temtemModelInterface extends mongoose.Model<TemtemDoc> {
	build(attr: ITemtem): TemtemDoc;
}

const temtemSchema = new mongoose.Schema({
	no: {
		type: String,
		require: true,
	},
	name: {
		type: String,
		require: true,
	},
	image: {
		type: String,
		require: true,
	},
	types: {
		type: [String],
		require: true,
	},
	stats: {
		type: Object,
		require: true,
	},
});

temtemSchema.statics.build = (attr: ITemtem) => {
	// eslint-disable-next-line no-use-before-define
	return new Temtem(attr);
};

const Temtem = mongoose.model<TemtemDoc, temtemModelInterface>('Temtem', temtemSchema);

export default Temtem;
