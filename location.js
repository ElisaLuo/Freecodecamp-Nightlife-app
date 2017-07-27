var GitHubApi = require("node-github");

var github = new GitHubApi({
    version: "3.0.0"
});
github.authenticate({
    type: "basic",
    username: "ElisaLuo",
    password: "asdf"
}, function(err, res) {
        if(err){
                console.log(err);
        }
    console.log("authentication successful");
});