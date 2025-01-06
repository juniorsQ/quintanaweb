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
            <br />
            <span className="text-primary">Juniors</span>
        </h1>
        <div className="mb-5">
            ·Caracas Venezuela 
            <br />
            ·(+58)412-211-9581 
            <br />
            ·quintanajuniors@gmail.com
        </div>

      
        <p className="lead mb-5">Desarrollador fullstack con más de 5 años de experiencia, actualmente me dedico al desarrollo de aplicaciones para Terminales de Pago (POS) en diversos lenguajes de programación C++, java, flutter, dart. Conocimiento de la mensajería ISO8583, criptografía de datos (DES, DUKPT, 3DES). También poseo conocimiento de otras tecnologías e implementación de soluciones para el sector bancario. Experiencia comprobable en certificaciones de mensajería ISO8583 y certificaciones MTIP, amplios conocimientos en los estándares de pagos EMV (Europay, Mastercard y Visa).</p>
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