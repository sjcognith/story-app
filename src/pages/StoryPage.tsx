import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { withRouter } from "../components/WithRouter";

interface StoryPageProps {
  selectedHit: any;
  navigate: ReturnType<typeof useNavigate>;
}
class StoryPage extends Component<StoryPageProps> {
  render() {
    const { selectedHit = {} } = this.props;

    return (
      <div className="h-screen text-xl max-w-2xl mx-auto mt-12">
        <h1>Details</h1>
        {Object.keys(selectedHit).length > 0 ? (
          <div className="overflow-x-auto mt-12">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(selectedHit)}
            </pre>
          </div>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="text-center mt-12 font-semibold">No Details </h1>
            <button className="text-sm px-4 py-1 rounded-full bg-rose-300 w-auto hover:bg-rose-400 transition" onClick={() => this.props.navigate(-1)}>Go back</button>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(StoryPage);
