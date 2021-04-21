import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import temtemRouter from './routes/temtem';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const app = express();
app.use(json());
app.use(temtemRouter);

const mongoSrv = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
mongoose.connect(
	mongoSrv,
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		const readyState = (state: number) => {
			switch (state) {
				case 1:
					return 'connected';
					break;
				case 2:
					return 'connecting';
					break;
				case 3:
					return 'disconnecting';
					break;

				default:
					return 'disconnected';
					break;
			}
		};
		console.log('connect to database: ', readyState(mongoose.connection.readyState));
	},
);

app.listen(3000, () => {
	console.log('server is listening on port 3000');
});
