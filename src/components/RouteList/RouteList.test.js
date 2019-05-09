import React from "react";
import { shallow } from "enzyme";
import Card from "./Card";

describe("RouteList components", () => {
    it("Should render without errors", () => {
        const routeData = {places : [{longName:"Rome, italy"}, {longName:"Stockholm, Sweden"}],
        routes : {name:"Rome", distance : 1000, totalDuration : 1000, indicativePrices : [{priceLow:100, priceHigh:200, currency:"USD"}]}}
        const component = shallow(<RouteList routeData={routeData} />)
        const cardElement = component.find(`[data-test="info"]`)
        expect(cardElement.length).toBe(1)
    })
})