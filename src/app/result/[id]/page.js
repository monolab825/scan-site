'use client'
import React, { useEffect, useState } from 'react'

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
        <div className='leftCol'>
          <ul>
            <li><a href=''>Overview</a></li>
            <li><a href=''>Ranking</a></li>
            <li><a href=''>Audience</a></li>
            <li><a href=''>Competitors</a></li>
            <li><a href=''>Marketing channels</a></li>
            <li><a href=''>Outgoing links</a></li>
            <li><a href=''>Technologies</a></li>
          </ul>
        </div>
        <div className='rightCol'>
          <div className='container-fluid'>
            <div className='mb-7'>
              <div className='row gx-5'>
                <div className='col-md-6 col-lg-5'>
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
                <div className='col-md-6 col-lg-7'>
                  <div className='mb-3'>website image</div>
                  <div className='d-flex justify-content-between gap-3'>
                    <div>
                      <p className='mb-05'><small>Global Rank</small></p>
                      <h2 className='mb-0 fw-normal'>#1,197,001</h2>
                      <h4>200,814</h4>
                    </div>
                    <div>
                      <p className='mb-05'><small>Country Rank</small></p>
                      <h2 className='mb-0 fw-normal'>#1,197,001</h2>
                      <h4>200,814</h4>
                    </div>
                    <div>
                      <p className='mb-05'><small>Category Rank</small></p>
                      <h2 className='mb-0 fw-normal'>#1,197,001</h2>
                      <h4>200,814</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
