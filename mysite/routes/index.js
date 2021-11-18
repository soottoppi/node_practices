// 4-4. request router
const errorRoute = require("./error");
const applicationRouter = {
    setup: function (application) {
        // const site = models.Site.findOne();

        application
            .all("*", function (req, res, next) {
                res.locals.req = req;
                res.locals.res = res;
                next(); // next를 써야 다음 라우트 setUp이 진행된다
            })

            .use("/", require("./main"))
            .use("/user", require("./user"))

            .use(errorRoute.error404)
            .use(errorRoute.error500).siteTitle = "Mysite!!"; // setTitle이라는 변수가 전역으로 사용가능하다
    },
};

// 테스트 #1
f = function () {};

// exports할 때에는 applicationRouter, f 함수 둘 다 보내지만
// index.js에서 사용할 땐 선택적으로 사용할 수 있다
module.exports = { applicationRouter, f };
