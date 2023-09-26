import React from 'react'
import './styles/policy.css'

const Policy = () => {
  document.title = 'Ecommerce App | Policy '

  return (
    <div className='policy-container'>
      <section>
        <h2>Privacy Policy</h2>
        <p>This Privacy Policy outlines the types of personal information collected and received by [Your Website Name] (referred to as "we," "us," or "our") and how it is used. We are committed to protecting your privacy and ensuring the security of your personal information. By using our website, you consent to the practices described in this Privacy Policy. </p>
      </section>

      <section>
        <h2>Information Collection and Use</h2>
        <p>We may collect personal information that you voluntarily provide to us when you interact with our website, such as when you sign up for newsletters, submit forms, or make purchases. This information may include your name, email address, postal address, and payment information.</p>
        <p>We use this information for purposes such as responding to your inquiries, processing your orders, and providing you with relevant updates and information about our products and services.</p>
      </section>

      <section>
        <h2>Log Data</h2>
        <p>Like many other websites, we collect information that your browser sends whenever you visit our site. This Log Data may include information such as your computer's IP address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, the time spent on those pages, and other statistics. This information is used to analyze trends, administer the site, track user movements, and gather demographic information.</p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>We use cookies to store information about your preferences, record user-specific information, and track visits to our site. Cookies help us enhance your experience and provide personalized content. You can modify your browser settings to decline cookies, but this may affect your ability to access certain features of our website.</p>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>We may use third-party services, such as analytics tools and payment processors, that collect, monitor, and analyze information to help us improve and optimize our website. These third-party service providers have their own privacy policies governing how they use and store your information.</p>
      </section>

      <section>
        <h2>Security</h2>
        <p>We implement security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
      </section>
    </div>
  )
}

export default Policy