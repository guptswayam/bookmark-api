let express= require("express");
let cors= require("cors");
let app= express();
let bookmarkRouter= require("./router/bookmarkRouter");
let tagRouter= require("./router/tagRouter");

app.use(cors({origin: true}));
app.use(express.json());

app.use("/api/v1/", bookmarkRouter);
app.use("/api/v1/", tagRouter);

module.exports=app;