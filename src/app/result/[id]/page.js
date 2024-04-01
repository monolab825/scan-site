'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Page({ params }) {
  var moment = require('moment');
  const [url, setUrl] = useState(params.id)
  const [data, setData] = useState(null)


  const [hostingData, setHostingData] = useState(null)
  const [audienceData, setAudienceData] = useState(null)
  const [brokenLinks, setBrokenLinks] = useState(null)
  const [sitemapData, setSitemapData] = useState(null)
  const [robotsData, setRobotsData] = useState(null)
  const [globalranking, setGlobalranking] = useState(null)
  const [reviews, setReviews] = useState(null)




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


    if (result?.success === true) {
      // hosting data
      result.data.map((item, index) => {
        if (item.label === "hosting_details") {
          setHostingData(item)
        }
      })
      // audience data
      result.data.map((item, index) => {
        if (item.label === "audience_engagement_metrics") {
          setAudienceData(item)
        }
      })
      // brekenlink
      result.data.map((item, index) => {
        if (item.label === "broken_links_verification") {
          setBrokenLinks(item)
        }
      })

      // sitemap data
      result.data.map((item, index) => {
        if (item.label === "sitemap_analysis") {
          setSitemapData(item)
        }
      })

      // robots data
      result.data.map((item, index) => {
        if (item.label === "robots_txt_verification") {
          setRobotsData(item)
        }
      })

      // global ranking
      result.data.map((item, index) => {
        if (item.label === "global_ranking") {
          setGlobalranking(item)
        }
      })

      // user reviews
      result.data.map((item, index) => {
        if (item.label === "user_reviews") {
          setReviews(item)
        }
      })








    }






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
              <li><a href='#brokenLinks'><i className="material-symbols-outlined">link_off</i>Broken Links</a></li>

            </ul>
          </div>
        </div>
        <div className='rightCol'>
          <div className='container-fluid'>



            <div className='mb-7' id='overview'>
              <div className='row gx-5'>
                {/* hostingData */}
                <div className='col-lg-5 mb-4'>
                  {hostingData !== null ?
                    <div>
                      <h1 className='mb-2'>{hostingData.domain_name}</h1>
                      <div className='cardBox'>
                        <dl>
                          <div className='companyInfo d-flex'>
                            <dt>Company</dt>
                            <dd>{hostingData.domain_name}</dd>
                          </div>
                          <div className='companyInfo d-flex'>
                            <dt>Country</dt>
                            <dd>{hostingData.data.host.website_country}</dd>
                          </div>
                          <div className='companyInfo d-flex'>
                            <dt>Year Founded</dt>
                            <dd>{moment(hostingData.data.whois.creation_date).format("MM-DD-YYYY")}</dd>
                          </div>
                          <div className='companyInfo d-flex'>
                            <dt>SSL</dt>
                            <dd>{hostingData.data.ssl.issued_by}</dd>
                          </div>
                          <div className='companyInfo d-flex'>
                            <dt>Website Provider</dt>
                            <dd>{hostingData.data.host.website_provider}</dd>
                          </div>
                          <div className='companyInfo d-flex'>
                            <dt>Web Server</dt>
                            <dd>{hostingData.data.host.web_server}</dd>
                          </div>
                          <div className='companyInfo d-flex'>
                            <dt>Blacklist</dt>
                            <dd>{hostingData.data.host.black_list_status.is_blacklisted === true ? 'Blacklisted' : hostingData.data.host.black_list_status.description}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
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
                      {globalranking !== null ?
                        <h2 className='mb-05 fw-medium'>#{globalranking.data.global_rank}</h2>
                        : null
                      }

                      {/* <h5 className='text-danger fw-light'><i className="material-symbols-outlined smallIcon">arrow_drop_down</i>200,814</h5> */}
                    </div>
                    <div>
                      <p className='mb-05'><small><i className="material-symbols-outlined smallIcon">link_off</i> Broken Link</small></p>

                      {brokenLinks !== null ?
                        brokenLinks.data.urls.length === 0 ?
                          <h2 className='mb-05 fw-medium'>PASSED</h2>
                          :
                          <h2 className='mb-05 fw-medium text-danger'>{brokenLinks.data.urls.length} found</h2>
                        :
                        null
                      }

                    </div>
                    <div>
                      <p className='mb-05'><small><i className="material-symbols-outlined smallIcon">editor_choice</i> User Reviews</small></p>
                      {reviews !== null ?
                        <h2 className='mb-05 fw-medium'>{reviews.data.rating}</h2>
                        : null
                      }
                    </div>

                  </div>
                </div>
              </div>
            </div>




            <div className='d-flex gap-5 ratingInfo mb-10'>
              <div>
                <p className='mb-05'><small><i className="material-symbols-outlined smallIcon">editor_choice</i> Sitemap (Image | Url)</small></p>
                {sitemapData !== null ?
                  <h2 className='mb-05 fw-medium'>#{sitemapData.data.image_count} | #{sitemapData.data.url_count}</h2>
                  : null
                }
              </div>
              <div>
                <p className='mb-05'><small><i className="material-symbols-outlined smallIcon">editor_choice</i> Robots Scan</small></p>
                {robotsData !== null ?
                  robotsData.success === true ? <h2 className='mb-05 fw-medium'>PASSED</h2> : <h2 className='mb-05 fw-medium'>FAILED</h2>
                  : null
                }
              </div>
            </div>



            {/* Audience */}
            <div id='audience' className='mb-10'>
              <h2 className='mb-4'><span className="material-symbols-outlined">group</span> Traffic & Engagement Analysis</h2>
              {audienceData !== null ?
                audienceData.data.error ? <p>{audienceData.data.error}</p>
                  :
                  <>
                    <div className='d-flex justify-content-between gap-5 mb-7'>
                      <div>
                        <p className="mb-05"><small>Alexa Rank</small></p>
                        <h4 className="mb-05 fw-medium">{audienceData.data.alexa_rank}</h4>
                      </div>
                      <div>
                        <p className="mb-05"><small>Bounce Rate</small></p>
                        <h4 className="mb-05 fw-medium">{audienceData.data.bounce_rate_percentage}%</h4>
                      </div>
                      <div>
                        <p className="mb-05"><small>Pages per Visit</small></p>
                        <h4 className="mb-05 fw-medium">{audienceData.data.daily_pageviews_per_visitor}</h4>
                      </div>
                      <div>
                        <p className="mb-05"><small>Avg Visit Duration</small></p>
                        <h4 className="mb-05 fw-medium">{audienceData.data.daily_time_on_site}</h4>
                      </div>
                      <div>
                        <p className="mb-05"><small>Search Traffic</small></p>
                        <h4 className="mb-05 fw-medium">{audienceData.data.search_traffic_percentage}%</h4>
                      </div>
                    </div>

                    <div className='row gx-5'>
                      <div className='col-md-6 col-lg-7 col-xl-8 mb-3'>
                        <h4 className='mb-2'>Compare to</h4>
                        <div className=''>
                          
                            {audienceData.data.similar_sites?.map((similar, similarIndex) => (
                              <div key={similarIndex} className='mb-3'>
                                <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                  <div className="progress-bar" style={{width: `${similar.search_traffic_percentage}%`}}>{similar.search_traffic_percentage}%</div>
                                </div>
                               <small>{similar.website} </small> 

                              </div>
                            ))}
                          
                        </div>
                      </div>
                      <div className='col-md-6 col-lg-5 col-xl-4'>
                        <h4 className='mb-2'>Web Traffic by Country</h4>
                        <div className='whiteBox'>
                          <ul>
                            {audienceData.data.visitors_by_country?.map((country, countryIndex) => (
                              <li key={countryIndex} className='mb-1'><span className="material-symbols-outlined">
                                flag_circle
                              </span> {country.country} <span className='fw-bold text-dark'>{country.site_traffic_percentage}%</span></li>
                            ))}
                          </ul>

                        </div>
                      </div>
                    </div>
                  </>
                : null
              }
            </div>



            {/* Broken Links */}
            <div id='brokenLinks'>
              <h2 className='mb-3'><span className="material-symbols-outlined">link_off</span> Broken Links</h2>
              {brokenLinks !== null ?
                <ul className='brokenLinkList'>
                  {brokenLinks.data.urls.length !== 0 ? brokenLinks.data.urls.map((item, index) => (
                    <li key={index}><span className='brokenUrl'>{item.url}</span> <span className='statusCode text-danger fw-medium'>{item.status_code}</span></li>
                  )) : '0 Broken link found'}
                </ul>
                : null}
            </div>



          </div>
        </div>
      </div>


    </>
  )
}
