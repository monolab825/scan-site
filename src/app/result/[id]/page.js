'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Page({ params }) {
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
                  {
                    data !== null ?
                      <h1>{data.message[0].domain_name}</h1>

                      : null
                  }

                  <p>pet treats wholesale produces healthy dog treats for your dogs. natural treats uk’s leading Show more
                  </p>
                  <div className='cardBox'>
                    <dl>
                      <div className='companyInfo d-flex'>
                        <dt>Company</dt>
                        <dd>Pet Treats Wholesale Ltd</dd>
                      </div>
                      <div className='companyInfo d-flex'>
                        <dt>Employees</dt>
                        <dd>11 - 50</dd>
                      </div>


                    </dl>
                  </div>
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
                      <h2 className='mb-05 fw-medium'>#1,197,001</h2>
                      <h5 className='text-danger fw-light'><i className="material-symbols-outlined smallIcon">arrow_drop_down</i>200,814</h5>
                    </div>
                    <div>
                      <p className='mb-05'><small><i className="material-symbols-outlined smallIcon">editor_choice</i> Country Rank</small></p>
                      <h2 className='mb-05 fw-medium'>#1,197,001</h2>
                      <h5 className='text-success fw-light'><i className="material-symbols-outlined smallIcon">arrow_drop_up</i>200,814</h5>
                    </div>
                    <div>
                      <p className='mb-05'><small><i className="material-symbols-outlined smallIcon">editor_choice</i> Category Rank</small></p>
                      <h2 className='mb-05 fw-medium'>#1,197,001</h2>
                      <h5 className='text-danger fw-light'><i className="material-symbols-outlined smallIcon">arrow_drop_down</i>200,814</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ height: '500px' }}></div>
          </div>
        </div>
      </div>


    </>
  )
}
