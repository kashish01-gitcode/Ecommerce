import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever is your trusted destination for quality fashion and modern
            lifestyle products.
          </p>

          <p>
            We focus on delivering premium products with exceptional customer
            experience and fast delivery.
          </p>

          <b className="text-gray-800">Our Mission</b>

          <p>
            To make fashion accessible, affordable and enjoyable for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;