import React from "react";

// SVGs from Simple Icons (https://simpleicons.org/)
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.369-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.222 0z"/>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.635 1.37c-.967.967-1.24 2.14-1.298 3.417C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.058 1.277.331 2.45 1.298 3.417.967.967 2.14 1.24 3.417 1.298C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.058 2.45-.331 3.417-1.298.967-.967 1.24-2.14 1.298-3.417.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.058-1.277-.331-2.45-1.298-3.417-.967-.967-2.14-1.24-3.417-1.298C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.163 3.5 12 3.5 12 3.5s-7.163 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.413 0 12 0 12s0 3.587.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.837 20.5 12 20.5 12 20.5s7.163 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.587 24 12 24 12s0-3.587-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-[#D9D9D9] py-16 overflow-x-hidden">
      <div className="mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="max-md:flex max-md:flex-col justify-center items-center divide-y-2 divide-black">
            <h3 className="font-bold text-lg mb-6 tracking-wider">
              <p className="text-black">INFORMATION</p>
            </h3>
            <ul className="space-y-3 text-black">
              <li>
                <a
                  href="#"
                  className="tracking-wide"
                >
                  <p className="text-gray-400 text-sm">ABOUT US</p>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="tracking-wide"
                >
                  <p className="text-gray-400 text-sm">SERVICES</p>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="tracking-wide"
                >
                  <p className="text-gray-400 text-sm">BUTLER</p>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="tracking-wide"
                >
                  <p className="text-gray-400 text-sm">API</p>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="tracking-wide"
                >
                  <p className="text-gray-400 text-sm">JOBS</p>
                </a>
              </li>
            </ul>
          </div>

          <div className="max-md:flex max-md:flex-col justify-center items-center divide-y-2">
            <h3 className="font-bold text-lg mb-6 tracking-wider text-black">LEGAL</h3>
            <ul className="space-y-3 text-black-400">
              <li>
                <a
                  href="#"
                  className="tracking-wide"
                >
                  <p className="text-gray-400 text-sm">ABOUT US</p>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="tracking-wide"
                >
                  <p className="text-gray-400 text-sm">PRIVACY</p>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="tracking-wide"
                >
                  <p className="text-gray-400 text-sm">BUTLER</p>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="tracking-wide"
                >
                  <p className="text-gray-400 text-sm">JOBS</p>
                </a>
              </li>
            </ul>
          </div>

          <div className="max-md:flex max-md:flex-col justify-center items-center divide-y-2">
            <h3 className="font-bold text-lg mb-6 tracking-wider text-black">SOCIALS</h3>
            <div className="flex space-x-6">
              <LinkedinIcon className="w-6 h-6 text-black hover:text-[#8A39E1] cursor-pointer transition-colors" />
              <InstagramIcon className="w-6 h-6 text-black hover:text-[#8A39E1] cursor-pointer transition-colors" />
              <YoutubeIcon className="w-6 h-6 text-black hover:text-[#8A39E1] cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 p-2 text-center text-gray-500 text-sm">
          <p>© by Butler 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
