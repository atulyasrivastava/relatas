var express=require("express"),
app=express(),
bodyParser=require("body-parser"),
mongoose=require("mongoose");
methodOverride=require("method-override");
expressSanitizer=require("express-sanitizer");


//app config
mongoose.connect('mongodb://localhost/user_data', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
mongoose.set;
mongoose.set('useCreateIndex', true);
app.use(expressSanitizer());

//mongoose model config
var userSchema=new mongoose.Schema({
    login: String,
    id: Number,
    node_id: String,
    avatar_url: String,
    gravatar_id: String,
    url: String,
    html_url: String,
    followers_url: String,
    following_url: String,
    gists_url: String,
    starred_url: String,
    subscriptions_url: String,
    organizations_url: String,
    repos_url: String,
    events_url: String,
    received_events_url: String,
    type: String,
    site_admin: Boolean
})
var user=mongoose.model("user", userSchema);

// user.create(
//     {
//     login: "mojombo",
//     id: 1,
//     node_id: "MDQ6VXNlcjE=",
//     avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
//     gravatar_id: "",
//     url: "https://api.github.com/users/mojombo",
//     html_url: "https://github.com/mojombo",
//     followers_url: "https://api.github.com/users/mojombo/followers",
//     following_url: "https://api.github.com/users/mojombo/following{/other_user}",
//     gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
//     starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
//     subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
//     organizations_url: "https://api.github.com/users/mojombo/orgs",
//     repos_url: "https://api.github.com/users/mojombo/repos",
//     events_url: "https://api.github.com/users/mojombo/events{/privacy}",
//     received_events_url: "https://api.github.com/users/mojombo/received_events",
//     type: "User",
//     site_admin: false
//     },function(err,user){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(user);
// 	}
// });

app.get("/",function(req,res){
    res.redirect("/users");
})

//index route
app.get("/users",function(req,res){
    if (req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        user.find({login: regex},function(err,users){
            if(err){
                console.log("ERROR!");
            } else {
                res.render("index",{users: users});
            }
        });
    } else{
        user.find({},function(err,users){
            if(err){
                console.log("ERROR!");
            } else {
                res.render("index",{users: users});
            }
        });
    }
})

//show route
app.get("/users/:id",function(req,res){
    user.findById(req.params.id,function(err,foundUser){
        if (err) {
            res.redirect("/");
        } else {
            res.render("show",{user:foundUser});
        }
    })
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


//route
app.listen(7007,function(){
    console.log("SERVER IS RUNNING AT PORT 7007!");
})