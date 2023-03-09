import nc from 'next-connect';
import { addRowToSheet } from '../../utils/googleSheet';
const handler = nc();

handler.post(async (req, res) => {

    const rowData = [req.body.prefix, req.body.firstName, req.body.lastName, req.body.email, req.body.mobile, req.body.organisation, req.body.registerationType, "", req.body.address];
    console.log(rowData)
    addRowToSheet(rowData);
    res.send("success")
});

export default handler;
