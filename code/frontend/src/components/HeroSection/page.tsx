import learningImage from "../../assets/learning.gif";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
    <div className="sm:flex p-10 lg:p-20 md:space-x-10 md:mt-20 lg:mt-44">
      <div>
        <h1 className=" text-[4rem]">
          Skill <span className="text-green-700 underline">Sphere</span>
        </h1>
        <br />
        <p className="text-xl ">
          <span className="text-green-700 underline">E learning platform </span>
          to connect with peers with complementary skills and improve your
          skills. At Skill Sphere, we believe in the power of peer learning and
          collaboration. Whether you're looking to sharpen your expertise or
          learn something new, our intelligent matching algorithm pairs you with
          students whose strengths meet your needs.
        </p>
      </div>

      <Image
        src={learningImage}
        alt="Learning"
        className="h-[300px w-[300px] rounded-tl-3xl rounded-br-3xl"
      />
    </div>
    <hr className="border border-green-700 mx-40 my-10"/>
    <p className="text-3xl text-center m-20">
        <span className="text-green-700 text-5xl">"</span>
        Alone we can do so little; together we can do so much.
        <span className="text-green-700 text-5xl">"</span>
        <span className="text-green-700"> – Helen Keller</span>
    </p>
    <hr className="border border-green-700 mx-40 my-10"/>
    </>
  );
}
