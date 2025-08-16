const Footer = () => {
  return (
    <footer className=" bg-neutral-900 max-w-full w-full px-2 py-2 mt-5 ">
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex flex-col items-center justify-center w-full pt-8">
          <div className="flex items-center flex-col gap-8 justify-center w-full px-4 lg:justify-between lg:flex-row">
            <h2 className="text-white text-center text-4xl font-bold uppercase leading-tight font-sans">
              From The <span className="text-blue-500">Blog</span>?
            </h2>
            <div className="flex  items-center justify-center gap-2 pr-2">
              <i className="fa-brands fa-facebook fa-2xl text-blue-400 cursor-pointer"></i>
              <i className="fa-brands fa-x-twitter fa-2xl text-blue-400 cursor-pointer"></i>
              <i className="fa-brands fa-tiktok fa-2xl text-blue-400 cursor-pointer"></i>
              <i className="fa-brands fa-instagram fa-2xl text-blue-400 cursor-pointer"></i>
            </div>
          </div>

          <div className="flex flex-col justify-between items-center w-full mt-12 pt-1 pb-4 border-t border-white px-4 lg:flex-row">
            <div className="text-white text-base font-sans">
              <p>© 2025 My Blog</p>
            </div>
            <div className="flex gap-8 text-white text-base font-sans cursor-pointer">
              <p>Privacy policy</p>
              <p>Terms & conditions</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;