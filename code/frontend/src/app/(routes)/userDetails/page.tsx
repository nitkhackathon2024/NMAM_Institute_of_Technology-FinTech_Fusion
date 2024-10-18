"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { data: session, status } = useSession();
  console.log(session?.user?.id)
  const [userData, setUserData] = useState<
    {
      name: string;
      email: string;
      yearOfStudy: number;
      skills: [];
      learningGoals: [];
    }[]
  >([]);
  const [year, setYear] = useState<number | "">(0);
  const [newSkill, setNewSkill] = useState("");
  const [newLearningSkill, setNewLearningSkill] = useState("");

  const userEmail = session?.user?.email;

  const getUserData = async () => {
    const response = await fetch(`/api/getUserData?userEmail=${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserData([data]);
  };

  const updateYear = async () => {
    const response = await fetch(
      `/api/updateUserData?year=${year}&email=${userEmail}&type=year`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  };

  const addSkill = async () => {
    if (newSkill == "") {
      return;
    }
    console.log(newSkill);
    const response = await fetch(
      `/api/updateUserData?skill=${newSkill}&email=${userEmail}&type=skill`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setNewSkill("");
    getUserData();
    console.log(response);
  };

  const addLearningSkill = async () => {
    if (newLearningSkill == "") {
      return;
    }
    console.log(newLearningSkill);
    const response = await fetch(
      `/api/updateUserData?skill=${newLearningSkill}&email=${userEmail}&type=learning`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setNewLearningSkill("");
    getUserData();
    console.log(response);
  };

  const deleteSkill = async (index: number) => {
    const res = await fetch(
      `/api/deleteItem?type=skill&index=${index}&email=${userEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    getUserData();
  };

  const deleteLearning = async (index: number) => {
    const res = await fetch(
      `/api/deleteItem?type=learning&index=${index}&email=${userEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    getUserData();
  };

  useEffect(() => {
    getUserData();
  }, [session]);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (!session) {
    return <h1 className="text-3xl mt-44 text-center">Please signIn to continue</h1>;
  }

  return (
    <div>
      <p className="text-center text-4xl mt-40">User Details</p>
      <br />
      <div className="w-fit m-auto lg:flex lg:space-x-5 lg:mt-20">
        <div>
          <label htmlFor="skills">My info</label>
          <br />
          <br />
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            value={userData[0]?.name}
            disabled
            className="py-2 px-3 rounded-3xl"
          />
          <br />
          <br />
          <label htmlFor="email">Email : </label>
          <input
            type="text"
            value={userData[0]?.email}
            disabled
            className="py-2 px-3 rounded-3xl"
          />
          <br />
          <br />
          <label htmlFor="year">Year of study : {userData[0]?.yearOfStudy}</label>
          <br />
          <br />
          <select
            className="text-black"
            value={year ?? userData[0]?.yearOfStudy}
            onChange={(e) => {
              setYear(Number(e.target.value));
            }}
          >
            <option value="">Select Year</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
          <button onClick={updateYear}>Update</button>
          <br />
          <br />
        </div>
        <div>
          <label htmlFor="skills">Skills</label>
          <br />
          {userData[0]?.skills.map((skill, index) => {
            return (
              <div
                key={index}
                className="text-white border border-white py-2 px-3 rounded-md m-2 flex justify-between items-center"
              >
                {skill}{" "}
                <button
                  onClick={() => deleteSkill(index)}
                  className="bg-red-500 text-black p-2"
                >
                  Delete
                </button>
              </div>
            );
          })}
          <br />
          <input
            type="text"
            placeholder="add skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="py-2 px-3 rounded-3xl text-black"
          />
          <button onClick={addSkill} className="bg-green-700 px-2 py-3 rounded-3xl ml-2">Add skill</button>
          <br />
          <br />
        </div>
        <div>
          <label htmlFor="learning">Learning : </label>
          <br />
          {userData[0]?.learningGoals.map((skill, index) => {
            return (
              <div
                key={index}
                className="text-white border border-white py-2 px-3 rounded-md m-2 flex justify-between items-center"
              >
                {skill}
                <button
                  onClick={() => deleteLearning(index)}
                  className="bg-red-500 text-black p-2"
                >
                  Delete
                </button>
              </div>
            );
          })}
          <br />
          <input
            type="text"
            placeholder="add skill"
            value={newLearningSkill}
            onChange={(e) => setNewLearningSkill(e.target.value)}
            className="py-2 px-3 rounded-3xl text-black"
          />
          <button onClick={addLearningSkill} className="bg-green-700 px-2 py-3 rounded-3xl ml-2">Add skill</button>
        </div>
      </div>
    </div>
  );
}

//college
//skills
//branch
//currend year of study
