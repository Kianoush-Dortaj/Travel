import * as dotenv from 'dotenv';
dotenv.config();

export const ServerConfig={
    port:process.env.SERVER_PORT
}

export default ServerConfig;