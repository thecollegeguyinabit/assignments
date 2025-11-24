import Asset4 from "./assets/graphic/Asset4.svg";
import Asset3 from "./assets/graphic/Asset3.svg";
import graphic from "./assets/graphic/Graphic1.svg";
import Vector1 from "./assets/images/Vector Smart Object21 1.png";
import aboutUsBorder from "./assets/images/aboutus.png";
import Icon1 from "./assets/icons/communicationIcon.png";
import Icon2 from "./assets/icons/engagementIcon.png";
import AboutUs from "./assets/images/about us 1.png";
import Asset5 from "./assets/graphic/Asset5.svg";
import Services from "./assets/images/services.png";
import Engagement from "./assets/images/Engagement vector 1.png";
import Communication from "./assets/images/Communicationvector 1.png";
import Facilitation from "./assets/images/facilation vector 1.png";
import Consultation from "./assets/images/Consultation vector 1.png";
import Training from "./assets/images/Training and vector 1.png";
import Asset6 from "./assets/graphic/Asset6.svg";
import Asset7 from "./assets/graphic/Asset7.svg";
import Asset8 from "./assets/graphic/Asset8.svg";
import Asset9 from "./assets/graphic/Asset9.svg";
import Team from "./assets/images/team.png";
import Projects from "./assets/images/project.png";
import Clients from "./assets/images/clients.png";
import Person1 from "./assets/team/Person1.png";
import Person2 from "./assets/team/Person2.png";
import Person3 from "./assets/team/Person3.png";
import P1 from "./assets/projects/OurProject1 .png";
import P2 from "./assets/projects/OurProject2.png";
import P3 from "./assets/projects/OurProject3.png";
import client1 from "./assets/client/Client1.svg";
import client2 from "./assets/client/Client2.svg";
import client3 from "./assets/client/Client3.svg";
import client4 from "./assets/client/Client4.svg";
import client5 from "./assets/client/Client5.svg";
import client6 from "./assets/client/Client6.svg";
import client7 from "./assets/client/Client7.svg";
import client8 from "./assets/client/Client8.svg";
import client9 from "./assets/client/Client9.svg";

import './Hero.css';

export default function Hero() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative">
        <img
          src={Asset3}
          alt="Asset 3"
          className="absolute -bottom-43 -left-18 scale-40 md:max-lg:-bottom-21  md:max-lg:-left-9 md:scale-70 lg:scale-none lg:bottom-0 lg:left-0 "
          loading="lazy"
        />
        <img
          src={Asset4}
          alt="Asset 4"
          className="absolute -bottom-12 -right-9 scale-60 md:scale-90 md:max-lg:-bottom-2  md:max-lg:-right-2.5 lg:scale-none lg:bottom-0 lg:right-0 "
          loading="lazy"
        />
        <img
          src={graphic}
          alt="Graphic"
          className="absolute -z-1 -bottom-4 -left-8 scale-85 md:scale-95 md:max-lg:-bottom-2 md:max-lg:-left-5  lg:scale-none lg:bottom-0 lg:left-0 "
          loading="lazy"
        />
        <img
          src={Vector1}
          alt="Vector 1"
          className="absolute -bottom-15.5 -left-8 scale-55 md:scale-60 md:max-lg:-bottom-21  md:max-lg:-left-5 lg:scale-none lg:bottom-0 lg:left-36 "
          loading="lazy"
        />
        <div className="flex flex-col gap-3 items-center mt-78 md:max-lg:mt-60 lg:mt-30 font-rubik h-[60svh] md:h-[65vh] lg:h-[80vh] md:max-lg:ml-18 lg:max-xl:ml-120 xl:ml-150 md:gap-5 lg:max-xl:pt-20 xl:pt-45">
          <h1 className="font-semibold text-3xl max-w-3/5  md:max-lg:max-w-60/100 lg:max-w-[450px] lg:text-5xl lg:leading-[100%]">
            Mendleson Communication and Engagement
          </h1>
          <p className="font-normal text-[#2c2c2c] text-sm w-6/10 md:pl-8 md:max-lg:pl-0 md:text-base md:max-lg:w-3/5 lg:w-[500px] lg:text-lg ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada sed ipsum, ut quam volutpat, tortor.
          </p>
        </div>
      </section>
      {/*About Us Section */}
      <section id="About Us" className="h-[130svh] md:max-lg:h-auto lg:h-[75vh] 2xl:h-auto relative ">
        <div className="flex lg:justify-center flex-col-reverse items-center gap-0 mt-20 md:max-lg:mt-10 md:gap-0 lg:flex-row lg:max-xl:gap-20 lg:gap-0 xl:justify-around animate animate-sec">
          <div className="mt-10 scale-90 md:mt-20 md:scale-none lg:max-xl:mt-20 lg:max-xl:basis-2/5 ">
            <img src={AboutUs} alt="about us" loading="lazy" />
          </div>
          <div className="flex flex-col items-center gap-5 w-75/100 text-justify md:w-4/5 lg:items-start xl:w-[640px] font-rubik lg:max-xl:basis-1/5">
            <div>
              <h1 className="font-medium font-rubik text-4xl md:text-5xl ">ABOUT US</h1>
              <img src={aboutUsBorder} alt="" className="w-45 md:w-62" loading="lazy" />
            </div>
            <p className="text-lg">
              We love what we do and are driven by achieving great results for
              our clients. Our awards and impressive client list are testament
              to our high quality approach. We deliver value, creativity,
              results and exceptional levels of customer service and
              professionalism. We specialise in infrastructure development,
              energy and natural resources.
            </p>
            <div className="flex flex-col gap-2 md:mt-5 md:flex-row lg:max-xl:gap-2 xl:gap-5">
              <div className="flex flex-col items-center gap-4 md:items-start md:w-1/2 md:flex-col">
                <img src={Icon2} alt="engagement icon" className="w-10" loading="lazy" />
                <h2 className="font-medium text-2xl">ENGAGEMENT</h2>
                <p className="text-lg">
                  We are engagement specialists, who have led projects at all
                  levels of the IAP2 spectrum. <br />
                  READ MORE
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 md:items-start md:w-1/2 md:flex-col">
                <img src={Icon1} alt="communication icon" className="w-10.5" loading="lazy" />
                <h2 className="font-medium text-2xl">COMMUNICATION</h2>
                <p className="text-lg">
                  We are award-winning leaders in communications and campaign
                  management. <br />
                  READ MORE
                </p>
              </div>
            </div>
          </div>
        </div>
        <img src={Asset5} alt="Asset 5" loading="lazy" className="absolute -bottom-55 -left-24 scale-40 md:max-lg:-bottom-80 md:max-lg:-left-16 md:max-lg:scale-60 lg:scale-none lg:max-xl:scale-80 lg:max-xl:-bottom-60 lg:max-xl:-left-10 xl:left-0 xl:-bottom-70 2xl:-bottom-100 " />
      </section>
      {/*Service Section*/}
      <section id="Services" className="flex flex-col items-center gap-20 h-auto relative mt-5 md:max-lg:mt-20 md:max-lg:gap-20 2xl:mt-30">
        <div className="animate animate-sec animate-sec">
          <h1 className="font-rubik text-4xl font-medium md:text-5xl">SERVICES</h1>
          <img src={Services} alt="services" loading="lazy" className="w-45 md:w-60" />
        </div>
        {/* Engagement in Service Section */}
        <div className="flex gap-10 flex-col items-center md:max-lg:gap-0 lg:text-end lg:flex-row lg:justify-center lg:max-xl:gap-10 xl:gap-20 ">
          <div className="flex flex-col gap-5 items-center w-9/10 lg:w-7/25 font-rubik lg:mt-10 md:max-lg:w-3/5 lg:max-xl:w-2/5 animate animate-sec animate-b-l">
            <h1 className="font-medium text-4xl md:text-[42px] leading-[100%]">
              ENGAGEMENT
            </h1>
            <p className="text-[#2c2c2c] leading-[128%] text-justify md:text-right">
              We love what we do and are driven by achieving great results for
              our clients. Our awards and impressive client list are testament
              to our high quality approach. We deliver value, creativity,
              results and exceptional levels of customer service and
              professionalism. We specialise in infrastructure development,
              energy and natural resources.
            </p>
          </div>
          <div className="w-7/10 lg:max-xl:w-1/3 xl:w-auto animate animate-sec animate-b-r ">
            <img src={Engagement} alt="Engagement" loading="lazy" className="md:max-lg:scale-80 lg:scale-none" />
          </div>
        </div>
        {/* Communication in Service Section */}
        <div className="relative flex gap-10 flex-col-reverse items-center md:max-lg:gap-0 lg:text-start lg:flex-row lg:justify-center lg:max-xl:gap-10 xl:gap-20">
          <div className="w-8/10 lg:max-xl:w-40/100 xl:w-auto animate animate-b-l">
            <img src={Communication} alt="Communication" loading="lazy" />
          </div>
          <div className="flex flex-col gap-5 items-center w-9/10 lg:w-3/10 font-rubik lg:mt-10 md:max-lg:w-3/5 lg:max-xl:w-2/5 animate animate-sec animate-b-r">
            <h1 className="font-medium text-4xl md:text-[42px] leading-[100%]">
              COMMUNICATIONS
            </h1>
            <p className="text-[#2c2c2c] leading-[148%] text-justify md:text-left ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
              quam quis egestas orci. Scelerisque eu, vitae sapien, pellentesque
              et. Sit ac fames facilisis nibh faucibus.
            </p>
          </div>
          <img src={Asset6} alt="Asset 6" loading="lazy" className="absolute -right-18 top-40 scale-35 md:right-0 md:max-lg:scale-60 md:max-lg:-right-11 md:max-lg:top-70 lg:max-xl:scale-60 lg:max-xl:-top-0 lg:max-xl:-right-11 xl:scale-none xl:top-0" />
        </div>
        {/* Facilitation in Service Section */}
        <div className="relative flex gap-10 flex-col items-center md:max-lg:gap-0 md:scale-none lg:text-end lg:flex-row lg:justify-center lg:max-xl:gap-10 xl:gap-20 ">
          <div className="flex flex-col gap-5 w-9/10 items-center md:items-start lg:w-7/25 font-rubik lg:mt-10 md:max-lg:w-3/5 lg:max-xl:w-2/5 animate animate-sec animate-b-l ">
            <h1 className="font-medium text-[42px] leading-[100%]">
              FACILITATION
            </h1>
            <p className="text-[#2c2c2c] leading-[128%] text-justify md:text-right ">
              We love what we do and are driven by achieving great results for
              our clients. Our awards and impressive client list are testament
              to our high quality approach. We deliver value, creativity,
              results and exceptional levels of customer service and
              professionalism. We specialise in infrastructure development,
              energy and natural resources.
            </p>
          </div>
          <div className="w-8/10 lg:max-xl:w-1/3 xl:w-auto animate animate-sec animate-b-r">
            <img src={Facilitation} alt="Facilitation" loading="lazy" className="md:max-lg:scale-80  xl:scale-none " />
          </div>
          <img
            src={Asset7}
            alt="Asset 7"
            loading="lazy"
            className="absolute -left-17 -bottom-65 scale-35 md:max-lg:scale-60 md:max-lg:-left-11 md:max-lg:-bottom-70 lg:max-xl:scale-60 lg:max-xl:-bottom-68 lg:max-xl:-left-11 xl:scale-none xl:left-0"
          />
        </div>
        {/* Consulation & Research in Service Section */}
        <div className=" flex gap-10 flex-col-reverse items-center md:max-lg:gap-10 lg:text-start lg:flex-row lg:justify-center lg:max-xl:gap-10 xl:gap-20">
          <div className="w-8/10 lg:max-xl:w-1/3 xl:w-auto animate animate-sec animate-b-l">
            <img src={Consultation} alt="Consultation" loading="lazy" />
          </div>
          <div className="flex flex-col gap-5 w-9/10 items-center md:items-start lg:w-7/25 font-rubik lg:mt-10 md:max-lg:w-3/5 lg:max-xl:w-2/5 animate animate-sec animate-b-r">
            <h1 className="font-medium text-4xl md:text-[42px] leading-[100%] text-center md:text-start">
              CONSULTATION AND RESEARCH
            </h1>
            <p className="text-[#2c2c2c] leading-[128%] text-justify md:text-left ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
              quam quis egestas orci. Scelerisque eu, vitae sapien, pellentesque
              et. Sit ac fames facilisis nibh faucibus.
            </p>
          </div>
        </div>
        {/* Training & Mentoring in Service Section */}
        <div className="relative flex gap-10 flex-col items-center md:max-lg:gap-10 lg:text-end lg:flex-row lg:justify-center lg:max-xl:gap-10 xl:gap-20 ">
          <div className="flex flex-col gap-5 items-center w-9/10 md:items-start  lg:w-7/25 font-rubik lg:mt-10 md:max-lg:w-3/5 lg:max-xl:w-2/5 animate animate-sec animate-b-l">
            <h1 className="font-medium text-4xl md:text-[42px] leading-[100%] text-center md:text-start">
              TRAINING & MENTORING
            </h1>
            <p className="text-[#2c2c2c] leading-[128%] text-justify md:text-right ">
              We love what we do and are driven by achieving great results for
              our clients. Our awards and impressive client list are testament
              to our high quality approach. We deliver value, creativity,
              results and exceptional levels of customer service and
              professionalism. We specialise in infrastructure development,
              energy and natural resources.
            </p>
          </div>
          <div className="w-8/10 lg:max-xl:w-1/3 xl:w-auto animate animate-sec animate-b-r">
            <img src={Training} alt="Training" loading="lazy" />
          </div>
          <img
            src={Asset8}
            alt="Asset 8"
            loading="lazy"
            className="absolute scale-40 -right-20 -top-60 md:-top-50 md:max-lg:scale-60 md:max-lg:-right-13 md:max-lg:top-20 lg:max-xl:scale-65 lg:max-xl:-top-60 lg:max-xl:-right-11 xl:scale-none xl:right-0 xl:-top-65"
          />
        </div>
      </section>
      {/*Team, Projects, Clients */}
      <section className="mt-40 " id="Team">
        {/* Team Section*/}
        <div className="relative flex flex-col items-center gap-10 md:gap-20 ">
          <img src={Asset5} alt="Asset 5" className="absolute -left-20 -top-65 scale-50 lg:-top-50 md:-top-50 md:max-lg:scale-60 md:max-lg:-left-16 lg:max-xl:scale-70 lg:max-xl:-bottom-60 lg:max-xl:-left-12 xl:scale-none" />
          <div className="animate animate-sec">
            <h1 className="font-rubik text-4xl font-medium md:text-5xl">OUR TEAM</h1>
            <img src={Team} alt="Our Team" className="w-78/100 md:w-full" loading="lazy" />
          </div>
          <div className="flex justify-around gap-10 w-45/100 font-rubik text-xl flex-col md:flex-row md:w-7/10 md:max-lg:gap-15 lg:w-8/10 lg:max-xl:gap-20 xl:gap-30 animate animate-sec">
            <div className="flex flex-col items-center gap-10">
              <img src={Person1} alt="Team" loading="lazy" />
              <h2>Jessica D'suza</h2>
            </div>
            <div className="flex flex-col items-center gap-10">
              <img src={Person2} alt="Team" loading="lazy" />
              <h2>Johnny William</h2>
            </div>
            <div className="flex flex-col items-center gap-10">
              <img src={Person3} alt="Team" loading="lazy" />
              <h2>Sanya R</h2>
            </div>
          </div>
          <img src={Asset8} alt="Asset 8" loading="lazy" className="absolute scale-50 -bottom-60 -right-16 md:max-lg:scale-60 md:max-lg:-right-13 md:max-lg:top-40 lg:max-xl:scale-70 lg:max-xl:-right-10 lg:max-xl:top-50 xl:scale-none xl:right-0 xl:top-70" />
        </div>
        {/* Projects Section*/}
        <div className="flex flex-col items-center gap-10 mt-20 pl-10 md:mt-30 xl:pl-0 xl:mt-50 ">
          <div className="animate animate-sec">
            <h1 className="font-rubik text-4xl font-medium md:text-5xl">OUR PROJECTS</h1>
            <img src={Projects} alt="Our projects" className="w-78/100 md:w-full" loading="lazy" />
          </div>
          <div className="animate-sec">
            <div className="grid grid-flow-col grid-rows-2 gap-4 w-9/10">
              <img src={P1} alt="" className="row-span-2 place-self-stretch" loading="lazy" />
              <img src={P2} alt="" loading="lazy" />
              <img src={P3} alt="" loading="lazy" />
            </div>
          </div>
        </div>
        {/* Clients Section*/}
        <div id="Clients" className="relative flex flex-col items-center gap-5 mt-20 xl:mt-50 ">
          <img src={Asset9} alt="Asset 9" className="absolute scale-50 -left-10 -top-10 xl:scale-none xl:left-0 xl:-top-20" />
          <div className="pl-10 md:pl-0 animate animate-sec">
            <h1 className="font-rubik text-4xl font-medium md:text-5xl">OUR CLIENTS</h1>
            <img src={Clients} alt="Our clients" className="w-78/100 md:w-full" loading="lazy"/>
          </div>
          <div className="flex flex-wrap gap-8 flex-col w-2/5  md:flex-row md:max-lg:w-[650px] md:max-lg:gap-10 md:max-lg:justify-center lg:max-xl:justify-center lg:max-xl:w-[850px] lg:max-xl:gap-10  xl:w-[1125px] xl:gap-15 animate animate-sec">
            <img
              src={client1}
              alt="Client 1"
              className="grayscale hover:grayscale-0"
              loading="lazy"
            />
            <img
              src={client2}
              alt="Client 2"
              className="grayscale hover:grayscale-0"
              loading="lazy"
            />
            <img
              src={client3}
              alt="Client 3"
              className="grayscale hover:grayscale-0"
              loading="lazy"
            />
            <img
              src={client4}
              alt="Client 4"
              className="grayscale hover:grayscale-0"
              loading="lazy"
            />
            <img
              src={client5}
              alt="Client 5"
              className="grayscale hover:grayscale-0"
              loading="lazy"
            />
            <img
              src={client6}
              alt="Client 6"
              className="grayscale hover:grayscale-0"
              loading="lazy"
            />
            <img
              src={client7}
              alt="Client 7"
              className="grayscale hover:grayscale-0"
              loading="lazy"
            />
            <img
              src={client8}
              alt="Client 8"
              className="grayscale hover:grayscale-0"
              loading="lazy"
            />
            <img
              src={client9}
              alt="Client 9"
              className="grayscale hover:grayscale-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
