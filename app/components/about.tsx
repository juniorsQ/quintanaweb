import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// <!-- About-->
export default function About(){
    return(
<section className="aboutSection bgBodyAbout elementBorder" id="about">
{/* <section className="resume-section bgBodyAbout elementBorder" id="about"> */}
    <div className="sectionHeader"><h1>Acerca</h1></div>
    <div className="aboutSectionContent">
        <h1 className="mb-0">
            Quintana
            <span className="text-primary">Juniors</span>
        </h1>
        <div className="subheading mb-5">
            Caracas Venezuela · (+58) 412-311-9581 ·
            <a href="mailto:name@email.com"> quintanajuniors@email.com</a>
        </div>
        <p className="lead mb-5">Desarrollador fullstack con 7 años de experiencia, actualmente me especializo en el desarrollo de aplicaciones para Terminales de Pago (POS) en diversos lenguajes de programación C++, C, Dart, manejo de la mensajería ISO8583 , criptografía de datos.Tambien manejo otras tecnologias e implementación de soluciones para el sector bancario.</p>
        <div className="social-icons">
            <a className="social-icon" href="https://www.linkedin.com/in/juniors-quintana-11a90a182/"> <FontAwesomeIcon className="list-inline-item" icon={['fab', 'linkedin']} /> </a>
            <a className="social-icon" href="https://github.com/juniorsQ"> <FontAwesomeIcon className="list-inline-item" icon={['fab', 'github']} />   </a>
            <a className="social-icon" href="https://www.instagram.com/quintanajuniors/"> <FontAwesomeIcon className="list-inline-item" icon={['fab', 'instagram']} /></a>
            <a className="social-icon" href="#!"> <FontAwesomeIcon className="list-inline-item" icon={['fab', 'google']} /></a>
        </div>
    </div>
</section>
    )
}