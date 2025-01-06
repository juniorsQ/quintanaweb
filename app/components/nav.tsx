import Image from "next/image";
import profileimg from "../../public/761x761.jpg"
export default function Navbar(){
    return(
        
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
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">Acerca</a></li>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#experience">Experiencia</a></li>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#education">Estudios</a></li>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#skills">Skills</a></li>
                    {/* <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#interests">Intereses</a></li> */}
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#awards">Cursos</a></li>
                </ul>
            </div>
        </nav>
    )
}