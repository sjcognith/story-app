import '@testing-library/jest-dom'
import { fireEvent, render, screen } from "@testing-library/react";
import StoryPage from "./StoryPage";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
  }));

describe("StoryPage component", () => {
    it("renders without crashing", () => {
        render(<StoryPage />);
    });

    it("renders the selectedHit data", () => {
        const selectedHit = {
            "created_at": "2023-06-01T03:27:02.000Z",
            "title": "How the Shaggoth Meme Has Come to Symbolize the State of A.I",
            "url": "https://www.nytimes.com/2023/05/30/technology/shoggoth-meme-ai.html",
            "author": "wolverine876",
            "points": 1,
            "story_text": null,
            "comment_text": null,
            "num_comments": 0,
            "story_id": null,
            "story_title": null,
            "story_url": null,
            "parent_id": null,
            "created_at_i": 1685590022,
            "_tags": [
                "story",
                "author_wolverine876",
                "story_36147270"
            ],
            "objectID": "36147270",
            "_highlightResult": {
                "title": {
                    "value": "How the Shaggoth Meme Has Come to Symbolize the State of A.I",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "url": {
                    "value": "https://www.nytimes.com/2023/05/30/technology/shoggoth-meme-ai.html",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "author": {
                    "value": "wolverine876",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            }
        };
        render(<StoryPage selectedHit={selectedHit} />);
        const preElement = screen.getByText(JSON.stringify(selectedHit));
        expect(preElement).toBeInTheDocument();
    });

    it("renders the no details when there is no data passed", () => {
        const selectedHit = {};
        render(<StoryPage selectedHit={selectedHit} />);
        const noDetailsElement = screen.getByText(/no details/i);
        expect(noDetailsElement).toBeInTheDocument();
    });

    it("calls navigate function with -1 when 'Go back' button is clicked", () => {
        const navigateMock = jest.fn();
        const selectedHit = {};
        render(<StoryPage selectedHit={selectedHit} navigate={navigateMock} />);
    
        const goBackButton = screen.getByText("Go back");
        fireEvent.click(goBackButton);
    
        expect(navigateMock).toHaveBeenCalledWith(-1);
      });
});
