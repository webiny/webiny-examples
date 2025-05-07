import { FunnelModel } from "../FunnelModel";

describe("Funnel Steps", () => {
    test("should always have success step", async () => {
        const funnel = new FunnelModel({
            steps: [
                { id: "step1", title: "Step 1" },
                { id: "step2", title: "Step 2" }
            ]
        });

        expect(funnel.steps.length).toBe(3);
        expect(funnel.getStep("success")).toBeTruthy();
    });
});
