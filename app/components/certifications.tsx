
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Importa un icono sólido
import { fab } from '@fortawesome/free-brands-svg-icons'; // Importa los iconos de marcas
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Certifications(){
return(
    <section className="resume-section elementBorder" id="awards">
    <div className="resume-section-content">
    <div className="sectionHeader"><h1>Cursos y Certificaciones</h1></div>
        <h2 className="mb-5">Cursos y Certificaciones</h2>
        <ul className="fa-ul mb-0">
            <li>
                <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>
               C# Fundamentos Básicos - Platzi
            </li>
            <li>
                <span className="fa-li"><FontAwesomeIcon icon={['fab', 'trophy']} /></span>
                Curso de Fundamentos de Python - Platzi
            </li>
            <li>
                <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>
                Curso de Python: Comprehensions, Funciones y Manejo de Errores - Platzi
            </li>
            <li>
                <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>
                Curso de Python: PIP y Entornos Virtuales - Platzi
            </li>
            <li>
                <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>
                Curso de FastAPI: Introducción, Operaciones, Validaciones y Autenticación 
            </li>
            <li>
                <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>
                Curso de FastAPI: Base de Datos, Modularización y Deploy a Producción - Platzi
            </li>
            <li>
                <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>
                Curso Gratis de Estrategias para Aprender Inglés en Línea - Platzi
            </li>
            <li>
            Taller de Inglés Básico para Descripciones Personales - Platzi
            </li>
        </ul>
    </div>
</section>
    
    )

}