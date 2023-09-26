import React from 'react'
import './styles/about.css'

const About = () => {
  document.title = 'Ecommerce App | About'
  return (
    <div className='about-container'>
      <div className="left">
        <img src="https://media.istockphoto.com/id/1402604850/photo/the-word-about-us-on-wooden-cubes-business-communication-and-information.webp?b=1&s=170667a&w=0&k=20&c=M1zgL2pGwZ_g3cwmOvdMtzz92PlTLdihv6_wgaW1QZc=" alt="" />
      </div>
      <div className="right">
        <p className="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint accusantium in repellendus debitis ad non laudantium, asperiores exercitationem corrupti error! Consequatur numquam repellat, provident totam esse dolores accusantium natus debitis necessitatibus libero impedit recusandae voluptatum quia inventore, magni iure tenetur soluta vel nemo ratione enim fuga voluptatem quasi aliquam! Voluptatibus aliquam esse neque, accusamus perspiciatis est enim numquam facere assumenda, qu
        </p>
      </div>
    </div>
  )
}

export default About