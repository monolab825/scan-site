'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Page({ params }) {
  var moment = require('moment');
  const [data, setData] = useState(null)
  const [url, setUrl] = useState(params.id)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    let result = await fetch(`${process.env.HOST}/api/v1/scan-report`, {
      method: 'POST',
      body: JSON.stringify({ url })
    })
    result = await result.json()
    setData(result)
  }

  return (
    <>
      {console.log(data)}

      <div className='d-flex'>
        <div className='leftCol d-none d-md-block'>
          <div className='leftContent'>
            <ul>
              <li><a href='#overview'>
                <i className="material-symbols-outlined">home</i>Overview</a></li>

              <li><a href='#audience'><i className="material-symbols-outlined">group</i>Audience</a></li>
              <li><a href='#brokenLinks'><i class="material-symbols-outlined">link_off</i>Broken Links</a></li>

            </ul>
          </div>
        </div>
        <div className='rightCol'>
          <div className='container-fluid'>


            {/* Overview */}
            <div className='mb-7' id='overview'>
              <div className='row gx-5'>
                <div className='col-lg-5 mb-4'>
                  {data?.success === true ?
                    (data.data.map((item, index) => (
                      (item.label === "hosting_details" ?
                        <div key={index}>
                          <h1 className='mb-2'>{url}</h1>
                          {/* <p>pet treats wholesale produces healthy dog treats for your dogs. natural treats uk’s leading Show more
                          </p> */}
                          <div className='cardBox'>
                            <dl>
                              <div className='companyInfo d-flex'>
                                <dt>Company</dt>
                                <dd>{url}</dd>
                              </div>
                              <div className='companyInfo d-flex'>
                                <dt>Country</dt>
                                <dd>{item.data.host.website_country}</dd>
                              </div>
                              <div className='companyInfo d-flex'>
                                <dt>Year Founded</dt>
                                <dd>{moment(item.data.whois.creation_date).format("MM-DD-YYYY")}</dd>
                              </div>
                              <div className='companyInfo d-flex'>
                                <dt>SSL</dt>
                                <dd>{item.data.ssl.issued_by}</dd>
                              </div>
                              <div className='companyInfo d-flex'>
                                <dt>Website Provider</dt>
                                <dd>{item.data.host.website_provider}</dd>
                              </div>
                              <div className='companyInfo d-flex'>
                                <dt>Web Server</dt>
                                <dd>{item.data.host.web_server}</dd>
                              </div>
                              <div className='companyInfo d-flex'>
                                <dt>Blacklist</dt>
                                <dd>{item.data.host.black_list_status.is_blacklisted === true ? 'Blacklisted' : item.data.host.black_list_status.description}</dd>
                              </div>


                            </dl>
                          </div>
                        </div>
                        : null)
                    )))
                    : null

                  }





                </div>
                <div className='col-lg-7'>
                  <div className='mb-3'>
                    <div className='row justify-content-center'>
                      <div className='col-lg-9'>
                        <div className='websiteImg position-relative overflow-hidden'>
                          <div className='webImg z-1'>
                            <Image style={{ width: '100%', height: 'auto' }}
                              src="/img/website.jpg"
                              width={700}
                              height={300}
                              alt="laptop"
                            />
                          </div>
                          <div className='laptop position-relative z-2'>
                            <Image style={{ width: '100%', height: 'auto' }}
                              src="/img/laptop.png"
                              width={700}
                              height={300}
                              alt="laptop"
                            />
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                  <div className='d-flex justify-content-between gap-3 ratingInfo'>
                    <div>
                      <p className='mb-05'><small><i className="material-symbols-outlined smallIcon">editor_choice</i> Global Rank</small></p>
                      {data?.success === true ?
                        (data.data.map((item) => (
                          (item.label === "global_ranking" ?
                            <>
                              <h2 className='mb-05 fw-medium'>#{item.data.global_rank}</h2>
                            </>
                            : null)
                        )))
                        : null
                      }

                      {/* <h5 className='text-danger fw-light'><i className="material-symbols-outlined smallIcon">arrow_drop_down</i>200,814</h5> */}
                    </div>
                    <div>
                      <p className='mb-05'><small><i className="material-symbols-outlined smallIcon">link_off</i> Broken Link</small></p>

                      {data?.success === true ?
                        (data.data.map((item) => (
                          (item.label === "broken_links_verification" ?
                            <>
                              {item.data.urls.length === 0 ?
                                <h2 className='mb-05 fw-medium'>PASSED</h2>
                                :
                                <h2 className='mb-05 fw-medium text-danger'>FAILED</h2>}
                            </>
                            : null)
                        )))
                        : null
                      }
                    </div>
                    <div>
                      <p className='mb-05'><small><i className="material-symbols-outlined smallIcon">editor_choice</i> User Reviews</small></p>
                      {data?.success === true ?
                        (data.data.map((item) => (
                          (item.label === "user_reviews" ?
                            <>
                              <h2 className='mb-05 fw-medium'>{item.data.rating}</h2>
                            </>
                            : null)
                        )))
                        : null
                      }
                      {/* <h5 className='text-success fw-light'><i className="material-symbols-outlined smallIcon">arrow_drop_up</i>200,814</h5> */}
                    </div>

                  </div>
                </div>
              </div>
            </div>




            <div className='d-flex gap-5 ratingInfo mb-10'>
              <div>
                <p className='mb-05'><small><i className="material-symbols-outlined smallIcon">editor_choice</i> Sitemap (Image | Url)</small></p>
                {data?.success === true ?
                  (data.data.map((item) => (
                    (item.label === "sitemap_analysis" ?
                      <>
                        <h2 className='mb-05 fw-medium'>#{item.data.image_count} | #{item.data.url_count}</h2>
                      </>
                      : null)
                  )))
                  : null
                }
              </div>
              <div>
                <p className='mb-05'><small><i className="material-symbols-outlined smallIcon">editor_choice</i> Robots Scan</small></p>
                {data?.success === true ?
                  (data.data.map((item) => (
                    (item.label === "robots_txt_verification" ?
                      <>
                        {item.success === true ? <h2 className='mb-05 fw-medium'>PASSED</h2> : <h2 className='mb-05 fw-medium'>FAILED</h2>}
                      </>
                      : null)
                  )))
                  : null
                }
              </div>
            </div>

            {/* Audience */}
            <div id='audience' className='mb-10'>
              <h2 className='mb-4'><span class="material-symbols-outlined">group</span> Traffic & Engagement Analysis</h2>
              {data?.success === true ?
                (data.data.map((item, index) => (
                  (item.label === "audience_engagement_metrics" ?
                    item.data.error ? <p>{item.data.error}</p>
                      :
                      <>
                        <div className='d-flex justify-content-between gap-5 mb-7'>
                          <div>
                            <p class="mb-05"><small>Alexa Rank</small></p>
                            <h4 class="mb-05 fw-medium">{item.data.alexa_rank}</h4>
                          </div>
                          <div>
                            <p class="mb-05"><small>Bounce Rate</small></p>
                            <h4 class="mb-05 fw-medium">{item.data.bounce_rate_percentage}%</h4>
                          </div>
                          <div>
                            <p class="mb-05"><small>Pages per Visit</small></p>
                            <h4 class="mb-05 fw-medium">{item.data.daily_pageviews_per_visitor}</h4>
                          </div>
                          <div>
                            <p class="mb-05"><small>Avg Visit Duration</small></p>
                            <h4 class="mb-05 fw-medium">{item.data.daily_time_on_site}</h4>
                          </div>
                          <div>
                            <p class="mb-05"><small>Search Traffic</small></p>
                            <h4 class="mb-05 fw-medium">{item.data.search_traffic_percentage}%</h4>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-md-6 col-lg-5 col-xl-4 mb-3'>
                            <h4 className='mb-2'>Compare to</h4>
                            <div className='whiteBox'>
                              <ul>
                                {item.data.similar_sites?.map((similar, similarIndex) => (
                                  <li key={similarIndex} className='mb-1'><span class="material-symbols-outlined">
                                  language
                                  </span> {similar.website} <span className='fw-bold text-dark'>{similar.search_traffic_percentage}%</span></li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className='col-md-6 col-lg-5 col-xl-4'>
                            <h4 className='mb-2'>Web Traffic by Country</h4>
                            <div className='whiteBox'>
                              <ul>
                                {item.data.visitors_by_country?.map((country, countryIndex) => (
                                  <li key={countryIndex} className='mb-1'><span class="material-symbols-outlined">
                                  flag_circle
                                  </span> {country.country} <span className='fw-bold text-dark'>{country.site_traffic_percentage}%</span></li>
                                ))}
                              </ul>

                            </div>
                          </div>

                        </div>


                      </>


                    : null)
                )))
                : null
              }
            </div>

            {/* Broken Links */}
            <div id='brokenLinks'>
              <h2 className='mb-3'><span class="material-symbols-outlined">link_off</span> Broken Links</h2>
              {data?.success === true ?
                (data.data.map((item, index) => (
                  (item.label === "broken_links_verification" ?
                    <ul key={index} className='brokenLinkList'>
                      {item.data.urls.length !== 0 ? item.data.urls.map((link, childIndex) => (
                        <li key={childIndex}><span className='brokenUrl'>{link.url}</span> <span className='statusCode text-danger fw-medium'>{link.status_code}</span></li>
                      )) : '0 Broken link found'}
                    </ul>
                    : null)
                )))
                : null
              }
            </div>


          </div>
        </div>
      </div>


    </>
  )
}
