const tagihanModal = require("../models/tagihan.js");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getTagihanDetails = async(req, res, next) => {
    const id = req.query.kamar;

    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
         ){
            res.status(401).json({
                message:"authorization failed"
            });
        }
        
        const token = req.headers.authorization.split(' ')[1];
        const decodedId = jwt.verify(token, 'the-super-strong-secrect');
    try {
        const [detailsUser] = await tagihanModal.getDetailsUser(id);
        const [listTagihan] = await tagihanModal.getListOrder(id);
        res.status(200).json({
            user_details: detailsUser,
            list_tagihan: listTagihan
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error !",
            data: error.stack
        });
        console.log(error.stack)
        
    }

}

module.exports = {
    getTagihanDetails
}