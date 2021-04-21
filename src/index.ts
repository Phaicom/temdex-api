import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { DateTime } from 'luxon';
import dotenv from 'dotenv';
import routes from './routes';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
morgan.token('localDate', function getDate() {
	const date = DateTime.now().setZone('Asia/Bangkok').setLocale('th-TH');
	return date.toLocaleString();
});
morgan.format(
	'combined',
	':remote-addr - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
);
app.use(morgan('combined'));
app.use('/api/v1', routes);

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
				case 2:
					return 'connecting';
				case 3:
					return 'disconnecting';
				default:
					return 'disconnected';
			}
		};
		console.log('connect to database: ', readyState(mongoose.connection.readyState));
	},
);

app.listen(3000, () => {
	console.log('server is listening on port 3000');
});
