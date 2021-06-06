var express = require("express");
var app = express();
const bodyParser = require("body-parser");

var formidable = require("express-formidable");
app.use(formidable());

var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;

var http = require("http").createServer(app);
var bcrypt = require("bcrypt");
var fileSystem = require("fs");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


var jwt = require("jsonwebtoken");
var accessTokenSecret = "myAccessTOkenSecret1234567890";


app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "ejs");

var socketIO = require("socket.io")(http);
var socketID = "";
var users = [];


var mainURL = "https://damp-oasis-60460.herokuapp.com";

socketIO.on("connection", function(socket) {
    console.log("User connected", socket.id);
    socketID = socket.id;

});

const port = process.env.PORT || 3000;

http.listen(port, function() {
    console.log('Server started.', port);

    mongoClient.connect("mongodb+srv://nicolefrancani:projetoPPADS26@projetoads.gfm0w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", function(error, client) {
        var database = client.db("my_social_network");
        console.log("Database connected.");


        app.get("/", function(req, res) {
            res.sendFile(__dirname + "/index.html");
        });


        app.get("/signup", function(request, result) {
            result.render("signup");
        });

        app.get("/pesquisador", function(request, result) {
            result.render("pesquisador");
        });



        app.post("/signup", function(request, result) {
            var name = request.fields.name;
            var username = request.fields.username;
            var date = request.fields.date;
            var cpf = request.fields.cpf;
            var email = request.fields.email;
            var password = request.fields.password;
            var gender = request.fields.gender;
            var temas = request.fields.temas;

            database.collection("users").findOne({
                $or: [{
                    "email": email
                }, {
                    "username": username
                }]
            }, function(error, user) {
                if (user == null) {
                    bcrypt.hash(password, 10, function(error, hash) {
                        database.collection("users").insertOne({
                            "name": name,
                            "username": username,
                            "date": date,
                            "cpf": cpf,
                            "email": email,
                            "estado": "",
                            "cidade": "",
                            "local": "",
                            "nivel": "",
                            "link": "",
                            "password": hash,
                            "gender": gender,
                            "profileImage": "",
                            "coverPhoto": "",
                            "dob": "",
                            "city": "",
                            "country": "",
                            "abotMe": "",
                            "temas": [temas],
                            "friends": [],
                            "pages": [],
                            "notifications": [],
                            "groups": [],
                            "posts": []
                        }, function(error, data) {
                            result.json({
                                "status": "sucess",
                                "message": "Signed up sucessfully. You can login now"

                            });
                        });
                    });
                } else {
                    result.json({
                        "status": "error",
                        "message": "Email or username already exist"
                    });
                }


            });

        });

        app.post("/pesquisador", function(request, result) {
            var name = request.fields.name;
            var username = request.fields.username;
            var date = request.fields.date;
            var email = request.fields.email;
            var estado = request.fields.estado;
            var cidade = request.fields.cidade;
            var password = request.fields.password;

            database.collection("users").findOne({
                $or: [{
                    "email": email
                }, {
                    "username": username
                }]
            }, function(error, user) {
                if (user == null) {
                    bcrypt.hash(password, 10, function(error, hash) {
                        database.collection("users").insertOne({
                            "name": name,
                            "username": username,
                            "date": date,
                            "email": email,
                            "estado": estado,
                            "cidade": cidade,
                            "password": hash,
                            "profileImage": "",
                            "coverPhoto": "",
                            "dob": "",
                            "city": "",
                            "country": "",
                            "abotMe": "",
                            "friends": [],
                            "pages": [],
                            "movies": [],
                            "series": [],
                            "notifications": [],
                            "groups": [],
                            "posts": []
                        }, function(error, data) {
                            result.json({
                                "status": "sucess",
                                "message": "Registro realizado com sucesso. Você pode fazer login agora."

                            });
                        });
                    });
                } else {
                    result.json({
                        "status": "error",
                        "message": "Email ou username ja existentes."
                    });
                }


            });

        });

        app.get("/login", function(request, result) {
            result.render("login");
        });

        app.post("/login", function(request, result) {
            var email = request.fields.email;
            var password = request.fields.password;
            database.collection("users").findOne({
                "email": email
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "Email não existe."
                    });
                } else {
                    bcrypt.compare(password, user.password, function(error, isVerify) {
                        if (isVerify) {
                            var accessToken = jwt.sign({ email: email }, accessTokenSecret);
                            database.collection("users").findOneAndUpdate({
                                "email": email
                            }, {
                                $set: {
                                    "accessToken": accessToken
                                }
                            }, function(error, data) {
                                result.json({
                                    "status": "success",
                                    "message": "Login realizado com sucesso.",
                                    "accessToken": accessToken,
                                });
                            });
                        } else {
                            result.json({
                                "status": "error",
                                "message": "Senha está incorreta"
                            });
                        }
                    });
                }
            });

        });

        //user Profile page
        app.get("/updateProfile", function(request, result) {
            result.render("updateProfile");
        });

        app.post("/getUser", function(request, result) {
            var accessToken = request.fields.accessToken;
            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    result.json({
                        "status": "success",
                        "message": "Record has been fetched.",
                        "data": user
                    });
                }

            });
        });

        app.get("/logout", function(request, result) {
            result.redirect("/login");
        });

        //profile cover photo update
        app.post("/uploadCoverPhoto", function(request, result) {
            var accessToken = request.fields.accessToken;
            var coverPhoto = "";

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login  again."
                    });
                } else {
                    if (request.files.coverPhoto.size > 0 && request.files.coverPhoto.type.includes("image")) {
                        //previous cover photo remove
                        if (user.coverPhoto != "") {
                            fileSystem.unlink(user.coverPhoto, function(error) {

                            });
                        }
                        coverPhoto = "public/images/" + new Date().getTime() + "-" + request.files.coverPhoto.name;
                        fileSystem.rename(request.files.coverPhoto.path, coverPhoto, function(error) {

                        });
                        database.collection("users").updateOne({
                            "accessToken": accessToken
                        }, {
                            $set: {
                                "coverPhoto": coverPhoto
                            }
                        }, function(error, data) {
                            result.json({
                                "status": "status",
                                "message": "Cover photo has been updated.",
                                "data": mainURL + "/" + coverPhoto
                            });
                        });
                    } else {
                        result.json({
                            "status": "error",
                            "message": "Please select valid image."
                        });
                    }
                }
            });
        });

        //admin section



        ////////////////////////////////////////////////////////

        app.post("/uploadProfileImage", function(request, result) {
            var accessToken = request.fields.accessToken;
            var profileImage = "";

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login  again."
                    });
                } else {
                    if (request.files.profileImage.size > 0 && request.files.profileImage.type.includes("image")) {
                        //previous cover photo remove
                        if (user.profileImage != "") {
                            fileSystem.unlink(user.profileImage, function(error) {

                            });
                        }
                        profileImage = "public/images/" + new Date().getTime() + "-" + request.files.profileImage.name;
                        fileSystem.copyFile(request.files.profileImage.path, profileImage, function(error) {

                        });
                        database.collection("users").updateOne({
                            "accessToken": accessToken
                        }, {
                            $set: {
                                "profileImage": profileImage
                            }
                        }, function(error, data) {
                            result.json({
                                "status": "status",
                                "message": "Profile image has been updated.",
                                "data": mainURL + "/" + profileImage
                            });
                        });
                    } else {
                        result.json({
                            "status": "error",
                            "message": "Please select valid image."
                        });
                    }
                }
            });
        });
        //update profile		
        app.post("/updateProfile", function(request, result) {
            var accessToken = request.fields.accessToken;
            var name = request.fields.name;
            var date = request.fields.date;
            var estado = request.fields.estado;
            var cidade = request.fields.cidade;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login aagain."
                    });
                } else {
                    database.collection("users").updateOne({
                        "accessToken": accessToken
                    }, {
                        $set: {
                            "name": name,
                            "estado": estado,
                            "cidade": cidade,
                            "date": date

                        }
                    }, function(error, data) {
                        result.json({
                            "status": "status",
                            "message": "Profile has been updated."
                        });
                    });
                }
            });
        });

        app.get("/home", function(request, result) {
            database.collection("posts").find().toArray(function(error, posts) {
                result.render("home", { "posts": posts });
            });

        });

        app.post("/addPost", function(request, result) {

            var accessToken = request.fields.accessToken;
            var caption = request.fields.caption;
            var image = "";
            var video = "";
            var type = request.fields.type;
            var createdAt = new Date().getTime();
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    if (request.files.image.size > 0 && request.files.image.type.includes("image")) {
                        image = "public/images/" + new Date().getTime() + "-" + request.files.image.name;
                        fileSystem.copyFile(request.files.image.path, image, function(error) {
                            //
                        });
                    }

                    if (request.files.video.size > 0 && request.files.video.type.includes("video")) {
                        video = "public/videos/" + new Date().getTime() + "-" + request.files.video.name;
                        fileSystem.copyFile(request.files.video.path, video, function(error) {
                            //
                        });
                    }

                    // add type for pagepost
                    if (type == "page_post") {
                        database.collection("pages").findOne({
                            "_id": ObjectId(_id)
                        }, function(error, page) {
                            if (page == null) {
                                result.json({
                                    "status": "error",
                                    "message": "Page does not exist."
                                });
                                return;
                            } else {
                                if (page.user._id.toString() != user._id.toString()) {
                                    result.json({
                                        "status": "error",
                                        "message": "Sorry, you do not own this page."
                                    });
                                    return;
                                }
                                database.collection("posts").insertOne({
                                    "caption": caption,
                                    "image": image,
                                    "video": video,
                                    "type": type,
                                    "createdAt": createdAt,
                                    "likers": [],
                                    "comments": [],
                                    "shares": [],
                                    "user": {
                                        "_id": page._id,
                                        "name": page.name,
                                        "profileImage": page.coverPhoto
                                    }
                                }, function(error, data) {
                                    result.json({
                                        "status": "success",
                                        "message": "Post has been uploaded."
                                    });
                                });
                            }
                        });
                    }
                    // add type for grouppost
                    else if (type == "group_post") {
                        database.collection("groups").findOne({
                            "_id": ObjectId(_id)
                        }, function(error, group) {
                            if (group == null) {
                                result.json({
                                    "status": "error",
                                    "message": "Group does not exist."
                                });
                                return;
                            } else {
                                var isMember = false
                                for (var a = 0; a < group.members.length; a++) {
                                    var member = group.members[a];

                                    if (member._id.toString() == user._id.toString()) {
                                        isMember = true;
                                        break;
                                    }
                                }
                                if (!isMember) {
                                    result.json({
                                        "status": "error",
                                        "message": "Sorry, you are not a member of this group"
                                    });
                                    return;
                                }
                                database.collection("posts").insertOne({
                                    "caption": caption,
                                    "image": image,
                                    "video": video,
                                    "type": type,
                                    "createdAt": createdAt,
                                    "likers": [],
                                    "comments": [],
                                    "shares": [],
                                    "user": {
                                        "_id": group._id,
                                        "name": group.name,
                                        "profileImage": group.coverPhoto
                                    },
                                    "uploader": {
                                        "_id": user._id,
                                        "name": user.name,
                                        "username": user.username,
                                        "profileImage": user.coverPhoto
                                    }
                                }, function(error, data) {
                                    result.json({
                                        "status": "success",
                                        "message": "Post has been uploaded."
                                    });
                                });
                            }
                        });
                    } else {
                        database.collection("posts").insertOne({
                            "caption": caption,
                            "image": image,
                            "video": video,
                            "type": type,
                            "createdAt": createdAt,
                            "likers": [],
                            "comments": [],
                            "shares": [],
                            "user": {
                                "_id": user._id,
                                "name": user.name,
                                "username": user.username,
                                "profileImage": user.profileImage
                            }
                        }, function(error, data) {

                            database.collection("users").updateOne({
                                "accessToken": accessToken
                            }, {
                                $push: {
                                    "posts": {
                                        "_id": data.insertedId,
                                        "caption": caption,
                                        "image": image,
                                        "video": video,
                                        "type": type,
                                        "createdAt": createdAt,
                                        "likers": [],
                                        "comments": [],
                                        "shares": []
                                    }
                                }
                            }, function(error, data) {

                                result.json({
                                    "status": "success",
                                    "message": "Post has been uploaded."
                                });
                            });
                        });
                    }

                }
            });
        });


        app.post("/getBookComments", function(request, result) {
            var accessToken = request.fields.accessToken;
            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    var ids = [];
                    ids.push(user._id);


                    database.collection("pages")
                        .find({
                            "comments": {
                                "user": ids
                            }
                        })
                        .sort({
                            "createdAt": -1
                        })
                        .limit(20)
                        .toArray(function(error, data) {

                            result.json({
                                "status": "success",
                                "message": "Record has been fetched",
                                "data": data
                            });
                        });
                }
            });
        });




        //like section
        app.post("/toggleLikePost", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    database.collection("posts").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, post) {
                        if (post == null) {
                            result.json({
                                "status": "error",
                                "message": "Post does not exist."
                            });
                        } else {
                            var isLiked = false;
                            for (var a = 0; a < post.likers.length; a++) {
                                var liker = post.likers[a];

                                if (liker._id.toString() == user._id.toString()) {
                                    isLiked = true;
                                    break;
                                }
                            }
                            if (isLiked) {
                                database.collection("posts").updateOne({
                                    "_id": ObjectId(_id)
                                }, {
                                    $pull: {
                                        "likers": {
                                            "_id": user._id,
                                        }
                                    }
                                }, function(error, data) {
                                    database.collection("users").updateOne({
                                        $and: [{
                                            "_id": post.user._id
                                        }, {
                                            "post._id": post._id
                                        }]
                                    }, {
                                        $pull: {
                                            "posts.$[].likers": {
                                                "_id": user._id,
                                            }
                                        }
                                    });

                                    result.json({
                                        "status": "unliked",
                                        "message": "Post foi descurtido."
                                    });
                                })
                            } else {
                                database.collection("users").updateOne({
                                    "_id": user._id
                                }, {
                                    $push: {
                                        "notifications": {
                                            "_id": ObjectId(),
                                            "type": "photo_liked",
                                            "content": user.name + " curtiu o seu post.",
                                            "profileImage": user.profileImage,
                                            "createdAt": new Date().getTime()
                                        }
                                    }
                                });

                                database.collection("posts").updateOne({
                                    "_id": ObjectId(_id)
                                }, {
                                    $push: {
                                        "likers": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage
                                        }
                                    }
                                }, function(error, data) {
                                    database.collection("users").updateOne({
                                        $and: [{
                                            "_id": post.user._id
                                        }, {
                                            "posts._id": post._id
                                        }]
                                    }, {
                                        $push: {
                                            "posts.$[].likers": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage
                                            }
                                        }
                                    });

                                    result.json({
                                        "status": "success",
                                        "message": "Post foi curtido."
                                    });
                                });
                            }
                        }
                    });
                }
            });
        });

        //comment section
        app.post("/postComment", function(request, result) {

            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;
            var comment = request.fields.comment;
            var createdAt = new Date().getTime();

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    database.collection("posts").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, post) {
                        if (post == null) {
                            result.json({
                                "status": "error",
                                "message": "Post does not exist."
                            });
                        } else {

                            var commentId = ObjectId();

                            database.collection("posts").updateOne({
                                "_id": ObjectId(_id)
                            }, {
                                $push: {
                                    "comments": {
                                        "_id": commentId,
                                        "user": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                        },
                                        "comment": comment,
                                        "createdAt": createdAt,
                                        "replies": []
                                    }
                                }
                            }, function(error, data) {

                                if (user._id.toString() != post.user._id.toString()) {
                                    database.collection("users").updateOne({
                                        "_id": post.user._id
                                    }, {
                                        $push: {
                                            "notifications": {
                                                "_id": ObjectId(),
                                                "type": "new_comment",
                                                "content": user.name + " commented on your post.",
                                                "profileImage": user.profileImage,
                                                "post": {
                                                    "_id": post._id
                                                },
                                                "isRead": false,
                                                "createdAt": new Date().getTime()
                                            }
                                        }
                                    });
                                }

                                database.collection("users").updateOne({
                                    $and: [{
                                        "_id": post.user._id
                                    }, {
                                        "posts._id": post._id
                                    }]
                                }, {
                                    $push: {
                                        "posts.$[].comments": {
                                            "_id": commentId,
                                            "user": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage,
                                            },
                                            "comment": comment,
                                            "createdAt": createdAt,
                                            "replies": []
                                        }
                                    }
                                });

                                database.collection("posts").findOne({
                                    "_id": ObjectId(_id)
                                }, function(error, updatePost) {
                                    result.json({
                                        "status": "success",
                                        "message": "Comment has been posted.",
                                        "updatePost": updatePost
                                    });
                                });
                            });

                        }
                    });
                }
            });
        });

        app.post("/postReply", function(request, result) {

            var accessToken = request.fields.accessToken;
            var postId = request.fields.postId;
            var commentId = request.fields.commentId;
            var reply = request.fields.reply;
            var createdAt = new Date().getTime();

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {



                    database.collection("pages").findOne({
                        "_id": ObjectId(postId)
                    }, function(error, post) {
                        if (post == null) {
                            result.json({
                                "status": "error",
                                "message": "pages does not exist."
                            });
                        } else {


                            var replyId = ObjectId();



                            database.collection("pages").updateOne({
                                $and: [{
                                    "_id": ObjectId(postId)
                                }, {
                                    "comments._id": ObjectId(commentId)
                                }]
                            }, {
                                $push: {
                                    "comments.$.replies": {
                                        "_id": replyId,
                                        "user": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                        },
                                        "reply": reply,
                                        "createdAt": createdAt
                                    }
                                }
                            }, function(error, data) {

                                database.collection("users").updateOne({
                                    $and: [{
                                        "_id": post.user._id
                                    }, {
                                        "pages._id": post._id
                                    }, {
                                        "pages.comments._id": ObjectId(commentId)
                                    }]
                                }, {
                                    $push: {
                                        "pages.$.comments.$[i].replies": {
                                            "_id": replyId,
                                            "user": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage,
                                            },
                                            "reply": reply,
                                            "createdAt": createdAt
                                        }
                                    }
                                }, {
                                    arrayFilters: [{ 'i._id': ObjectId(commentId) }]
                                });

                                database.collection("pages").findOne({
                                    "_id": ObjectId(postId)
                                }, function(error, updatePost) {
                                    result.json({
                                        "status": "success",
                                        "message": "Comentário postado com sucesso.",
                                        "updatePost": updatePost
                                    });
                                });
                            });

                        }
                    });
                }
            });
        });

        app.post("/filmeReply", function(request, result) {

            var accessToken = request.fields.accessToken;
            var postId = request.fields.postId;
            var commentId = request.fields.commentId;
            var reply = request.fields.reply;
            var createdAt = new Date().getTime();

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    database.collection("movies").findOne({
                        "_id": ObjectId(postId)
                    }, function(error, post) {
                        if (post == null) {
                            result.json({
                                "status": "error",
                                "message": "movies does not exist."
                            });
                        } else {

                            var replyId = ObjectId();

                            database.collection("movies").updateOne({
                                $and: [{
                                    "_id": ObjectId(postId)
                                }, {
                                    "comments._id": ObjectId(commentId)
                                }]
                            }, {
                                $push: {
                                    "comments.$.replies": {
                                        "_id": replyId,
                                        "user": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                        },
                                        "reply": reply,
                                        "createdAt": createdAt
                                    }
                                }
                            }, function(error, data) {

                                database.collection("users").updateOne({
                                    $and: [{
                                        "_id": post.user._id
                                    }, {
                                        "movies._id": post._id
                                    }, {
                                        "movies.comments._id": ObjectId(commentId)
                                    }]
                                }, {
                                    $push: {
                                        "movies.$.comments.$[i].replies": {
                                            "_id": replyId,
                                            "user": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage,
                                            },
                                            "reply": reply,
                                            "createdAt": createdAt
                                        }
                                    }
                                }, {
                                    arrayFilters: [{ 'i._id': ObjectId(commentId) }]
                                });

                                database.collection("movies").findOne({
                                    "_id": ObjectId(postId)
                                }, function(error, updatePost) {
                                    result.json({
                                        "status": "success",
                                        "message": "Comentário postado com sucesso.",
                                        "updatePost": updatePost
                                    });
                                });
                            });

                        }
                    });
                }
            });
        });

        app.post("/serieReply", function(request, result) {

            var accessToken = request.fields.accessToken;
            var postId = request.fields.postId;
            var commentId = request.fields.commentId;
            var reply = request.fields.reply;
            var createdAt = new Date().getTime();

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    database.collection("series").findOne({
                        "_id": ObjectId(postId)
                    }, function(error, post) {
                        if (post == null) {
                            result.json({
                                "status": "error",
                                "message": "series does not exist."
                            });
                        } else {

                            var replyId = ObjectId();

                            database.collection("series").updateOne({
                                $and: [{
                                    "_id": ObjectId(postId)
                                }, {
                                    "comments._id": ObjectId(commentId)
                                }]
                            }, {
                                $push: {
                                    "comments.$.replies": {
                                        "_id": replyId,
                                        "user": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                        },
                                        "reply": reply,
                                        "createdAt": createdAt
                                    }
                                }
                            }, function(error, data) {

                                database.collection("users").updateOne({
                                    $and: [{
                                        "_id": post.user._id
                                    }, {
                                        "series._id": post._id
                                    }, {
                                        "series.comments._id": ObjectId(commentId)
                                    }]
                                }, {
                                    $push: {
                                        "series.$.comments.$[i].replies": {
                                            "_id": replyId,
                                            "user": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage,
                                            },
                                            "reply": reply,
                                            "createdAt": createdAt
                                        }
                                    }
                                }, {
                                    arrayFilters: [{ 'i._id': ObjectId(commentId) }]
                                });

                                database.collection("series").findOne({
                                    "_id": ObjectId(postId)
                                }, function(error, updatePost) {
                                    result.json({
                                        "status": "success",
                                        "message": "Comentário postado com sucesso.",
                                        "updatePost": updatePost
                                    });
                                });
                            });

                        }
                    });
                }
            });
        });

        //share Post
        app.post("/sharePost", function(request, result) {

            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;
            var type = "shared";
            var createdAt = new Date().getTime();

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    database.collection("posts").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, post) {
                        if (post == null) {
                            result.json({
                                "status": "error",
                                "message": "Post does not exist."
                            });
                        } else {
                            database.collection("posts").updateOne({
                                "_id": ObjectId(_id)
                            }, {
                                $push: {
                                    "shares": {
                                        "_id": user._id,
                                        "name": user.name,
                                        "profileImage": user.profileImage
                                    }
                                }
                            }, function(error, data) {
                                database.collection("posts").insertOne({
                                    "caption": post.caption,
                                    "image": post.image,
                                    "video": post.video,
                                    "type": type,
                                    "createdAt": createdAt,
                                    "likers": [],
                                    "comments": [],
                                    "shares": [],
                                    "user": {
                                        "_id": user._id,
                                        "name": user.name,
                                        "gender": user.gender,
                                        "profileImage": user.profileImage
                                    }
                                }, function(error, data) {
                                    database.collection("users").updateOne({
                                        $and: [{
                                            "_id": post.user._id
                                        }, {
                                            "posts._id": post._id
                                        }]
                                    }, {
                                        $push: {
                                            "posts.$[].shares": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage
                                            }
                                        }
                                    });
                                    result.json({
                                        "status": "success",
                                        "message": "Post has been shared.",
                                    });
                                });
                            });
                        }
                    });
                }
            });
        });

        //search function
        app.get("/search/:query", function(request, result) {
            var query = request.params.query;
            result.render("search", {
                "query": query
            });
        });


        app.post("/search", function(request, result) {
            var query = request.fields.query;
            //search user name
            database.collection("users").find({
                "name": {
                    $regex: ".*" + query + ".*",
                    $options: "i"
                }
            }).toArray(function(error, data) {
                //search created page name
                database.collection("pages").find({
                    "name": {
                        $regex: ".*" + query + ".*",
                        $options: "i"
                    }
                }).toArray(function(error, pages) {

                    database.collection("groups").find({
                        "name": {
                            $regex: ".*" + query + ".*",
                            $options: "i"
                        }
                    }).toArray(function(error, groups) {

                        database.collection("movies").find({
                            "name": {
                                $regex: ".*" + query + ".*",
                                $options: "i"
                            }
                        }).toArray(function(error, movies) {

                            database.collection("series").find({
                                "name": {
                                    $regex: ".*" + query + ".*",
                                    $options: "i"
                                }
                            }).toArray(function(error, series) {
                                result.json({
                                    "status": "success",
                                    "message": "Record has been fetched",
                                    "data": data,
                                    "pages": pages,
                                    "movies": movies,
                                    "series": series,
                                    "groups": groups
                                });
                            });
                        });
                    });
                });
            });
        });

        app.get("/friends", function(request, result) {
            result.render("friends");
        });

        //friend Request send
        app.post("/sendFriendRequest", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    var me = user;
                    database.collection("users").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, user) {
                        if (user == null) {
                            result.json({
                                "status": "error",
                                "message": "User does not exist."
                            });
                        } else {
                            database.collection("users").updateOne({
                                "_id": ObjectId(_id)
                            }, {
                                $push: {
                                    "friends": {
                                        "_id": me._id,
                                        "name": me.name,
                                        "username": me.username,
                                        "profileImage": me.profileImage,
                                        "status": "Pending",
                                        "sentByMe": false,
                                        "inbox": []
                                    }
                                }
                            }, function(error, data) {
                                database.collection("users").updateOne({
                                    "_id": me._id
                                }, {
                                    $push: {
                                        "friends": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "username": user.username,
                                            "profileImage": user.profileImage,
                                            "status": "Pending",
                                            "sentByMe": true,
                                            "inbox": []
                                        }
                                    }
                                }, function(error, data) {
                                    result.json({
                                        "status": "success",
                                        "message": "Pedido de amizade foi enviado."
                                    })
                                });
                            });
                        }
                    });
                }
            });
        });
        app.post("/acceptFriendRequest", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    var me = user;
                    database.collection("users").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, user) {
                        if (user == null) {
                            result.json({
                                "status": "error",
                                "message": "User does not exist."
                            });
                        } else {
                            database.collection("users").updateOne({
                                "_id": ObjectId(_id)
                            }, {
                                $push: {
                                    "notifications": {
                                        "_id": ObjectId(),
                                        "type": "friend request accepted",
                                        "content": me.name + " aceitou seu pedido de amizade.",
                                        "profileImage": me.profileImage,
                                        "isRead": true,
                                        "createdAt": new Date().getTime()
                                    }

                                }
                            });

                            database.collection("users").updateOne({
                                "accessToken": accessToken
                            }, {
                                $push: {
                                    "groups": {
                                        "_id": user._id
                                    }

                                }
                            });

                            database.collection("users").updateOne({
                                $and: [{
                                    "_id": ObjectId(_id)
                                }, {
                                    "friends._id": me._id
                                }]
                            }, {
                                $set: {
                                    "friends.$.status": "Accepted"
                                }
                            }, function(error, data) {
                                database.collection("users").updateOne({
                                    $and: [{
                                        "_id": me._id
                                    }, {
                                        "friends._id": user._id
                                    }]
                                }, {
                                    $set: {
                                        "friends.$.status": "Accepted"
                                    }
                                }, function(error, data) {
                                    result.json({
                                        "status": "success",
                                        "message": "Pedido de amizade foi aceito."
                                    });
                                });

                            });
                        }
                    });
                }
            });
        });

        //friend request Unfriend section
        app.post("/unfriend", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;
            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    var me = user;
                    database.collection("users").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, user) {
                        if (user == null) {
                            result.json({
                                "status": "error",
                                "message": "User does not exist."
                            });
                        } else {
                            database.collection("users").updateOne({
                                "accessToken": accessToken
                            }, {
                                $pull: {
                                    "groups": {
                                        "_id": user._id
                                    }
                                }
                            });
                            database.collection("users").updateOne({
                                "_id": ObjectId(_id)
                            }, {
                                $pull: {
                                    "friends": {
                                        "_id": me._id
                                    }
                                }
                            }, function(error, data) {
                                database.collection("users").updateOne({
                                    "_id": me._id
                                }, {
                                    $pull: {
                                        "friends": {
                                            "_id": user._id
                                        }
                                    }
                                }, function(error, data) {
                                    result.json({
                                        "status": "success",
                                        "message": "Amigo foi removido."
                                    });
                                });
                            });
                        }
                    });
                }
            });
        });

        app.post("/findFriends", function(request, result) {

            var _id = request.fields._id;
            database.collection("users").findOne({
                "_id": ObjectId(_id)
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    var ids = [];
                    ids.push(user._id);
                    /* var username = [];
                    username.push(user.name); */



                    database.collection("users").find({

                            "friends._id": user._id,
                            "friends.status": "Accepted"

                        })
                        .toArray(function(error, data) {

                            result.json({
                                "status": "success",
                                "message": "Record has been fetched",
                                "data": data
                            });
                        });
                }
            });
        });




        //cadastrar livro
        app.get("/createPage", function(request, result) {
            result.render("createPage");
        });

        app.post("/createPage", function(request, result) {
            var accessToken = request.fields.accessToken;
            var name = request.fields.name;
            var autor = request.fields.autor;
            var ano = request.fields.ano;
            var editora = request.fields.editora;
            var pais = request.fields.pais;
            var image = request.fields.image;
            var tipo = request.fields.tipo;
            var genero = request.fields.genero;




            database.collection('users').findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    if (request.files.image.size > 0 && request.files.image.type.includes("image")) {
                        image = "public/images/" + "-" + request.files.image.name;
                        fileSystem.copyFile(request.files.image.path, image, function(error) {

                        });

                    }
                    database.collection("pages").insertOne({
                        "name": name,
                        "autor": autor,
                        "ano": ano,
                        "editora": editora,
                        "pais": pais,
                        "image": image,
                        "tipo": tipo,
                        "genero": genero,
                        "notaAvaliacao": [],
                        "likers": [],
                        "comments": [],
                        "shares": [],
                        "user": {
                            "_id": user._id,
                            "name": user.name,
                            "profileImage": user.profileImage
                        }
                    }, function(error, data) {
                        result.json({
                            "status": "success",
                            "message": "Livro cadastrado e enviado para o Administrador."
                        });
                    });
                }
            });
        });

        //comment LIVROS section
        app.post("/pageComment", function(request, result) {

            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;
            var comment = request.fields.comment;
            var notaAvaliacao = request.fields.notaAvaliacao;
            var createdAt = new Date().getTime();

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    database.collection("pages").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, page) {
                        if (page == null) {
                            result.json({
                                "status": "error",
                                "message": "Livro não existe."
                            });
                        } else {

                            var commentId = ObjectId();

                            database.collection("pages").updateOne({
                                "_id": ObjectId(_id)
                            }, {
                                $push: {
                                    "notaAvaliacao": {
                                        "notaAvaliacao": notaAvaliacao
                                    }
                                }
                            });
                            database.collection("pages").updateOne({
                                "_id": ObjectId(_id)
                            }, {
                                $push: {
                                    "comments": {
                                        "_id": commentId,
                                        "user": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                        },
                                        "comment": comment,
                                        "createdAt": createdAt,
                                        "userId": user._id,
                                        "notaAvaliacao": notaAvaliacao,
                                        "name": user.name,
                                        "profileImage": user.profileImage,
                                        "replies": [],
                                        "comments2": [],
                                        "likers2": []
                                    }
                                }
                            }, function(error, data) {


                                database.collection("users").updateOne({
                                    $and: [{
                                        "_id": page.user._id
                                    }, {
                                        "pages._id": page._id
                                    }]
                                }, {
                                    $push: {
                                        "pages.$[].comments": {
                                            "_id": commentId,
                                            "user": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage,
                                            },
                                            "comment": comment,
                                            "createdAt": createdAt,
                                            "userId": user._id,
                                            "notaAvaliacao": notaAvaliacao,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                            "replies": [],
                                            "comments2": [],
                                            "likers2": []
                                        }
                                    }
                                });

                                database.collection("pages").findOne({
                                    "_id": ObjectId(_id)
                                }, function(error, updatePost) {
                                    result.json({
                                        "status": "success",
                                        "message": "Avaliação postada.",
                                        "updatePost": updatePost
                                    });
                                });
                            });

                        }
                    });
                }
            });
        });

        //POST COMMENT NA AVALIACAO
        app.post("/avaliacaoComment", function(request, result) {

            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;
            var commentId = request.fields.commentId;
            var reply = request.fields.reply;
            var createdAt = new Date().getTime();

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    database.collection("pages").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, page) {
                        if (page == null) {
                            result.json({
                                "status": "error",
                                "message": "Page does not exist."
                            });
                        } else {

                            var replyId = ObjectId();

                            database.collection("pages").updateOne({
                                $and: [{
                                    "_id": ObjectId(_id)
                                }, {
                                    "comments._id": ObjectId(commentId)
                                }]
                            }, {
                                $push: {
                                    "comments.$.comments2": {
                                        "_id": replyId,
                                        "user": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                        },
                                        "reply": reply,
                                        "createdAt": createdAt
                                    }
                                }
                            }, function(error, data) {

                                database.collection("users").updateOne({
                                    $and: [{
                                        "_id": page.user._id
                                    }, {
                                        "pages._id": page._id
                                    }, {
                                        "pages.comments._id": ObjectId(commentId)
                                    }]
                                }, {
                                    $push: {
                                        "pages.$.comments.$[].comments2": {
                                            "_id": replyId,
                                            "user": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage,
                                            },
                                            "reply": reply,
                                            "createdAt": createdAt
                                        }
                                    }

                                });

                                database.collection("pages").findOne({
                                    "_id": ObjectId(_id)
                                }, function(error, updatePost) {
                                    result.json({
                                        "status": "success",
                                        "message": "Comentário da avaliação foi postado.",
                                        "updatePost": updatePost
                                    });
                                });
                            });

                        }
                    });
                }
            });
        });

        //comment MOVIES section
        app.post("/pqp", function(request, result) {

            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;
            var reply = request.fields.comment;
            var commentId = request.fields.commentId;
            var createdAt = new Date().getTime();

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    database.collection("pages").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, page) {
                        if (page == null) {
                            result.json({
                                "status": "error",
                                "message": "page não existe."
                            });
                        } else {

                            var commentId = ObjectId();


                            database.collection("pages").updateOne({
                                "comments._id": ObjectId(commentId)
                            }, {
                                $push: {
                                    "comments.$.comments2": {
                                        "_id": replyId,
                                        "user": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                        },
                                        "reply": reply,
                                        "createdAt": createdAt
                                    }
                                }
                            }, function(error, data) {


                                database.collection("users").updateOne({
                                    $and: [{
                                        "_id": movie.user._id
                                    }, {
                                        "pages._id": movie._id
                                    }, {
                                        "pages.comments._id": ObjectId(commentId)
                                    }]
                                }, {
                                    $push: {
                                        "pages.$.comments.$[].comments2": {
                                            "_id": replyId,
                                            "user": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage,
                                            },
                                            "reply": reply,
                                            "createdAt": createdAt
                                        }
                                    }
                                });

                                database.collection("pages").findOne({
                                    "_id": ObjectId(_id)
                                }, function(error, updatePost) {
                                    result.json({
                                        "status": "success",
                                        "message": "Avaliação postada.",
                                        "updatePost": updatePost
                                    });
                                });
                            });

                        }
                    });
                }
            });
        });

        //comment MOVIES section
        app.post("/movieComment", function(request, result) {

            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;
            var comment = request.fields.comment;
            var notaAvaliacao = request.fields.notaAvaliacao;
            var createdAt = new Date().getTime();

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    database.collection("movies").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, movie) {
                        if (movie == null) {
                            result.json({
                                "status": "error",
                                "message": "Filme não existe."
                            });
                        } else {

                            var commentId = ObjectId();

                            database.collection("movies").updateOne({
                                "_id": ObjectId(_id)
                            }, {
                                $push: {
                                    "notaAvaliacao": {
                                        "notaAvaliacao": notaAvaliacao
                                    }
                                }
                            });
                            database.collection("movies").updateOne({
                                "_id": ObjectId(_id)
                            }, {
                                $push: {
                                    "comments": {
                                        "_id": commentId,
                                        "user": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                        },
                                        "comment": comment,
                                        "createdAt": createdAt,
                                        "userId": user._id,
                                        "notaAvaliacao": notaAvaliacao,
                                        "name": user.name,
                                        "profileImage": user.profileImage,
                                        "replies": [],
                                        "likers2": []
                                    }
                                }
                            }, function(error, data) {


                                database.collection("users").updateOne({
                                    $and: [{
                                        "_id": movie.user._id
                                    }, {
                                        "movies._id": movie._id
                                    }]
                                }, {
                                    $push: {
                                        "movies.$[].comments": {
                                            "_id": commentId,
                                            "user": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage,
                                            },
                                            "comment": comment,
                                            "createdAt": createdAt,
                                            "userId": user._id,
                                            "notaAvaliacao": notaAvaliacao,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                            "replies": [],
                                            "likers2": []
                                        }
                                    }
                                });

                                database.collection("movies").findOne({
                                    "_id": ObjectId(_id)
                                }, function(error, updatePost) {
                                    result.json({
                                        "status": "success",
                                        "message": "Avaliação postada.",
                                        "updatePost": updatePost
                                    });
                                });
                            });

                        }
                    });
                }
            });
        });

        //comment SERIES section
        app.post("/serieComment", function(request, result) {

            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;
            var comment = request.fields.comment;
            var notaAvaliacao = request.fields.notaAvaliacao;
            var createdAt = new Date().getTime();

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    database.collection("series").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, serie) {
                        if (serie == null) {
                            result.json({
                                "status": "error",
                                "message": "Serie não existe."
                            });
                        } else {

                            var commentId = ObjectId();

                            database.collection("series").updateOne({
                                "_id": ObjectId(_id)
                            }, {
                                $push: {
                                    "notaAvaliacao": {
                                        "notaAvaliacao": notaAvaliacao
                                    }
                                }
                            });
                            database.collection("series").updateOne({
                                "_id": ObjectId(_id)
                            }, {
                                $push: {
                                    "comments": {
                                        "_id": commentId,
                                        "user": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                        },
                                        "comment": comment,
                                        "createdAt": createdAt,
                                        "userId": user._id,
                                        "notaAvaliacao": notaAvaliacao,
                                        "name": user.name,
                                        "profileImage": user.profileImage,
                                        "replies": [],
                                        "likers2": []
                                    }
                                }
                            }, function(error, data) {


                                database.collection("users").updateOne({
                                    $and: [{
                                        "_id": serie.user._id
                                    }, {
                                        "series._id": serie._id
                                    }]
                                }, {
                                    $push: {
                                        "series.$[].comments": {
                                            "_id": commentId,
                                            "user": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage,
                                            },
                                            "comment": comment,
                                            "createdAt": createdAt,
                                            "userId": user._id,
                                            "notaAvaliacao": notaAvaliacao,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                            "replies": [],
                                            "likers2": []
                                        }
                                    }
                                });

                                database.collection("series").findOne({
                                    "_id": ObjectId(_id)
                                }, function(error, updatePost) {
                                    result.json({
                                        "status": "success",
                                        "message": "Avaliação postada.",
                                        "updatePost": updatePost
                                    });
                                });
                            });

                        }
                    });
                }
            });
        });

        //cadastrar filme

        app.get("/createMovie", function(request, result) {
            result.render("createMovie");
        });

        app.post("/createMovie", function(request, result) {
            var accessToken = request.fields.accessToken;
            var name = request.fields.name;
            var diretor = request.fields.diretor;
            var elenco = request.fields.elenco;
            var pais = request.fields.pais;
            var ano = request.fields.ano;
            var image = request.fields.image;
            var tipo = request.fields.tipo;
            var genero = request.fields.genero;





            database.collection('users').findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    if (request.files.image.size > 0 && request.files.image.type.includes("image")) {
                        image = "public/images/" + "-" + request.files.image.name;
                        fileSystem.copyFile(request.files.image.path, image, function(error) {

                        });

                    }
                    database.collection("movies").insertOne({
                        "name": name,
                        "diretor": diretor,
                        "elenco": elenco,
                        "pais": pais,
                        "ano": ano,
                        "likers": [],
                        "image": image,
                        "tipo": tipo,
                        "genero": genero,
                        "notaAvaliacao": [],
                        "comments": [],
                        "shares": [],
                        "user": {
                            "_id": user._id,
                            "name": user.name,
                            "profileImage": user.profileImage
                        }
                    }, function(error, data) {
                        result.json({
                            "status": "success",
                            "message": "Filme cadastrado e enviado para o Administrador."
                        });
                    });

                }
            });
        });

        //cadastrar serie

        app.get("/createSerie", function(request, result) {
            result.render("createSerie");
        });

        app.post("/createSerie", function(request, result) {
            var accessToken = request.fields.accessToken;
            var name = request.fields.name;
            var diretor = request.fields.diretor;
            var elenco = request.fields.elenco;
            var pais = request.fields.pais;
            var ano = request.fields.ano;
            var temporadas = request.fields.temporadas;
            var image = request.fields.image;
            var tipo = request.fields.tipo;
            var genero = request.fields.genero;




            database.collection('users').findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    if (request.files.image.size > 0 && request.files.image.type.includes("image")) {
                        image = "public/images/" + "-" + request.files.image.name;
                        fileSystem.copyFile(request.files.image.path, image, function(error) {

                        });

                    }
                    database.collection("series").insertOne({
                        "name": name,
                        "diretor": diretor,
                        "elenco": elenco,
                        "pais": pais,
                        "ano": ano,
                        "temporadas": temporadas,
                        "tipo": tipo,
                        "genero": genero,
                        "notaAvaliacao": [],
                        "comments": [],
                        "shares": [],
                        "likers": [],
                        "image": image,
                        "user": {
                            "_id": user._id,
                            "name": user.name,
                            "profileImage": user.profileImage
                        }
                    }, function(error, data) {
                        result.json({
                            "status": "success",
                            "message": "Serie cadastrada e enviado para o Administrador."
                        });
                    });

                }
            });
        });


        //return livros

        app.get("/pages", function(request, result) {

            result.render("pages");
        });

        app.post("/getPages", function(request, result) {
            var accessToken = request.fields.accessToken;
            const sort = { length: -1 };

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    database.collection("pages").find({

                        $or: [{

                        }, {
                            "likers._id": user._id,
                            "comments._id": user._id
                        }]

                    }).sort({
                        "likers._id.length": 1
                    }).toArray(function(error, data) {
                        result.json({
                            "status": "success",
                            "message": "Record has been fetched.",
                            "data": data
                        });
                    });
                }
            });
        });

        app.get("/pagesLiked", function(request, result) {
            result.render("pagesLiked");
        });

        app.post("/likedPages", function(request, result) {
            var accessToken = request.fields.accessToken;

            database.collection("users").findOne({
                    "accessToken": accessToken
                },
                function(error, user) {
                    if (user == null) {
                        result.json({
                            "status": "error",
                            "message": "User has been logged out. Please login again."
                        });
                    } else {
                        database.collection("pages").find({
                            $or: [{
                                "user._id": user._id,
                                "likers._id": user._id
                            }, {
                                "likers._id": user._id
                            }]
                        }).toArray(function(error, data) {
                            result.json({
                                "status": "success",
                                "message": "Record has been fectched.",
                                "data": data
                            });
                        });
                    }
                });
        });

        app.get("/moviesLiked", function(request, result) {
            result.render("moviesLiked");
        });

        app.post("/likedMovies", function(request, result) {
            var accessToken = request.fields.accessToken;

            database.collection("users").findOne({
                    "accessToken": accessToken
                },
                function(error, user) {
                    if (user == null) {
                        result.json({
                            "status": "error",
                            "message": "User has been logged out. Please login again."
                        });
                    } else {
                        database.collection("movies").find({
                            $or: [{
                                "user._id": user._id,
                                "likers._id": user._id
                            }, {
                                "likers._id": user._id
                            }]
                        }).toArray(function(error, data) {
                            result.json({
                                "status": "success",
                                "message": "Record has been fectched.",
                                "data": data
                            });
                        });
                    }
                });
        });

        app.get("/seriesLiked", function(request, result) {
            result.render("seriesLiked");
        });

        app.post("/likedSeries", function(request, result) {
            var accessToken = request.fields.accessToken;

            database.collection("users").findOne({
                    "accessToken": accessToken
                },
                function(error, user) {
                    if (user == null) {
                        result.json({
                            "status": "error",
                            "message": "User has been logged out. Please login again."
                        });
                    } else {
                        database.collection("series").find({
                            $or: [{
                                "user._id": user._id,
                                "likers._id": user._id
                            }, {
                                "likers._id": user._id
                            }]
                        }).toArray(function(error, data) {
                            result.json({
                                "status": "success",
                                "message": "Record has been fectched.",
                                "data": data
                            });
                        });
                    }
                });
        });

        app.post("/getAvaliacao", function(request, result) {
            var accessToken = request.fields.accessToken;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    var commentId = ObjectId();
                    database.collection("pages").find({
                            $or: [{
                                "comments": {
                                    "user._id": user._id,
                                    "user.name": user.name,
                                    "user.profileImage": user.profileImage
                                },
                                "likers2": {
                                    "user._id": user._id
                                }

                            }, {
                                "comments.user._id": user._id
                            }]


                        }).sort({
                            "createdAt": -1
                        })
                        .limit(20)
                        .toArray(function(error, data) {
                            result.json({
                                "status": "success",
                                "message": "Record has been fetched.",
                                "data": data
                            });
                        });
                }
            });
        });

        //TIMELINE PESSOAL FILMES

        app.post("/getAvaliacaoMovie", function(request, result) {
            var accessToken = request.fields.accessToken;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {





                    var commentId = ObjectId();
                    database.collection("movies").find({
                            $or: [{
                                "comments": {
                                    "user._id": user._id,
                                    "user.name": user.name,
                                    "user.profileImage": user.profileImage
                                },
                                "likers2": {
                                    "user._id": user._id
                                }

                            }, {
                                "comments.user._id": user._id
                            }]

                        }).sort({
                            "createdAt": -1,
                            "comments.likers2._id.length": 1
                        })
                        .limit(20)
                        .toArray(function(error, data) {
                            result.json({
                                "status": "success",
                                "message": "Record has been fetched.",
                                "data": data
                            });
                        });
                }
            });
        });

        //TIMELINE PESSOAL FILMES

        app.post("/getAvaliacaoSerie", function(request, result) {
            var accessToken = request.fields.accessToken;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {





                    var commentId = ObjectId();
                    database.collection("series").find({
                            $or: [{
                                "comments": {
                                    "user._id": user._id,
                                    "user.name": user.name,
                                    "user.profileImage": user.profileImage
                                },
                                "likers2": {
                                    "user._id": user._id
                                }

                            }, {
                                "comments.user._id": user._id
                            }]

                        }).sort({
                            "createdAt": -1,
                            "comments.likers2._id.length": 1
                        })
                        .limit(20)
                        .toArray(function(error, data) {
                            result.json({
                                "status": "success",
                                "message": "Record has been fetched.",
                                "data": data
                            });
                        });
                }
            });
        });


        //return movies

        app.get("/movies", function(request, result) {
            result.render("movies");
        });

        app.post("/getMovies", function(request, result) {
            var accessToken = request.fields.accessToken;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    database.collection("movies").find({
                        $or: [{

                        }, {
                            "likers._id": user._id,
                            "comments._id": user._id
                        }]
                    }).toArray(function(error, data) {
                        result.json({
                            "status": "success",
                            "message": "Record has been fetched.",
                            "data": data
                        });
                    });
                }
            });
        });

        //return series

        app.get("/series", function(request, result) {
            result.render("series");
        });

        app.post("/getSeries", function(request, result) {
            var accessToken = request.fields.accessToken;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    database.collection("series").find({
                        $or: [{

                        }, {
                            "likers._id": user._id,
                            "comments._id": user._id
                        }]
                    }).toArray(function(error, data) {
                        result.json({
                            "status": "success",
                            "message": "Record has been fetched.",
                            "data": data
                        });
                    });
                }
            });
        });
        ////////////////////////////////////////////////////////

        //LIKE LIVROS AVALIACAO
        app.post("/toggleLikePageProfile", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out.Please login again."
                    });
                } else {
                    database.collection("pages").findOne({
                        "comments._id": ObjectId(_id)
                    }, function(error, page) {
                        if (page == null) {
                            result.json({
                                "status": "error",
                                "message": "Comment does not exist."
                            });
                        } else {
                            var isLiked = false;
                            for (var a = 0; a < page.comments.length; a++) {
                                var comment = page.comments[a];
                                if (comment.userId == _id.value) {

                                    for (var y = 0; y < comment.likers2.length; y++) {
                                        var liker = comment.likers2[y];

                                        if (liker._id.toString() == window.user._id.toString()) {
                                            isLiked = true;
                                            break;
                                        }
                                    }
                                }

                            }

                            if (isLiked == true) {
                                database.collection("pages").updateOne({
                                    $and: [{

                                    }, {
                                        "comments._id": ObjectId(_id)
                                    }]
                                }, {
                                    $pull: {
                                        "comments.$.likers2": {
                                            "_id": user._id


                                        }
                                    }
                                }, function(error, data) {
                                    result.json({
                                        "status": "unliked",
                                        "message": "Avaliação foi descurtida."
                                    });

                                })
                            } else {

                                database.collection("pages").updateOne({
                                    $and: [{

                                    }, {
                                        "comments._id": ObjectId(_id)
                                    }]
                                }, {
                                    $push: {
                                        "comments.$.likers2": {
                                            "_id": user._id


                                        }
                                    }
                                }, function(error, data) {



                                    result.json({
                                        "status": "success",
                                        "message": "Avaliação foi curtida."
                                    });
                                });

                            }
                        }
                    });
                }
            });
        });

        //LIKE LIVROS AVALIACAO
        //LIKE FILMES AVALIACAO
        app.post("/toggleLikeMovieProfile", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out.Please login again."
                    });
                } else {
                    database.collection("movies").findOne({
                        "comments._id": ObjectId(_id)
                    }, function(error, movie) {
                        if (movie == null) {
                            result.json({
                                "status": "error",
                                "message": "Comment does not exist."
                            });
                        } else {
                            var isLiked = false;
                            for (var a = 0; a < movie.comments.length; a++) {
                                var comment = movie.comments[a];
                                for (var y = 0; y < comment.likers2.length; y++) {
                                    var liker = comment.likers2[y];

                                    if (liker._id.toString() == user._id.toString()) {
                                        isLiked = true;
                                        break;
                                    }
                                }

                            }

                            if (isLiked) {
                                database.collection("movies").updateOne({
                                    $and: [{

                                    }, {
                                        "comments._id": ObjectId(_id)
                                    }]
                                }, {
                                    $pull: {
                                        "comments.$.likers2": {
                                            "_id": user._id


                                        }
                                    }
                                }, function(error, data) {
                                    result.json({
                                        "status": "unliked",
                                        "message": "Avaliação foi descurtida."
                                    });

                                })
                            } else {

                                database.collection("movies").updateOne({
                                    $and: [{

                                    }, {
                                        "comments._id": ObjectId(_id)
                                    }]
                                }, {
                                    $push: {
                                        "comments.$.likers2": {
                                            "_id": user._id


                                        }
                                    }
                                }, function(error, data) {



                                    result.json({
                                        "status": "success",
                                        "message": "Avaliação foi curtida."
                                    });
                                });

                            }
                        }
                    });
                }
            });
        });

        //LIKE LIVROS AVALIACAO
        app.post("/toggleLikeSerieProfile", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out.Please login again."
                    });
                } else {
                    database.collection("series").findOne({
                        "comments._id": ObjectId(_id)
                    }, function(error, serie) {
                        if (serie == null) {
                            result.json({
                                "status": "error",
                                "message": "Comment does not exist."
                            });
                        } else {
                            var isLiked = false;
                            for (var a = 0; a < serie.comments.length; a++) {
                                var comment = serie.comments[a];
                                if (comment.userId == _id.value) {

                                    for (var y = 0; y < comment.likers2.length; y++) {
                                        var liker = comment.likers2[y];

                                        if (liker._id.toString() == window.user._id.toString()) {
                                            isLiked = true;
                                            break;
                                        }
                                    }
                                }

                            }

                            if (isLiked == true) {
                                database.collection("series").updateOne({
                                    $and: [{

                                    }, {
                                        "comments._id": ObjectId(_id)
                                    }]
                                }, {
                                    $pull: {
                                        "comments.$.likers2": {
                                            "_id": user._id


                                        }
                                    }
                                }, function(error, data) {
                                    result.json({
                                        "status": "unliked",
                                        "message": "Avaliação foi descurtida."
                                    });

                                })
                            } else {

                                database.collection("series").updateOne({
                                    $and: [{

                                    }, {
                                        "comments._id": ObjectId(_id)
                                    }]
                                }, {
                                    $push: {
                                        "comments.$.likers2": {
                                            "_id": user._id


                                        }
                                    }
                                }, function(error, data) {



                                    result.json({
                                        "status": "success",
                                        "message": "Avaliação foi curtida."
                                    });
                                });

                            }
                        }
                    });
                }
            });
        });

        ///////////////////////////////////////////////////////

        //LIKE LIVROS AVALIACAO
        app.post("/toggleLikePageAvaliacao", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out.Please login again."
                    });
                } else {
                    database.collection("pages").findOne({
                        "comments._id": ObjectId(_id)
                    }, function(error, page) {
                        if (page == null) {
                            result.json({
                                "status": "error",
                                "message": "Comment does not exist."
                            });
                        } else {
                            var isLiked = false;
                            for (var a = 0; a < page.comments.length; a++) {
                                var comment = page.comments[a];
                                for (var y = 0; y < comment.likers2.length; y++) {
                                    var liker = comment.likers2[y];

                                    if (liker._id.toString() == user._id.toString()) {
                                        isLiked = true;
                                        break;
                                    }
                                }

                            }

                            if (isLiked) {
                                database.collection("pages").updateOne({
                                    $and: [{

                                    }, {
                                        "comments._id": ObjectId(_id)
                                    }]
                                }, {
                                    $pull: {
                                        "comments.$.likers2": {
                                            "_id": user._id


                                        }
                                    }
                                }, function(error, data) {
                                    result.json({
                                        "status": "unliked",
                                        "message": "Avaliação foi descurtida."
                                    });

                                })
                            } else {

                                database.collection("pages").updateOne({
                                    $and: [{

                                    }, {
                                        "comments._id": ObjectId(_id)
                                    }]
                                }, {
                                    $push: {
                                        "comments.$.likers2": {
                                            "_id": user._id


                                        }
                                    }
                                }, function(error, data) {



                                    result.json({
                                        "status": "success",
                                        "message": "Avaliação foi curtida."
                                    });
                                });

                            }
                        }
                    });
                }
            });
        });

        //LIKE FILMES AVALIACAO
        app.post("/toggleLikeMovieAvaliacao", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out.Please login again."
                    });
                } else {
                    database.collection("movies").findOne({
                        "comments._id": ObjectId(_id)
                    }, function(error, movie) {
                        if (movie == null) {
                            result.json({
                                "status": "error",
                                "message": "Comment does not exist."
                            });
                        } else {
                            var isLiked = false;
                            for (var a = 0; a < movie.comments.length; a++) {
                                var comment = movie.comments[a];
                                for (var y = 0; y < comment.likers2.length; y++) {
                                    var liker = comment.likers2[y];

                                    if (liker._id.toString() == user._id.toString()) {
                                        isLiked = true;
                                        break;
                                    }
                                }

                            }

                            if (isLiked) {
                                database.collection("movies").updateOne({
                                    $and: [{

                                    }, {
                                        "comments._id": ObjectId(_id)
                                    }]
                                }, {
                                    $pull: {
                                        "comments.$.likers2": {
                                            "_id": user._id


                                        }
                                    }
                                }, function(error, data) {
                                    result.json({
                                        "status": "unliked",
                                        "message": "Avaliação foi descurtida."
                                    });

                                })
                            } else {

                                database.collection("movies").updateOne({
                                    $and: [{

                                    }, {
                                        "comments._id": ObjectId(_id)
                                    }]
                                }, {
                                    $push: {
                                        "comments.$.likers2": {
                                            "_id": user._id


                                        }
                                    }
                                }, function(error, data) {



                                    result.json({
                                        "status": "success",
                                        "message": "Avaliação foi curtida."
                                    });
                                });

                            }
                        }
                    });
                }
            });
        });

        //LIKE SERIES AVALIAÇÃO
        app.post("/toggleLikeSerieAvaliacao", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out.Please login again."
                    });
                } else {
                    database.collection("series").findOne({
                        "comments._id": ObjectId(_id)
                    }, function(error, serie) {
                        if (serie == null) {
                            result.json({
                                "status": "error",
                                "message": "Comment does not exist."
                            });
                        } else {
                            var isLiked = false;
                            for (var a = 0; a < serie.comments.length; a++) {
                                var comment = serie.comments[a];
                                for (var y = 0; y < comment.likers2.length; y++) {
                                    var liker = comment.likers2[y];

                                    if (liker._id.toString() == user._id.toString()) {
                                        isLiked = true;
                                        break;
                                    }
                                }

                            }

                            if (isLiked) {
                                database.collection("series").updateOne({
                                    $and: [{

                                    }, {
                                        "comments._id": ObjectId(_id)
                                    }]
                                }, {
                                    $pull: {
                                        "comments.$.likers2": {
                                            "_id": user._id


                                        }
                                    }
                                }, function(error, data) {
                                    result.json({
                                        "status": "unliked",
                                        "message": "Avaliação foi descurtida."
                                    });

                                })
                            } else {

                                database.collection("series").updateOne({
                                    $and: [{

                                    }, {
                                        "comments._id": ObjectId(_id)
                                    }]
                                }, {
                                    $push: {
                                        "comments.$.likers2": {
                                            "_id": user._id


                                        }
                                    }
                                }, function(error, data) {



                                    result.json({
                                        "status": "success",
                                        "message": "Avaliação foi curtida."
                                    });
                                });

                            }
                        }
                    });
                }
            });
        });



        //like livros
        app.post("/toggleLikePage", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out.Please login again."
                    });
                } else {
                    database.collection("pages").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, page) {
                        if (page == null) {
                            result.json({
                                "status": "error",
                                "message": "Page does not exist."
                            });
                        } else {
                            var isLiked = false;
                            for (var a = 0; a < page.likers.length; a++) {
                                var liker = page.likers[a];

                                if (liker._id.toString() == user._id.toString()) {
                                    isLiked = true;
                                    break;
                                }
                            }

                            if (isLiked) {
                                database.collection("pages").updateOne({
                                    "_id": ObjectId(_id)
                                }, {
                                    $pull: {
                                        "likers": {
                                            "_id": user._id
                                        }
                                    }
                                }, function(error, data) {
                                    database.collection("users").updateOne({
                                        $and: [{
                                            "_id": page.user._id
                                        }, {
                                            "page._id": page._id
                                        }]
                                    }, {
                                        $pull: {
                                            "pages.$[].likers": {
                                                "_id": user._id,
                                            }
                                        }
                                    });

                                    result.json({
                                        "status": "unliked",
                                        "message": "Livro foi descurtido."
                                    });
                                })
                            } else {

                                database.collection("pages").updateOne({
                                    "_id": ObjectId(_id)
                                }, {
                                    $push: {
                                        "likers": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage
                                        }
                                    }
                                }, function(error, data) {

                                    database.collection("users").updateOne({
                                        $and: [{
                                            "_id": page.user._id
                                        }, {
                                            "pages._id": page._id
                                        }]
                                    }, {
                                        $push: {
                                            "pages.$[].likers": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage
                                            }
                                        }
                                    });

                                    result.json({
                                        "status": "success",
                                        "message": "Livro foi curtido."
                                    });
                                });

                            }
                        }
                    });
                }
            });
        });

        //like MOVIES
        app.post("/toggleLikeMovie", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out.Please login again."
                    });
                } else {
                    database.collection("movies").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, movie) {
                        if (movie == null) {
                            result.json({
                                "status": "error",
                                "message": "movie does not exist."
                            });
                        } else {
                            var isLiked = false;
                            for (var a = 0; a < movie.likers.length; a++) {
                                var liker = movie.likers[a];

                                if (liker._id.toString() == user._id.toString()) {
                                    isLiked = true;
                                    break;
                                }
                            }

                            if (isLiked) {
                                database.collection("movies").updateOne({
                                    "_id": ObjectId(_id)
                                }, {
                                    $pull: {
                                        "likers": {
                                            "_id": user._id
                                        }
                                    }
                                }, function(error, data) {
                                    database.collection("users").updateOne({
                                        $and: [{
                                            "_id": movie.user._id
                                        }, {
                                            "movie._id": movie._id
                                        }]
                                    }, {
                                        $pull: {
                                            "movies.$[].likers": {
                                                "_id": user._id,
                                            }
                                        }
                                    });

                                    result.json({
                                        "status": "unliked",
                                        "message": "Filme foi descurtido."
                                    });
                                })
                            } else {

                                database.collection("movies").updateOne({
                                    "_id": ObjectId(_id)
                                }, {
                                    $push: {
                                        "likers": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage
                                        }
                                    }
                                }, function(error, data) {

                                    database.collection("users").updateOne({
                                        $and: [{
                                            "_id": movie.user._id
                                        }, {
                                            "movies._id": movie._id
                                        }]
                                    }, {
                                        $push: {
                                            "movies.$[].likers": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage
                                            }
                                        }
                                    });

                                    result.json({
                                        "status": "success",
                                        "message": "Filme foi curtido."
                                    });
                                });

                            }
                        }
                    });
                }
            });
        });

        //like SERIES
        app.post("/toggleLikeSerie", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out.Please login again."
                    });
                } else {
                    database.collection("series").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, serie) {
                        if (serie == null) {
                            result.json({
                                "status": "error",
                                "message": "Serie não existe."
                            });
                        } else {
                            var isLiked = false;
                            for (var a = 0; a < serie.likers.length; a++) {
                                var liker = serie.likers[a];

                                if (liker._id.toString() == user._id.toString()) {
                                    isLiked = true;
                                    break;
                                }
                            }

                            if (isLiked) {
                                database.collection("series").updateOne({
                                    "_id": ObjectId(_id)
                                }, {
                                    $pull: {
                                        "likers": {
                                            "_id": user._id
                                        }
                                    }
                                }, function(error, data) {
                                    database.collection("users").updateOne({
                                        $and: [{
                                            "_id": serie.user._id
                                        }, {
                                            "serie._id": serie._id
                                        }]
                                    }, {
                                        $pull: {
                                            "series.$[].likers": {
                                                "_id": user._id,
                                            }
                                        }
                                    });

                                    result.json({
                                        "status": "unliked",
                                        "message": "Serie foi descurtida."
                                    });
                                })
                            } else {

                                database.collection("series").updateOne({
                                    "_id": ObjectId(_id)
                                }, {
                                    $push: {
                                        "likers": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage
                                        }
                                    }
                                }, function(error, data) {

                                    database.collection("users").updateOne({
                                        $and: [{
                                            "_id": serie.user._id
                                        }, {
                                            "series._id": serie._id
                                        }]
                                    }, {
                                        $push: {
                                            "series.$[].likers": {
                                                "_id": user._id,
                                                "name": user.name,
                                                "profileImage": user.profileImage
                                            }
                                        }
                                    });

                                    result.json({
                                        "status": "success",
                                        "message": "Serie foi curtida."
                                    });
                                });

                            }
                        }
                    });
                }
            });
        });

        //create Group
        app.get("/createGroup", function(request, result) {
            result.render("createGroup");
        });

        app.post("/createGroup", function(request, result) {

            var accessToken = request.fields.accessToken;
            var name = request.fields.name;
            var additionalInfo = request.fields.additionalInfo;
            var coverPhoto = "";

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    if (request.files.coverPhoto.size > 0 && request.files.coverPhoto.type.includes("image")) {
                        coverPhoto = "public/images/" + new Date().getTime() + "-" + request.files.coverPhoto.name;
                        fileSystem.copyFile(request.files.coverPhoto.path, coverPhoto, function(error) {
                            //
                        });

                        database.collection("groups").insertOne({
                            "name": name,
                            "additionalInfo": additionalInfo,
                            "coverPhoto": coverPhoto,
                            "members": [{
                                "_id": user._id,
                                "name": user.name,
                                "profileImage": user.profileImage,
                                "status": "Accepted"
                            }],
                            "user": {
                                "_id": user._id,
                                "name": user.name,
                                "profileImage": user.profileImage
                            }
                        }, function(error, data) {
                            database.collection("users").updateOne({
                                "accessToken": accessToken
                            }, {
                                $push: {
                                    "groups": {
                                        "_id": data.insertedId,
                                        "name": name,
                                        "coverPhoto": coverPhoto,
                                        "status": "Accepted"
                                    }
                                }
                            }, function(error, data) {
                                result.json({
                                    "status": "success",
                                    "message": "Group has been created."
                                });
                            });
                        });
                    } else {
                        result.json({
                            "status": "error",
                            "message": "Please select a cover photo."
                        });
                    }
                }
            })
        });
        app.get("/groups", function(request, result) {
            result.render("groups");
        })

        app.post("/getGroups", function(request, result) {
            var accessToken = request.fields.accessToken;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {

                    database.collection("groups").find({
                        $or: [{
                            "user._id": user._id
                        }, {
                            "members._id": user._id
                        }]
                    }).toArray(function(error, data) {
                        result.json({
                            "status": "success",
                            "message": "Record has been fetched.",
                            "data": data
                        });
                    });
                }
            });
        });
        //group page id get
        app.get("/group/:_id", function(request, result) {
            var _id = request.params._id;

            database.collection("groups").findOne({
                "_id": ObjectId(_id)
            }, function(error, group) {
                if (group == null) {
                    result.json({
                        "status": "error",
                        "message": "Group does not exist."
                    });
                } else {
                    result.render("singleGroup", {
                        "_id": _id
                    });
                }
            });
        });

        app.post("/getGroupDetail", function(request, result) {
            var _id = request.fields._id;

            database.collection("groups").findOne({
                "_id": ObjectId(_id)
            }, function(error, group) {
                if (group == null) {
                    result.json({
                        "status": "error",
                        "message": "Group does not exist."
                    });
                } else {

                    database.collection("posts").find({
                        $and: [{
                            "user._id": group._id
                        }, {
                            "type": "group_post"
                        }]
                    }).toArray(function(error, posts) {
                        result.json({
                            "status": "success",
                            "message": "Record has been fetched.",
                            "data": group,
                            "posts": posts
                        });
                    });
                }
            });
        });

        app.post("/toggleJoinGroup", function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged Out. Please login agein."
                    });
                } else {
                    database.collection("groups").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, group) {
                        if (group == null) {
                            result.json({
                                "status": "error",
                                "message": "Group does not exist."
                            });
                        } else {

                            var isMember = false;
                            for (var a = 0; a < group.members.length; a++) {
                                var member = group.members[a];

                                if (member._id.toString() == user._id.toString()) {
                                    isMember = true;
                                    break;
                                }
                            }

                            if (isMember) {
                                database.collection("groups").updateOne({
                                    "_id": ObjectId(_id)
                                }, {
                                    $pull: {
                                        "members": {
                                            "_id": user._id
                                        }
                                    }
                                }, function(error, data) {
                                    database.collection("users").updateOne({
                                        "accessToken": accessToken
                                    }, {
                                        $pull: {
                                            "groups": {
                                                "_id": ObjectId(_id)
                                            }
                                        }
                                    }, function(error, data) {
                                        result.json({
                                            "status": "leaved",
                                            "message": "Group has been left."
                                        });
                                    });
                                });
                            } else {
                                database.collection("groups").updateOne({
                                    "_id": ObjectId(_id)
                                }, {
                                    $push: {
                                        "members": {
                                            "_id": user._id,
                                            "name": user.name,
                                            "profileImage": user.profileImage,
                                            "status": "Pending"
                                        }
                                    }
                                }, function(error, data) {

                                    database.collection("users").updateOne({
                                        "accessToken": accessToken
                                    }, {
                                        $push: {
                                            "groups": {
                                                "_id": group._id,
                                                "name": group.name,
                                                "coverPhoto": group.coverPhoto,
                                                "status": "Pending"
                                            }
                                        }
                                    }, function(error, data) {

                                        database.collection("users").updateOne({
                                            "_id": group.user._id
                                        }, {
                                            $push: {
                                                "notifications": {
                                                    "_id": ObjectId(),
                                                    "type": "group_join_request",
                                                    "content": user.name + " juntou ao seu grupo.",
                                                    "profileImage": user.profileImage,
                                                    "groupId": group._id,
                                                    "userId": user._id,
                                                    "status": "Pending",
                                                    "createdAt": new Date().getTime()
                                                }
                                            }
                                        });

                                        result.json({
                                            "status": "success",
                                            "message": "Você entrou no grupo."
                                        });
                                    });
                                });
                            }
                        }
                    });
                }
            });
        });

        app.get("/notifications", function(request, result) {
            result.render("notifications");
        });




        app.get("/user/:_id", function(request, result) {
            var _id = request.params._id;

            database.collection("users").findOne({
                "_id": ObjectId(_id)
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User does not exist."
                    });
                } else {
                    result.render("userProfile", {
                        "_id": _id
                    });
                }
            });


        });



        app.post("/getUserDetails", function(request, result) {
            var _id = request.fields._id;

            database.collection("users").findOne({
                "_id": ObjectId(_id)
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User does not exist."
                    });
                } else {
                    result.json({
                        "status": "success",
                        "message": "Record has been fetched.",
                        "data": user
                    });

                }
            });
        });

        app.post("/postDetails", function(request, result) {
            var _id = request.fields._id;

            database.collection("posts").findOne({
                "_id": ObjectId(_id)
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "Post does not exist."
                    });
                } else {
                    result.json({
                        "status": "success",
                        "message": "Record has been fetched.",
                        "posts": posts

                    });

                }
            });
        });

        //app.get("/doDelete", function(request, result){

        //	console.log("doDeleteeeeeeeeee");
        //	var _id = request.params._id;

        //	database.collection("posts").deleteOne({
        //			"_id": ObjectId(_id)
        //		}, function(error, data){
        //			console.log(error);
        //			console.log(data);
        //		});
        //});

        app.get("/post/:_id", function(request, result) {
            var _id = request.params._id;

            database.collection("posts").findOne({
                "_id": ObjectId(_id)
            }, function(error, post) {
                if (post == null) {
                    result.json({
                        "status": "error",
                        "message": "Post does not exist."
                    });
                } else {
                    result.render("editPost", {
                        "_id": _id
                    });
                }
            });
        });



        app.get("/getPerfil", function(request, result) {
            result.render("getPerfil");
        });

        app.post("/getPerfil", function(request, result) {
            var _id = request.fields._id;

            database.collection("users").findOne({
                "_id": ObjectId(_id)
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User does not exist."
                    });
                } else {
                    result.json({
                        "status": "success",
                        "message": "Record has been fetched.",
                        "data": user
                    });

                }
            });
        });

        app.post("/nada", function(request, result) {
            var _id = request.params._id;
            database.collection("posts").findOne({
                "_id": ObjectId(_id)
            }, function(error, post) {
                if (post == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                }
                for (var a = 0; a < user.pages.length; a++) {
                    ids.push(user.pages[a]._id);
                }

                database.collection("posts").find({
                        "user._id": {
                            $in: ids
                        }
                    })
                    .sort({
                        "createdAt": -1
                    })
                    .limit(5)
                    .toArray(function(error, data) {

                        result.json({
                            "status": "success",
                            "message": "Record has been fetched",
                            "data": data
                        });
                    });

            });
        });

        app.delete('/post/:id', (req, res) => {
            db.collection('post').remove({ _id: mongodb.ObjectID(req.params.id) }, (err, result) => {
                if (err) return console.log(err)
                console.log(req.body)
                res.redirect('/')
            })
        });

        app.post("/getPosts", function(request, result) {

            var accessToken = request.fields.accessToken;
            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    var ids = [];
                    ids.push(user._id);
                    /* var username = [];
                    username.push(user.name); */



                    database.collection("pages").find({
                            "comments.user._id": user._id

                        })
                        .sort({
                            "createdAt": -1
                        })
                        .limit(5)
                        .toArray(function(error, data) {

                            result.json({
                                "status": "success",
                                "message": "Record has been fetched",
                                "data": data
                            });
                        });
                }
            });
        });

        app.post("/getFilmes", function(request, result) {

            var accessToken = request.fields.accessToken;
            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    var ids = [];
                    ids.push(user._id);
                    /* var username = [];
                    username.push(user.name); */



                    database.collection("movies").find({
                            "comments.user._id": user._id

                        })
                        .sort({
                            "createdAt": -1
                        })
                        .limit(20)
                        .toArray(function(error, data) {

                            result.json({
                                "status": "success",
                                "message": "Record has been fetched",
                                "data": data
                            });
                        });
                }
            });
        });

        app.post("/getSeriesPerfil", function(request, result) {

            var accessToken = request.fields.accessToken;
            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    var ids = [];
                    ids.push(user._id);
                    /* var username = [];
                    username.push(user.name); */



                    database.collection("series").find({
                            "comments.user._id": user._id

                        })
                        .sort({
                            "createdAt": -1
                        })
                        .limit(20)
                        .toArray(function(error, data) {

                            result.json({
                                "status": "success",
                                "message": "Record has been fetched",
                                "data": data
                            });
                        });
                }
            });
        });

        app.post("/getFriendsProfile", function(request, result) {

            var _id = request.fields._id;
            database.collection("users").findOne({
                "_id": ObjectId(_id)
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });

                }
            });
        });




        app.post("/getTimeline", function(request, result) {

            var _id = request.fields._id;
            database.collection("users").findOne({
                "_id": ObjectId(_id)
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    var ids = [];
                    ids.push(user._id);
                    /* var username = [];
                    username.push(user.name); */



                    database.collection("pages").find({

                            "comments.user._id": {
                                $in: ids
                            },


                        })
                        .sort({
                            "createdAt": -1,
                            "comments.likers2._id.length": 1
                        })
                        .limit(20)
                        .toArray(function(error, data) {

                            result.json({
                                "status": "success",
                                "message": "Record has been fetched",
                                "data": data
                            });
                        });
                }
            });
        });

        app.post("/getTimeline2", function(request, result) {

            var _id = request.fields._id;
            database.collection("users").findOne({
                "_id": ObjectId(_id)
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    var ids = [];
                    ids.push(user._id);
                    /* var username = [];
                    username.push(user.name); */



                    database.collection("movies").find({

                            "comments.user._id": {
                                $in: ids
                            }

                        })
                        .sort({
                            "createdAt": -1
                        })
                        .limit(20)
                        .toArray(function(error, data) {

                            result.json({
                                "status": "success",
                                "message": "Record has been fetched",
                                "data": data
                            });
                        });
                }
            });
        });

        app.post("/getTimeline3", function(request, result) {

            var _id = request.fields._id;
            database.collection("users").findOne({
                "_id": ObjectId(_id)
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    var ids = [];
                    ids.push(user._id);
                    /* var username = [];
                    username.push(user.name); */



                    database.collection("series").find({

                            "comments.user._id": {
                                $in: ids
                            }

                        })
                        .sort({
                            "createdAt": -1
                        })
                        .limit(20)
                        .toArray(function(error, data) {

                            result.json({
                                "status": "success",
                                "message": "Record has been fetched",
                                "data": data
                            });
                        });
                }
            });
        });


        app.post("/delete-post", async function(request, result) {
            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;

            var user = await database.collection("users").findOne({
                "accessToken": accessToken
            });

            if (user == null) {
                result.json({
                    "status": "error",
                    "message": "User has been logged out. Please login again."
                });
                return;
            }

            const post = await database.collection("pages").findOne({
                "_id": ObjectId(_id)

            });

            if (post == null) {
                result.json({
                    "status": "error",
                    "message": "Something went wrong."
                });
                return;
            }

            await database.collection("pages").deleteOne({
                "_id": ObjectId(_id)

            });

            result.json({
                "status": "success",
                "message": "Cadastro de livro deletado."
            });

        });

        app.get("/admin", async function(request, result) {
            result.render("admin");
        });

        app.get("/admin-filmes", async function(request, result) {
            result.render("admin-filmes");
        });

        app.get("/admin-series", async function(request, result) {
            result.render("admin-series");
        });

        app.post("/delete-page", function(request, result) {

            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;


            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {



                    database.collection("pages").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, post) {
                        if (post == null) {
                            result.json({
                                "status": "error",
                                "message": "pages does not exist."
                            });
                        } else {

                            database.collection("pages").deleteOne({
                                "_id": ObjectId(_id)
                            }, function(error, updatePost) {
                                result.json({
                                    "status": "success",
                                    "message": "Livro deletado com suceeso.",
                                    "updatePost": updatePost
                                });
                            });
                        }
                    });
                }
            });
        });

        app.post("/delete-movie", function(request, result) {

            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;


            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {



                    database.collection("movies").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, post) {
                        if (post == null) {
                            result.json({
                                "status": "error",
                                "message": "movie does not exist."
                            });
                        } else {

                            database.collection("movies").deleteOne({
                                "_id": ObjectId(_id)
                            }, function(error, updatePost) {
                                result.json({
                                    "status": "success",
                                    "message": "Filme deletado com suceeso.",
                                    "updatePost": updatePost
                                });
                            });
                        }
                    });
                }
            });
        });

        app.post("/delete-serie", function(request, result) {

            var accessToken = request.fields.accessToken;
            var _id = request.fields._id;


            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {



                    database.collection("series").findOne({
                        "_id": ObjectId(_id)
                    }, function(error, post) {
                        if (post == null) {
                            result.json({
                                "status": "error",
                                "message": "serie does not exist."
                            });
                        } else {

                            database.collection("series").deleteOne({
                                "_id": ObjectId(_id)
                            }, function(error, updatePost) {
                                result.json({
                                    "status": "success",
                                    "message": "Série deletada com suceeso.",
                                    "updatePost": updatePost
                                });
                            });
                        }
                    });
                }
            });
        });

        app.get("/gerente", async function(request, result) {
            result.render("gerente");
        });

        app.post("/getGrafico", function(request, result) {
            var accessToken = request.fields.accessToken;

            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    database.collection("users").find({

                        $or: [{

                        }, {
                            "friends.status": "Accepted"
                        }]
                    }).toArray(function(error, data) {
                        result.json({
                            "status": "success",
                            "message": "Record has been fetched.",
                            "data": data
                        });
                    });
                }
            });
        });

        // SEÇÃO DE SUGESTÕES

        app.post("/getSuggestBooks", function(request, result) {
            var accessToken = request.fields.accessToken;
            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    database.collection("pages").aggregate([{ $sample: { size: 4 } }]).toArray(function(error, data) {
                        result.json({
                            "status": "success",
                            "message": "Record has been fetched.",
                            "data": data
                        });
                    });
                }
            });
        });

        app.post("/getSuggestMovies", function(request, result) {
            var accessToken = request.fields.accessToken;
            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    database.collection("movies").aggregate([{ $sample: { size: 4 } }]).toArray(function(error, data) {
                        result.json({
                            "status": "success",
                            "message": "Record has been fetched.",
                            "data": data
                        });
                    });
                }
            });
        });

        app.post("/getSuggestSeries", function(request, result) {
            var accessToken = request.fields.accessToken;
            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    database.collection("series").aggregate([{ $sample: { size: 4 } }]).toArray(function(error, data) {
                        result.json({
                            "status": "success",
                            "message": "Record has been fetched.",
                            "data": data
                        });
                    });
                }
            });
        });

        app.get("/suggestBooks", function(request, result) {
            result.render("suggestBooks");
        });
        app.get("/suggestMovies", function(request, result) {
            result.render("suggestMovies");
        });
        app.get("/suggestSeries", function(request, result) {
            result.render("suggestSeries");
        });

        app.post("/getSuggestFriends", function(request, result) {
            var accessToken = request.fields.accessToken;
            database.collection("users").findOne({
                "accessToken": accessToken
            }, function(error, user) {
                if (user == null) {
                    result.json({
                        "status": "error",
                        "message": "User has been logged out. Please login again."
                    });
                } else {
                    database.collection("users").aggregate([{ $sample: { size: 5 } }]).toArray(function(error, data) {
                        result.json({
                            "status": "success",
                            "message": "Record has been fetched.",
                            "data": data
                        });
                    });
                }
            });
        });

        app.get("/suggestFriends", function(request, result) {
            result.render("suggestFriends");
        });


    });
});