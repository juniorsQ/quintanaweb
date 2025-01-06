import Image from "next/image";
import Navbar from "./components/nav";
import About from "./components/about";
import Experience from "./components/experience";
import Education from "./components/education";
import Skills from "./components/skills";
import Interest from "./components/interest";
import Certifications from "./components/certifications";
import MyHead from "./components/myHead";

export default function Home() {
  return (
<main>
<MyHead />
      <div id="page-top" className="bgbody">
            <Navbar />
          <div className="container-fluid p-0">
            <br />
            <About />
            <br />
            <Experience />
            <br />
            <Skills />
            <br />
            <Education />
            <br />
            <Certifications />
            <br />
            {/* <Interest /> */}
            <br />
        </div>
      </div>
    </main>

  );
}
