import React, { Component } from "react";

interface StoryPageProps {
  selectedHit: any;
}

class StoryPage extends Component<StoryPageProps> {
  render() {
    const { selectedHit = {} } = this.props;

    return (
      <div className="h-screen text-xl max-w-2xl mx-auto mt-12">
        <h1>Details</h1>
        <div className="overflow-x-auto mt-12">
            <pre className="whitespace-pre-wrap">{JSON.stringify(selectedHit)}</pre>
          </div>
      </div>
    );
  }
}

export default StoryPage;
