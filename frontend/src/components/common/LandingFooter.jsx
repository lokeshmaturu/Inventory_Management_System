import React from 'react'
import { Link } from 'react-router-dom'
import { Twitter, Linkedin, Facebook, Github, Heart } from 'lucide-react'

export default function LandingFooter() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <span className="font-bold text-xl text-gray-900">
                Acme<span className="text-primary-600">Inventory</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Modern inventory management for growing businesses. Track, manage, and scale with confidence.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary-600">Features</a></li>
              <li><a href="#" className="hover:text-primary-600">Integrations</a></li>
              <li><a href="#" className="hover:text-primary-600">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-600">Changelog</a></li>
              <li><a href="#" className="hover:text-primary-600">Docs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary-600">About Us</a></li>
              <li><a href="#" className="hover:text-primary-600">Careers</a></li>
              <li><a href="#" className="hover:text-primary-600">Blog</a></li>
              <li><a href="#" className="hover:text-primary-600">Contact</a></li>
              <li><a href="#" className="hover:text-primary-600">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Get Started</h4>
            <p className="text-sm text-gray-500 mb-4">
              Ready to streamline your inventory? Start your free trial today.
            </p>
            <Link to="/register" className="inline-block w-full py-2.5 bg-gray-900 text-white text-center rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
              Start Free Trial
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Acme Inventory Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Acme Team
          </div>
        </div>
      </div>
    </footer>
  )
}
