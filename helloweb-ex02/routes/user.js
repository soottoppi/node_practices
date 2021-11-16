const express = require("express");
const router = express.Router();

// route => 컨트롤러 같은 역할
// user?no=10
router.route("").get(function (req, res) {
    res.render("user/info", {
        no: req.query.no || 0, // req에 no가 없으면 default로 0 넣기
    });
});

router.route("/info/:no").get(function (req, res) {
    res.render("user/info", {
        no: req.params.no || 0, // req에 no가 없으면 default로 0 넣기
    });
});

router.route("/join").get(function (req, res) {
    res.render("user/join");
});

router.route("/join").post(function (req, res) {
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;
