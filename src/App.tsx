import React, { Component } from "react";
import Card from "./components/Card";
import Input from "./components/Input";
import { baseUrl } from "./utils/api";

interface AppState {
  hits: any[];
  page: number;
  searchQuery: string;
  filteredHits: any[];
}

class App extends Component<{}, AppState> {
  private listRef: React.RefObject<HTMLUListElement>;
  private timerId: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      hits: [],
      page: 0,
      searchQuery: "",
      filteredHits: [],
    };
    this.listRef = React.createRef<HTMLUListElement>();

    // Fetch data initially
    this.fetchData();
  }

  componentDidMount() {
    this.timerId = setInterval(this.fetchData, 10000); // Fetch data every 10 seconds
    window.addEventListener("scroll", this.handleScroll); // Add scroll event listener
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId); // Clear the interval when the component is unmounted
    }
    window.removeEventListener("scroll", this.handleScroll); // Remove scroll event listener
  }

  handleScroll = () => {
    if (
      this.listRef.current &&
      window.innerHeight + window.scrollY >=
        this.listRef.current.offsetTop + this.listRef.current.offsetHeight - 200
    ) {
      this.fetchNextPage(); // Fetch next page when scrolled near the bottom
    }
  };

  fetchData = () => {
    const { page, searchQuery } = this.state;
    const nextPage = page + 1;

    fetch(baseUrl + `/search_by_date?tags=story&page=${nextPage}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState(
          (prevState) => ({
            hits: [...prevState.hits, ...data.hits], // Append new data to existing hits array
            page: nextPage, // Increment the page number
          }),
          () => {
            this.filterHits(); // Filter hits after fetching data
          },
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  filterHits = () => {
    const { searchQuery, hits } = this.state;

    const filteredHits = hits.filter(
      (hit) =>
        hit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hit.author.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    this.setState({ filteredHits });
  };

  fetchNextPage = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1, // Increment the page number
      }),
      () => {
        this.fetchData(); // Fetch next page and update state
      },
    );
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ searchQuery: value }, () => {
      this.filterHits(); // Filter hits based on the new search query
    });
  };

  render() {
    const { searchQuery, filteredHits } = this.state;

    console.log("Search query:", searchQuery);
    console.log("Filtered hits:", filteredHits);

    return (
      <div className='h-screen text-xl max-w-2xl mx-auto mt-12'>
        <Input
          onChange={this.handleChange}
          value={searchQuery}
          placeholder='Search'
        />
        <ul
          ref={this.listRef}
          className='divide-y divide-gray-100 mt-8'
          onScroll={this.handleScroll}
        >
          {filteredHits.map((hit, key) => {
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

