import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Importa un icono sólido
import { fab } from '@fortawesome/free-brands-svg-icons'; // Importa los iconos de marcas


// Agregar todos los iconos al library
library.add(fab);


export default function Skills(){
    return(
        

// Skills
<section className="resume-section elementBorder" id="skills">
    <div className="resume-section-content">
        <h2 className="mb-5">Skills</h2>
        <div className="subheading mb-3">Lenguajes de programación & Herramientas</div>
        <ul className="list-inline dev-icons">
        <li className="list-inline-item">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
        <polygon fill="#40c4ff" points="26,4 6,24 12,30 38,4"></polygon><polygon fill="#40c4ff" points="38,22 27,33 21,27 26,22"></polygon><rect width="8.485" height="8.485" x="16.757" y="28.757" fill="#03a9f4" transform="rotate(-45.001 21 33)"></rect><polygon fill="#01579b" points="38,44 26,44 21,39 27,33"></polygon><polygon fill="#084994" points="21,39 30,36 27,33"></polygon>
        </svg>
        </li>
        <li className="list-inline-item"><FontAwesomeIcon icon={['fab', 'html5']} /> </li>
        <li className="list-inline-item"><FontAwesomeIcon icon={['fab', 'css3']} /></li>
        <FontAwesomeIcon className="list-inline-item" icon={['fab', 'php']} />
        <FontAwesomeIcon className="list-inline-item" icon={['fab', 'react']} />
        <FontAwesomeIcon className="list-inline-item" icon={['fab', 'js']} />
        <FontAwesomeIcon className="list-inline-item" icon={['fab', 'node']} />
        <FontAwesomeIcon className="list-inline-item" icon={['fab', 'android']} />
        <FontAwesomeIcon className="list-inline-item" icon={['fab', 'python']} />
        <FontAwesomeIcon className="list-inline-item" icon={['fab', 'npm']} />
        <FontAwesomeIcon className="list-inline-item" icon={['fab', 'github']} />
        <FontAwesomeIcon className="list-inline-item" icon={['fab', 'docker']} />
        <FontAwesomeIcon className="list-inline-item" icon={['fab', 'wordpress']} />
        </ul>
        <div className="subheading mb-3">Flujo de trabajo</div>
        <ul className="fa-ul mb-0">
            <li>
                <span className="fa-li"><i className="fa fa-check"></i></span>
                Diseño responsivo.
            </li>
            <li>
                <span className="fa-li"><i className="fas fa-check"></i></span>
                Pruebas y depuración entre navegadores
            </li>
            <li>
                <span className="fa-li"><i className="fas fa-check"></i></span>
                Equipos multifuncionales
            </li>
            <li>
                <span className="fa-li"><i className="fas fa-check"></i></span>
                Desarrollo ágile y Scrum
            </li>
        </ul>
    </div>
</section>

    )
}