import learningImage from "../../assets/learning.gif";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <div className="sm:flex p-10 lg:p-20 md:space-x-10 mt-44">
        <div>
          <h1 className=" text-[4rem]">
            Skill <span className="text-green-700 underline">Sphere</span>
          </h1>
          <br />
          <p className="text-xl ">
            <span className="text-green-700 underline">
              E learning platform
            </span>
            {" "}to connect with peers based on complementary skills and improve your
            abilities. At Skill Sphere, we believe in the power of peer learning
            and collaboration. Whether you're looking to sharpen your expertise
            or acquire new skills, our intelligent matching algorithm connects
            you with students whose strengths align with your learning needs,
            creating a dynamic, personalized learning experience.
          </p>
        </div>

        <Image
          src={learningImage}
          alt="Learning"
          className="h-[300px w-[300px] rounded-tl-3xl rounded-br-3xl"
        />
      </div>
      <hr className="border border-green-700 mx-40 my-10" />
      <p className="text-3xl text-center m-20">
        <span className="text-green-700 text-5xl">"</span>
        Alone we can do so little; together we can do so much.
        <span className="text-green-700 text-5xl">"</span>
        <span className="text-green-700"> – Helen Keller</span>
      </p>
      <hr className="border border-green-700 mx-40 my-10" />
    </>
  );
}
