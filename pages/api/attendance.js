import nc from 'next-connect';
import { addAttendance } from '../../utils/googleSheet';
const handler = nc();

handler.post(async (req, res) => {
    addAttendance(req.body.email);
    res.send("success")
});

export default handler;
