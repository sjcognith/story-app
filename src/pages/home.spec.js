import React from "react";
import { createRoot, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";
import Card from "../components/Card";

jest.mock("../utils/api", () => ({
  baseUrl: "https://example.com",
}));

const mockHits = [
  {
    _tags: ["tag1", "tag2"],
    author: "John Doe",
    url: "https://example.com",
    created_at: "2023-05-30T10:30:00Z",
    title: "Test Article",
    objectID: "123",
  },
  // Add more mock hits if needed
];

describe("HomePage", () => {
  let container = null;
  let clearIntervalSpy;
  let removeEventListenerSpy;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    jest.spyOn(global, "clearInterval");
    jest.spyOn(global.window, "removeEventListener");
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            hits: mockHits,
          }),
      }),
    );
  });

  //   it("clears the interval and removes scroll event listener on unmount", async () => {
  //     await act(async () => {
  //       createRoot(container).render(<HomePage />);
  //     });

  //     expect(global.clearInterval).toHaveBeenCalled();
  //     expect(global.window.removeEventListener).toHaveBeenCalled();
  //     expect(global.window.removeEventListener).toHaveBeenCalledWith(
  //       "scroll",
  //       expect.any(Function),
  //     );

  //     global.clearInterval.mockRestore();
  //     global.window.removeEventListener.mockRestore();
  //   });

  // ...

  afterEach(() => {
    container.remove();
    container = null;

    jest.restoreAllMocks();
  });

  it("renders without crashing", async () => {
    await act(async () => {
      createRoot(container).render(<HomePage />);
    });

    expect(container.querySelector(".h-screen")).not.toBeNull();
  });

  it("logs an error message when fetching data fails", async () => {
    const error = new Error("Failed to fetch data");
    jest.spyOn(global.console, "error").mockImplementation(() => {});

    jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject(error));

    await act(async () => {
      createRoot(container).render(<HomePage />);
    });

    expect(global.console.error).toHaveBeenCalledWith(
      "Error fetching data:",
      error,
    );

    global.console.error.mockRestore();
    global.fetch.mockRestore();
  });

  it("calls goToDetails function with the correct argument on card click", () => {
    const mockGoToDetails = jest.fn();
    const hit = {
      _tags: ["tag1", "tag2"],
      author: "John Doe",
      url: "https://example.com",
      created_at: "2023-05-30T10:30:00Z",
      title: "Test Article",
      objectID: "123",
    };

    const { getByText } = render(
      <Card
        onClick={() => {
          mockGoToDetails(hit);
        }}
        key='someKey'
        _tags={hit._tags}
        author={hit.author}
        authorUrl={hit.url}
        createdAt={hit.created_at}
        title={hit.title}
      />,
    );

    const cardTitle = getByText(hit.title);

    fireEvent.click(cardTitle.parentElement);

    expect(mockGoToDetails).toHaveBeenCalledWith(hit);
  });

  it("fetches data on component mount", async () => {
    await act(async () => {
      createRoot(container).render(<HomePage />);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/search_by_date?tags=story&page=1",
    );
  });

  it("updates searchQuery state and filters hits on input change", () => {
    const mockGoToDetails = jest.fn();
    const homePage = new HomePage({ goToDetails: mockGoToDetails });

    const mockEvent = { target: { value: "test" } };

    homePage.setState = jest.fn((newState, callback) => {
      callback(); // Call the callback function
    });

    homePage.filterHits = jest.fn(); // Mock the filterHits method

    homePage.handleChange(mockEvent);

    expect(homePage.setState).toHaveBeenCalledTimes(1);
    expect(homePage.setState.mock.calls[0][0].searchQuery).toBe("test");
    expect(homePage.filterHits).toHaveBeenCalledTimes(1);
  });

  it("fetches next page when scrolled near the bottom", async () => {
    await act(async () => {
      createRoot(container).render(<HomePage />);
      Object.defineProperty(window, "innerHeight", { value: 1000 });
      Object.defineProperty(window, "scrollY", {
        value: container.offsetHeight - 200,
      });

      // Trigger scroll event directly on the window object
      const scrollEvent = new Event("scroll");
      window.dispatchEvent(scrollEvent);
    });

    // Delay the assertion to allow time for the fetch call to be made
    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(global.fetch).toHaveBeenCalledTimes(4);

    const fetchCalls = global.fetch.mock.calls;
    expect(fetchCalls[0][0]).toEqual(
      "https://example.com/search_by_date?tags=story&page=1",
    );
  });

  it("fetches data every 10 seconds", async () => {
    jest.useFakeTimers();

    await act(async () => {
      createRoot(container).render(<HomePage />);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(10000); // 10 seconds
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    act(() => {
      jest.advanceTimersByTime(10000); // 10 seconds
    });

    expect(global.fetch).toHaveBeenCalledTimes(3);

    jest.useRealTimers();
  });

  // Add more tests if needed
});

