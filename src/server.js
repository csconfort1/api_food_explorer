require("dotenv/config");
require("express-async-errors");

const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");
const cors = require("cors");
const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());


app.use("/files/meals", express.static(uploadConfig.MEALS_FOLDER));
app.use("/files/ingredients", express.static(uploadConfig.INGREDIENTS_FOLDER));

app.use(routes);

const PORT = process.env.PORT || 5173;

app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

app.listen(PORT, () => console.log("Server is running on PORT:", PORT));