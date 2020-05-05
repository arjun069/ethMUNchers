import React from 'react'
import "../index.css";
import "materialize-css"

const About = () => {
	return (
		<section className="about section" id="About">
			<div className="container">
				<h3 className='text-darken-3 center-align' id="top_margin">About Us</h3>
				<br />
				<div className="row">
					<div className="col s12 m5">
						<h5>What is MunSoft?</h5>
<p>about			</p>
				
					</div>
					<div className="col s12 m6 offset-m1">
						<br />
						<img src={require('../Assets/about.png')} alt="about" className="responsive-img" id="about_img"/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
