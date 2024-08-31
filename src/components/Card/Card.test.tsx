import { fireEvent, render, screen } from "@testing-library/react";
import { Card } from "./";

const characterMock = {
  id: 1,
  name: "Iron Man",
  description: "description",
  favorite: false,
  thumbnail: {
    path: "https://teste.com",
    extension: "png",
  },
  comics: {
    items: [],
  },
  series: {
    available: 2,
  },
};

const onClickMock = vi.fn()

describe("<Card />", () => {
  it("should render correctly", () => {
    render(<Card character={characterMock} onClick={onClickMock}/>);

    expect(screen.getByRole("img")).toHaveAttribute(
        "src",
       expect.stringContaining('teste.com.png')
    );
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "character/1"
    );
  });

  it("should call function on button click", () => {
    render(<Card character={characterMock} onClick={onClickMock}/>);

    fireEvent.click(screen.getByRole('button'))

    expect(onClickMock).toBeCalledTimes(1);
  });
});
