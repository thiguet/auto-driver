import {PlatformTest} from "@tsed/common";
import SuperTest from "supertest";
import {RentalController} from "../src/controllers/Rental";
import {Server} from "../src/Server";

describe("RentalController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    PlatformTest.bootstrap(Server, {
      mount: {
        "/": [RentalController]
      }
    })
  );
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("should call GET /hello-world", async () => {
    const response = await request.get("/hello-world").expect(200);

    expect(response.text).toEqual("hello");
  });
});
