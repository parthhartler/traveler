import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxLinks: 3,
      displayLeftLink: false,
      displayRightLink: false
    };
  }

  navigateRight = (pages, pagesCount) => {
    debugger;
    let {
      displayLinks,
      displayLeftLink,
      displayRightLink,
      maxLinks
    } = this.state;
    displayLinks = pages.slice(
      displayLinks[maxLinks - 1],
      displayLinks[maxLinks - 1] + maxLinks
    );
    displayLeftLink = displayLinks[0] === 1 ? false : true;
    displayRightLink = displayLinks.filter(val => val === pagesCount).length
      ? false
      : true;
    this.setState({
      displayLinks,
      displayLeftLink,
      displayRightLink
    });
  };

  navigateLeft = (pages, pagesCount) => {
    debugger;
    let {
      displayLinks,
      displayLeftLink,
      displayRightLink,
      maxLinks
    } = this.state;
    displayLinks = pages.slice(displayLinks[0], displayLinks[0] - maxLinks);
    displayLeftLink = displayLinks[0] === 1 ? false : true;
    displayRightLink = displayLinks.filter(val => val === pagesCount).length
      ? false
      : true;
    this.setState({
      displayLinks,
      displayLeftLink,
      displayRightLink
    });
  };

  componentDidMount() {
    debugger;
    const { currentPage } = this.props;
    let {
      pagesCount,
      maxLinks,
      displayRightLink,
      displayLinks,
      pages
    } = this.state;
    if (pagesCount > maxLinks) {
      if (currentPage <= pagesCount - maxLinks) displayRightLink = true;
      displayLinks = pages.slice(0, 3);
    }
    this.setState({
      displayLeftLink: false,
      displayRightLink,
      displayLinks
    });
  }

  render() {
    const { currentPage, onPageChange } = this.props;
    const { pageSize, itemsCount } = this.props,
      pagesCount = _.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesCount + 1);
    const { displayLeftLink, displayRightLink, displayLinks } = this.state;
    debugger;
    if (pagesCount < 2) return null;

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {displayLeftLink && (
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => this.navigateLeft(pages, pagesCount)}
              >
                <i className="fa fa-angle-left fa-2" aria-hidden="true"></i>
              </a>
            </li>
          )}
          {displayLinks &&
            displayLinks.map(page => {
              return (
                <li key={page} className="page-item">
                  <a
                    className={
                      "page-link" + (page === currentPage ? " current" : "")
                    }
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          {displayRightLink && (
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => this.navigateRight(pages, pagesCount)}
              >
                <i className="fa fa-angle-right fa-2" aria-hidden="true"></i>
              </a>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
