const express = require("express");

const router = express.Router();
router.route("").get(function (req, res) {
    // 컨트롤러 같은 역할
    res.render("main/index");
});

module.exports = router;
