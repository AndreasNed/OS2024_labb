import React from "react";
import { shallow } from "enzyme";
import Form from "./Form";

describe("Form components", () => {
    it("Should render without errors", () =>{
        const component = shallow(<Form />);
        const formElement = component.find(`[data-test='mainDiv']`)
        expect(formElement.length).toBe(1)
    })
})