import facebookLogo from './assets/facebook.svg';
import googleLogo from './assets/google.svg';
import linkedinLogo from './assets/linkedin.svg';

export default function Footer() {
  return (
    <footer id='Contact' className="font-rubik mb-5.5 mt-20 w-full flex flex-col items-center">
      <div className="bg-[#bfdbff] h-auto m-10 mb-5 p-5 md:h-[13rem] md:max-lg:p-8 lg:py-[2.625rem] lg:px-[6.875rem]">
        <ul className="grid grid-cols-2 gap-5 font-bold leading-[221%] md:grid-cols-4 md:gap-5 lg:gap-20">
          <li>
            <p>Social</p>
            <ul className="font-normal ">
              <li>
                <div className="flex items-center gap-2">
                  <img src={facebookLogo} alt="Facebook Logo" loading='lazy'  />
                  Facebook
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img src={linkedinLogo} alt="LinkedIn Logo" loading='lazy' />
                  Linkedin
                </div>
              </li>
              <li>
                <div className='flex items-center gap-2'>
                  <img src={googleLogo} alt="Google+ Logo" loading='lazy' />
                  Google+
                </div>
              </li>
            </ul>
          </li>
          <li>
            <p>Explore</p>
            <ul className="font-normal">
              <li>Services</li>
              <li>Team</li>
              <li>Clients</li>
            </ul>
          </li>
          <li>
            <p>Contact</p>
            <ul className="font-normal md:text-sm md:leading-6.5 lg:leading-7 break-words xl:leading-8 xl:text-base">
              <li>Lorem Ipsum dummy address</li>
              <li>used for display</li>
              <li>1234567890</li>
            </ul>
          </li>
          <li>
            <p>Email</p>
            <ul className="font-normal break-all md:w-[150px] md:text-sm lg:w-[200px] xl:text-base">
              <li>mendlesoncommunication@email.com</li>
            </ul>
          </li>
        </ul>
      </div>
      <p className="text-sm text-[#2C2C2C] mt-1">
        © Copyright 2018 Mendleson Communication Pty Ltd{" "}
      </p>
    </footer>
  );
}
