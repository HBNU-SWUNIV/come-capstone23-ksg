"use strict";

const PORT = 8080;
const app = require("../server");
app.listen(PORT, function(){
    console.log('server is open')
});
