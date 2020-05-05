import React from 'react'
import "../index.css";
import MainSvg from '../Assets/1.jpg';
import IEDC from '../Assets/logo.svg';

import { useEffect } from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from "react-scroll";

const Navbar = () => {

	useEffect(() => {
		let sidenav = document.querySelector('#slide-out');
		M.Sidenav.init(sidenav, {});
	}, [])

	return (
		<div class="navbar-fixed">

		<div className='nav'>
			<nav className="nav-wrapper accent-1" style={{'background-color':'#020114'}}>
				<a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons" style={{'color':'#ab2b2b'}}>menu</i></a>
				<div className="container">
					<ul className="right hide-on-small-and-down">
						<li><Link style={{'color':'rgba(255,255,255,0.2)'}} activeClass="active" to="home" spy={true} smooth={true} offset={-70} duration={400}>Home</Link></li>
						<li><Link style={{'color':'rgba(255,255,255,0.2)'}} activeClass="active" to="About" spy={true} smooth={true} offset={-70} duration={400}>About</Link></li>
						<li><Link style={{'color':'rgba(255,255,255,0.2)'}} activeClass="active" to="contact" spy={true} smooth={true} offset={-70} duration={400}>Contact</Link></li>
					</ul>
				</div>
			</nav>

			<ul id="slide-out" className="sidenav" style={{'background-color':'black','padding':'10vh', 'text-align':'center', 'width':'100%'}}>
				<li><Link className='grey-text' activeClass="active" to="home" spy={true} smooth={true} offset={-70} duration={400}>Home</Link></li>
				<li><Link className='grey-text' activeClass="active" to="About" spy={true} smooth={true} offset={-70} duration={400}>About</Link></li>
				<li><Link className='grey-text' activeClass="active" to="contact" spy={true} smooth={true} offset={-70} duration={400}>Contact</Link></li>
			</ul>
		</div>
		</div>
	)
}

const Home = () => {
	return (

		
		<div id=" bottom_margin">


		<section className='home main_img' id="box_curve_bottom" style={{'background-color':'black', 'background-image': `url(${MainSvg})`}}>
		<Navbar/>

<div className="container" id="home" style={{'color':'rgb(223, 218, 218)' }}>
				<div className="row">
					<div className="col s12 m6">
						<h1 className="title">MUNSoft</h1>
						<p className="tagline">Idk | Some tagline</p>
						
					</div>
					<a className="btn waves-effect login_btn" style={{'background-color':'#ab2b2b'}}>
							Login / Signup
						</a>
				</div>
			</div>
		</section>
		</div>
	)
}

export default Home
