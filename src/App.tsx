import React, { Component } from "react";
import Card from "./components/Card";
import Input from "./components/Input";
class App extends Component {
  hits = [
    {
      created_at: "2023-05-26T05:13:09.000Z",
      title: "Lenster a decentralized and permissionless social media app",
      url: "https://github.com/lensterxyz/lenster",
      author: "latchkey",
      points: 2,
      story_text: null,
      comment_text: null,
      num_comments: 0,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1685077989,
      _tags: ["story", "author_latchkey", "story_36080228"],
      objectID: "36080228",
      _highlightResult: {
        title: {
          value: "Lenster a decentralized and permissionless social media app",
          matchLevel: "none",
          matchedWords: [],
        },
        url: {
          value: "https://github.com/lensterxyz/lenster",
          matchLevel: "none",
          matchedWords: [],
        },
        author: {
          value: "latchkey",
          matchLevel: "none",
          matchedWords: [],
        },
      },
    },
    {
      created_at: "2023-05-26T05:10:43.000Z",
      title: "The Sonnet Machine",
      url: "https://aeon.co/essays/sonnets-are-machines-for-thinking-through-complex-emotions",
      author: "Caiero",
      points: 1,
      story_text: null,
      comment_text: null,
      num_comments: 0,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1685077843,
      _tags: ["story", "author_Caiero", "story_36080209"],
      objectID: "36080209",
      _highlightResult: {
        title: {
          value: "The Sonnet Machine",
          matchLevel: "none",
          matchedWords: [],
        },
        url: {
          value:
            "https://aeon.co/essays/sonnets-are-machines-for-thinking-through-complex-emotions",
          matchLevel: "none",
          matchedWords: [],
        },
        author: {
          value: "Caiero",
          matchLevel: "none",
          matchedWords: [],
        },
      },
    },
    {
      created_at: "2023-05-26T05:08:10.000Z",
      title:
        "Mission: Impossible-Dead Reckoning-Part 1 runtime is 2 hrs, 36 min sans credits",
      url: "https://www.ign.com/articles/exclusive-mission-impossible-dead-reckoning-part-one-runtime-revealed",
      author: "thunderbong",
      points: 1,
      story_text: null,
      comment_text: null,
      num_comments: 0,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1685077690,
      _tags: ["story", "author_thunderbong", "story_36080198"],
      objectID: "36080198",
      _highlightResult: {
        title: {
          value:
            "Mission: Impossible-Dead Reckoning-Part 1 runtime is 2 hrs, 36 min sans credits",
          matchLevel: "none",
          matchedWords: [],
        },
        url: {
          value:
            "https://www.ign.com/articles/exclusive-mission-impossible-dead-reckoning-part-one-runtime-revealed",
          matchLevel: "none",
          matchedWords: [],
        },
        author: {
          value: "thunderbong",
          matchLevel: "none",
          matchedWords: [],
        },
      },
    },
  ];

  render() {
    return (
      <div className="h-screen text-xl max-w-2xl mx-auto mt-12">
        <Input
          onChange={(e) => console.log(e.target.value)}
          placeholder="Search"
        />
        <ul className="divide-y divide-gray-100 mt-8">
          {this.hits.map((hit) => {
            const {
              _tags,
              author,
              url: authorUrl,
              created_at,
              title,
              objectID,
            } = hit;
            return (
              <Card
                onClick={() => console.log(hit)}
                key={objectID}
                _tags={_tags}
                author={author}
                authorUrl={authorUrl}
                createdAt={created_at}
                title={title}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
