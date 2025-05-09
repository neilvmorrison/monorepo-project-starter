import { Service } from "../error_logs.service";
import { db } from "../../../db/client";

describe("Service", () => {
  let service: Service;

  beforeEach(() => {
    service = new Service(db);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
