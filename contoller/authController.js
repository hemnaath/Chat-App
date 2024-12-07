const fs = require("fs");
const path = require("path");

exports.homePage = (req, res) => {
    res.sendFile(path.join(process.cwd(), "views/home.html"));
};

exports.dashboard = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/");
    }
    const filePath = path.join(__dirname, "../views/dashboard.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error loading the dashboard page.");
        }
        const personalizedHtml = data.replace("{{USERNAME}}", req.user.displayName);
        res.send(personalizedHtml);
    });
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
};
