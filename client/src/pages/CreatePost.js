import React, { useState } from "react";
import { getRandomPropmts } from "../utils";
import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPropmts(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async (e) => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/dalle`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.image}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("A valid prompt is required!!!..");
    }
  };

  const handleShareWithCommunity = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (form.prompt && form.photo) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/post`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        const { data } = await response.json();
        console.log(data);
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="flex flex-col items-center">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 max-w-[550px] text-[#666e75] text-[16px]">
          Create Imaginative and visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>

      <form className="max-w-xl mt-16" onSubmit={handleShareWithCommunity}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A red table with a robotic cat on it"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative border flex justify-center bg-gray-50 text-center text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-8/12 object-contain rounded-xl"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-30"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 rounded-xl flex justify-center items-center bg-[rgba(0,0,0,0.3)]">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-4">
          <button
            className="bg-green-600 text-gray-200 px-4 py-2 rounded-full text-sm w-full text-center "
            type="button"
            onClick={generateImage}
          >
            {generatingImg ? "Generating Image..." : "Generate Image"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you created the image you want, share it with others in
            community.
          </p>
          <button className="mt-2 text-white text-gray-200 px-4 py-2 rounded-full bg-[#6469ff] font-medium text-sm w-full">
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
