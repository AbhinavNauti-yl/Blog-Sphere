const Hero = () => {
  return (
    <section className="container flex flex-col mx-auto lg:flex-row">
      <div className="m-10 lg:w-1/2">
        <h1 className="text-4xl text-black py-10 text-center lg:text-left lg:text-6xl lg:max-w[540] ">
          Intresting Articles
        </h1>
        <p className="text-2xl justify-center text-center lg:text-left lg:text-3xl text-gray-700">
          Your space. Your voice. Your sphere. Start blogging with BlogSphere
          today. A modern platform for writers and readers to connect, share,
          and grow. Welcome to BlogSphere — where ideas live.
        </p>

        <div className="flex flex-col mt-15 gap-2 lg:flex-row ">
          <span className="text-grey-500 ">Popular Tags:</span>
          <ul className="flex flex-wrap flex-row lg gap-5 ">
            <li className="rounded-lg bg-blue-100 text-black px-2 py-1 ">
              <a href="/">Frontend</a>
            </li>
            <li className="rounded-lg bg-blue-100 text-black px-2 py-1 ">
              <a href="/">Backend</a>
            </li>
            <li className="rounded-lg bg-blue-100 text-black px-2 py-1 ">
              <a href="/">Full Stack</a>
            </li>
          </ul>
        </div>
      </div>

      <div></div>
    </section>
  );
};

export default Hero;
