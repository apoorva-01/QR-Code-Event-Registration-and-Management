import nc from 'next-connect';
import { fetchRowUsingMobile } from '../../utils/googleSheet';
const handler = nc();

handler.post(async (req, res) => {

    const data = await fetchRowUsingMobile(req.body.mobile)
    console.log("d",data)
    res.send(data)
});

export default handler;
