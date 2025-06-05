import app from './app.js'; // se coloca .js cuando son modulos propios, si son modulos de node no es necesario
import { connectDB } from './db.js';

connectDB();
app.listen(3000)
console.log('Server is running on port 3000');