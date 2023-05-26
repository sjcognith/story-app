import React, { Component } from 'react';
import { IHits } from '../interface/hits.interface';

interface CardProps extends IHits {
  onClick: () => void;
}

class Card extends Component<CardProps> {
  convertToReadableDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  }

  render() {
    const {
      _tags,
      author,
      authorUrl,
      createdAt,
      title,
      onClick,
    } = this.props;

    return (
      <li onClick={onClick} className="flex justify-between gap-x-6 py-5">
        <div className="flex gap-x-4 w-[60%]">
          <div className="min-w-0 flex-auto">
            <p className="text-lg font-semibold leading-6 text-gray-900">
              {title}
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">{authorUrl}</p>
            <div className="flex flex-wrap items-center gap-2 mt-4 truncate text-xs text-gray-500">
              {_tags.map((tag, indx) => (
                <div
                  className="border border-gray-600 px-2 py-1 rounded-full"
                  key={indx}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm leading-6 text-gray-900">{author}</p>
          </div>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            {this.convertToReadableDate(createdAt)}
          </p>
        </div>
      </li>
    );
  }
}

export default Card;
