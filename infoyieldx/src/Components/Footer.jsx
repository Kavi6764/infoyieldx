import React, { useContext } from 'react'
import { BsMap } from 'react-icons/bs'
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa'
import { FaFacebook, FaGooglePlus, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6'
import { IoLocation } from 'react-icons/io5'
import { Appcontext } from '../Context/Context'

const Footer = () => {
  // const {showLayout} = useContext(Appcontext)
  // const hrToken = localStorage.getItem("hrtoken")
  // const EmpToken =localStorage.getItem("empToken")
  // if(hrToken || EmpToken ) return null;
  return (
    <footer className="w-full bottom-0 bg-black text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-wrap justify-center">
          {/* Sitemap Section */}
          <div className="w-11/12 md:w-2/12 mb-6">
            <h5 className="text-lg font-medium mb-4 text-white">Sitemap</h5>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="portfolio" className="hover:text-white">Portfolio</a></li>
              <li><a href="ourservices" className="hover:text-white">Our Services</a></li>
              <li><a href="blogs" className="hover:text-white">Blogs</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="w-11/12 md:w-3/12 mb-6">
            <h5 className="text-lg font-medium mb-4 text-white">Services</h5>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="/account-serviec" className="hover:text-white">Accounting Services</a></li>
              <li><a href="/web-development" className="hover:text-white">Web Development</a></li>
              <li><a href="/mobile-app-development" className="hover:text-white">Mobile App Development</a></li>
              <li><a href="/digital-marketing" className="hover:text-white">Digital Marketing </a></li>
              <li><a href="/Oracle-Database" className="hover:text-white">Oracle DataBase Mangagement</a></li>
            </ul>
          </div>

          {/* Head Office Section */}
          <div className="w-11/12 md:w-3/12 mb-6">
            <div className="flex items-center gap-2 mb-4 text-white">
              <IoLocation />
              <h5 className="text-lg font-medium">Address</h5>
            </div>
            <p className="leading-normal text-slate-300 text-sm mb-2 md:ml-5">
              <span className=" font-bold text-md">Infoyieldx</span><br /><br />
              <span className="text-slate-300">Head Office</span><br />
              MGK Complex, No:267,<br />
              VIP Garden, Solar,<br />
              Erode, Tamil Nadu -638002
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-4 md:ml-5">
              <a href="#" className="text-slate-300 hover:text-white"><FaInstagram/></a>
              <a href="#" className="text-slate-300 hover:text-white"><FaTwitter/></a>
              <a href="#" className="text-slate-300 hover:text-white"><FaLinkedin/></a>
              <a href="#" className="text-slate-300 hover:text-white"><FaFacebook/></a>
              <a href="#" className="text-slate-300 hover:text-white"><FaGooglePlus/></a>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm md:ml-5">
              <div className="text-slate-300 flex items-center gap-2">
                <FaWhatsapp className='w-4 h-4'/>
                <a href="tel:9987121730" className="hover:text-white">7558695929</a>
              </div>
              <div className="text-zinc-400 flex items-center gap-2">
                <FaEnvelope className='w-4 h-4'/>
                <a href="mailto:hr@makebtech.com" className="hover:text-white">hr@Infoyieldx.in</a>
              </div>
            </div>
          </div>
<div>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60144.49186159031!2d77.67419706964218!3d11.346623292616323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f46762f4671%3A0xd97da6e3d9c7f75e!2sErode%2C%20Tamil%20Nadu!5e1!3m2!1sen!2sin!4v1749492849488!5m2!1sen!2sin"  className='rounded-md md:w-96 h-44' referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
          {/* Copyright */}
          <div className="w-full mt-8 pt-4 border-t border-gray-600 text-center text-sm">
            <p className='text-slate-300'>
              Copyright © {new Date().getFullYear()} All Rights Reserved | Designed and Developed by{' '}
              <a href="" target="_blank" rel="noopener noreferrer" className="text-white">
                Infoyieldx
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
