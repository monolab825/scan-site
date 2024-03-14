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
              <li><a href=''>
                <i className="material-symbols-outlined">home</i>Overview</a></li>
              <li><a href=''><i className="material-symbols-outlined">military_tech</i>Ranking</a></li>
              <li><a href=''><i className="material-symbols-outlined">group</i>Audience</a></li>
              <li><a href=''><i className="material-symbols-outlined">swords</i>Competitors</a></li>
              <li><a href=''><i className="material-symbols-outlined">campaign</i>Marketing channels</a></li>
              <li><a href=''><i className="material-symbols-outlined">link</i>Outgoing links</a></li>
              <li><a href=''><i className="material-symbols-outlined">webhook</i>Technologies</a></li>
            </ul>
          </div>
        </div>
        <div className='rightCol'>
          <div className='container-fluid'>
            <div className='mb-7'>
              <div className='row gx-5'>
                <div className='col-lg-5 mb-4'>
                  {data?.success === true ?
                    (data.data.map((item, index) => (
                      (item.label === "domain_host_info" ?
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
                      <p className='mb-05'><small><i className="material-symbols-outlined smallIcon">editor_choice</i> Broken Link</small></p>
                      
                      {data?.success === true ?
                        (data.data.map((item) => (
                          (item.label === "broken_links" ?
                            <>
                             {item.success === true?<h2 className='mb-05 fw-medium'>PASSED</h2>:<h2 className='mb-05 fw-medium'>FAILED</h2>} 
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

            <div className='d-flex gap-5 ratingInfo'>
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
                          (item.label === "robots_scan" ?
                            <>
                             {item.success === true?<h2 className='mb-05 fw-medium'>PASSED</h2>:<h2 className='mb-05 fw-medium'>FAILED</h2>} 
                            </>
                            : null)
                        )))
                        : null
                      }
                    </div>
                   
                   
                  </div>

            <div style={{ height: '500px' }}></div>
          </div>
        </div>
      </div>


    </>
  )
}
