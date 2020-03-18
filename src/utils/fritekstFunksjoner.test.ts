import { mergeFritekst, splittOppFritekst } from "./fritekstFunksjoner";

const assert = require("assert");
describe("Fritekst Funksjoner", function() {
  it("should parse fritekst", () => {
    const fritekst = `## EN OVERSKRIFT HER
        
        Noe kropp på 
        meldinger 
        her
        `;
    const res = splittOppFritekst(fritekst);
    assert.equal(
      res["en overskrift her"].substring(0, 9),
      "Noe kropp på".substring(0, 9)
    );
  });
  it("should merge", () => {
    const struktTekst = {
      headline: "Some tekst"
    };
    const result = mergeFritekst(struktTekst);
    const r2 = splittOppFritekst(result);
    assert.strictEqual(struktTekst.headline, r2.headline);
  });
});
