"use client";

import Image from "next/image";
import profileimg from "../../public/761x761.jpg";
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bgBlackNav fixed-top" id="sideNav">
      <a className="navbar-brand js-scroll-trigger" href="#page-top">
        <span className="d-block d-lg-none">Juniors Quintana</span>
        <span className="d-none d-lg-block">
          <Image
            src={profileimg}
            alt="Profile image"
            className="img-fluid img-profile rounded-circle mx-auto mb-2"
            width={100}
            height={100}
            priority
          />
        </span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-controls="navbarResponsive"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarResponsive">
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">Acerca</a></li>
          <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#experience">Experiencia</a></li>
          <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#education">Estudios</a></li>
          <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#skills">Skills</a></li>
          <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#awards">Cursos</a></li>
        </ul>
      </div>
      <style jsx>{` @media (max-width: 768px) { .navbar { background-color: rgba(41, 41, 50, 0.94); /* Transparencia más oscura */ } } `}</style>      
    </nav>
  );
}
