import React, { Component } from "react";
import moment from "moment";
import Pagination from "./components/Pagination";
import { Link } from "react-router-dom";

export default class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
    this.nextPage = this.nextPage.bind(this);
  }
  nextPage(page) {
    this.getJobs(page);
  }

  async getJobs(page) {
    const response = await fetch(`http://localhost:3000/jobs/${page}`);
    const jobs = await response.json();
    this.setState({
      jobs: jobs.data
    });
  }

  componentDidMount() {
    const { page } = this.props.match.params;
    this.getJobs(page || 1);
  }

  render() {
    const { page } = this.props.match.params;
    // const { pageNumbers } = this.state;
    const pageNr = Number(page) || 1;

    if (this.state.jobs.length === 0) return null;
    return (
      <>
        {this.state.jobs.map(job => {
          return (
            <div className="column">
              <article
                id={job.id}
                className="listing-item listing-map-data content-wrap display-list  post-1604 ad_listing type-ad_listing status-publish hentry ad_cat-oferte-locuri-de-munca ad_tag-80"
                data-id={job.id}
                data-title={job.appellationlibelle}
                data-permalink={job.origineOffre.urlOrigine}
                data-address={job.lieuTravail.libelle}
                data-lat={job.lieuTravail.latitude}
                data-lng={job.lieuTravail.longitude}
                data-image={
                  job.origineOffre.partenaires.length &&
                  job.origineOffre.partenaires[0].logo
                }
                role="article"
              >
                <div className="row">
                  <div className="small-12 medium-5 columns">
                    <a
                      className="entry-thumbnail"
                      href={job.origineOffre.urlOrigine}
                      aria-hidden="true"
                    >
                      <div
                        style={{
                          backgroundImage: `url(${job.origineOffre.partenaires
                            .length && job.origineOffre.partenaires[0].logo})`
                        }}
                        className="item-cover entry-cover has-image"
                      ></div>
                    </a>
                  </div>

                  <div className="small-12 medium-7 columns">
                    <div className="content-inner">
                      <header className="entry-header">
                        {/* <div className="price-wrap">
                          <span className="tag-head">
                            <span className="post-price">€1,700</span>
                          </span>
                        </div> */}
                        <h3 className="h4 entry-title">
                          <a
                            href={job.origineOffre.urlOrigine}
                            title={job.appellationlibelle}
                            rel="bookmark"
                          >
                            {job.appellationlibelle}
                          </a>
                        </h3>
                      </header>

                      <div className="entry-header">
                        <div className="listing-meta">
                          <ul className="meta-list list-inline">
                            <li className="listing-cat fa-icon fa-list-ul">
                              <span>{job.romeLibelle}</span>
                            </li>
                            <li className="listing-owner">
                              <span>
                                {job.origineOffre.partenaires.length &&
                                  job.origineOffre.partenaires[0].nom}
                              </span>
                            </li>
                            <li className="listing-date fa-icon fa-clock-o">
                              {moment(job.dateCreation)
                                .startOf("hour")
                                .fromNow()}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="entry-content subheader">
                        {job.description}
                      </div>

                      {/* <footer className="entry-footer">
                        <span className="stats">3 vizualizari, 0 azi</span>
                      </footer> */}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
        <Pagination
          pageNr={pageNr}
          nextPage={this.nextPage}
          jobsLength={this.state.jobs.length}
        />
      </>
    );
  }
}
