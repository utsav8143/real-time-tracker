import Dotenv from "dotenv";

Dotenv.config()

if(!process.env.PORT){
    throw new error("PORT is not defined in env")
}

const config={
    PORT:process.env.PORT
}

export default config;