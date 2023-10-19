import { render } from "@abb-hmi/widget-test-vitest";
import "./navigator";

describe("client-navigator", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  it("says hello client-navigator", async () => {
    const { findByText } = await render("client-navigator");
    const element = await findByText("Hello client-navigator");
    expect(element.textContent).toBe("Hello client-navigator");
  });
});
