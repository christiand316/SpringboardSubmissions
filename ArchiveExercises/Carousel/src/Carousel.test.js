
import React from "react";
import { fireEvent, render, querySelector, getByText } from '@testing-library/react'
import TEST_IMAGES from "./_testCommon.js";
import Carousel from "./Carousel";

it('renders without crashing', function() {
    render(<Carousel />)
})

it("matches snapshot", function() {
    const {asFragment} = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
});

it('displays the correct image upon the right arrow being clicked', function() {
    const { screen } = render(
        <Carousel
          photos={TEST_IMAGES}
          title="images for testing"
        />
      );
      // expect the first image to show, but not the second
      const image1 = screen.getByAltText('Image 1')
      expect(image1).toBeInTheDocument();

    const rightArrow = screen.getByText('Right')
    fireEvent.click(rightArrow)

    const image2 = screen.getByAltText('Image 2')
    expect(image2).toBeInTheDocument()


    });