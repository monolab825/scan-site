'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function Validatorform() {
    var psl = require('psl');
    const router = useRouter()
    const [website, setWebsite] = useState(null)

    const isValidURL = (string) => {
        const urlRegex = /^(((http|https):\/\/|)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?)$/;
        if (urlRegex.test(string)) {
            return true;
        } else {
            return false;
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault()


        if (website) {
            // var parsed = psl.parse(website)


            if (isValidURL(website) === false) {
                alert('Please enter valid url')
            }
            else {
                let newValue = website.replace(/^https?:\/\//, '').replace(/^www\./, '')

                if (newValue.match('/')) {
                    let index = newValue.indexOf('/')
                    let finalUrl = newValue.slice(0, index)
                    var parsed = psl.parse(finalUrl)
                    if(parsed.subdomain === null){
                        router.push(
                            `/result/${parsed.domain}`,
                        )
                    }
                    else{
                        alert('Sub domain not allow')
                    }
                    
                   
                }
                if (!newValue.match('/')) {
                    var parsed = psl.parse(newValue)
                    if(parsed.subdomain === null){
                        router.push(
                            `/result/${parsed.domain}`,
                        )
                    }
                    else{
                        alert('Sub domain not allow')
                    }
                    
                   
                }


            }

            // if (parsed.subdomain === null) {
            //     if(parsed.domain){
            //         router.push(
            //             `/result/${website}`,
            //         )
            //     }
            //     else{
            //         alert('Please enter valid domain name')
            //     }

            // }
            // else {
            //     alert(`Seems it is a Subdomain! Please enter domain name. (example: domain.com, domain.co.in, domain.org)`)
            // }

        }
        else {
            alert('Please enter a value')
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit} className='input-group validationForm mb-2'>
                <input type="text" className="form-control form-control-lg" onChange={(e) => { setWebsite(e.target.value) }} placeholder="Analyze any website or app" />
                <button className="btn btn-primary" type="submit" id="button-addon2">Search</button>
            </form>
            <p className='text-white exampleLink'><small>example: domain.com, domain.co.in, domain.org</small></p>
        </>
    )
}
