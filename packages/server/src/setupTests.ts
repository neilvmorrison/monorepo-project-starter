import { Server } from "http";
import { app } from "./index";

export let server: Server;

beforeAll(() => {
  server = app.listen();
});

afterAll((done) => {
  server.close(done);
});
