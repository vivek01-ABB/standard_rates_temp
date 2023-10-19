import { render } from "@abb-hmi/widget-test-vitest";
import "./page-one";

describe("client-page-one", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  it("says hello client-page-one", async () => {
    const { findByText } = await render("client-page-one");
    const element = await findByText("Hello client-page-one");
    expect(element.textContent).toBe("Hello client-page-one");
  });
});
